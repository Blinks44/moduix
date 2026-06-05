module.exports = {
  '*.{html,css,md,mdx,yml,json}': 'oxfmt --no-error-on-unmatched-pattern',
  '*.{js,jsx,mjs}': ['oxlint --fix', 'oxfmt --no-error-on-unmatched-pattern'],
  // Run monorepo typecheck via Turbo from root; plain `tsc` at root has no project.
  '*.{ts,tsx}': [
    'oxlint --fix',
    'oxfmt --no-error-on-unmatched-pattern',
    () => 'npm run tsc:check',
  ],
};