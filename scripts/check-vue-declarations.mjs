import { existsSync, readdirSync } from 'node:fs';
import { join, relative } from 'node:path';

const packages = process.argv.slice(2);
if (!packages.length) throw new Error('Pass a Vue package directory.');

let missing = 0;
for (const directory of packages) {
  const source = join(directory, 'src');
  const files = readdirSync(source, { recursive: true }).filter((file) => file.endsWith('.vue'));
  if (!files.length) throw new Error(`No Vue SFCs found in ${source}.`);
  for (const file of files) {
    const declaration = join(directory, 'dist', `${file}.d.ts`);
    if (!existsSync(declaration)) {
      console.error(`Missing Vue declaration: ${relative(process.cwd(), declaration)}`);
      missing++;
    }
  }
  console.log(`${directory}: checked ${files.length} Vue declarations.`);
}
if (missing) process.exitCode = 1;