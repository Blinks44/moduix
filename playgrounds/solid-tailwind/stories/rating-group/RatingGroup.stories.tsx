import { createSignal, For } from 'solid-js';
import type { JSX } from 'solid-js';
import type { Meta, StoryObj } from 'storybook-solidjs-vite';
import { Button } from '@/components/button';
import { Field, FieldHelperText } from '@/components/field';
import { RatingGroup, useRatingGroup } from '@/components/rating-group';

type IconProps = JSX.SvgSVGAttributes<SVGSVGElement>;
const accessibilityProps = { 'aria-hidden': 'true', focusable: 'false' } as const;

const meta = {
  title: 'Components/RatingGroup',
  component: RatingGroup,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof RatingGroup>;

export default meta;

type Story = StoryObj<typeof meta>;

const fieldClass = 'w-64';
const stackClass = 'grid gap-3';
const hintClass = 'text-xs leading-4 text-muted-foreground';
const customIndicatorClass =
  'text-muted-foreground data-highlighted:text-[#f59e0b] data-highlighted:[&>svg]:fill-current [&>svg]:fill-transparent [&>svg]:stroke-current';

function HeartIcon(props: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      {...accessibilityProps}
      {...props}
    >
      <path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5" />
    </svg>
  );
}

function RatingItems() {
  return (
    <RatingGroup.Control>
      <RatingGroup.Items />
    </RatingGroup.Control>
  );
}

export const Basic: Story = {
  render: () => (
    <RatingGroup defaultValue={4}>
      <RatingGroup.Label>Overall satisfaction</RatingGroup.Label>
      <RatingItems />
    </RatingGroup>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = createSignal(3);

    return (
      <div class={stackClass}>
        <RatingGroup value={value()} onValueChange={(details) => setValue(details.value)}>
          <RatingGroup.HiddenInput />
          <RatingGroup.Label>Support quality</RatingGroup.Label>
          <RatingItems />
        </RatingGroup>
        <span class={hintClass}>Current value: {value()}</span>
      </div>
    );
  },
};

export const HalfRating: Story = {
  render: () => (
    <RatingGroup allowHalf defaultValue={3.5}>
      <RatingGroup.Label>Average delivery score</RatingGroup.Label>
      <RatingItems />
    </RatingGroup>
  ),
};

export const RootProvider: Story = {
  render: () => {
    const ratingGroup = useRatingGroup({ count: 5, defaultValue: 3 });

    return (
      <div class={stackClass}>
        <output class={hintClass}>Current value: {ratingGroup().value}</output>
        <RatingGroup.RootProvider value={ratingGroup}>
          <RatingGroup.Label>Product quality</RatingGroup.Label>
          <RatingGroup.Control>
            <RatingGroup.Context>
              {(context) => (
                <For each={context().items}>
                  {(item) => (
                    <RatingGroup.Item index={item}>
                      <RatingGroup.ItemIndicator />
                    </RatingGroup.Item>
                  )}
                </For>
              )}
            </RatingGroup.Context>
          </RatingGroup.Control>
        </RatingGroup.RootProvider>
      </div>
    );
  },
};

export const WithField: Story = {
  render: () => (
    <Field class={fieldClass}>
      <RatingGroup defaultValue={4} required>
        <RatingGroup.HiddenInput />
        <RatingGroup.Label>Experience score</RatingGroup.Label>
        <RatingItems />
      </RatingGroup>
      <FieldHelperText>Required score from 1 to 5.</FieldHelperText>
    </Field>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div class={stackClass}>
      <RatingGroup defaultValue={3} size="xs" aria-label="Extra-small rating">
        <RatingItems />
      </RatingGroup>
      <RatingGroup defaultValue={3} size="sm" aria-label="Small rating">
        <RatingItems />
      </RatingGroup>
      <RatingGroup defaultValue={3} size="md" aria-label="Medium rating">
        <RatingItems />
      </RatingGroup>
      <RatingGroup defaultValue={3} size="lg" aria-label="Large rating">
        <RatingItems />
      </RatingGroup>
      <RatingGroup defaultValue={3} size="xl" aria-label="Extra-large rating">
        <RatingItems />
      </RatingGroup>
    </div>
  ),
};

export const DisabledAndReadOnly: Story = {
  render: () => (
    <div class={stackClass}>
      <RatingGroup defaultValue={4} disabled>
        <RatingGroup.Label>Disabled rating</RatingGroup.Label>
        <RatingItems />
      </RatingGroup>
      <RatingGroup defaultValue={2} readOnly>
        <RatingGroup.Label>Read-only rating</RatingGroup.Label>
        <RatingItems />
      </RatingGroup>
    </div>
  ),
};

export const FormUsage: Story = {
  render: () => (
    <form class={stackClass} onSubmit={(event) => event.preventDefault()}>
      <RatingGroup name="review" defaultValue={4} required>
        <RatingGroup.Label>Review score</RatingGroup.Label>
        <RatingItems />
        <RatingGroup.HiddenInput />
      </RatingGroup>
      <Button type="submit">Submit</Button>
    </form>
  ),
};

export const CustomStyles: Story = {
  render: () => (
    <RatingGroup class="gap-2" defaultValue={5}>
      <RatingGroup.Label>Styled rating</RatingGroup.Label>
      <RatingGroup.Control class="gap-2">
        <RatingGroup.Items>
          <RatingGroup.ItemIndicator class={customIndicatorClass}>
            <HeartIcon />
          </RatingGroup.ItemIndicator>
        </RatingGroup.Items>
      </RatingGroup.Control>
    </RatingGroup>
  ),
};

export const CustomIcon: Story = {
  render: () => (
    <RatingGroup defaultValue={3}>
      <RatingGroup.Label>Checklist score</RatingGroup.Label>
      <RatingGroup.Control>
        <RatingGroup.Items>
          <RatingGroup.ItemIndicator class={customIndicatorClass}>
            <HeartIcon />
          </RatingGroup.ItemIndicator>
        </RatingGroup.Items>
      </RatingGroup.Control>
    </RatingGroup>
  ),
};

export const AsChild: Story = {
  render: () => (
    <RatingGroup
      asChild={(props) => <section class="rounded-md border border-border p-3" {...props()} />}
      defaultValue={4}
    >
      <RatingGroup.Label>Semantic rating section</RatingGroup.Label>
      <RatingGroup.Control>
        <RatingGroup.Items />
      </RatingGroup.Control>
    </RatingGroup>
  ),
};
