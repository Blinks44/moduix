import { expect, test } from '@rstest/core';
import { fireEvent, render, screen, waitFor } from '@testing-library/vue';
import { renderToString } from '@vue/server-renderer';
import { createSSRApp, defineComponent, ref } from 'vue';
import type { Component, ComponentPublicInstance } from 'vue';
import {
  RatingGroup,
  RatingGroupContext,
  RatingGroupControl,
  RatingGroupHiddenInput,
  RatingGroupItem,
  RatingGroupItemContext,
  RatingGroupItemIndicator,
  RatingGroupItems,
  RatingGroupLabel,
  RatingGroupRootProvider,
  useRatingGroup,
  useRatingGroupContext,
  useRatingGroupItemContext,
} from '../src';

const ratingGroupComponents = {
  RatingGroup,
  RatingGroupContext,
  RatingGroupControl,
  RatingGroupHiddenInput,
  RatingGroupItem,
  RatingGroupItemContext,
  RatingGroupItemIndicator,
  RatingGroupItems,
  RatingGroupLabel,
  RatingGroupRootProvider,
} as unknown as Record<string, Component>;

const RatingItems = defineComponent({
  components: { RatingGroupControl, RatingGroupItems },
  template: '<RatingGroupControl><RatingGroupItems /></RatingGroupControl>',
});

const TestRatingGroup = defineComponent({
  components: { ...ratingGroupComponents, RatingItems } as unknown as Record<string, Component>,
  props: {
    allowHalf: Boolean,
    count: { type: Number, default: 5 },
    defaultValue: { type: Number, default: 2 },
    modelValue: { type: Number, default: undefined },
  },
  emits: ['update:modelValue', 'valueChange'],
  template: `
    <RatingGroup
      :allow-half="allowHalf"
      :count="count"
      :default-value="modelValue === undefined ? defaultValue : undefined"
      :model-value="modelValue"
      @update:model-value="$emit('update:modelValue', $event)"
      @value-change="$emit('valueChange', $event)"
    >
      <RatingGroupLabel>Rating</RatingGroupLabel>
      <RatingItems />
    </RatingGroup>
  `,
});

test('preserves Ark semantics, Vue refs, anatomy, attrs, and moduix hooks', () => {
  const rootRef = ref<ComponentPublicInstance>();
  const labelRef = ref<ComponentPublicInstance>();
  const controlRef = ref<ComponentPublicInstance>();
  const itemRef = ref<ComponentPublicInstance>();
  const indicatorRef = ref<ComponentPublicInstance>();
  const Harness = defineComponent({
    components: ratingGroupComponents,
    setup() {
      return { controlRef, indicatorRef, itemRef, labelRef, rootRef };
    },
    template: `
      <RatingGroup ref="rootRef" :default-value="3" data-probe="root">
        <RatingGroupLabel ref="labelRef">Rating</RatingGroupLabel>
        <RatingGroupControl ref="controlRef">
          <RatingGroupItem ref="itemRef" :index="1">
            <RatingGroupItemIndicator ref="indicatorRef" />
          </RatingGroupItem>
        </RatingGroupControl>
        <RatingGroupHiddenInput />
      </RatingGroup>
    `,
  });

  render(Harness);

  const root = rootRef.value?.$el as HTMLElement;
  const item = screen.getByRole('radio');
  const indicator = item.querySelector('[data-slot="rating-group-item-indicator"]')!;

  expect(root).toHaveAttribute('data-slot', 'rating-group-root');
  expect(root).toHaveAttribute('data-scope', 'rating-group');
  expect(root).toHaveAttribute('data-probe', 'root');
  expect(root).toHaveAttribute('data-size', 'md');
  expect(labelRef.value?.$el).toHaveAttribute('data-slot', 'rating-group-label');
  expect(controlRef.value?.$el).toHaveAttribute('data-slot', 'rating-group-control');
  expect(itemRef.value?.$el).toBe(item);
  expect(item).toHaveAttribute('aria-setsize', '5');
  expect(indicatorRef.value?.$el).toBe(indicator);
  expect(indicator).toHaveAttribute('data-slot', 'rating-group-item-indicator');
  expect(root.querySelector('input[hidden]')).toBeInTheDocument();
});

