import type { AfterSearch, DefaultMatchResult } from '@rspress/core/theme';

// shadcn/ui names that differ from moduix names. The search index only holds page text, so a search
// for the familiar name gets the moduix page added at the top of the native results.
const shadcnAliases: Record<string, [title: string, path: string]> = {
  'alert dialog': ['Dialog', '/docs/dialog'],
  calendar: ['Date Picker', '/docs/date-picker'],
  command: ['Command Palette', '/docs/command-palette'],
  'context menu': ['Menu', '/docs/menu'],
  'dropdown menu': ['Menu', '/docs/menu'],
  'input otp': ['Pin Input', '/docs/pin-input'],
  progress: ['Progress Linear', '/docs/progress-linear'],
  resizable: ['Splitter', '/docs/splitter'],
  sheet: ['Drawer', '/docs/drawer'],
  sonner: ['Toast', '/docs/toast'],
};

export const afterSearch: AfterSearch = (query, matchedResult) => {
  const alias = shadcnAliases[query.trim().toLowerCase().replace(/[-_]+/g, ' ')];
  if (!alias) return;

  const [title, path] = alias;
  const locale = location.pathname.match(/^\/(ru|fr)(?=\/)/)?.[0] ?? '';
  const item = {
    type: 'title' as const,
    title,
    header: title,
    link: `${locale}${path}`,
    query,
    highlightInfoList: [],
  };
  const group = matchedResult.find(
    (entry): entry is DefaultMatchResult => entry.renderType === 'default',
  );

  if (group) {
    // Mutate in place: the panel keeps a reference to the original array.
    const duplicate = group.result.findIndex((entry) => entry.link === item.link);
    if (duplicate !== -1) group.result.splice(duplicate, 1);
    group.result.unshift(item);
  } else {
    matchedResult.push({
      group: 'Docs',
      renderType: 'default' as DefaultMatchResult['renderType'],
      result: [item],
    });
  }
};