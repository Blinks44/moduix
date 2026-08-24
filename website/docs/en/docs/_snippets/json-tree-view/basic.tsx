import { JsonTreeView } from '@moduix/react/json-tree-view';

const deployment = {
  environment: 'production',
  release: {
    branch: 'main',
    commit: '0f4c9d7',
    status: 'ready',
  },
  services: ['docs', 'registry', 'website'],
};

export default function JsonTreeViewBasicDemo() {
  return (
    <JsonTreeView data={deployment} defaultExpandedDepth={2}>
      <JsonTreeView.Tree />
    </JsonTreeView>
  );
}