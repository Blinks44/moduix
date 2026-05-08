import type { Meta, StoryObj } from '@storybook/react-vite';
import { CloseLineIcon } from '@/primitives/Icons';
import { CloseButton } from './CloseButton';

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

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};