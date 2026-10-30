<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Deployment Protocol (Memorized)
To deploy changes to production, use the GitHub workflow. Do NOT use the local deploy.js script (SSH) unless explicitly requested.

**CRITICAL RULE:**
The production server on Hostinger runs Next.js standalone directly from the tracked `.next/` directory in the repository. Whenever ANY changes are made to `src/` or `public/`:
1. **You MUST run `npm run build` first**:
   `& ".node\node-v20.11.1-win-x64\npm.cmd" run build`
2. Stage all changes including `.next/`:
   `& ".git_bin\cmd\git.exe" add .`
3. Commit:
   `& ".git_bin\cmd\git.exe" commit -m "Update message"`
4. Push to production:
   `& ".git_bin\cmd\git.exe" push origin main`

The remote is already configured with the necessary authentication tokens.
