const { NodeSSH } = require('node-ssh');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env.deploy') });

const ssh = new NodeSSH();

async function testConnection() {
  console.log('Attempting SSH connection...');
  console.log(`Host: ${process.env.SSH_HOST || '185.211.7.70'}`);
  console.log(`Port: ${process.env.SSH_PORT || '65002'}`);
  console.log(`User: ${process.env.SSH_USER || 'u185421649'}`);
  
  try {
    await ssh.connect({
      host: process.env.SSH_HOST || '185.211.7.70',
      username: process.env.SSH_USER || 'u185421649',
      port: parseInt(process.env.SSH_PORT || '65002', 10),
      password: process.env.SSH_PASSWORD || 'Chckcl7406!',
    });
    console.log('SSH connection SUCCESSFUL!');
    
    // Check files and git status
    console.log('Running git status on server...');
    const result = await ssh.execCommand('git status', { cwd: 'domains/numberoneclean.mx/public_html' });
    console.log('STDOUT:', result.stdout);
    console.log('STDERR:', result.stderr);
    
    ssh.dispose();
  } catch (err) {
    console.error('SSH Connection FAILED:', err.message);
  }
}

testConnection();
