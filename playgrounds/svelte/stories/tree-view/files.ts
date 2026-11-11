import { createTreeCollection } from '@/components/tree-view';

export interface FileNode {
  disabled?: boolean;
  id: string;
  name: string;
  children?: FileNode[];
}

export const collection = createTreeCollection<FileNode>({
  nodeToValue: (node) => node.id,
  nodeToString: (node) => node.name,
  rootNode: {
    id: 'ROOT',
    name: '',
    children: [
      {
        id: 'src',
        name: 'src',
        children: [
          { id: 'src/App.tsx', name: 'App.tsx' },
          { id: 'src/main.tsx', name: 'main.tsx' },
          {
            id: 'src/components',
            name: 'components',
            children: [
              { id: 'src/components/Button.tsx', name: 'Button.tsx' },
              { id: 'src/components/Dialog.tsx', name: 'Dialog.tsx' },
            ],
          },
        ],
      },
      {
        id: 'public',
        name: 'public',
        children: [{ id: 'public/favicon.svg', name: 'favicon.svg' }],
      },
      { id: 'package.json', name: 'package.json' },
      { id: 'README.md', name: 'README.md' },
    ],
  },
});

export const contentStressCollection = createTreeCollection<FileNode>({
  nodeToValue: (node) => node.id,
  nodeToString: (node) => node.name,
  rootNode: {
    id: 'ROOT',
    name: '',
    children: [
      {
        id: 'configuration',
        name: 'Configuration files with long descriptive names',
        children: [
          {
            id: 'configuration/environment',
            name: 'production-environment-overrides-and-secrets.example.ts',
          },
        ],
      },
      { id: 'readme', name: 'README-with-a-long-but-meaningful-description.md' },
    ],
  },
});

export const disabledCollection = createTreeCollection<FileNode>({
  isNodeDisabled: (node) => node.disabled === true,
  nodeToValue: (node) => node.id,
  nodeToString: (node) => node.name,
  rootNode: {
    id: 'ROOT',
    name: '',
    children: [
      { id: 'src', name: 'src', children: [{ id: 'src/App.tsx', name: 'App.tsx' }] },
      { disabled: true, id: 'archive', name: 'Archived project files' },
    ],
  },
});