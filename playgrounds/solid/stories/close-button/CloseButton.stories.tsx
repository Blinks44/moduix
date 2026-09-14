import type { Meta, StoryObj } from 'storybook-solidjs-vite';
import { CloseButton } from '@/components/close-button/CloseButton';
import styles from './CloseButton.stories.module.css';

const decorativeSvgProps: Record<string, string> = {
  'aria-hidden': 'true',
  focusable: 'false',
};

const meta = {
  title: 'Components/CloseButton',
  component: CloseButton,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  args: {
    'aria-label': 'Close',
  },
} satisfies Meta<typeof CloseButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const CustomChildren: Story = {
  args: {
    class: styles.customChildrenButton,
    'aria-label': 'Close panel',
    children: <CircleXIcon />,
  },
};

export const AsChild: Story = {
  render: (args) => (
    <CloseButton
      {...args}
      asChild={(props) => (
        <button {...props()} type="button">
          <CircleXIcon />
        </button>
      )}
    />
  ),
};

export const Styled: Story = {
  args: {
    class: styles.customButton,
    'aria-label': 'Close message',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const AriaDisabled: Story = {
  args: {
    'aria-disabled': 'true',
  },
};

export const DisabledAsChild: Story = {
  render: (args) => (
    <CloseButton
      {...args}
      disabled
      asChild={(props) => (
        <button {...props()} type="button">
          <CircleXIcon />
        </button>
      )}
    />
  ),
};

function CircleXIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="3"
      stroke-linecap="round"
      stroke-linejoin="round"
      {...decorativeSvgProps}
    >
      <circle cx="12" cy="12" r="10" />
      <path d="m15 9-6 6" />
      <path d="m9 9 6 6" />
    </svg>
  );
}