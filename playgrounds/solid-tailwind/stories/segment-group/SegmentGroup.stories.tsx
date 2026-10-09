import { clsx } from 'clsx';
import { createSignal } from 'solid-js';
import type { Meta, StoryObj } from 'storybook-solidjs-vite';
import {
  SegmentGroup,
  SegmentGroupIndicator,
  SegmentGroupItem,
  SegmentGroupItemControl,
  SegmentGroupItemHiddenInput,
  SegmentGroupItems,
  SegmentGroupItemText,
  SegmentGroupRootProvider,
  useSegmentGroup,
} from '@/components/segment-group/SegmentGroup';

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
      <SegmentGroupIndicator />
      <SegmentGroupItems items={frameworkItems} />
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
          <SegmentGroupIndicator />
          <SegmentGroupItems items={frameworkItems} />
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
        <SegmentGroupRootProvider aria-label="Framework" value={segmentGroup}>
          <SegmentGroupIndicator />
          <SegmentGroupItems items={frameworkItems} />
        </SegmentGroupRootProvider>
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
        <SegmentGroupIndicator />
        <SegmentGroupItems
          items={frameworkItems.map((item) => ({ ...item, disabled: item.value === 'Svelte' }))}
        />
      </SegmentGroup>
      <SegmentGroup aria-label="Disabled framework" defaultValue="React" disabled>
        <SegmentGroupIndicator />
        <SegmentGroupItems items={frameworkItems} />
      </SegmentGroup>
    </div>
  ),
};

export const Invalid: Story = {
  render: () => (
    <SegmentGroup aria-label="Framework" name="framework" defaultValue="React" invalid required>
      <SegmentGroupIndicator />
      <SegmentGroupItems items={frameworkItems} />
    </SegmentGroup>
  ),
};

export const Vertical: Story = {
  render: () => (
    <SegmentGroup aria-label="View" defaultValue="List" orientation="vertical" class="min-w-40">
      <SegmentGroupIndicator />
      <SegmentGroupItems items={viewItems} />
    </SegmentGroup>
  ),
};

export const CustomStyling: Story = {
  render: () => (
    <SegmentGroup aria-label="Framework" defaultValue="React" class="border-primary bg-background">
      <SegmentGroupIndicator class="bg-primary" />
      {frameworks.map((item) => (
        <SegmentGroupItem value={item} class="data-[state=checked]:text-primary-foreground">
          <SegmentGroupItemText>{item}</SegmentGroupItemText>
          <SegmentGroupItemControl />
          <SegmentGroupItemHiddenInput />
        </SegmentGroupItem>
      ))}
    </SegmentGroup>
  ),
};

export const AsChild: Story = {
  render: () => (
    <SegmentGroup aria-label="Billing cycle" defaultValue="Monthly">
      <SegmentGroupIndicator />
      {[
        ['Monthly', 'Pay monthly'],
        ['Annual', 'Save 20%'],
      ].map(([item, description]) => (
        <SegmentGroupItem
          value={item}
          asChild={(props) => {
            const itemProps = props();

            return <label {...itemProps} class={clsx(itemProps.class, cardItemClass)} />;
          }}
        >
          <>
            <SegmentGroupItemText class="font-semibold">{item}</SegmentGroupItemText>
            <span class={cardDescriptionClass}>{description}</span>
            <SegmentGroupItemControl />
            <SegmentGroupItemHiddenInput />
          </>
        </SegmentGroupItem>
      ))}
    </SegmentGroup>
  ),
};