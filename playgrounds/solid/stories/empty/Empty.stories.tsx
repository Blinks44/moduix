import type { JSX } from 'solid-js';
import type { Meta, StoryObj } from 'storybook-solidjs-vite';
import { Button } from '@/components/button/Button';
import { Empty } from '@/components/empty/Empty';
import styles from './Empty.stories.module.css';

type IconProps = JSX.SvgSVGAttributes<SVGSVGElement>;
const accessibilityProps = { 'aria-hidden': 'true', focusable: 'false' } as const;

function ComputerIcon(props: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      {...accessibilityProps}
      {...props}
    >
      <path d="M12 17v4" />
      <path d="M8 21h8" />
      <path d="m9 17 6.1-6.1a2 2 0 0 1 2.81.01L22 15" />
      <circle cx="8" cy="9" r="2" />
      <rect x="2" y="3" width="20" height="14" rx="2" />
    </svg>
  );
}

function MapIcon(props: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      {...accessibilityProps}
      {...props}
    >
      <path d="M18 8c0 3.613-3.869 7.429-5.393 8.795a1 1 0 0 1-1.214 0C9.87 15.429 6 11.613 6 8a6 6 0 0 1 12 0" />
      <circle cx="12" cy="8" r="2" />
      <path d="M8.714 14h-3.71a1 1 0 0 0-.948.683l-2.004 6A1 1 0 0 0 3 22h18a1 1 0 0 0 .948-1.316l-2-6a1 1 0 0 0-.949-.684h-3.712" />
    </svg>
  );
}

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
    <Empty class={styles.empty}>
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
    <Empty class={styles.empty}>
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
    <Empty class={styles.empty}>
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
    <Empty class={styles.customEmpty}>
      <Empty.Icon class={styles.customIcon}>
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