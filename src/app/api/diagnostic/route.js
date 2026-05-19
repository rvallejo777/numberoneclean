import { NextResponse } from 'next/server';
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get('secret');
  const runCmd = searchParams.get('run');

  // Simple security check using a secret key
  if (secret !== 'numberonesupersecret123') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const diagnostics = {};

  try {
    diagnostics.cwd = process.cwd();
    diagnostics.nodeVersion = process.version;
    diagnostics.env = {
      NODE_ENV: process.env.NODE_ENV,
      PORT: process.env.PORT,
      HOSTNAME: process.env.HOSTNAME,
    };

    // List root directory
    diagnostics.files = fs.readdirSync(process.cwd()).map(file => {
      const stats = fs.statSync(path.join(process.cwd(), file));
      return {
        name: file,
        isDir: stats.isDirectory(),
        size: stats.size,
        mtime: stats.mtime,
      };
    });

    // Check if .next exists
    const nextPath = path.join(process.cwd(), '.next');
    if (fs.existsSync(nextPath)) {
      diagnostics.nextExists = true;
      try {
        diagnostics.nextFiles = fs.readdirSync(nextPath);
      } catch (e) {
        diagnostics.nextError = e.message;
      }
    } else {
      diagnostics.nextExists = false;
    }

    // Run custom command if requested
    if (runCmd) {
      diagnostics.commandRun = runCmd;
      try {
        diagnostics.commandOutput = execSync(runCmd, { encoding: 'utf-8', timeout: 60000 });
      } catch (cmdErr) {
        diagnostics.commandError = {
          message: cmdErr.message,
          stdout: cmdErr.stdout,
          stderr: cmdErr.stderr,
        };
      }
    }

  } catch (err) {
    diagnostics.error = err.message;
    diagnostics.stack = err.stack;
  }

  return NextResponse.json(diagnostics);
}
