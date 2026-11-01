import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/vue';
import { ref } from 'vue';
import type { Component, ComponentPublicInstance } from 'vue';
import { ToggleGroup, ToggleGroupContext, ToggleGroupItem, ToggleGroupRootProvider } from '@/index';

const toggleGroupComponents = {
  ToggleGroup,
  ToggleGroupContext,
  ToggleGroupItem,
  ToggleGroupRootProvider,
} as unknown as Record<string, Component>;

test('preserves Ark selection details, anatomy, attrs, refs, and keyboard navigation', async () => {
  const changes: string[][] = [];
  const rootRef = ref<ComponentPublicInstance>();
  const itemRef = ref<ComponentPublicInstance>();

  render({
    components: toggleGroupComponents,
    setup() {
      return { changes, itemRef, rootRef };
    },
    template: `
      <ToggleGroup
        ref="rootRef"
        :default-value="['left']"
        aria-label="Alignment"
        data-probe="root"
        @value-change="changes.push($event.value)"
      >
        <ToggleGroupItem ref="itemRef" value="left">Left</ToggleGroupItem>
        <ToggleGroupItem value="center">Center</ToggleGroupItem>
        <ToggleGroupItem value="right">Right</ToggleGroupItem>
      </ToggleGroup>
    `,
  });
  const root = screen.getByRole('radiogroup');
  const left = screen.getByRole('radio', { name: 'Left' });

  expect(rootRef.value?.$el).toBe(root);
  expect(itemRef.value?.$el).toBe(left);
  expect(root.dataset).toMatchObject({
    scope: 'toggle-group',
    part: 'root',
    slot: 'toggle-group-root',
    probe: 'root',
  });
  expect(left.dataset).toMatchObject({ scope: 'toggle-group', part: 'item' });
  await expect
    .element(page.getByRole('radio', { name: 'Left' }))
    .toHaveAttribute('data-state', 'on');

  const center = page.getByRole('radio', { name: 'Center' });

  await center.click();
  await expect.element(center).toHaveAttribute('data-state', 'on');
  await center.click();
  await expect.element(center).toHaveAttribute('data-state', 'off');
  expect(changes).toEqual([['center'], []]);

  await expect.element(center).toBeFocused();
  await center.press('ArrowRight');
  await expect.element(page.getByRole('radio', { name: 'Right' })).toBeFocused();
});

test('applies native utilities and keeps consumer classes last', () => {
  render({
    components: toggleGroupComponents,
    template: `
      <ToggleGroup
        class="gap-4 rounded-none border-primary bg-card p-4"
        variant="outline"
        size="lg"
        aria-label="Alignment"
      >
        <ToggleGroupItem value="left" class="border-primary bg-card p-0 text-xs">Left</ToggleGroupItem>
      </ToggleGroup>
    `,
  });

  const root = screen.getByRole('radiogroup');
  const item = screen.getByRole('radio', { name: 'Left' });

  expect(getComputedStyle(root)).toMatchObject({
    gap: '16px',
    borderRadius: '0px',
    paddingTop: '16px',
  });
  expect(getComputedStyle(item)).toMatchObject({
    minHeight: '40px',
    paddingTop: '0px',
    paddingRight: '0px',
    paddingBottom: '0px',
    paddingLeft: '0px',
    fontSize: '12px',
  });
});