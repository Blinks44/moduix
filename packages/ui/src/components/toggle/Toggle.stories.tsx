import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState, type ComponentProps } from 'react';
import { BellIcon, StarIcon } from '@/icons/demo';
import { CheckIcon } from '@/lib/moduix/icons/ui';
import { Toggle } from './Toggle';
import storyStyles from './Toggle.stories.module.css';

function FavoriteToggle(props: ComponentProps<typeof Toggle>) {
  return (
    <Toggle defaultPressed {...props}>
      <StarIcon />
      Favorite
    </Toggle>
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

export const Default: Story = {
  render: (args) => <FavoriteToggle {...args} />,
};

export const Variants: Story = {
  render: () => {
    return (
      <div className={storyStyles.row}>
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
      <div className={storyStyles.row}>
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
      <div className={storyStyles.row}>
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
      <div className={storyStyles.row}>
        <Toggle disabled>Disabled</Toggle>
        <Toggle defaultPressed disabled>
          Pressed
        </Toggle>
      </div>
    );
  },
};

export const Controlled: Story = {
  render: () => {
    const [pressed, setPressed] = useState(false);

    return (
      <div className={storyStyles.stack}>
        <Toggle pressed={pressed} onPressedChange={setPressed}>
          <BellIcon />
          {pressed ? 'Notifications on' : 'Notifications off'}
        </Toggle>
        <span className={storyStyles.hint}>Current value: {String(pressed)}</span>
      </div>
    );
  },
};

export const RenderCallback: Story = {
  name: 'Render Callback',
  render: () => {
    return (
      <Toggle
        aria-label="Favorites"
        size="icon-md"
        variant="outline"
        render={(buttonProps, state) => (
          <button type="button" {...buttonProps}>
            {state.pressed ? <CheckIcon /> : <StarIcon />}
          </button>
        )}
      />
    );
  },
};

export const CustomStyles: Story = {
  name: 'Custom Styles',
  args: {
    className: storyStyles.customToggle,
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