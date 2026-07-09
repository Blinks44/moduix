import type { Meta, StoryObj } from '@storybook/react-vite';
import { useRef, useState } from 'react';
import { ArrowUpRightIcon, StarIcon } from '@/icons/demo';
import { PlusIcon } from '@/lib/moduix/icons/ui';
import { Spinner } from '../spinner';
import { Button } from './Button';
import styles from './Button.stories.module.css';

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

const variants = [
  'default',
  'outline',
  'secondary',
  'destructive',
  'destructive-outline',
  'ghost',
  'link',
] as const;

const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;

export const Basic: Story = {};

export const Variants: Story = {
  render: () => (
    <div className={styles.row}>
      {variants.map((variant) => (
        <Button key={variant} variant={variant}>
          {variant}
        </Button>
      ))}
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className={styles.row}>
      {sizes.map((size) => (
        <Button key={size} size={size}>
          {size}
        </Button>
      ))}
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div className={styles.row}>
      <Button disabled>Disabled</Button>
      <Button asChild aria-disabled="true" variant="outline">
        <a href="#button" onClick={(event) => event.preventDefault()}>
          Disabled link
        </a>
      </Button>
    </div>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <div className={styles.row}>
      <Button>
        <PlusIcon data-icon="inline-start" />
        Create Item
      </Button>
      <Button size="icon-sm" variant="outline" aria-label="Small favorite">
        <StarIcon />
      </Button>
      <Button size="icon-md" variant="outline" aria-label="Favorite">
        <StarIcon />
      </Button>
      <Button size="icon-lg" variant="outline" aria-label="Large favorite">
        <StarIcon />
      </Button>
      <Button variant="link">
        Open Docs
        <ArrowUpRightIcon data-icon="inline-end" />
      </Button>
    </div>
  ),
};

export const AsChildLink: Story = {
  render: () => (
    <Button asChild variant="outline">
      <a href="#button">Open Button Docs</a>
    </Button>
  ),
};

export const ForwardedRef: Story = {
  render: () => {
    const buttonRef = useRef<HTMLButtonElement>(null);

    return (
      <div className={styles.row}>
        <Button ref={buttonRef}>Focus target</Button>
        <Button variant="outline" onClick={() => buttonRef.current?.focus()}>
          Focus first button
        </Button>
      </div>
    );
  },
};

export const PendingState: Story = {
  render: () => {
    const [pending, setPending] = useState(false);

    return (
      <Button
        loading={pending}
        onClick={() => {
          setPending(true);
          setTimeout(() => setPending(false), 1800);
        }}
      >
        {pending ? (
          <>
            <Spinner decorative size="sm" data-icon="inline-start" />
            Saving
          </>
        ) : (
          'Save Changes'
        )}
      </Button>
    );
  },
};