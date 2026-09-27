import { Heart as HeartIcon } from '@lucide/vue';
import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { defineComponent, ref } from 'vue';
import type { Component } from 'vue';
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

const meta = {
  title: 'Components/RatingGroup',
  component: RatingGroup,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
} satisfies Meta<typeof RatingGroup>;

export default meta;

type Story = StoryObj<typeof meta>;

const fieldClass = 'w-64';
const stackClass = 'grid gap-3';
const hintClass = 'text-xs leading-4 text-muted-foreground';
const customIndicatorClass =
  'text-muted-foreground data-highlighted:text-[#f59e0b] data-highlighted:[&>svg]:fill-current [&>svg]:fill-transparent [&>svg]:stroke-current';

const ratingGroupComponents = {
  Button,
  Field,
  FieldHelperText,
  HeartIcon,
  RatingGroup,
  RatingGroupContext,
  RatingGroupControl,
  RatingGroupHiddenInput,
  RatingGroupItem,
  RatingGroupItemIndicator,
  RatingGroupItems,
  RatingGroupLabel,
  RatingGroupRootProvider,
} as unknown as Record<string, Component>;

const RatingItems = defineComponent({
  components: { RatingGroupControl, RatingGroupItems },
  template: '<RatingGroupControl><RatingGroupItems /></RatingGroupControl>',
});

const storyComponents: Record<string, Component> = { ...ratingGroupComponents, RatingItems };

function renderStory(template: string, setup?: () => Record<string, unknown>) {
  return () =>
    defineComponent({
      components: storyComponents,
      setup() {
        return { customIndicatorClass, fieldClass, hintClass, stackClass, ...setup?.() };
      },
      template,
    });
}

export const Basic: Story = {
  render: renderStory(`
    <RatingGroup :default-value="4">
      <RatingGroupLabel>Overall satisfaction</RatingGroupLabel>
      <RatingItems />
    </RatingGroup>
  `),
};

export const Controlled: Story = {
  render: renderStory(
    `
      <div :class="stackClass">
        <RatingGroup v-model="value">
          <RatingGroupLabel>Support quality</RatingGroupLabel>
          <RatingItems />
          <RatingGroupHiddenInput />
        </RatingGroup>
        <span :class="hintClass">Current value: {{ value }}</span>
      </div>
    `,
    () => ({ value: ref(3) }),
  ),
};

export const HalfRating: Story = {
  render: renderStory(`
    <RatingGroup allow-half :default-value="3.5">
      <RatingGroupLabel>Average delivery score</RatingGroupLabel>
      <RatingItems />
    </RatingGroup>
  `),
};

export const RootProvider: Story = {
  render: renderStory(
    `
      <div :class="stackClass">
        <output :class="hintClass">Current value: {{ ratingGroup.value }}</output>
        <RatingGroupRootProvider :value="ratingGroup">
          <RatingGroupLabel>Product quality</RatingGroupLabel>
          <RatingGroupControl>
            <RatingGroupContext v-slot="context">
              <RatingGroupItem v-for="item in context.items" :key="item" :index="item">
                <RatingGroupItemIndicator />
              </RatingGroupItem>
            </RatingGroupContext>
          </RatingGroupControl>
        </RatingGroupRootProvider>
      </div>
    `,
    () => ({ ratingGroup: useRatingGroup({ count: 5, defaultValue: 3 }) }),
  ),
};

export const WithField: Story = {
  render: renderStory(`
    <Field :class="fieldClass">
      <RatingGroup :default-value="4" required>
        <RatingGroupLabel>Experience score</RatingGroupLabel>
        <RatingItems />
        <RatingGroupHiddenInput />
      </RatingGroup>
      <FieldHelperText>Required score from 1 to 5.</FieldHelperText>
    </Field>
  `),
};

export const Sizes: Story = {
  render: renderStory(`
    <div :class="stackClass">
      <RatingGroup size="xs" :default-value="3" aria-label="Extra-small rating"><RatingItems /></RatingGroup>
      <RatingGroup size="sm" :default-value="3" aria-label="Small rating"><RatingItems /></RatingGroup>
      <RatingGroup size="md" :default-value="3" aria-label="Medium rating"><RatingItems /></RatingGroup>
      <RatingGroup size="lg" :default-value="3" aria-label="Large rating"><RatingItems /></RatingGroup>
      <RatingGroup size="xl" :default-value="3" aria-label="Extra-large rating"><RatingItems /></RatingGroup>
    </div>
  `),
};

export const DisabledAndReadOnly: Story = {
  render: renderStory(`
    <div :class="stackClass">
      <RatingGroup :default-value="4" disabled>
        <RatingGroupLabel>Disabled rating</RatingGroupLabel>
        <RatingItems />
      </RatingGroup>
      <RatingGroup :default-value="2" read-only>
        <RatingGroupLabel>Read-only rating</RatingGroupLabel>
        <RatingItems />
      </RatingGroup>
    </div>
  `),
};

export const FormUsage: Story = {
  render: renderStory(`
    <form :class="stackClass" @submit.prevent>
      <RatingGroup name="review" :default-value="4" required>
        <RatingGroupLabel>Review score</RatingGroupLabel>
        <RatingItems />
        <RatingGroupHiddenInput />
      </RatingGroup>
      <Button type="submit">Submit</Button>
    </form>
  `),
};

export const CustomStyles: Story = {
  render: renderStory(`
    <RatingGroup class="gap-2" :default-value="5">
      <RatingGroupLabel>Styled rating</RatingGroupLabel>
      <RatingGroupControl class="gap-2">
        <RatingGroupItems>
          <RatingGroupItemIndicator :class="customIndicatorClass"><HeartIcon /></RatingGroupItemIndicator>
        </RatingGroupItems>
      </RatingGroupControl>
    </RatingGroup>
  `),
};

export const CustomIcon: Story = {
  render: renderStory(`
    <RatingGroup :default-value="3">
      <RatingGroupLabel>Checklist score</RatingGroupLabel>
      <RatingGroupControl>
        <RatingGroupItems>
          <RatingGroupItemIndicator :class="customIndicatorClass"><HeartIcon /></RatingGroupItemIndicator>
        </RatingGroupItems>
      </RatingGroupControl>
    </RatingGroup>
  `),
};

export const AsChild: Story = {
  render: renderStory(`
    <RatingGroup as-child :default-value="4">
      <section class="rounded-md border border-border p-3">
        <RatingGroupLabel>Semantic rating section</RatingGroupLabel>
        <RatingItems />
      </section>
    </RatingGroup>
  `),
};