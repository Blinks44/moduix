import type { Meta, StoryObj } from '@storybook/react-vite';
import { Fragment, useState } from 'react';
import {
  ToggleGroup,
  ToggleGroupItem,
  ToggleGroupRootProvider,
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
  render: () => (
    <ToggleGroup multiple defaultValue={['bold', 'italic']} aria-label="Text formatting" size="md">
      <ToggleGroupItem value="bold" aria-label="Bold">
        <strong>B</strong>
      </ToggleGroupItem>
      <ToggleGroupItem value="italic" aria-label="Italic">
        <em>I</em>
      </ToggleGroupItem>
      <ToggleGroupItem value="underline" aria-label="Underline">
        <span className="underline">U</span>
      </ToggleGroupItem>
    </ToggleGroup>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className={stackClass}>
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
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className={stackClass}>
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
  ),
};

export const WithIcons: Story = {
  render: () => (
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
      <ToggleGroupItem value="list">List</ToggleGroupItem>
      <ToggleGroupItem value="grid">Grid</ToggleGroupItem>
      <ToggleGroupItem value="map">Map</ToggleGroupItem>
    </ToggleGroup>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div className={rowClass}>
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
  ),
};

export const LoopFocus: Story = {
  render: () => (
    <ToggleGroup defaultValue={['day']} aria-label="Schedule range" loopFocus={false}>
      <ToggleGroupItem value="day">Day</ToggleGroupItem>
      <ToggleGroupItem value="week">Week</ToggleGroupItem>
      <ToggleGroupItem value="month">Month</ToggleGroupItem>
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
          <ToggleGroupItem value="favorites">
            {value.includes('favorites') ? <CheckIcon /> : <StarIcon />}
            Favorites
          </ToggleGroupItem>
          <ToggleGroupItem value="alerts">
            <BellIcon />
            Alerts
          </ToggleGroupItem>
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
      <ToggleGroupRootProvider value={toggleGroup} aria-label="Text alignment">
        <ToggleGroupItem value="left">Left</ToggleGroupItem>
        <ToggleGroupItem value="center">Center</ToggleGroupItem>
        <ToggleGroupItem value="right">Right</ToggleGroupItem>
      </ToggleGroupRootProvider>
    );
  },
};

function ContextItem({ value }: { value: string }) {
  const toggleGroup = useToggleGroupContext();
  const selected = toggleGroup.value.includes(value);

  return (
    <ToggleGroupItem value={value}>
      {selected ? <CheckIcon /> : null}
      {value}
    </ToggleGroupItem>
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
      <ToggleGroupItem value="day" className={customItemClass}>
        Day
      </ToggleGroupItem>
      <ToggleGroupItem value="week" className={customItemClass}>
        Week
      </ToggleGroupItem>
      <ToggleGroupItem value="month" className={customItemClass}>
        Month
      </ToggleGroupItem>
    </ToggleGroup>
  ),
};
