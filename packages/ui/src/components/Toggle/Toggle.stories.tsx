import type { Meta, StoryObj } from '@storybook/react-vite';
import * as React from 'react';
import { BellIcon, CheckSmallIcon, StarIcon } from '@/primitives/Icons';
import { Toggle } from './Toggle';
import storyStyles from './Toggle.stories.module.css';

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

export const Default: Story = {};

export const Pressed: Story = {
  args: {
    defaultPressed: true,
    children: 'Pressed',
  },
};

export const Outline: Story = {
  args: {
    variant: 'outline',
    children: 'Outline',
  },
};

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    children: 'Ghost',
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

export const Icon: Story = {
  args: {
    size: 'icon-md',
    'aria-label': 'Favorites',
    children: <StarIcon />,
  },
};

export const WithIcon: Story = {
  args: {
    variant: 'outline',
    defaultPressed: true,
    children: (
      <React.Fragment>
        <CheckSmallIcon />
        Enabled
      </React.Fragment>
    ),
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
    const [pressed, setPressed] = React.useState(false);

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
        render={(buttonProps, state) => (
          <button type="button" {...buttonProps}>
            {state.pressed ? <CheckSmallIcon /> : <StarIcon />}
          </button>
        )}
      />
    );
  },
};

export const CustomComposition: Story = {
  name: 'Custom Composition',
  args: {
    className: storyStyles.customToggle,
    variant: 'outline',
    defaultPressed: true,
    children: (
      <React.Fragment>
        <CheckSmallIcon />
        Styled with className
      </React.Fragment>
    ),
  },
};