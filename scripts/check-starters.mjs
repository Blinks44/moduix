import { spawnSync } from 'node:child_process';
import { cpSync, mkdtempSync, readdirSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { basename, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const source = fileURLToPath(new URL('../starters/', import.meta.url));
const temporary = mkdtempSync(join(tmpdir(), 'moduix-starters-'));

try {
  for (const entry of readdirSync(source, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const cwd = join(temporary, entry.name);
    cpSync(join(source, entry.name), cwd, {
      recursive: true,
      filter: (path) => !['node_modules', 'dist'].includes(basename(path)),
    });
    for (const args of [
      ['install', '--frozen-lockfile'],
      ['run', 'build'],
    ]) {
      console.log(`${entry.name}: pnpm ${args.join(' ')}`);
      const result = spawnSync('pnpm', args, { cwd, stdio: 'inherit' });
      if (result.error) throw result.error;
      if (result.status !== 0) throw new Error(`${entry.name}: pnpm failed (${result.status})`);
    }
  }
} finally {
  rmSync(temporary, { recursive: true, force: true });
}