import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { defineComponent } from 'vue';
import { Badge, BadgeDot, BadgeLabel } from '@/components/badge';
import { ChevronRightIcon } from '@/lib/moduix/icons/ui/Icons';
import styles from './Badge.stories.module.css';

const meta = {
  title: 'Components/Badge',
  component: Badge,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Badge>;

export default meta;

type Story = StoryObj<typeof meta>;

const variants = ['default', 'secondary', 'destructive', 'outline', 'ghost', 'link'] as const;
const statuses = [
  { label: 'Online', variant: 'default' },
  { label: 'Draft', variant: 'secondary' },
  { label: 'Failed', variant: 'destructive' },
] as const;
const iconBadges = [
  { label: 'Release', variant: 'default' },
  { label: 'Details', variant: 'secondary' },
  { label: 'Read more', variant: 'outline' },
] as const;
const badgeComponents = { Badge, BadgeDot, BadgeLabel, ChevronRightIcon };

function renderStory(template: string) {
  return () =>
    defineComponent({
      components: badgeComponents,
      setup() {
        return { iconBadges, statuses, styles, variants };
      },
      template,
    });
}

export const Basic: Story = {
  render: renderStory('<Badge>New</Badge>'),
};

export const Variants: Story = {
  render: renderStory(`
    <div :class="styles.row">
      <Badge v-for="variant in variants" :key="variant" :variant="variant">{{ variant }}</Badge>
    </div>
  `),
};

export const WithDot: Story = {
  render: renderStory(`
    <div :class="styles.row">
      <Badge v-for="status in statuses" :key="status.label" :variant="status.variant">
        <BadgeDot />
        <BadgeLabel>{{ status.label }}</BadgeLabel>
      </Badge>
    </div>
  `),
};

export const WithIcon: Story = {
  render: renderStory(`
    <div :class="styles.row">
      <Badge v-for="item in iconBadges" :key="item.label" :variant="item.variant">
        <BadgeLabel>{{ item.label }}</BadgeLabel>
        <ChevronRightIcon />
      </Badge>
      <Badge variant="link" as-child>
        <a href="#badge-link-story">
          <BadgeLabel>Styling guide</BadgeLabel>
          <ChevronRightIcon />
        </a>
      </Badge>
    </div>
  `),
};

export const Link: Story = {
  render: renderStory(`
    <Badge variant="link" as-child>
      <a href="#badge-link-story">Open badge composition guidance</a>
    </Badge>
  `),
};

export const DisabledButton: Story = {
  render: renderStory(`
    <Badge variant="secondary" as-child>
      <button :class="styles.disabledButton" disabled>Archived</button>
    </Badge>
  `),
};

export const TruncatedLabel: Story = {
  render: renderStory(`
    <Badge :class="styles.constrained" title="Ready for stakeholder review after legal approval">
      <BadgeLabel>Ready for stakeholder review after legal approval</BadgeLabel>
    </Badge>
  `),
};

export const CustomStyling: Story = {
  render: renderStory(`
    <div :class="styles.row">
      <Badge :class="styles.customBadge">
        <BadgeDot />
        <BadgeLabel>Priority</BadgeLabel>
      </Badge>
      <Badge :class="styles.small">Small</Badge>
      <Badge>Default</Badge>
      <Badge :class="styles.large">Large</Badge>
    </div>
  `),
};