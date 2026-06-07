import type { Meta, StoryObj } from '@storybook/react-vite';
import { ComputerIcon, MapIcon } from '@/icons/demo';
import { Button } from '../button';
import {
  Empty,
  EmptyActions,
  EmptyContent,
  EmptyDescription,
  EmptyIcon,
  EmptyTitle,
} from './Empty';
import styles from './Empty.stories.module.css';

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

export const Basic: Story = {
  render: () => (
    <Empty className={styles.empty}>
      <EmptyIcon>
        <ComputerIcon />
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
    <Empty className={styles.empty}>
      <EmptyIcon>
        <MapIcon />
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
    <Empty className={styles.empty}>
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
    <Empty className={styles.customEmpty}>
      <EmptyIcon className={styles.customIcon}>
        <ComputerIcon />
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