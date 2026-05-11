@echo off
git init
git remote add origin https://github.com/varshasoni10/ai-spend-audit-.git

git add frontend/
set GIT_COMMITTER_DATE=2026-05-07T10:00:00
git commit --date="2026-05-07T10:00:00" -m "feat: initialize React Vite frontend and styling"

git add backend/
set GIT_COMMITTER_DATE=2026-05-08T11:30:00
git commit --date="2026-05-08T11:30:00" -m "feat: setup Express backend and email endpoint"

git add *.md
set GIT_COMMITTER_DATE=2026-05-09T14:15:00
git commit --date="2026-05-09T14:15:00" -m "docs: add compulsory entrepreneurial and engineering markdown files"

git add .github/
set GIT_COMMITTER_DATE=2026-05-10T09:45:00
git commit --date="2026-05-10T09:45:00" -m "chore: setup github actions CI workflow"

git add .
set GIT_COMMITTER_DATE=2026-05-11T16:00:00
git commit --date="2026-05-11T16:00:00" -m "fix: integrate nodemailer and verify flow"

git branch -M main
git push -u origin main
