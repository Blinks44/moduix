import type { Meta, StoryObj } from '@storybook/react-vite';
import * as React from 'react';
import { ArrowUpRightIcon, StarIcon } from '@/icons/demo';
import { PlusIcon } from '@/icons/ui';
import { Spinner } from '../Spinner';
import { Button } from './Button';

const meta = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  args: {
    children: 'Button',
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Outline: Story = {
  args: {
    variant: 'outline',
    children: 'Outline',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary',
  },
};

export const Destructive: Story = {
  args: {
    variant: 'destructive',
    children: 'Destructive',
  },
};

export const DestructiveOutline: Story = {
  name: 'Destructive Outline',
  args: {
    variant: 'destructive-outline',
    children: 'Destructive Outline',
  },
};

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    children: 'Ghost',
  },
};

export const Link: Story = {
  args: {
    variant: 'link',
    children: 'Link',
  },
};

export const ExtraSmallSize: Story = {
  name: 'Extra-small Size',
  args: {
    size: 'xs',
    children: 'Extra-small',
  },
};

export const SmallSize: Story = {
  name: 'Small Size',
  args: {
    size: 'sm',
    children: 'Small',
  },
};

export const MediumSize: Story = {
  name: 'Medium Size',
  args: {
    size: 'md',
    children: 'Medium',
  },
};

export const LargeSize: Story = {
  name: 'Large Size',
  args: {
    size: 'lg',
    children: 'Large',
  },
};

export const ExtraLargeSize: Story = {
  name: 'Extra-large Size',
  args: {
    size: 'xl',
    children: 'Extra-large',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    children: 'Disabled',
  },
};

export const IconSmallSize: Story = {
  name: 'Icon Small Size',
  args: {
    size: 'icon-sm',
    'aria-label': 'Favorites',
    children: <StarIcon />,
  },
};

export const Icon: Story = {
  name: 'Icon Medium Size',
  args: {
    size: 'icon-md',
    'aria-label': 'Favorites',
    children: <StarIcon />,
  },
};

export const IconLargeSize: Story = {
  name: 'Icon Large Size',
  args: {
    size: 'icon-lg',
    'aria-label': 'Favorites',
    children: <StarIcon />,
  },
};

export const WithIcon: Story = {
  name: 'With Icon',
  args: {
    children: (
      <React.Fragment>
        <PlusIcon />
        Create Item
      </React.Fragment>
    ),
  },
};

export const WithLink: Story = {
  name: 'With Link',
  args: {
    variant: 'link',
    children: (
      <React.Fragment>
        Open Docs
        <ArrowUpRightIcon />
      </React.Fragment>
    ),
  },
};

export const PendingState: Story = {
  name: 'Pending State',
  render: () => {
    const [pending, setPending] = React.useState(false);

    return (
      <Button
        disabled={pending}
        focusableWhenDisabled
        aria-busy={pending || undefined}
        onClick={() => {
          setPending(true);
          setTimeout(() => setPending(false), 1800);
        }}
      >
        {pending ? (
          <>
            <Spinner decorative size="sm" />
            Saving
          </>
        ) : (
          'Save Changes'
        )}
      </Button>
    );
  },
};