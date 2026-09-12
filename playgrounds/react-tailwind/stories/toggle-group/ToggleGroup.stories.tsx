import type { Meta, StoryObj } from '@storybook/react-vite';
import { Fragment, useState } from 'react';
import {
  ToggleGroup,
  useToggleGroup,
  useToggleGroupContext,
} from '@/components/toggle-group/ToggleGroup';
import { CheckIcon } from '@/lib/moduix/icons/ui';

function BellIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" focusable="false">
      <path d="M8 1a1 1 0 0 0-1 1v1.14A4 4 0 0 0 4 7v3.98s-.02.28-.15.54C3.72 11.78 3.56 12 3 12v1h10v-1c-.6 0-.75-.22-.87-.47-.13-.25-.13-.52-.13-.53V7a4 4 0 0 0-3-3.86V2a1 1 0 0 0-1-1Zm0 12a1 1 0 1 0 0 2 1 1 0 0 0-2 0Z" />
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

const rowClass = 'flex items-center gap-2';
const stackClass = 'flex flex-col items-start gap-3';
const hintClass = 'text-muted-foreground text-xs leading-4';
const customGroupClass =
  'gap-1 rounded-md border-[color-mix(in_oklab,var(--color-primary)_38%,var(--color-border))] bg-[color-mix(in_oklab,var(--color-primary)_8%,transparent)] p-1';
const customItemClass = 'rounded-sm px-3';

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
  render: () => (
    <ToggleGroup multiple defaultValue={['bold', 'italic']} aria-label="Text formatting" size="md">
      <ToggleGroup.Item value="bold" aria-label="Bold">
        <strong>B</strong>
      </ToggleGroup.Item>
      <ToggleGroup.Item value="italic" aria-label="Italic">
        <em>I</em>
      </ToggleGroup.Item>
      <ToggleGroup.Item value="underline" aria-label="Underline">
        <span className="underline">U</span>
      </ToggleGroup.Item>
    </ToggleGroup>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className={stackClass}>
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
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className={stackClass}>
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
  ),
};

export const WithIcons: Story = {
  render: () => (
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
  ),
};

export const Vertical: Story = {
  render: () => (
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
  ),
};

export const Disabled: Story = {
  render: () => (
    <div className={rowClass}>
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
  ),
};

export const LoopFocus: Story = {
  render: () => (
    <ToggleGroup defaultValue={['day']} aria-label="Schedule range" loopFocus={false}>
      <ToggleGroup.Item value="day">Day</ToggleGroup.Item>
      <ToggleGroup.Item value="week">Week</ToggleGroup.Item>
      <ToggleGroup.Item value="month">Month</ToggleGroup.Item>
    </ToggleGroup>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState<string[]>(['favorites']);

    return (
      <div className={stackClass}>
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
        <span className={hintClass}>Current value: {value.join(', ') || 'empty'}</span>
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

function ContextItem({ value }: { value: string }) {
  const toggleGroup = useToggleGroupContext();
  const selected = toggleGroup.value.includes(value);

  return (
    <ToggleGroup.Item value={value}>
      {selected ? <CheckIcon /> : null}
      {value}
    </ToggleGroup.Item>
  );
}

export const Context: Story = {
  render: () => (
    <ToggleGroup defaultValue={['left']} aria-label="Text alignment">
      <ContextItem value="left" />
      <ContextItem value="center" />
      <ContextItem value="right" />
    </ToggleGroup>
  ),
};

export const CustomStyles: Story = {
  render: () => (
    <ToggleGroup defaultValue={['day']} aria-label="Schedule density" className={customGroupClass}>
      <ToggleGroup.Item value="day" className={customItemClass}>
        Day
      </ToggleGroup.Item>
      <ToggleGroup.Item value="week" className={customItemClass}>
        Week
      </ToggleGroup.Item>
      <ToggleGroup.Item value="month" className={customItemClass}>
        Month
      </ToggleGroup.Item>
    </ToggleGroup>
  ),
};