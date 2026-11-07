import { createTreeCollection } from '@/components/tree-view';

export interface FileNode {
  children?: FileNode[];
  childrenCount?: number;
  disabled?: boolean;
  id: string;
  name: string;
}

export const createFileCollection = (children: FileNode[]) =>
  createTreeCollection<FileNode>({
    isNodeDisabled: (node) => node.disabled === true,
    nodeToString: (node) => node.name,
    nodeToValue: (node) => node.id,
    rootNode: { id: 'ROOT', name: '', children },
  });

export const collection = createFileCollection([
  { id: 'src', name: 'src', children: [{ id: 'src/App.tsx', name: 'App.tsx' }] },
  { id: 'README.md', name: 'README.md' },
]);