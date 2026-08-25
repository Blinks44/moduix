import { JsonTreeView } from '@moduix/react/json-tree-view';

const response = {
  checks: ['accessibility', 'visual-regression', 'type-check', 'unit-tests', 'documentation-build'],
  message:
    'This release includes a detailed changelog with compatibility notes for application teams and maintainers.',
  status: 'published',
};

export default function JsonTreeViewCompactPreviewsDemo() {
  return (
    <JsonTreeView
      collapseStringsAfterLength={36}
      data={response}
      defaultExpandedDepth={1}
      maxPreviewItems={3}
    >
      <JsonTreeView.Tree />
    </JsonTreeView>
  );
}