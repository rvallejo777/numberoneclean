const { NodeSSH } = require('node-ssh');
require('dotenv').config({ path: '.env.deploy' });

const ssh = new NodeSSH();

async function test() {
    try {
        console.log('Testing connection with keyboard-interactive...');
        await ssh.connect({
            host: process.env.SSH_HOST,
            username: process.env.SSH_USER,
            port: parseInt(process.env.SSH_PORT),
            password: process.env.SSH_PASS,
            tryKeyboard: true,
            onKeyboardInteractive: (name, instructions, instructionsLang, prompts, finish) => {
                if (prompts.length > 0 && prompts[0].prompt.toLowerCase().includes('password')) {
                    finish([process.env.SSH_PASS]);
                }
            }
        });
        console.log('SUCCESS: Connected!');
        await ssh.dispose();
    } catch (err) {
        console.error('FAILURE:', err.message);
        process.exit(1);
    }
}

test();
