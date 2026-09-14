import { clsx } from 'clsx';
import { createSignal } from 'solid-js';
import type { Meta, StoryObj } from 'storybook-solidjs-vite';
import { SegmentGroup, useSegmentGroup } from '@/components/segment-group/SegmentGroup';

const meta = {
  title: 'Components/SegmentGroup',
  component: SegmentGroup,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof SegmentGroup>;

export default meta;

type Story = StoryObj<typeof meta>;

const frameworks = ['React', 'Solid', 'Svelte', 'Vue'] as const;
const frameworkItems = frameworks.map((value) => ({ value, label: value }));
const viewItems = ['List', 'Board', 'Calendar'].map((value) => ({ value, label: value }));
const stackClass = 'grid justify-items-start gap-2';
const hintClass = 'text-xs leading-4 text-muted-foreground';
const buttonClass =
  'inline-flex min-h-8 cursor-pointer items-center justify-center rounded-md border border-border bg-background px-3 text-foreground transition-[background-color,border-color] duration-200 ease-in-out hover:bg-accent focus-visible:outline-1 focus-visible:outline-offset-1 focus-visible:outline-ring';
const cardItemClass =
  'group/segment-item grid min-h-18 w-36 content-center justify-items-start gap-0.5 p-3 whitespace-normal';
const cardDescriptionClass =
  'relative z-1 text-xs leading-4 text-muted-foreground group-data-[state=checked]/segment-item:text-foreground';

export const Basic: Story = {
  render: () => (
    <SegmentGroup aria-label="Framework" defaultValue="React">
      <SegmentGroup.Indicator />
      <SegmentGroup.Items items={frameworkItems} />
    </SegmentGroup>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = createSignal<string | null>('React');

    return (
      <div class={stackClass}>
        <SegmentGroup
          aria-label="Framework"
          value={value()}
          onValueChange={(details) => setValue(details.value)}
        >
          <SegmentGroup.Indicator />
          <SegmentGroup.Items items={frameworkItems} />
        </SegmentGroup>
        <span class={hintClass}>Current value: {value() ?? 'none'}</span>
      </div>
    );
  },
};

export const RootProvider: Story = {
  render: () => {
    const segmentGroup = useSegmentGroup({ defaultValue: 'React' });

    return (
      <div class={stackClass}>
        <SegmentGroup.RootProvider aria-label="Framework" value={segmentGroup}>
          <SegmentGroup.Indicator />
          <SegmentGroup.Items items={frameworkItems} />
        </SegmentGroup.RootProvider>
        <button type="button" class={buttonClass} onClick={() => segmentGroup().setValue('Solid')}>
          Set to Solid
        </button>
      </div>
    );
  },
};

export const Disabled: Story = {
  render: () => (
    <div class={stackClass}>
      <SegmentGroup aria-label="Framework with unavailable item" defaultValue="React">
        <SegmentGroup.Indicator />
        <SegmentGroup.Items
          items={frameworkItems.map((item) => ({ ...item, disabled: item.value === 'Svelte' }))}
        />
      </SegmentGroup>
      <SegmentGroup aria-label="Disabled framework" defaultValue="React" disabled>
        <SegmentGroup.Indicator />
        <SegmentGroup.Items items={frameworkItems} />
      </SegmentGroup>
    </div>
  ),
};

export const Invalid: Story = {
  render: () => (
    <SegmentGroup aria-label="Framework" name="framework" defaultValue="React" invalid required>
      <SegmentGroup.Indicator />
      <SegmentGroup.Items items={frameworkItems} />
    </SegmentGroup>
  ),
};

export const Vertical: Story = {
  render: () => (
    <SegmentGroup aria-label="View" defaultValue="List" orientation="vertical" class="min-w-40">
      <SegmentGroup.Indicator />
      <SegmentGroup.Items items={viewItems} />
    </SegmentGroup>
  ),
};

export const CustomStyling: Story = {
  render: () => (
    <SegmentGroup aria-label="Framework" defaultValue="React" class="border-primary bg-background">
      <SegmentGroup.Indicator class="bg-primary" />
      {frameworks.map((item) => (
        <SegmentGroup.Item value={item} class="data-[state=checked]:text-primary-foreground">
          <SegmentGroup.ItemText>{item}</SegmentGroup.ItemText>
          <SegmentGroup.ItemControl />
          <SegmentGroup.ItemHiddenInput />
        </SegmentGroup.Item>
      ))}
    </SegmentGroup>
  ),
};

export const AsChild: Story = {
  render: () => (
    <SegmentGroup aria-label="Billing cycle" defaultValue="Monthly">
      <SegmentGroup.Indicator />
      {[
        ['Monthly', 'Pay monthly'],
        ['Annual', 'Save 20%'],
      ].map(([item, description]) => (
        <SegmentGroup.Item
          value={item}
          asChild={(props) => {
            const itemProps = props();

            return <label {...itemProps} class={clsx(itemProps.class, cardItemClass)} />;
          }}
        >
          <>
            <SegmentGroup.ItemText class="font-semibold">{item}</SegmentGroup.ItemText>
            <span class={cardDescriptionClass}>{description}</span>
            <SegmentGroup.ItemControl />
            <SegmentGroup.ItemHiddenInput />
          </>
        </SegmentGroup.Item>
      ))}
    </SegmentGroup>
  ),
};