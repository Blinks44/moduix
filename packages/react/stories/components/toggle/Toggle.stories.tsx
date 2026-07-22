import type { Meta, StoryObj } from '@storybook/react';
import { useState, type ComponentProps } from 'react';
import { CheckIcon } from '@/lib/moduix/icons/ui';
import { Toggle, useToggleContext } from '../../../src/components/toggle/Toggle';
import { BellIcon, StarIcon } from '../../icons/demo';
import storyStyles from './Toggle.stories.module.css';

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

export const Indicator: Story = {
  render: () => {
    return (
      <Toggle aria-label="Favorite" size="icon-md" variant="outline">
        <Toggle.Indicator fallback={<StarIcon />}>
          <CheckIcon />
        </Toggle.Indicator>
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
      <Toggle asChild variant="outline" defaultPressed>
        <button type="button" className={storyStyles.customButton}>
          <CheckIcon />
          Custom button
        </button>
      </Toggle>
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