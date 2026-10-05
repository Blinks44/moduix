import { page } from '@rstest/browser';
import { expect, rs, test } from '@rstest/core';
import { render, screen } from '@testing-library/vue';
import { renderToString } from '@vue/server-renderer';
import { createSSRApp, nextTick, defineComponent, ref } from 'vue';
import type { Component, ComponentPublicInstance } from 'vue';
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
  useRatingGroupContext,
  useRatingGroupItemContext,
} from '../src';

const ratingGroupComponents = {
  RatingGroup,
  RatingGroupContext,
  RatingGroupControl,
  RatingGroupHiddenInput,
  RatingGroupItem,
  RatingGroupItemIndicator,
  RatingGroupItems,
  RatingGroupLabel,
  RatingGroupRootProvider,
} as Record<string, Component>;

test('preserves Ark semantics, Vue refs, anatomy, attrs, and moduix hooks', async () => {
  const rootRef = ref<ComponentPublicInstance>();
  const labelRef = ref<ComponentPublicInstance>();
  const controlRef = ref<ComponentPublicInstance>();
  const itemRef = ref<ComponentPublicInstance>();
  const indicatorRef = ref<ComponentPublicInstance>();

  render({
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

  const root = rootRef.value?.$el as HTMLElement;
  const item = screen.getByRole('radio');
  const indicator = item.querySelector('[data-slot="rating-group-item-indicator"]')!;

  expect(root.getAttribute('data-slot')).toBe('rating-group-root');
  expect(root.getAttribute('data-scope')).toBe('rating-group');
  expect(root.getAttribute('data-probe')).toBe('root');
  expect(root.getAttribute('data-size')).toBe('md');
  expect(labelRef.value?.$el?.getAttribute('data-slot')).toBe('rating-group-label');
  expect(controlRef.value?.$el?.getAttribute('data-slot')).toBe('rating-group-control');
  expect(itemRef.value?.$el).toBe(item);
  await expect.element(page.getByRole('radio')).toHaveAttribute('aria-setsize', '5');
  expect(indicatorRef.value?.$el).toBe(indicator);
  expect(indicator?.getAttribute('data-slot')).toBe('rating-group-item-indicator');
  expect(root.querySelector('input[hidden]')?.isConnected).toBe(true);
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

  await expect.element(page.locator('input[hidden]')).toHaveAttribute('name', 'rating');
  expect(new FormData(form).get('rating')).toBe('3');

  await page.getByRole('radio').nth(4).click();
  await expect.poll(() => new FormData(form).get('rating')).toBe('5');
});

test('preserves semantic hosts and refs with asChild', async () => {
  const rootRef = ref<ComponentPublicInstance>();

  render({
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
  const root = screen.getByRole('region', { name: 'Rating section' });

  expect(root.tagName).toBe('SECTION');
  await expect
    .element(page.getByRole('region', { name: 'Rating section', exact: true }))
    .toHaveAttribute('data-slot', 'rating-group-root');
  expect(rootRef.value?.$el).toBe(root);
  expect(root.querySelectorAll('input[hidden]')).toHaveLength(1);
  expect(root.querySelectorAll('[data-slot="rating-group-item"]')).toHaveLength(5);
});

test('supports v-model and preserves Ark callback details', async () => {
  const details: number[] = [];

  render({
    components: ratingGroupComponents,
    setup() {
      const value = ref(2);
      return { details, value };
    },
    template: `
      <RatingGroup v-model="value" @value-change="details.push($event.value)">
        <RatingGroupLabel>Rating</RatingGroupLabel>
        <RatingGroupControl><RatingGroupItems /></RatingGroupControl>
      </RatingGroup>
      <output>Current value: {{ value }}</output>
    `,
  });
  await page.getByRole('radio').nth(3).click();

  await expect.element(page.getByText('Current value: 4')).toBeAttached();
  expect(details).toEqual([4]);
});

test('preserves half steps, keyboard focus and mouse focus visibility', async () => {
  render({
    components: ratingGroupComponents,
    template: `
      <button type="button">Before rating</button>
      <RatingGroup allow-half :default-value="3.5">
        <RatingGroupLabel>Rating</RatingGroupLabel>
        <RatingGroupControl><RatingGroupItems /></RatingGroupControl>
      </RatingGroup>
    `,
  });
  const items = page.getByRole('radio');
  const before = page.getByRole('button', { name: 'Before rating', exact: true });
  await expect.element(items.nth(3)).toHaveAttribute('data-half');
  await before.click();
  await before.press('Tab');
  await expect.element(items.nth(3)).toBeFocused();
  await items.nth(3).press('ArrowLeft');
  await expect.element(items.nth(2)).toBeFocused();
  await items.nth(2).press('ArrowRight');
  await expect.element(items.nth(3)).toBeFocused();
  await expect.element(items.nth(3)).toHaveAttribute('data-half');
  await items.nth(2).click();
  await expect.element(items.nth(2)).toBeFocused();
  await expect.element(items.nth(2)).not.toHaveAttribute('data-focus-visible');
});
test('repeats custom indicators with Ark item state', async () => {
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
  await expect
    .element(page.getByTestId('custom-indicator').nth(2))
    .toHaveAttribute('data-highlighted');
  await expect.element(page.getByTestId('custom-indicator').nth(3)).toHaveAttribute('data-half');
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

  render({
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
  await expect.element(page.getByText('Value 3')).toBeAttached();
  await expect.element(page.getByText('Item highlighted')).toBeAttached();

  await page.getByRole('button', { name: 'Set five', exact: true }).click();
  await expect.element(page.getByText('Value 5')).toBeAttached();
});

test('hydrates without replacing hosts or ids and responds to selection', async () => {
  const host = document.createElement('div');
  host.innerHTML = await renderToString(createSSRApp(SsrRatingGroup));
  document.body.append(host);
  const serverRoot = host.querySelector('[data-slot="rating-group-root"]');
  const serverInputs = [...host.querySelectorAll('input')];
  const serverIds = [...host.querySelectorAll('[id]')].map((element) => element.id);
  const app = createSSRApp(SsrRatingGroup);
  const warn = rs.spyOn(console, 'warn');
  const error = rs.spyOn(console, 'error');
  const items = page.getByRole('radio');
  try {
    app.mount(host);
    await nextTick();
    expect(host.querySelector('[data-slot="rating-group-root"]')).toBe(serverRoot);
    expect([...host.querySelectorAll('input')]).toEqual(serverInputs);
    expect([...host.querySelectorAll('[id]')].map((element) => element.id)).toEqual(serverIds);
    await expect.element(items.nth(2)).toHaveAttribute('aria-checked', 'true');
    await items.nth(4).click();
    await expect.element(items.nth(4)).toHaveAttribute('aria-checked', 'true');
    expect(warn).not.toHaveBeenCalled();
    expect(error).not.toHaveBeenCalled();
  } finally {
    app.unmount();
    host.remove();
    warn.mockRestore();
    error.mockRestore();
  }
});
test('applies native utilities and lets consumer classes win', async () => {
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

  expect([...root.classList]).toEqual(expect.arrayContaining(['gap-3', 'text-primary']));
  expect(['gap-1', 'text-muted-foreground'].some((name) => root.classList.contains(name))).toBe(
    false,
  );
  expect([...control.classList]).toEqual(expect.arrayContaining(['gap-3']));
  expect([...item!.classList]).toEqual(
    expect.arrayContaining([
      'outline-1',
      '-outline-offset-1',
      'outline-transparent',
      'focus-visible:outline-1',
      'focus-visible:outline-offset-1',
      'focus-visible:outline-ring',
    ]),
  );
  expect([...indicator!.classList]).toEqual(expect.arrayContaining(['size-7', 'text-secondary']));
  expect([...backgroundIcon.classList]).toEqual(
    expect.arrayContaining(['absolute', 'inset-0', 'size-full', 'fill-transparent']),
  );
  await expect.element(page.getByTestId('root')).toHaveCSS('gap', '12px');
  await expect.element(page.locator('[data-slot="rating-group-control"]')).toHaveCSS('gap', '12px');
  await expect
    .element(page.locator('[data-slot="rating-group-item-indicator"]').nth(0))
    .toHaveCSS('width', '28px');
});
import SsrRatingGroup from './fixtures/SsrRatingGroup.vue';