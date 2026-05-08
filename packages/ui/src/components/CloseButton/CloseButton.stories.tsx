import type { Meta, StoryObj } from '@storybook/react-vite';
import { CloseLineIcon } from '@/primitives/Icons';
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
    children: <CloseLineIcon />,
  },
};

export const CustomStyles: Story = {
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