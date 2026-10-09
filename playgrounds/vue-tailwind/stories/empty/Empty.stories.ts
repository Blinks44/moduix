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

const emptyClass = 'w-[min(28rem,calc(100vw-2rem))]';
const customEmptyClass =
  'w-[min(28rem,calc(100vw-2rem))] rounded-lg border-primary/30 bg-primary/10 shadow-md';
const customIconClass = 'rounded-lg bg-primary/15 text-primary [&_svg]:size-7';
const storyComponents = {
  Button,
  Empty,
  EmptyActions,
  EmptyContent,
  EmptyDescription,
  EmptyIcon,
  EmptyTitle,
  FileIcon,
  FolderIcon,
};

function renderStory(template: string) {
  return () =>
    defineComponent({
      components: storyComponents,
      setup() {
        return { customEmptyClass, customIconClass, emptyClass };
      },
      template,
    });
}

export const Basic: Story = {
  render: renderStory(`
    <Empty :class="emptyClass">
      <EmptyIcon><FolderIcon /></EmptyIcon>
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
    <Empty :class="emptyClass">
      <EmptyIcon><FileIcon /></EmptyIcon>
      <EmptyContent>
        <EmptyTitle>No saved places</EmptyTitle>
        <EmptyDescription>Save frequently used destinations to keep them close to your workspace.</EmptyDescription>
      </EmptyContent>
    </Empty>
  `),
};

export const WithoutIcon: Story = {
  render: renderStory(`
    <Empty :class="emptyClass">
      <EmptyContent>
        <EmptyTitle>No results found</EmptyTitle>
        <EmptyDescription>Try changing the search query or clearing one of the active filters.</EmptyDescription>
      </EmptyContent>
      <EmptyActions><Button variant="outline">Clear filters</Button></EmptyActions>
    </Empty>
  `),
};

export const CustomStyles: Story = {
  render: renderStory(`
    <Empty :class="customEmptyClass">
      <EmptyIcon :class="customIconClass"><FolderIcon /></EmptyIcon>
      <EmptyContent>
        <EmptyTitle>Invite your team</EmptyTitle>
        <EmptyDescription>Shared projects, comments, and approvals appear here after the first teammate joins.</EmptyDescription>
      </EmptyContent>
      <EmptyActions><Button>Send invite</Button></EmptyActions>
    </Empty>
  `),
};