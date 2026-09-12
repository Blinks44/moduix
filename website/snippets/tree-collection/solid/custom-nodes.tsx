import { createTreeCollection } from '@moduix/solid/tree-view';

type NavigationNode = {
  id: string;
  name: string;
  items?: NavigationNode[];
  unavailable?: boolean;
};

export const navigation: NavigationNode = {
  id: 'root',
  name: 'Documentation',
  items: [
    {
      id: 'guides',
      name: 'Guides',
      items: [{ id: 'getting-started', name: 'Getting started' }],
    },
    { id: 'components', name: 'Components' },
  ],
};

export const tree = createTreeCollection<NavigationNode>({
  rootNode: navigation,
  nodeToValue: (node) => node.id,
  nodeToString: (node) => node.name,
  nodeToChildren: (node) => node.items ?? [],
  nodeToChildrenCount: (node) => node.items?.length,
  isNodeDisabled: (node) => node.unavailable ?? false,
});