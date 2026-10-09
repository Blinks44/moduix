import { page } from '@rstest/browser';
import { expect, rs, test } from '@rstest/core';
import { render, screen } from '@testing-library/vue';
import { renderToString } from '@vue/server-renderer';
import { createSSRApp, nextTick, ref } from 'vue';
import type { Component, ComponentPublicInstance } from 'vue';
import {
  ToggleGroup,
  ToggleGroupContext,
  ToggleGroupItem,
  ToggleGroupRootProvider,
  useToggleGroup,
  useToggleGroupContext,
} from '../src';
import SsrToggleGroup from './fixtures/SsrToggleGroup.vue';

const toggleGroupComponents = {
  ToggleGroup,
  ToggleGroupContext,
  ToggleGroupItem,
  ToggleGroupRootProvider,
} as unknown as Record<string, Component>;

const ContextAwareItem = {
  components: { ToggleGroupItem },
  props: {
    value: { type: String, required: true },
  },
  setup() {
    return { toggleGroup: useToggleGroupContext() };
  },
  template: `
    <ToggleGroupItem
      :value="value"
      :data-selected="toggleGroup.value.includes(value) || undefined"
    >
      {{ toggleGroup.value.includes(value) ? 'Selected ' + value : value }}
    </ToggleGroupItem>
  `,
};

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

test('supports controlled v-model and forwards each Vue listener once', async () => {
  const value = ref<string[]>(['left']);
  const changes: string[][] = [];
  const updates: string[][] = [];

  render({
    components: toggleGroupComponents,
    setup() {
      return { changes, updates, value };
    },
    template: `
      <ToggleGroup
        v-model="value"
        aria-label="Alignment"
        @value-change="changes.push($event.value)"
        @update:model-value="updates.push($event)"
      >
        <ToggleGroupItem value="left">Left</ToggleGroupItem>
        <ToggleGroupItem value="center">Center</ToggleGroupItem>
      </ToggleGroup>
      <output>Selected: {{ value.join(', ') || 'empty' }}</output>
    `,
  });
  await page.getByRole('radio', { name: 'Center' }).click();

  await expect.element(page.getByText('Selected: center')).toBeAttached();
  expect(value.value).toEqual(['center']);
  expect(changes).toEqual([['center']]);
  expect(updates).toEqual([['center']]);
});

test('keeps visual hooks owned, inherits visual props, and preserves reactive attrs', async () => {
  const variant = ref<'default' | 'outline' | 'ghost'>('outline');
  const size = ref<'sm' | 'lg'>('sm');
  const consumerClass = ref('consumer-root');

  render({
    components: toggleGroupComponents,
    setup() {
      return { consumerClass, size, variant };
    },
    template: `
      <ToggleGroup
        :default-value="['left']"
        :variant="variant"
        :size="size"
        :class="consumerClass"
        aria-label="Alignment"
        data-slot="consumer-root"
        data-variant="consumer-variant"
        data-size="consumer-size"
      >
        <ToggleGroupItem
          value="left"
          variant="ghost"
          size="icon-md"
          class="consumer-item"
          data-slot="consumer-item"
          data-variant="consumer-variant"
          data-size="consumer-size"
        >
          Left
        </ToggleGroupItem>
        <ToggleGroupItem value="center">Center</ToggleGroupItem>
      </ToggleGroup>
    `,
  });
  const root = screen.getByRole('radiogroup');
  const left = screen.getByRole('radio', { name: 'Left' });
  const center = screen.getByRole('radio', { name: 'Center' });

  expect(root?.classList.contains('consumer-root')).toBe(true);
  expect(root.dataset).toMatchObject({ slot: 'toggle-group-root', variant: 'outline', size: 'sm' });
  expect(left?.classList.contains('consumer-item')).toBe(true);
  expect(left.dataset).toMatchObject({
    slot: 'toggle-group-item',
    variant: 'ghost',
    size: 'icon-md',
  });
  expect(center.dataset).toMatchObject({ variant: 'outline', size: 'sm' });

  variant.value = 'ghost';
  size.value = 'lg';
  consumerClass.value = 'updated-root';
  await nextTick();

  expect(root?.classList.contains('updated-root')).toBe(true);
  expect(root?.classList.contains('consumer-root')).toBe(false);
  expect(root.dataset).toMatchObject({ variant: 'ghost', size: 'lg' });
  expect(center.dataset).toMatchObject({ variant: 'ghost', size: 'lg' });
});

