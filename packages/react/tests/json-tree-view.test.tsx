import { expect, test } from '@rstest/core';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { JsonTreeView } from '../src';

const data = {
  release: {
    status: 'ready',
    version: '2.3.0',
  },
};

test('renders a styled Ark tree with the generated JSON nodes', async () => {
  render(
    <JsonTreeView data={data} defaultExpandedDepth={1}>
      <JsonTreeView.Tree />
    </JsonTreeView>,
  );

  const tree = screen.getByRole('tree');
  const rootBranch = screen.getAllByRole('button')[0];

  expect(tree).toHaveAttribute('data-slot', 'json-tree-view-tree');
  expect(tree.parentElement).toHaveAttribute('data-slot', 'json-tree-view-root');
  expect(rootBranch.querySelector('svg')).not.toBeNull();

  fireEvent.click(rootBranch);

  await waitFor(() => expect(rootBranch).toHaveAttribute('data-state', 'closed'));
});