import type { Meta, StoryObj } from '@storybook/react-vite';
import { Fragment, useState } from 'react';
import { BellIcon, StarIcon } from '@/icons/demo';
import { CheckIcon } from '@/lib/moduix/icons/ui';
import { ToggleGroup, useToggleGroup } from './ToggleGroup';
import storyStyles from './ToggleGroup.stories.module.css';

const meta = {
  title: 'Components/ToggleGroup',
  component: ToggleGroup,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  args: {
    defaultValue: ['left'],
    'aria-label': 'Text alignment',
    children: (
      <Fragment>
        <ToggleGroup.Item value="left">Left</ToggleGroup.Item>
        <ToggleGroup.Item value="center">Center</ToggleGroup.Item>
        <ToggleGroup.Item value="right">Right</ToggleGroup.Item>
      </Fragment>
    ),
  },
} satisfies Meta<typeof ToggleGroup>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Multiple: Story = {
  render: () => {
    return (
      <ToggleGroup
        multiple
        defaultValue={['bold', 'italic']}
        aria-label="Text formatting"
        size="md"
      >
        <ToggleGroup.Item value="bold" aria-label="Bold">
          <strong>B</strong>
        </ToggleGroup.Item>
        <ToggleGroup.Item value="italic" aria-label="Italic">
          <em>I</em>
        </ToggleGroup.Item>
        <ToggleGroup.Item value="underline" aria-label="Underline">
          <span className={storyStyles.underline}>U</span>
        </ToggleGroup.Item>
      </ToggleGroup>
    );
  },
};

export const Variants: Story = {
  render: () => {
    return (
      <div className={storyStyles.stack}>
        <ToggleGroup defaultValue={['one']} aria-label="Default variant">
          <ToggleGroup.Item value="one">One</ToggleGroup.Item>
          <ToggleGroup.Item value="two">Two</ToggleGroup.Item>
          <ToggleGroup.Item value="three">Three</ToggleGroup.Item>
        </ToggleGroup>
        <ToggleGroup defaultValue={['one']} aria-label="Outline variant" variant="outline">
          <ToggleGroup.Item value="one">One</ToggleGroup.Item>
          <ToggleGroup.Item value="two">Two</ToggleGroup.Item>
          <ToggleGroup.Item value="three">Three</ToggleGroup.Item>
        </ToggleGroup>
        <ToggleGroup defaultValue={['one']} aria-label="Ghost variant" variant="ghost">
          <ToggleGroup.Item value="one">One</ToggleGroup.Item>
          <ToggleGroup.Item value="two">Two</ToggleGroup.Item>
          <ToggleGroup.Item value="three">Three</ToggleGroup.Item>
        </ToggleGroup>
      </div>
    );
  },
};

export const Sizes: Story = {
  render: () => {
    return (
      <div className={storyStyles.stack}>
        <ToggleGroup defaultValue={['xs']} aria-label="Extra small size" size="xs">
          <ToggleGroup.Item value="xs">XS</ToggleGroup.Item>
          <ToggleGroup.Item value="sm">SM</ToggleGroup.Item>
        </ToggleGroup>
        <ToggleGroup defaultValue={['sm']} aria-label="Small size" size="sm">
          <ToggleGroup.Item value="sm">Small</ToggleGroup.Item>
          <ToggleGroup.Item value="md">Medium</ToggleGroup.Item>
        </ToggleGroup>
        <ToggleGroup defaultValue={['md']} aria-label="Medium size" size="md">
          <ToggleGroup.Item value="md">Medium</ToggleGroup.Item>
          <ToggleGroup.Item value="lg">Large</ToggleGroup.Item>
        </ToggleGroup>
        <ToggleGroup defaultValue={['lg']} aria-label="Large size" size="lg">
          <ToggleGroup.Item value="lg">Large</ToggleGroup.Item>
          <ToggleGroup.Item value="xl">Extra</ToggleGroup.Item>
        </ToggleGroup>
      </div>
    );
  },
};

