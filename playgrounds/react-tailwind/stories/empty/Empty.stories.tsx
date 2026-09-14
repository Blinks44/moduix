import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '@/components/button';
import { Empty } from '@/components/empty/Empty';
import { FileIcon, FolderIcon } from '@/lib/moduix/icons/ui';

const meta = {
  title: 'Components/Empty',
  component: Empty,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Empty>;

export default meta;

type Story = StoryObj<typeof meta>;

const emptyClassName = 'w-[min(28rem,calc(100vw-2rem))]';
const customEmptyClassName =
  'w-[min(28rem,calc(100vw-2rem))] rounded-lg border-primary/30 bg-primary/10 shadow-md';
const customIconClassName = 'rounded-lg bg-primary/15 text-primary [&_svg]:size-7';

export const Basic: Story = {
  render: () => (
    <Empty className={emptyClassName}>
      <Empty.Icon>
        <FolderIcon />
      </Empty.Icon>
      <Empty.Content>
        <Empty.Title>No deployments yet</Empty.Title>
        <Empty.Description>
          Connect a repository to start tracking release status and deployment history.
        </Empty.Description>
      </Empty.Content>
      <Empty.Actions>
        <Button>Connect repository</Button>
        <Button variant="outline">Read setup guide</Button>
      </Empty.Actions>
    </Empty>
  ),
};

export const WithoutActions: Story = {
  render: () => (
    <Empty className={emptyClassName}>
      <Empty.Icon>
        <FileIcon />
      </Empty.Icon>
      <Empty.Content>
        <Empty.Title>No saved places</Empty.Title>
        <Empty.Description>
          Save frequently used destinations to keep them close to your workspace.
        </Empty.Description>
      </Empty.Content>
    </Empty>
  ),
};

export const WithoutIcon: Story = {
  render: () => (
    <Empty className={emptyClassName}>
      <Empty.Content>
        <Empty.Title>No results found</Empty.Title>
        <Empty.Description>
          Try changing the search query or clearing one of the active filters.
        </Empty.Description>
      </Empty.Content>
      <Empty.Actions>
        <Button variant="outline">Clear filters</Button>
      </Empty.Actions>
    </Empty>
  ),
};

export const CustomStyles: Story = {
  render: () => (
    <Empty className={customEmptyClassName}>
      <Empty.Icon className={customIconClassName}>
        <FolderIcon />
      </Empty.Icon>
      <Empty.Content>
        <Empty.Title>Invite your team</Empty.Title>
        <Empty.Description>
          Shared projects, comments, and approvals appear here after the first teammate joins.
        </Empty.Description>
      </Empty.Content>
      <Empty.Actions>
        <Button>Send invite</Button>
      </Empty.Actions>
    </Empty>
  ),
};