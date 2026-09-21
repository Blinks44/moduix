import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '@/components/button';
import {
  Empty,
  EmptyActions,
  EmptyContent,
  EmptyDescription,
  EmptyIcon,
  EmptyTitle,
} from '@/components/empty/Empty';
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
      <EmptyIcon>
        <FolderIcon />
      </EmptyIcon>
      <EmptyContent>
        <EmptyTitle>No deployments yet</EmptyTitle>
        <EmptyDescription>
          Connect a repository to start tracking release status and deployment history.
        </EmptyDescription>
      </EmptyContent>
      <EmptyActions>
        <Button>Connect repository</Button>
        <Button variant="outline">Read setup guide</Button>
      </EmptyActions>
    </Empty>
  ),
};

export const WithoutActions: Story = {
  render: () => (
    <Empty className={emptyClassName}>
      <EmptyIcon>
        <FileIcon />
      </EmptyIcon>
      <EmptyContent>
        <EmptyTitle>No saved places</EmptyTitle>
        <EmptyDescription>
          Save frequently used destinations to keep them close to your workspace.
        </EmptyDescription>
      </EmptyContent>
    </Empty>
  ),
};

export const WithoutIcon: Story = {
  render: () => (
    <Empty className={emptyClassName}>
      <EmptyContent>
        <EmptyTitle>No results found</EmptyTitle>
        <EmptyDescription>
          Try changing the search query or clearing one of the active filters.
        </EmptyDescription>
      </EmptyContent>
      <EmptyActions>
        <Button variant="outline">Clear filters</Button>
      </EmptyActions>
    </Empty>
  ),
};

export const CustomStyles: Story = {
  render: () => (
    <Empty className={customEmptyClassName}>
      <EmptyIcon className={customIconClassName}>
        <FolderIcon />
      </EmptyIcon>
      <EmptyContent>
        <EmptyTitle>Invite your team</EmptyTitle>
        <EmptyDescription>
          Shared projects, comments, and approvals appear here after the first teammate joins.
        </EmptyDescription>
      </EmptyContent>
      <EmptyActions>
        <Button>Send invite</Button>
      </EmptyActions>
    </Empty>
  ),
};