test('supports disabled state and semantic asChild hosts with refs', async () => {
  const { unmount } = render({
    components: toggleGroupComponents,
    template: `
      <ToggleGroup :default-value="['left']" aria-label="Disabled alignment" disabled>
        <ToggleGroupItem value="left">Left</ToggleGroupItem>
      </ToggleGroup>
    `,
  });

  await expect.element(page.getByRole('radio', { name: 'Left' })).toBeDisabled();
  unmount();

  const rootRef = ref<ComponentPublicInstance>();
  const itemRef = ref<ComponentPublicInstance>();

  render({
    components: toggleGroupComponents,
    setup() {
      return { itemRef, rootRef };
    },
    template: `
      <ToggleGroup
        ref="rootRef"
        as-child
        :default-value="['left']"
        aria-label="Custom alignment"
      >
        <section>
          <ToggleGroupItem ref="itemRef" as-child value="left">
            <button type="button">Left</button>
          </ToggleGroupItem>
        </section>
      </ToggleGroup>
    `,
  });
  const root = screen.getByRole('radiogroup', { name: 'Custom alignment' });
  const item = screen.getByRole('radio', { name: 'Left' });

  expect(root.tagName).toBe('SECTION');
  expect(root.getAttribute('data-slot')).toBe('toggle-group-root');
  expect(rootRef.value?.$el).toBe(root);
  expect(item.tagName).toBe('BUTTON');
  expect(item.getAttribute('data-slot')).toBe('toggle-group-item');
  expect(itemRef.value?.$el).toBe(item);
});

test('keeps RootProvider and useToggleGroupContext composition connected', async () => {
  render({
    components: { ...toggleGroupComponents, ContextAwareItem },
    setup() {
      return { toggleGroup: useToggleGroup({ defaultValue: ['left'] }) };
    },
    template: `
      <ToggleGroupRootProvider :value="toggleGroup" aria-label="Alignment">
        <ContextAwareItem value="left" />
        <ToggleGroupItem value="center">Center</ToggleGroupItem>
      </ToggleGroupRootProvider>
    `,
  });
  const left = screen.getByRole('radio', { name: 'Selected left' });

  expect(left.hasAttribute('data-selected')).toBe(true);
  await page.getByRole('radio', { name: 'Center' }).click();
  await expect.element(page.getByRole('radio', { name: 'left' })).toBeAttached();
  expect(screen.getByRole('radiogroup').getAttribute('data-slot')).toBe(
    'toggle-group-root-provider',
  );
});

test('exposes the public ToggleGroupContext scoped slot', async () => {
  render({
    components: toggleGroupComponents,
    template: `
      <ToggleGroup :default-value="['left']" aria-label="Alignment">
        <ToggleGroupContext v-slot="context">
          <output data-testid="context-value">{{ context.value.join(', ') || 'empty' }}</output>
        </ToggleGroupContext>
        <ToggleGroupItem value="left">Left</ToggleGroupItem>
        <ToggleGroupItem value="center">Center</ToggleGroupItem>
      </ToggleGroup>
    `,
  });

  await expect.element(page.getByTestId('context-value')).toContainText('left');
  await page.getByRole('radio', { name: 'Center' }).click();
  await expect.element(page.getByTestId('context-value')).toContainText('center');
});

test('supports native keyboard activation', async () => {
  render({ template: '<button type="button">Before</button>' });

  render({
    components: toggleGroupComponents,
    template: `
      <ToggleGroup aria-label="Alignment">
        <ToggleGroupItem value="left">Left</ToggleGroupItem>
        <ToggleGroupItem value="center">Center</ToggleGroupItem>
      </ToggleGroup>
    `,
  });

  await page.getByRole('button', { name: 'Before' }).press('Tab');
  const left = page.getByRole('radio', { name: 'Left' });

  await expect.element(left).toBeFocused();
  await left.press('Space');
  await expect.element(left).toHaveAttribute('data-state', 'on');
});

test('preserves omitted focus defaults and explicit keyboard options', async () => {
  render({ template: '<button type="button">Before</button>' });

  const loopFocus = ref<boolean | undefined>();
  const orientation = ref<'horizontal' | 'vertical'>('horizontal');
  render({
    components: toggleGroupComponents,
    setup: () => ({ loopFocus, orientation }),
    template: `
      <ToggleGroup :default-value="['left']" :loop-focus="loopFocus" :orientation="orientation" aria-label="Navigation">
        <ToggleGroupItem value="left">Left</ToggleGroupItem>
        <ToggleGroupItem value="disabled" disabled>Disabled</ToggleGroupItem>
        <ToggleGroupItem value="right">Right</ToggleGroupItem>
      </ToggleGroup>
    `,
  });

  await page.getByRole('button', { name: 'Before' }).press('Tab');
  const left = page.getByRole('radio', { name: 'Left' });

  await expect.element(left).toBeFocused();
  await expect.element(left).toHaveAttribute('tabindex', '0');
  const right = page.getByRole('radio', { name: 'Right' });

  await expect.element(right).toHaveAttribute('tabindex', '-1');
  await right.click();
  await right.press('ArrowRight');
  await expect.element(left).toBeFocused();
  loopFocus.value = false;
  await nextTick();
  await right.click();
  await right.press('ArrowRight');
  await expect.element(right).toBeFocused();
  orientation.value = 'vertical';
  await nextTick();
  await right.press('Home');
  await expect.element(left).toBeFocused();
  await left.press('ArrowDown');
  await expect.element(right).toBeFocused();
  await right.press('End');
  await expect.element(right).toBeFocused();
});

