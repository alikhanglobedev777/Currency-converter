# Currency Converter malware cleanup

## Confirmed malicious behavior
- The hidden `.vscode/tasks.json` launched Node.js against a file named `public/fonts/fa-solid-900.woff2` when VS Code opened the repository.
- That file matched the known malicious JavaScript blob from the other compromised repositories; it was not a font.
- `.vscode/settings.json` enabled automatic execution of tasks.

## Cleanup
- Deleted the malicious VS Code task and fake font.
- Set `task.allowAutomaticTasks` to `false` and removed the separate folder-open command from settings.
- Added a dependency-free malware scanner and GitHub Actions workflow.
- Preserved `index.html`, `styles.css`, `app.js`, and `codes.js` unchanged.

## Follow-up
- Keep endpoint protection enabled and check any device that opened the infected repository before cleanup.
- Review older Git history, forks, and existing clones. A new commit does not erase old payload copies.
- Rotate any credentials that might have been accessible on an affected device.
- The scanner checks known indicators; it is not a full security or dependency audit.
