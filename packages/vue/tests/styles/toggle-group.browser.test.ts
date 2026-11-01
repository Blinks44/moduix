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

test('applies the public group variables to every variant and Toggle variables to items', () => {
  render({
    components: toggleGroupComponents,
    template: `
      <div style="--moduix-toggle-group-bg: rgb(1, 2, 3); --moduix-toggle-group-border-color: rgb(4, 5, 6)">
        <ToggleGroup aria-label="Alignment" variant="ghost" style="--moduix-toggle-color: rgb(7, 8, 9)">
          <ToggleGroupItem value="left">Left</ToggleGroupItem>
        </ToggleGroup>
      </div>
    `,
  });

  expect(getComputedStyle(screen.getByRole('radiogroup'))).toMatchObject({
    backgroundColor: 'rgb(1, 2, 3)',
    borderTopColor: 'rgb(4, 5, 6)',
    paddingTop: '0px',
  });
  expect(getComputedStyle(screen.getByRole('radio', { name: 'Left' })).color).toBe('rgb(7, 8, 9)');
});