test('preserves multiple selection and a non-deselectable single group', async () => {
  const changes: string[][] = [];
  const { unmount } = render({
    components: toggleGroupComponents,
    setup: () => ({ changes }),
    template: `
      <ToggleGroup multiple :default-value="['bold']" aria-label="Formatting" @value-change="changes.push($event.value)">
        <ToggleGroupItem value="bold">Bold</ToggleGroupItem>
        <ToggleGroupItem value="italic">Italic</ToggleGroupItem>
      </ToggleGroup>
    `,
  });
  await expect.element(page.getByRole('group', { name: 'Formatting' })).toBeAttached();

  await expect
    .element(page.getByRole('button', { name: 'Bold' }))
    .toHaveAttribute('aria-pressed', 'true');
  await page.getByRole('button', { name: 'Italic' }).click();
  await expect
    .element(page.getByRole('button', { name: 'Bold' }))
    .toHaveAttribute('aria-pressed', 'true');
  await expect
    .element(page.getByRole('button', { name: 'Italic' }))
    .toHaveAttribute('aria-pressed', 'true');
  await page.getByRole('button', { name: 'Bold' }).click();
  expect(changes).toEqual([['bold', 'italic'], ['italic']]);
  unmount();
  render({
    components: toggleGroupComponents,
    template: `
      <ToggleGroup :deselectable="false" :default-value="['left']" aria-label="Required selection">
        <ToggleGroupItem value="left">Left</ToggleGroupItem>
      </ToggleGroup>
    `,
  });

  await page.getByRole('radio', { name: 'Left' }).click();
  await expect
    .element(page.getByRole('radio', { name: 'Left' }))
    .toHaveAttribute('aria-checked', 'true');
});

test('keeps provider host refs, styles, and reactive visual inheritance', async () => {
  const rootRef = ref<ComponentPublicInstance>();
  const variant = ref<'outline' | 'ghost'>('outline');
  const size = ref<'sm' | 'lg'>('sm');
  render({
    components: toggleGroupComponents,
    setup: () => ({
      rootRef,
      variant,
      size,
      toggleGroup: useToggleGroup({ defaultValue: ['left'] }),
    }),
    template: `
      <ToggleGroupRootProvider ref="rootRef" as-child :value="toggleGroup" :variant="variant" :size="size" aria-label="Provider">
        <section>
          <ToggleGroupItem value="left">Left</ToggleGroupItem>
        </section>
      </ToggleGroupRootProvider>
    `,
  });
  const root = screen.getByRole('radiogroup', { name: 'Provider' });
  const left = screen.getByRole('radio', { name: 'Left' });
  expect(root.tagName).toBe('SECTION');
  expect(rootRef.value?.$el).toBe(root);
  expect(left.dataset).toMatchObject({ variant: 'outline', size: 'sm' });
  variant.value = 'ghost';
  size.value = 'lg';
  await nextTick();
  expect(root.getAttribute('data-variant')).toBe('ghost');
  expect(left.dataset).toMatchObject({ variant: 'ghost', size: 'lg' });
});

test('hydrates toggle-group without replacing server hosts or ids', async () => {
  const html = await renderToString(createSSRApp(SsrToggleGroup));
  const host = document.createElement('div');
  host.innerHTML = html;
  document.body.append(host);
  const serverNodes = [...host.querySelectorAll('[data-slot]')];
  const serverIds = [...host.querySelectorAll('[id]')].map((node) => node.id);
  const warn = rs.spyOn(console, 'warn');
  const error = rs.spyOn(console, 'error');
  const app = createSSRApp(SsrToggleGroup);

  try {
    app.mount(host);
    await nextTick();
    const hydratedNodes = [...host.querySelectorAll('[data-slot]')];
    expect(hydratedNodes).toHaveLength(serverNodes.length);
    hydratedNodes.forEach((node, index) => expect(node).toBe(serverNodes[index]));
    expect([...host.querySelectorAll('[id]')].map((node) => node.id)).toEqual(serverIds);
    expect(warn).not.toHaveBeenCalled();
    expect(error).not.toHaveBeenCalled();
  } finally {
    app.unmount();
    host.remove();
    warn.mockRestore();
    error.mockRestore();
  }
});