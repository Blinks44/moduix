import { createFileTreeCollection } from '@moduix/solid/tree-view';

export const files = createFileTreeCollection([
  'src/components/Button.tsx',
  'src/components/Input.tsx',
  'src/utils/format.ts',
  'README.md',
]);

files.getValues(); // ['src', 'src/components', 'src/components/Button.tsx', ...]
files.getBranchValues(); // ['src', 'src/components', 'src/utils']