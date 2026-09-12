import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState, type ComponentProps } from 'react';
import { Toggle, useToggleContext } from '@/components/toggle/Toggle';
import { CheckIcon } from '@/lib/moduix/icons/ui';

function FavoriteToggle(props: ComponentProps<typeof Toggle>) {
  return (
    <Toggle defaultPressed {...props}>
      <StarIcon />
      Favorite
    </Toggle>
  );
}

function ToggleStateLabel() {
  const toggle = useToggleContext();

  return <span>{toggle.pressed ? 'Notifications on' : 'Notifications off'}</span>;
}

function BellIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" focusable="false">
      <path d="M8 1a1 1 0 0 0-1 1v1.14A4 4 0 0 0 4 7v3.98s-.02.28-.15.54C3.72 11.78 3.56 12 3 12v1h10v-1c-.6 0-.75-.22-.87-.47-.13-.25-.13-.52-.13-.53V7a4 4 0 0 0-3-3.86V2a1 1 0 0 0-1-1Zm0 12a1 1 0 1 0 0 2 1 1 0 0 0 0-2Z" />
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
  title: 'Components/Toggle',
  component: Toggle,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  args: {
    children: 'Toggle',
  },
} satisfies Meta<typeof Toggle>;

export default meta;

type Story = StoryObj<typeof meta>;

const rowClass = 'flex items-center gap-2';
const stackClass = 'flex flex-col items-start gap-3';
const hintClass = 'text-muted-foreground text-xs leading-4';
const customButtonClass = 'border-dashed';
const customToggleClass =
  'border-[color-mix(in_oklab,var(--color-primary)_45%,var(--color-border))] bg-[color-mix(in_oklab,var(--color-primary)_8%,transparent)] text-primary [@media(hover:hover)]:hover:bg-[color-mix(in_oklab,var(--color-primary)_14%,transparent)] active:bg-[color-mix(in_oklab,var(--color-primary)_18%,transparent)]';

export const Default: Story = {
  render: (args) => <FavoriteToggle {...args} />,
};

export const Variants: Story = {
  render: () => (
    <div className={rowClass}>
      <Toggle>Default</Toggle>
      <Toggle variant="outline">Outline</Toggle>
      <Toggle variant="ghost">Ghost</Toggle>
      <Toggle defaultPressed>Pressed</Toggle>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className={rowClass}>
      <Toggle size="xs">XS</Toggle>
      <Toggle size="sm">Small</Toggle>
      <Toggle size="md">Medium</Toggle>
      <Toggle size="lg">Large</Toggle>
    </div>
  ),
};

export const Icons: Story = {
  render: () => (
    <div className={rowClass}>
      <Toggle variant="outline">
        <BellIcon />
        Alerts
      </Toggle>
      <Toggle size="icon-md" variant="outline" aria-label="Favorites">
        <StarIcon />
      </Toggle>
      <Toggle size="icon-md" variant="ghost" aria-label="Enabled" defaultPressed>
        <CheckIcon />
      </Toggle>
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div className={rowClass}>
      <Toggle disabled>Disabled</Toggle>
      <Toggle defaultPressed disabled>
        Pressed
      </Toggle>
    </div>
  ),
};

export const ContentResilience: Story = {
  render: () => (
    <div className={stackClass}>
      <Toggle variant="outline">
        <BellIcon />
        Receive account-security and sign-in notifications
      </Toggle>
      <Toggle size="lg" variant="ghost">
        Archive 1,248 completed notifications
      </Toggle>
    </div>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [pressed, setPressed] = useState(false);

    return (
      <div className={stackClass}>
        <Toggle pressed={pressed} onPressedChange={setPressed}>
          <BellIcon />
          {pressed ? 'Notifications on' : 'Notifications off'}
        </Toggle>
        <span className={hintClass}>Current value: {String(pressed)}</span>
      </div>
    );
  },
};

export const Indicator: Story = {
  render: () => (
    <Toggle aria-label="Favorite" size="icon-md" variant="outline">
      <Toggle.Indicator fallback={<StarIcon />}>
        <CheckIcon />
      </Toggle.Indicator>
    </Toggle>
  ),
};

export const Context: Story = {
  render: () => (
    <Toggle defaultPressed>
      <BellIcon />
      <ToggleStateLabel />
    </Toggle>
  ),
};

export const AsChild: Story = {
  name: 'asChild',
  render: () => (
    <Toggle asChild variant="outline" defaultPressed>
      <button type="button" className={customButtonClass}>
        <CheckIcon />
        Custom button
      </button>
    </Toggle>
  ),
};

export const CustomStyles: Story = {
  name: 'Custom Styles',
  args: {
    className: customToggleClass,
    variant: 'outline',
    defaultPressed: true,
    children: (
      <>
        <CheckIcon />
        Styled with className
      </>
    ),
  },
};