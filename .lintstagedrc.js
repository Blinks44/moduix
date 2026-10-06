module.exports = {
  '*.{html,vue,css,md,mdx,yml,json}': 'oxfmt --no-error-on-unmatched-pattern',
  '*.{js,jsx,mjs,ts,tsx}': ['oxlint --fix', 'oxfmt --no-error-on-unmatched-pattern'],
};