export const WithIcons: Story = {
  render: () => {
    return (
      <ToggleGroup defaultValue={['favorites']} aria-label="Notification channels">
        <ToggleGroup.Item value="favorites">
          <StarIcon />
          Favorites
        </ToggleGroup.Item>
        <ToggleGroup.Item value="alerts">
          <BellIcon />
          Alerts
        </ToggleGroup.Item>
      </ToggleGroup>
    );
  },
};

export const Vertical: Story = {
  render: () => {
    return (
      <ToggleGroup
        defaultValue={['list']}
        orientation="vertical"
        aria-label="View mode"
        variant="outline"
      >
        <ToggleGroup.Item value="list">List</ToggleGroup.Item>
        <ToggleGroup.Item value="grid">Grid</ToggleGroup.Item>
        <ToggleGroup.Item value="map">Map</ToggleGroup.Item>
      </ToggleGroup>
    );
  },
};

export const Disabled: Story = {
  render: () => {
    return (
      <div className={storyStyles.row}>
        <ToggleGroup defaultValue={['one']} aria-label="Disabled group" disabled>
          <ToggleGroup.Item value="one">One</ToggleGroup.Item>
          <ToggleGroup.Item value="two">Two</ToggleGroup.Item>
        </ToggleGroup>
        <ToggleGroup defaultValue={['one']} aria-label="Disabled item">
          <ToggleGroup.Item value="one">One</ToggleGroup.Item>
          <ToggleGroup.Item value="two" disabled>
            Two
          </ToggleGroup.Item>
        </ToggleGroup>
      </div>
    );
  },
};

export const LoopFocus: Story = {
  render: () => {
    return (
      <ToggleGroup defaultValue={['day']} aria-label="Schedule range" loopFocus={false}>
        <ToggleGroup.Item value="day">Day</ToggleGroup.Item>
        <ToggleGroup.Item value="week">Week</ToggleGroup.Item>
        <ToggleGroup.Item value="month">Month</ToggleGroup.Item>
      </ToggleGroup>
    );
  },
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState<string[]>(['favorites']);

    return (
      <div className={storyStyles.stack}>
        <ToggleGroup
          value={value}
          onValueChange={(details) => setValue(details.value)}
          aria-label="Controlled options"
          multiple
        >
          <ToggleGroup.Item value="favorites">
            {value.includes('favorites') ? <CheckIcon /> : <StarIcon />}
            Favorites
          </ToggleGroup.Item>
          <ToggleGroup.Item value="alerts">
            <BellIcon />
            Alerts
          </ToggleGroup.Item>
        </ToggleGroup>
        <span className={storyStyles.hint}>Current value: {value.join(', ') || 'empty'}</span>
      </div>
    );
  },
};

export const RootProvider: Story = {
  name: 'Root Provider',
  render: () => {
    const toggleGroup = useToggleGroup({ defaultValue: ['left'] });

    return (
      <ToggleGroup.RootProvider value={toggleGroup} aria-label="Text alignment">
        <ToggleGroup.Item value="left">Left</ToggleGroup.Item>
        <ToggleGroup.Item value="center">Center</ToggleGroup.Item>
        <ToggleGroup.Item value="right">Right</ToggleGroup.Item>
      </ToggleGroup.RootProvider>
    );
  },
};

export const CustomStyles: Story = {
  render: () => {
    return (
      <ToggleGroup
        defaultValue={['day']}
        aria-label="Schedule density"
        className={storyStyles.customGroup}
      >
        <ToggleGroup.Item value="day" className={storyStyles.customItem}>
          Day
        </ToggleGroup.Item>
        <ToggleGroup.Item value="week" className={storyStyles.customItem}>
          Week
        </ToggleGroup.Item>
        <ToggleGroup.Item value="month" className={storyStyles.customItem}>
          Month
        </ToggleGroup.Item>
      </ToggleGroup>
    );
  },
};