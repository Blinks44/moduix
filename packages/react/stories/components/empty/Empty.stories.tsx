import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../../../src/components/button';
import { Empty } from '../../../src/components/empty/Empty';
import { ComputerIcon, MapIcon } from '../../icons/demo';
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
      <Empty.Icon>
        <ComputerIcon />
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
    <Empty className={styles.empty}>
      <Empty.Icon>
        <MapIcon />
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
    <Empty className={styles.empty}>
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
    <Empty className={styles.customEmpty}>
      <Empty.Icon className={styles.customIcon}>
        <ComputerIcon />
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