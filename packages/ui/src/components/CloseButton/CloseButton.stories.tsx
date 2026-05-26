import type { Meta, StoryObj } from '@storybook/react-vite';
import { CloseIcon } from '@/icons/ui';
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

export const CustomIcon: Story = {
  args: {
    children: <CloseIcon />,
  },
};

export const CustomComposition: Story = {
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