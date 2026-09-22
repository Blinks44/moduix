import { createSignal, For } from 'solid-js';
import type { JSX } from 'solid-js';
import type { Meta, StoryObj } from 'storybook-solidjs-vite';
import { Button } from '@/components/button';
import { Field, FieldHelperText } from '@/components/field';
import {
  RatingGroup,
  RatingGroupContext,
  RatingGroupControl,
  RatingGroupHiddenInput,
  RatingGroupItem,
  RatingGroupItemIndicator,
  RatingGroupItems,
  RatingGroupLabel,
  RatingGroupRootProvider,
  useRatingGroup,
} from '@/components/rating-group';
import styles from './RatingGroup.stories.module.css';

type IconProps = JSX.SvgSVGAttributes<SVGSVGElement>;
const accessibilityProps = { 'aria-hidden': 'true', focusable: 'false' } as const;

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

function RatingItems() {
  return (
    <RatingGroupControl>
      <RatingGroupItems />
    </RatingGroupControl>
  );
}

export const Basic: Story = {
  render: () => (
    <RatingGroup defaultValue={4}>
      <RatingGroupLabel>Overall satisfaction</RatingGroupLabel>
      <RatingItems />
    </RatingGroup>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = createSignal(3);

    return (
      <div class={styles.stack}>
        <RatingGroup value={value()} onValueChange={(details) => setValue(details.value)}>
          <RatingGroupHiddenInput />
          <RatingGroupLabel>Support quality</RatingGroupLabel>
          <RatingItems />
        </RatingGroup>
        <span class={styles.hint}>Current value: {value()}</span>
      </div>
    );
  },
};

export const HalfRating: Story = {
  render: () => (
    <RatingGroup allowHalf defaultValue={3.5}>
      <RatingGroupLabel>Average delivery score</RatingGroupLabel>
      <RatingItems />
    </RatingGroup>
  ),
};

export const RootProvider: Story = {
  render: () => {
    const ratingGroup = useRatingGroup({ count: 5, defaultValue: 3 });

    return (
      <div class={styles.stack}>
        <output class={styles.hint}>Current value: {ratingGroup().value}</output>
        <RatingGroupRootProvider value={ratingGroup}>
          <RatingGroupLabel>Product quality</RatingGroupLabel>
          <RatingGroupControl>
            <RatingGroupContext>
              {(context) => (
                <For each={context().items}>
                  {(item) => (
                    <RatingGroupItem index={item}>
                      <RatingGroupItemIndicator />
                    </RatingGroupItem>
                  )}
                </For>
              )}
            </RatingGroupContext>
          </RatingGroupControl>
        </RatingGroupRootProvider>
      </div>
    );
  },
};

export const WithField: Story = {
  render: () => (
    <Field class={styles.field}>
      <RatingGroup defaultValue={4} required>
        <RatingGroupHiddenInput />
        <RatingGroupLabel>Experience score</RatingGroupLabel>
        <RatingItems />
      </RatingGroup>
      <FieldHelperText>Required score from 1 to 5.</FieldHelperText>
    </Field>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div class={styles.stack}>
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
    <div class={styles.stack}>
      <RatingGroup defaultValue={4} disabled>
        <RatingGroupLabel>Disabled rating</RatingGroupLabel>
        <RatingItems />
      </RatingGroup>
      <RatingGroup defaultValue={2} readOnly>
        <RatingGroupLabel>Read-only rating</RatingGroupLabel>
        <RatingItems />
      </RatingGroup>
    </div>
  ),
};

export const FormUsage: Story = {
  render: () => (
    <form class={styles.stack} onSubmit={(event) => event.preventDefault()}>
      <RatingGroup name="review" defaultValue={4} required>
        <RatingGroupLabel>Review score</RatingGroupLabel>
        <RatingItems />
        <RatingGroupHiddenInput />
      </RatingGroup>
      <Button type="submit">Submit</Button>
    </form>
  ),
};

export const CustomStyles: Story = {
  render: () => (
    <RatingGroup class={styles.customRatingGroup} defaultValue={5}>
      <RatingGroupLabel>Styled rating</RatingGroupLabel>
      <RatingItems />
    </RatingGroup>
  ),
};

export const CustomIcon: Story = {
  render: () => (
    <RatingGroup defaultValue={3}>
      <RatingGroupLabel>Checklist score</RatingGroupLabel>
      <RatingGroupControl>
        <RatingGroupItems>
          <RatingGroupItemIndicator class={styles.customIcon}>
            <HeartIcon />
          </RatingGroupItemIndicator>
        </RatingGroupItems>
      </RatingGroupControl>
    </RatingGroup>
  ),
};

export const AsChild: Story = {
  render: () => (
    <RatingGroup
      asChild={(props) => <section class={styles.asChild} {...props()} />}
      defaultValue={4}
    >
      <RatingGroupLabel>Semantic rating section</RatingGroupLabel>
      <RatingGroupControl>
        <RatingGroupItems />
      </RatingGroupControl>
    </RatingGroup>
  ),
};
