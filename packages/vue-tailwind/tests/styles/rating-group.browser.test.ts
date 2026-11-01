import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/vue';
import { ref } from 'vue';
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
} from '@/index';

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
  const indicator = root.querySelector('[data-slot="rating-group-item-indicator"]')!;

  expect([...root.classList]).toEqual(expect.arrayContaining(['gap-3', 'text-primary']));
  expect([...control.classList]).toEqual(expect.arrayContaining(['gap-3']));
  expect([...indicator!.classList]).toEqual(expect.arrayContaining(['size-7', 'text-secondary']));
  await expect.element(page.getByTestId('root')).toHaveCSS('gap', '12px');
  await expect.element(page.locator('[data-slot="rating-group-control"]')).toHaveCSS('gap', '12px');
  await expect
    .element(page.locator('[data-slot="rating-group-item-indicator"]').nth(0))
    .toHaveCSS('width', '28px');
});