import type { Meta, StoryObj } from '@storybook/react-vite';
import { Fragment, useState } from 'react';
import { BellIcon, StarIcon } from '@/icons/demo';
import { CheckIcon } from '@/lib/moduix/icons/ui';
import { ToggleGroup, ToggleGroupItem } from './ToggleGroup';
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
        <ToggleGroupItem value="left">Left</ToggleGroupItem>
        <ToggleGroupItem value="center">Center</ToggleGroupItem>
        <ToggleGroupItem value="right">Right</ToggleGroupItem>
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
        size="icon-md"
      >
        <ToggleGroupItem value="bold" aria-label="Bold">
          <strong>B</strong>
        </ToggleGroupItem>
        <ToggleGroupItem value="italic" aria-label="Italic">
          <em>I</em>
        </ToggleGroupItem>
        <ToggleGroupItem value="underline" aria-label="Underline">
          <span className={storyStyles.underline}>U</span>
        </ToggleGroupItem>
      </ToggleGroup>
    );
  },
};

export const Variants: Story = {
  render: () => {
    return (
      <div className={storyStyles.stack}>
        <ToggleGroup defaultValue={['one']} aria-label="Default variant">
          <ToggleGroupItem value="one">One</ToggleGroupItem>
          <ToggleGroupItem value="two">Two</ToggleGroupItem>
          <ToggleGroupItem value="three">Three</ToggleGroupItem>
        </ToggleGroup>
        <ToggleGroup defaultValue={['one']} aria-label="Outline variant" variant="outline">
          <ToggleGroupItem value="one">One</ToggleGroupItem>
          <ToggleGroupItem value="two">Two</ToggleGroupItem>
          <ToggleGroupItem value="three">Three</ToggleGroupItem>
        </ToggleGroup>
        <ToggleGroup defaultValue={['one']} aria-label="Ghost variant" variant="ghost">
          <ToggleGroupItem value="one">One</ToggleGroupItem>
          <ToggleGroupItem value="two">Two</ToggleGroupItem>
          <ToggleGroupItem value="three">Three</ToggleGroupItem>
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
          <ToggleGroupItem value="xs">XS</ToggleGroupItem>
          <ToggleGroupItem value="sm">SM</ToggleGroupItem>
        </ToggleGroup>
        <ToggleGroup defaultValue={['sm']} aria-label="Small size" size="sm">
          <ToggleGroupItem value="sm">Small</ToggleGroupItem>
          <ToggleGroupItem value="md">Medium</ToggleGroupItem>
        </ToggleGroup>
        <ToggleGroup defaultValue={['md']} aria-label="Medium size" size="md">
          <ToggleGroupItem value="md">Medium</ToggleGroupItem>
          <ToggleGroupItem value="lg">Large</ToggleGroupItem>
        </ToggleGroup>
        <ToggleGroup defaultValue={['lg']} aria-label="Large size" size="lg">
          <ToggleGroupItem value="lg">Large</ToggleGroupItem>
          <ToggleGroupItem value="xl">Extra</ToggleGroupItem>
        </ToggleGroup>
      </div>
    );
  },
};

export const WithIcons: Story = {
  render: () => {
    return (
      <ToggleGroup defaultValue={['favorites']} aria-label="Notification channels">
        <ToggleGroupItem value="favorites">
          <StarIcon />
          Favorites
        </ToggleGroupItem>
        <ToggleGroupItem value="alerts">
          <BellIcon />
          Alerts
        </ToggleGroupItem>
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
        <ToggleGroupItem value="list">List</ToggleGroupItem>
        <ToggleGroupItem value="grid">Grid</ToggleGroupItem>
        <ToggleGroupItem value="map">Map</ToggleGroupItem>
      </ToggleGroup>
    );
  },
};

export const Disabled: Story = {
  render: () => {
    return (
      <div className={storyStyles.row}>
        <ToggleGroup defaultValue={['one']} aria-label="Disabled group" disabled>
          <ToggleGroupItem value="one">One</ToggleGroupItem>
          <ToggleGroupItem value="two">Two</ToggleGroupItem>
        </ToggleGroup>
        <ToggleGroup defaultValue={['one']} aria-label="Disabled item">
          <ToggleGroupItem value="one">One</ToggleGroupItem>
          <ToggleGroupItem value="two" disabled>
            Two
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
    );
  },
};

export const LoopFocus: Story = {
  render: () => {
    return (
      <ToggleGroup defaultValue={['day']} aria-label="Schedule range" loopFocus={false}>
        <ToggleGroupItem value="day">Day</ToggleGroupItem>
        <ToggleGroupItem value="week">Week</ToggleGroupItem>
        <ToggleGroupItem value="month">Month</ToggleGroupItem>
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
          onValueChange={setValue}
          aria-label="Controlled options"
          multiple
        >
          <ToggleGroupItem value="favorites">
            {value.includes('favorites') ? <CheckIcon /> : <StarIcon />}
            Favorites
          </ToggleGroupItem>
          <ToggleGroupItem value="alerts">
            <BellIcon />
            Alerts
          </ToggleGroupItem>
        </ToggleGroup>
        <span className={storyStyles.hint}>Current value: {value.join(', ') || 'empty'}</span>
      </div>
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
        <ToggleGroupItem value="day" className={storyStyles.customItem}>
          Day
        </ToggleGroupItem>
        <ToggleGroupItem value="week" className={storyStyles.customItem}>
          Week
        </ToggleGroupItem>
        <ToggleGroupItem value="month" className={storyStyles.customItem}>
          Month
        </ToggleGroupItem>
      </ToggleGroup>
    );
  },
};