test('submits through an explicit Ark hidden input', async () => {
  render({
    components: ratingGroupComponents,
    template: `
      <form data-testid="form">
        <RatingGroup :default-value="3" name="rating">
          <RatingGroupLabel>Rating</RatingGroupLabel>
          <RatingGroupControl><RatingGroupItems /></RatingGroupControl>
          <RatingGroupHiddenInput />
        </RatingGroup>
      </form>
    `,
  });

  const form = screen.getByTestId('form') as HTMLFormElement;
  const items = screen.getAllByRole('radio');
  const input = document.querySelector('input[hidden]');

  expect(input).toHaveAttribute('name', 'rating');
  expect(new FormData(form).get('rating')).toBe('3');

  await fireEvent.click(items[4]);
  await waitFor(() => expect(new FormData(form).get('rating')).toBe('5'));
});

test('preserves semantic hosts and refs with asChild', () => {
  const rootRef = ref<ComponentPublicInstance>();
  const Harness = defineComponent({
    components: ratingGroupComponents,
    setup() {
      return { rootRef };
    },
    template: `
      <RatingGroup ref="rootRef" as-child :default-value="2">
        <section aria-label="Rating section">
          <RatingGroupLabel>Rating</RatingGroupLabel>
          <RatingGroupControl><RatingGroupItems /></RatingGroupControl>
          <RatingGroupHiddenInput />
        </section>
      </RatingGroup>
    `,
  });

  render(Harness);
  const root = screen.getByRole('region', { name: 'Rating section' });

  expect(root.tagName).toBe('SECTION');
  expect(root).toHaveAttribute('data-slot', 'rating-group-root');
  expect(rootRef.value?.$el).toBe(root);
  expect(root.querySelectorAll('input[hidden]')).toHaveLength(1);
  expect(root.querySelectorAll('[data-slot="rating-group-item"]')).toHaveLength(5);
});

test('supports v-model and preserves Ark callback details', async () => {
  const details: number[] = [];
  const Harness = defineComponent({
    components: { TestRatingGroup },
    setup() {
      const value = ref(2);
      return { details, value };
    },
    template: `
      <TestRatingGroup v-model="value" @value-change="details.push($event.value)" />
      <output>Current value: {{ value }}</output>
    `,
  });

  render(Harness);
  await fireEvent.click(screen.getAllByRole('radio')[3]);

  await waitFor(() => expect(screen.getByText('Current value: 4')).toBeInTheDocument());
  expect(details).toEqual([4]);
});

test('keeps half-state and keyboard focus Ark-shaped', async () => {
  render(TestRatingGroup, { props: { allowHalf: true, defaultValue: 3.5 } });

  const items = screen.getAllByRole('radio');
  await fireEvent.keyDown(items[2], { key: 'ArrowRight' });

  expect(items[3]).toHaveAttribute('data-half');
  await waitFor(() => expect(document.activeElement).toBe(items[3]));
});

test('repeats custom indicators with Ark item state', () => {
  render({
    components: ratingGroupComponents,
    template: `
      <RatingGroup allow-half :default-value="3.5">
        <RatingGroupLabel>Rating</RatingGroupLabel>
        <RatingGroupControl>
          <RatingGroupItems>
            <RatingGroupItemIndicator data-testid="custom-indicator"><span>Star</span></RatingGroupItemIndicator>
          </RatingGroupItems>
        </RatingGroupControl>
      </RatingGroup>
    `,
  });

  const indicators = screen.getAllByTestId('custom-indicator');

  expect(indicators).toHaveLength(5);
  expect(indicators[2]).toHaveAttribute('data-highlighted');
  expect(indicators[3]).toHaveAttribute('data-half');
});

