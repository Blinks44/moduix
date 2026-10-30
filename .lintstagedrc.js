module.exports = {
  '*.{html,css,md,mdx,yml,json}': 'oxfmt --no-error-on-unmatched-pattern',
  '*.{js,jsx,mjs,ts,tsx,vue}': ['oxlint --fix', 'oxfmt --no-error-on-unmatched-pattern'],
};