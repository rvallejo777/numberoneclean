<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Deployment Protocol (Memorized)
To deploy changes to production, use the GitHub workflow. Do NOT use the local deploy.js script (SSH) unless explicitly requested.

**Steps:**
1. Use the local git binary: & ".git_bin\cmd\git.exe" add .
2. Commit: & ".git_bin\cmd\git.exe" commit -m "Update message"
3. Push: & ".git_bin\cmd\git.exe" push origin main

The remote is already configured with the necessary authentication tokens.
