import type { RspressPlugin } from '@rspress/core';
import { execFileSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// Adds `lastUpdatedDate` (YYYY-MM-DD of the last commit) to page data. The built-in Rspress option
// only exposes a preformatted `toLocaleString` value, while the page footer shows a long date.

const docsRoot = fileURLToPath(new URL('../docs/', import.meta.url));

function collectDates() {
  const dates = new Map<string, string>();
  let output = '';
  try {
    output = execFileSync(
      'git',
      ['-c', 'core.quotePath=false', 'log', '--format=%x00%cs', '--name-only', '--relative', '--'],
      { cwd: docsRoot, encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 },
    );
  } catch {
    return dates;
  }

  let date: string | undefined;
  for (const line of output.split('\n')) {
    if (line.startsWith('\0')) date = line.slice(1);
    else if (line && date && !dates.has(line)) dates.set(line, date);
  }
  return dates;
}

export function pluginLastUpdatedDate(): RspressPlugin {
  let dates: Map<string, string> | undefined;

  return {
    name: 'moduix-last-updated-date',
    extendPageData(pageData) {
      dates ??= collectDates();
      const file = path.relative(docsRoot, pageData._filepath).split(path.sep).join('/');
      const date = dates.get(file);
      if (date) Object.assign(pageData, { lastUpdatedDate: date });
    },
  };
}