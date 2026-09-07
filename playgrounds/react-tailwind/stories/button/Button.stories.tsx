import type { Meta, StoryObj } from '@storybook/react-vite';
import { useRef, useState } from 'react';
import { Button } from '@/components/button/Button';
import { Spinner } from '@/components/spinner';
import { PlusIcon } from '@/lib/moduix/icons/ui';

function ArrowUpRightIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
      <path
        d="M7 17 17 7M9 7h8v8"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
      <path
        d="M12 3.75 14.7 9.22l5.93.86-4.29 4.18 1.01 5.9L12 17.32l-5.35 2.84 1.02-5.9-4.3-4.18 5.94-.86L12 3.75Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

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

const rowClassName = 'flex flex-wrap items-center justify-center gap-3';
const contentStressClassName = 'grid w-[min(18rem,calc(100vw_-_2rem))] gap-3';
const wrappingButtonClassName = 'whitespace-normal';

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
    <div className={rowClassName}>
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
    <div className={rowClassName}>
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
    <div className={rowClassName}>
      <Button disabled>Disabled</Button>
      <Button asChild disabled variant="outline">
        <a href="#button">Disabled link</a>
      </Button>
    </div>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <div className={rowClassName}>
      <Button>
        <PlusIcon />
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
        <ArrowUpRightIcon />
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
      <div className={rowClassName}>
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

export const ContentStress: Story = {
  render: () => (
    <div className={contentStressClassName}>
      <Button className={wrappingButtonClassName}>
        Approve the updated account recovery settings
      </Button>
      <Button className={wrappingButtonClassName} dir="rtl" variant="outline">
        اعتماد إعدادات استرداد الحساب المحدّثة
      </Button>
    </div>
  ),
};