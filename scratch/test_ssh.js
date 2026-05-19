const { NodeSSH } = require('node-ssh');
require('dotenv').config({ path: '.env.deploy' });

const ssh = new NodeSSH();

async function main() {
  console.log(`Connecting to ${process.env.SSH_HOST}:${process.env.SSH_PORT} as ${process.env.SSH_USER}...`);
  try {
    await ssh.connect({
      host: process.env.SSH_HOST,
      username: process.env.SSH_USER,
      port: parseInt(process.env.SSH_PORT),
      password: process.env.SSH_PASS,
      debug: (msg) => console.log('DEBUG:', msg)
    });
    console.log('SUCCESS! Connected to SSH server.');
    const result = await ssh.execCommand('id; pwd; ls -la');
    console.log('STDOUT:', result.stdout);
    console.log('STDERR:', result.stderr);
    ssh.dispose();
  } catch (err) {
    console.error('CONNECTION FAILED:', err);
  }
}

main();
