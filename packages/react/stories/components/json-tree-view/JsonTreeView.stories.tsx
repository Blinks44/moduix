import type { Meta, StoryObj } from '@storybook/react';
import { JsonTreeView } from '@/components/json-tree-view/JsonTreeView';

const release = {
  build: {
    branch: 'main',
    commit: '0f4c9d7',
    status: 'ready',
  },
  package: {
    dependencies: ['@ark-ui/react', '@moduix/react'],
    name: '@moduix/react',
    version: '2.3.0',
  },
};

const meta = {
  title: 'Components/JsonTreeView',
  component: JsonTreeView.Root,
  args: {
    data: release,
    defaultExpandedDepth: 2,
  },
  render: (args) => (
    <JsonTreeView {...args}>
      <JsonTreeView.Tree />
    </JsonTreeView>
  ),
} satisfies Meta<typeof JsonTreeView.Root>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {};

export const CompactPreviews: Story = {
  args: {
    collapseStringsAfterLength: 28,
    data: {
      environment: 'production',
      releaseNotes:
        'This release makes long JSON values easier to inspect without expanding every property first.',
      reviewers: ['Avery', 'Jordan', 'Morgan', 'Sam', 'Taylor'],
    },
    defaultExpandedDepth: 1,
    maxPreviewItems: 3,
  },
};