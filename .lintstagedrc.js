module.exports = {
  '*.{html,css,md,mdx,yml,json}': 'oxfmt',
  '*.{js,jsx}': ['oxlint --fix', 'oxfmt'],
  // Run monorepo typecheck via Turbo from root; plain `tsc` at root has no project.
  '*.{ts,tsx}': ['oxlint --fix', 'oxfmt', () => 'npm run tsc:check'],
};