test('keeps provider, context, and item hooks connected', async () => {
  const RootState = defineComponent({
    setup() {
      const ratingGroup = useRatingGroupContext();
      const setFive = () => ratingGroup.value.setValue(5);
      return { setFive };
    },
    template: '<button type="button" @click="setFive">Set five</button>',
  });
  const ItemState = defineComponent({
    setup() {
      return { item: useRatingGroupItemContext() };
    },
    template: '<span>Item {{ item.highlighted ? "highlighted" : "idle" }}</span>',
  });
  const Harness = defineComponent({
    components: { ...ratingGroupComponents, ItemState, RootState },
    setup() {
      return { ratingGroup: useRatingGroup({ count: 5, defaultValue: 3 }) };
    },
    template: `
      <RatingGroupRootProvider :value="ratingGroup">
        <RatingGroupContext v-slot="context"><output>Value {{ context.value }}</output></RatingGroupContext>
        <RootState />
        <RatingGroupControl>
          <RatingGroupItem :index="1"><RatingGroupItemIndicator><ItemState /></RatingGroupItemIndicator></RatingGroupItem>
          <RatingGroupItem :index="2"><RatingGroupItemIndicator /></RatingGroupItem>
          <RatingGroupItem :index="3"><RatingGroupItemIndicator /></RatingGroupItem>
          <RatingGroupItem :index="4"><RatingGroupItemIndicator /></RatingGroupItem>
          <RatingGroupItem :index="5"><RatingGroupItemIndicator /></RatingGroupItem>
        </RatingGroupControl>
      </RatingGroupRootProvider>
    `,
  });

  render(Harness);
  expect(screen.getByText('Value 3')).toBeInTheDocument();
  expect(screen.getByText('Item highlighted')).toBeInTheDocument();

  await fireEvent.click(screen.getByRole('button', { name: 'Set five' }));
  await waitFor(() => expect(screen.getByText('Value 5')).toBeInTheDocument());
});

test('renders and hydrates the public anatomy on the server', async () => {
  const App = defineComponent({
    components: ratingGroupComponents,
    template: `
      <RatingGroup :default-value="3">
        <RatingGroupLabel>Rating</RatingGroupLabel>
        <RatingGroupControl><RatingGroupItems /></RatingGroupControl>
        <RatingGroupHiddenInput />
      </RatingGroup>
    `,
  });

  const html = await renderToString(createSSRApp(App));
  expect(html).toContain('data-slot="rating-group-root"');
  expect(html).toContain('data-slot="rating-group-item-indicator"');
  expect(html).toContain('role="radio"');

  const host = document.createElement('div');
  host.setAttribute('data-server-rendered', 'true');
  host.innerHTML = html;
  document.body.append(host);
  const serverIds = [...host.querySelectorAll('[id]')].map((element) => element.id);
  const app = createSSRApp(App);
  app.mount(host);
  expect([...host.querySelectorAll('[id]')].map((element) => element.id)).toEqual(serverIds);
  app.unmount();
  host.remove();
});

test('applies native utilities and lets consumer classes win', () => {
  render({
    components: ratingGroupComponents,
    template: `
      <RatingGroup class="gap-3 text-primary" data-testid="root">
        <RatingGroupLabel>Notifications</RatingGroupLabel>
        <RatingGroupControl class="gap-3">
          <RatingGroupItems><RatingGroupItemIndicator class="size-7 text-secondary" /></RatingGroupItems>
        </RatingGroupControl>
      </RatingGroup>
    `,
  });

  const root = screen.getByTestId('root');
  const control = root.querySelector('[data-slot="rating-group-control"]')!;
  const item = root.querySelector('[data-slot="rating-group-item"]')!;
  const indicator = root.querySelector('[data-slot="rating-group-item-indicator"]')!;
  const backgroundIcon = root.querySelector('[data-slot="rating-group-item-indicator-bg"]')!;

  expect(root).toHaveClass('gap-3', 'text-primary');
  expect(root).not.toHaveClass('gap-1', 'text-muted-foreground');
  expect(control).toHaveClass('gap-3');
  expect(item).toHaveClass(
    'outline-1',
    '-outline-offset-1',
    'outline-transparent',
    'focus-visible:outline-1',
    'focus-visible:outline-offset-1',
    'focus-visible:outline-ring',
  );
  expect(indicator).toHaveClass('size-7', 'text-secondary');
  expect(backgroundIcon).toHaveClass('absolute', 'inset-0', 'size-full', 'fill-transparent');
});