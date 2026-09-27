import { Computer as ComputerIcon, Map as MapIcon } from '@lucide/vue';
import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { defineComponent } from 'vue';
import { Button } from '@/components/button';
import {
  Empty,
  EmptyActions,
  EmptyContent,
  EmptyDescription,
  EmptyIcon,
  EmptyTitle,
} from '@/components/empty';
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

const storyComponents = {
  Button,
  ComputerIcon,
  Empty,
  EmptyActions,
  EmptyContent,
  EmptyDescription,
  EmptyIcon,
  EmptyTitle,
  MapIcon,
};

function renderStory(template: string) {
  return () =>
    defineComponent({
      components: storyComponents,
      setup() {
        return { styles };
      },
      template,
    });
}

export const Basic: Story = {
  render: renderStory(`
    <Empty :class="styles.empty">
      <EmptyIcon><ComputerIcon /></EmptyIcon>
      <EmptyContent>
        <EmptyTitle>No deployments yet</EmptyTitle>
        <EmptyDescription>Connect a repository to start tracking release status and deployment history.</EmptyDescription>
      </EmptyContent>
      <EmptyActions>
        <Button>Connect repository</Button>
        <Button variant="outline">Read setup guide</Button>
      </EmptyActions>
    </Empty>
  `),
};

export const WithoutActions: Story = {
  render: renderStory(`
    <Empty :class="styles.empty">
      <EmptyIcon><MapIcon /></EmptyIcon>
      <EmptyContent>
        <EmptyTitle>No saved places</EmptyTitle>
        <EmptyDescription>Save frequently used destinations to keep them close to your workspace.</EmptyDescription>
      </EmptyContent>
    </Empty>
  `),
};

export const WithoutIcon: Story = {
  render: renderStory(`
    <Empty :class="styles.empty">
      <EmptyContent>
        <EmptyTitle>No results found</EmptyTitle>
        <EmptyDescription>Try changing the search query or clearing one of the active filters.</EmptyDescription>
      </EmptyContent>
      <EmptyActions>
        <Button variant="outline">Clear filters</Button>
      </EmptyActions>
    </Empty>
  `),
};

export const CustomStyles: Story = {
  render: renderStory(`
    <Empty :class="styles.customEmpty">
      <EmptyIcon :class="styles.customIcon"><ComputerIcon /></EmptyIcon>
      <EmptyContent>
        <EmptyTitle>Invite your team</EmptyTitle>
        <EmptyDescription>Shared projects, comments, and approvals appear here after the first teammate joins.</EmptyDescription>
      </EmptyContent>
      <EmptyActions><Button>Send invite</Button></EmptyActions>
    </Empty>
  `),
};