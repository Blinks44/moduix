import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ComponentProps } from 'react';
import { CloseButton } from './CloseButton';
import styles from './CloseButton.stories.module.css';

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
    className: styles.customChildrenButton,
    'aria-label': 'Close panel',
    children: <CircleXIcon />,
  },
};

export const AsChild: Story = {
  render: (args) => (
    <CloseButton asChild {...args}>
      <button>
        <CircleXIcon />
      </button>
    </CloseButton>
  ),
};

export const Styled: Story = {
  args: {
    className: styles.customButton,
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

function CircleXIcon(props: ComponentProps<'svg'>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      focusable="false"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <circle cx="12" cy="12" r="10" />
      <path d="m15 9-6 6" />
      <path d="m9 9 6 6" />
    </svg>
  );
}