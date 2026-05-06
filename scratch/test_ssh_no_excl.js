const { NodeSSH } = require('node-ssh');

const ssh = new NodeSSH();

async function test() {
    try {
        console.log('Testing connection without !...');
        await ssh.connect({
            host: '185.211.7.70',
            username: 'u185421649',
            port: 65002,
            password: 'Chckcl7406',
        });
        console.log('SUCCESS: Connected!');
        await ssh.dispose();
    } catch (err) {
        console.error('FAILURE:', err.message);
        process.exit(1);
    }
}

test();
