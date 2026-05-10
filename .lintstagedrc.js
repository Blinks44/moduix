module.exports = {
  '*.{html,css,md,mdx,yml,json}': 'oxfmt',
  '*.{js,jsx}': ['oxlint --fix', 'oxfmt'],
  '*.{ts,tsx}': ['oxlint --fix', 'oxfmt', () => 'tsc --noEmit --skipLibCheck'],
};