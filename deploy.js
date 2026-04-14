const { NodeSSH } = require('node-ssh');
const path = require('path');
const fs = require('fs');
const { execSync } = require('child_process');
const archiver = require('archiver');
require('dotenv').config({ path: '.env.deploy' });

const ssh = new NodeSSH();

// Configurar el path de node según el entorno detectado
const nodePath = 'c:\\Users\\Robert\\Documents\\ROBERTO\\ROBERTO\\NUMBERONE\\.node\\node-v20.11.1-win-x64';
const npmCmd = path.join(nodePath, 'npm.cmd');

async function runCommand(cmd, options = {}) {
    console.log(`Running: ${cmd}`);
    execSync(cmd, { stdio: 'inherit', env: { ...process.env, PATH: `${nodePath};${process.env.PATH}` }, ...options });
}

function zipDirectory(sourceDir, outPath) {
    const archive = archiver('zip', { zlib: { level: 9 } });
    const stream = fs.createWriteStream(outPath);

    return new Promise((resolve, reject) => {
        archive
            .directory(sourceDir, false)
            .on('error', err => reject(err))
            .pipe(stream);

        stream.on('close', () => resolve());
        archive.finalize();
    });
}

async function deploy() {
    try {
        console.log('--- Iniciando Despliegue Autónomo ---');

        // 1. Build
        console.log('\n[1/5] Construyendo aplicación Next.js...');
        await runCommand(`"${npmCmd}" run build`);

        // 2. Preparar carpeta deploy_ready
        console.log('\n[2/5] Organizando archivos para el despliegue...');
        const deployDir = path.join(__dirname, 'deploy_ready');
        if (fs.existsSync(deployDir)) {
            fs.rmSync(deployDir, { recursive: true, force: true });
        }
        fs.mkdirSync(deployDir);

        // Copiar standalone (usando dereference para evitar errores de symlinks en Windows)
        const standaloneDir = path.join(__dirname, '.next', 'standalone');
        fs.cpSync(standaloneDir, deployDir, { recursive: true, dereference: true });

        // Copiar public
        fs.cpSync(path.join(__dirname, 'public'), path.join(deployDir, 'public'), { recursive: true, dereference: true });

        // Copiar static
        const staticDest = path.join(deployDir, '.next', 'static');
        if (!fs.existsSync(path.dirname(staticDest))) fs.mkdirSync(path.dirname(staticDest));
        fs.cpSync(path.join(__dirname, '.next', 'static'), staticDest, { recursive: true, dereference: true });

        // 3. Comprimir
        console.log('\n[3/5] Creando archivo comprimido...');
        const zipFile = path.join(__dirname, 'deploy.zip');
        await zipDirectory(deployDir, zipFile);
        console.log('Archivo deploy.zip creado.');

        // 4. Subir y Extraer
        console.log('\n[4/5] Conectando al servidor y subiendo archivos...');
        await ssh.connect({
            host: process.env.SSH_HOST,
            username: process.env.SSH_USER,
            port: parseInt(process.env.SSH_PORT),
            password: process.env.SSH_PASS,
        });

        const remotePath = process.env.REMOTE_PATH;
        const remoteZip = remotePath + '/deploy.zip';

        await ssh.putFile(zipFile, remoteZip);
        console.log('Upload completado. Extrayendo...');

        await ssh.execCommand('unzip -o deploy.zip', { cwd: remotePath });
        await ssh.execCommand('rm deploy.zip', { cwd: remotePath });

        // 5. Cleanup local
        console.log('\n[5/5] Limpiando archivos temporales locales...');
        fs.rmSync(deployDir, { recursive: true, force: true });
        fs.unlinkSync(zipFile);

        console.log('\n¡Despliegue finalizado con éxito!');
        process.exit(0);
    } catch (err) {
        console.error('\nError durante el despliegue:', err);
        process.exit(1);
    }
}

deploy();
