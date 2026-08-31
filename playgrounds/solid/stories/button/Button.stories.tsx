import { createSignal } from 'solid-js';
import type { Meta, StoryObj } from 'storybook-solidjs-vite';
import { Button } from '@/components/button/Button';
import { Spinner } from '@/components/spinner/Spinner';
import styles from './Button.stories.module.css';

const decorativeSvgProps: Record<string, string> = {
  'aria-hidden': 'true',
  focusable: 'false',
};

function PlusIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="3"
      stroke-linecap="round"
      stroke-linejoin="round"
      {...decorativeSvgProps}
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  );
}

function ArrowUpRightIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...decorativeSvgProps}>
      <path
        d="M7 17 17 7M9 7h8v8"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...decorativeSvgProps}>
      <path
        d="M12 3.75 14.7 9.22l5.93.86-4.29 4.18 1.01 5.9L12 17.32l-5.35 2.84 1.02-5.9-4.3-4.18 5.94-.86L12 3.75Z"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}

const meta = {
  title: 'Components/Button',
  component: Button,
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
    <div class={styles.row}>
      {variants.map((variant) => (
        <Button variant={variant}>{variant}</Button>
      ))}
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div class={styles.row}>
      {sizes.map((size) => (
        <Button size={size}>{size}</Button>
      ))}
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div class={styles.row}>
      <Button disabled>Disabled</Button>
      <Button
        disabled
        variant="outline"
        asChild={(props) => (
          <a {...props()} href="#button">
            Disabled link
          </a>
        )}
      />
    </div>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <div class={styles.row}>
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
    <Button
      variant="outline"
      asChild={(props) => (
        <a {...props()} href="#button">
          Open Button Docs
        </a>
      )}
    />
  ),
};

export const ForwardedRef: Story = {
  render: () => {
    let buttonRef!: HTMLButtonElement;

    return (
      <div class={styles.row}>
        <Button ref={(element) => (buttonRef = element)}>Focus target</Button>
        <Button variant="outline" onClick={() => buttonRef.focus()}>
          Focus first button
        </Button>
      </div>
    );
  },
};

export const PendingState: Story = {
  render: () => {
    const [pending, setPending] = createSignal(false);

    return (
      <Button
        loading={pending()}
        onClick={() => {
          setPending(true);
          setTimeout(() => setPending(false), 1800);
        }}
      >
        {pending() ? (
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
    <div class={styles.contentStress}>
      <Button class={styles.wrappingButton}>Approve the updated account recovery settings</Button>
      <Button class={styles.wrappingButton} dir="rtl" variant="outline">
        اعتماد إعدادات استرداد الحساب المحدّثة
      </Button>
    </div>
  ),
};