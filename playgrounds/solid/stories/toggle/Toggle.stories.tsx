import type { JSX, ComponentProps } from 'solid-js';
import { createSignal } from 'solid-js';
import type { Meta, StoryObj } from 'storybook-solidjs-vite';
import { Toggle, ToggleIndicator, useToggleContext } from '@/components/toggle/Toggle';
import { CheckIcon } from '@/internal/icons/ui/Icons';
import storyStyles from './Toggle.stories.module.css';

type IconProps = JSX.SvgSVGAttributes<SVGSVGElement>;
const accessibilityProps = { 'aria-hidden': 'true', focusable: 'false' } as const;

function BellIcon(props: IconProps) {
  return (
    <svg fill="currentColor" viewBox="0 0 16 16" {...accessibilityProps} {...props}>
      <path d="M8 1a1 1 0 0 0-1 1v1.14A4 4 0 0 0 4 7v3.98s-.02.28-.15.54C3.72 11.78 3.56 12 3 12v1h10v-1c-.6 0-.75-.22-.87-.47-.13-.25-.13-.52-.13-.53V7a4 4 0 0 0-3-3.86V2a1 1 0 0 0-1-1Zm0 12a1 1 0 1 0 0 2 1 1 0 0 0 0-2Z" />
    </svg>
  );
}

function StarIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...accessibilityProps} {...props}>
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

  return <span>{toggle().pressed ? 'Notifications on' : 'Notifications off'}</span>;
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

export const Default: Story = {
  render: (args) => <FavoriteToggle {...args} />,
};

export const Variants: Story = {
  render: () => {
    return (
      <div class={storyStyles.row}>
        <Toggle>Default</Toggle>
        <Toggle variant="outline">Outline</Toggle>
        <Toggle variant="ghost">Ghost</Toggle>
        <Toggle defaultPressed>Pressed</Toggle>
      </div>
    );
  },
};

export const Sizes: Story = {
  render: () => {
    return (
      <div class={storyStyles.row}>
        <Toggle size="xs">XS</Toggle>
        <Toggle size="sm">Small</Toggle>
        <Toggle size="md">Medium</Toggle>
        <Toggle size="lg">Large</Toggle>
      </div>
    );
  },
};

export const Icons: Story = {
  render: () => {
    return (
      <div class={storyStyles.row}>
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
    );
  },
};

export const Disabled: Story = {
  render: () => {
    return (
      <div class={storyStyles.row}>
        <Toggle disabled>Disabled</Toggle>
        <Toggle defaultPressed disabled>
          Pressed
        </Toggle>
      </div>
    );
  },
};

export const ContentResilience: Story = {
  render: () => {
    return (
      <div class={storyStyles.stack}>
        <Toggle variant="outline">
          <BellIcon />
          Receive account-security and sign-in notifications
        </Toggle>
        <Toggle size="lg" variant="ghost">
          Archive 1,248 completed notifications
        </Toggle>
      </div>
    );
  },
};

export const Controlled: Story = {
  render: () => {
    const [pressed, setPressed] = createSignal(false);

    return (
      <div class={storyStyles.stack}>
        <Toggle pressed={pressed()} onPressedChange={setPressed}>
          <BellIcon />
          {pressed() ? 'Notifications on' : 'Notifications off'}
        </Toggle>
        <span class={storyStyles.hint}>Current value: {String(pressed())}</span>
      </div>
    );
  },
};

export const Indicator: Story = {
  render: () => {
    return (
      <Toggle aria-label="Favorite" size="icon-md" variant="outline">
        <ToggleIndicator fallback={<StarIcon />}>
          <CheckIcon />
        </ToggleIndicator>
      </Toggle>
    );
  },
};

export const Context: Story = {
  render: () => {
    return (
      <Toggle defaultPressed>
        <BellIcon />
        <ToggleStateLabel />
      </Toggle>
    );
  },
};

export const AsChild: Story = {
  name: 'asChild',
  render: () => {
    return (
      <Toggle
        asChild={(props) => {
          const resolvedProps = props();

          return (
            <button
              {...resolvedProps}
              class={(resolvedProps.class ?? '') + ' ' + storyStyles.customButton}
              type="button"
            >
              <CheckIcon />
              Custom button
            </button>
          );
        }}
        variant="outline"
        defaultPressed
      />
    );
  },
};

export const CustomStyles: Story = {
  name: 'Custom Styles',
  args: {
    class: storyStyles.customToggle,
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
