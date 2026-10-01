import { expect, rs, test } from '@rstest/core';
import userEvent from '@testing-library/user-event';
import { fireEvent, render, screen, waitFor } from '@testing-library/vue';
import { renderToString } from '@vue/server-renderer';
import { createSSRApp, defineComponent, nextTick, ref } from 'vue';
import type { Component, ComponentPublicInstance } from 'vue';
import {
  ToggleGroup,
  ToggleGroupContext,
  ToggleGroupItem,
  ToggleGroupRootProvider,
  useToggleGroup,
  useToggleGroupContext,
} from '../src';

const toggleGroupComponents = {
  ToggleGroup,
  ToggleGroupContext,
  ToggleGroupItem,
  ToggleGroupRootProvider,
} as unknown as Record<string, Component>;

const ContextAwareItem = defineComponent({
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
});

test('preserves Ark selection details, anatomy, attrs, refs, and keyboard navigation', async () => {
  const changes: string[][] = [];
  const rootRef = ref<ComponentPublicInstance>();
  const itemRef = ref<ComponentPublicInstance>();
  const Harness = defineComponent({
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

  render(Harness);
  const root = screen.getByRole('radiogroup');
  const left = screen.getByRole('radio', { name: 'Left' });
  const center = screen.getByRole('radio', { name: 'Center' });
  const right = screen.getByRole('radio', { name: 'Right' });

  expect(rootRef.value?.$el).toBe(root);
  expect(itemRef.value?.$el).toBe(left);
  expect(root).toHaveAttribute('data-scope', 'toggle-group');
  expect(root).toHaveAttribute('data-part', 'root');
  expect(root).toHaveAttribute('data-slot', 'toggle-group-root');
  expect(root).toHaveAttribute('data-probe', 'root');
  expect(left).toHaveAttribute('data-scope', 'toggle-group');
  expect(left).toHaveAttribute('data-part', 'item');
  expect(left).toHaveAttribute('data-state', 'on');

  await fireEvent.click(center);
  await waitFor(() => expect(center).toHaveAttribute('data-state', 'on'));
  await fireEvent.click(center);
  await waitFor(() => expect(center).toHaveAttribute('data-state', 'off'));
  expect(changes).toEqual([['center'], []]);

  center.focus();
  await fireEvent.keyDown(center, { key: 'ArrowRight' });
  await waitFor(() => expect(right).toHaveFocus());
});

test('supports controlled v-model and forwards each Vue listener once', async () => {
  const value = ref<string[]>(['left']);
  const changes: string[][] = [];
  const updates: string[][] = [];
  const Harness = defineComponent({
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

  render(Harness);
  await fireEvent.click(screen.getByRole('radio', { name: 'Center' }));

  await waitFor(() => expect(screen.getByText('Selected: center')).toBeInTheDocument());
  expect(value.value).toEqual(['center']);
  expect(changes).toEqual([['center']]);
  expect(updates).toEqual([['center']]);
});

test('keeps visual hooks owned, inherits visual props, and preserves reactive attrs', async () => {
  const variant = ref<'default' | 'outline' | 'ghost'>('outline');
  const size = ref<'sm' | 'lg'>('sm');
  const consumerClass = ref('consumer-root');
  const Harness = defineComponent({
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

  render(Harness);
  const root = screen.getByRole('radiogroup');
  const left = screen.getByRole('radio', { name: 'Left' });
  const center = screen.getByRole('radio', { name: 'Center' });

  expect(root).toHaveClass('consumer-root');
  expect(root).toHaveAttribute('data-slot', 'toggle-group-root');
  expect(root).toHaveAttribute('data-variant', 'outline');
  expect(root).toHaveAttribute('data-size', 'sm');
  expect(left).toHaveClass('consumer-item');
  expect(left).toHaveAttribute('data-slot', 'toggle-group-item');
  expect(left).toHaveAttribute('data-variant', 'ghost');
  expect(left).toHaveAttribute('data-size', 'icon-md');
  expect(center).toHaveAttribute('data-variant', 'outline');
  expect(center).toHaveAttribute('data-size', 'sm');

  variant.value = 'ghost';
  size.value = 'lg';
  consumerClass.value = 'updated-root';
  await nextTick();

  expect(root).toHaveClass('updated-root');
  expect(root).not.toHaveClass('consumer-root');
  expect(root).toHaveAttribute('data-variant', 'ghost');
  expect(root).toHaveAttribute('data-size', 'lg');
  expect(center).toHaveAttribute('data-variant', 'ghost');
  expect(center).toHaveAttribute('data-size', 'lg');
});

test('supports disabled state and semantic asChild hosts with refs', () => {
  const { unmount } = render({
    components: toggleGroupComponents,
    template: `
      <ToggleGroup :default-value="['left']" aria-label="Disabled alignment" disabled>
        <ToggleGroupItem value="left">Left</ToggleGroupItem>
      </ToggleGroup>
    `,
  });

  expect(screen.getByRole('radio', { name: 'Left' })).toBeDisabled();
  unmount();

  const rootRef = ref<ComponentPublicInstance>();
  const itemRef = ref<ComponentPublicInstance>();
  const Harness = defineComponent({
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

  render(Harness);
  const root = screen.getByRole('radiogroup', { name: 'Custom alignment' });
  const item = screen.getByRole('radio', { name: 'Left' });

  expect(root.tagName).toBe('SECTION');
  expect(root).toHaveAttribute('data-slot', 'toggle-group-root');
  expect(rootRef.value?.$el).toBe(root);
  expect(item.tagName).toBe('BUTTON');
  expect(item).toHaveAttribute('data-slot', 'toggle-group-item');
  expect(itemRef.value?.$el).toBe(item);
});

test('keeps RootProvider and useToggleGroupContext composition connected', async () => {
  const Harness = defineComponent({
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

  render(Harness);
  const left = screen.getByRole('radio', { name: 'Selected left' });
  const center = screen.getByRole('radio', { name: 'Center' });

  expect(left).toHaveAttribute('data-selected');
  await fireEvent.click(center);
  await waitFor(() => expect(screen.getByRole('radio', { name: 'left' })).toBeInTheDocument());
  expect(screen.getByRole('radiogroup')).toHaveAttribute('data-slot', 'toggle-group-root-provider');
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

  const output = screen.getByTestId('context-value');
  expect(output).toHaveTextContent('left');
  await fireEvent.click(screen.getByRole('radio', { name: 'Center' }));
  await waitFor(() => expect(output).toHaveTextContent('center'));
});

test('supports native keyboard activation', async () => {
  const user = userEvent.setup();

  render({
    components: toggleGroupComponents,
    template: `
      <ToggleGroup aria-label="Alignment">
        <ToggleGroupItem value="left">Left</ToggleGroupItem>
        <ToggleGroupItem value="center">Center</ToggleGroupItem>
      </ToggleGroup>
    `,
  });

  const left = screen.getByRole('radio', { name: 'Left' });
  await user.tab();
  expect(left).toHaveFocus();
  await user.keyboard(' ');
  expect(left).toHaveAttribute('data-state', 'on');
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

  expect(root).toHaveClass('group/toggle-group', 'inline-flex', 'gap-4', 'rounded-none');
  expect(root).toHaveClass('border-primary', 'bg-card', 'p-4', 'max-w-full', 'overflow-x-auto');
  expect(root).not.toHaveClass('gap-px', 'rounded-lg', 'border-border', 'bg-background', 'p-0.5');
  expect(item).toHaveClass(
    'box-border',
    'flex-none',
    'border-primary',
    'bg-card',
    'p-0',
    'text-xs',
  );
  expect(item).not.toHaveClass('border-border', 'bg-background', 'min-h-control-lg', 'px-5');
});

test('preserves omitted focus defaults and explicit keyboard options', async () => {
  const loopFocus = ref<boolean | undefined>();
  const orientation = ref<'horizontal' | 'vertical'>('horizontal');
  render(
    defineComponent({
      components: toggleGroupComponents,
      setup: () => ({ loopFocus, orientation }),
      template: `
      <ToggleGroup :default-value="['left']" :loop-focus="loopFocus" :orientation="orientation" aria-label="Navigation">
        <ToggleGroupItem value="left">Left</ToggleGroupItem>
        <ToggleGroupItem value="disabled" disabled>Disabled</ToggleGroupItem>
        <ToggleGroupItem value="right">Right</ToggleGroupItem>
      </ToggleGroup>
    `,
    }),
  );
  const left = screen.getByRole('radio', { name: 'Left' });
  const right = screen.getByRole('radio', { name: 'Right' });
  await userEvent.setup().tab();
  await waitFor(() => expect(left).toHaveFocus());
  await waitFor(() => expect(left).toHaveAttribute('tabindex', '0'));
  expect(right).toHaveAttribute('tabindex', '-1');
  right.focus();
  await fireEvent.keyDown(right, { key: 'ArrowRight' });
  await waitFor(() => expect(left).toHaveFocus());
  loopFocus.value = false;
  await nextTick();
  right.focus();
  await fireEvent.keyDown(right, { key: 'ArrowRight' });
  expect(right).toHaveFocus();
  orientation.value = 'vertical';
  await nextTick();
  await fireEvent.keyDown(right, { key: 'Home' });
  await waitFor(() => expect(left).toHaveFocus());
  await fireEvent.keyDown(left, { key: 'ArrowDown' });
  await waitFor(() => expect(right).toHaveFocus());
  await fireEvent.keyDown(right, { key: 'End' });
  expect(right).toHaveFocus();
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
  expect(screen.getByRole('group', { name: 'Formatting' })).toBeInTheDocument();
  const bold = screen.getByRole('button', { name: 'Bold' });
  const italic = screen.getByRole('button', { name: 'Italic' });
  expect(bold).toHaveAttribute('aria-pressed', 'true');
  await fireEvent.click(italic);
  expect(bold).toHaveAttribute('aria-pressed', 'true');
  expect(italic).toHaveAttribute('aria-pressed', 'true');
  await fireEvent.click(bold);
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
  const left = screen.getByRole('radio', { name: 'Left' });
  await fireEvent.click(left);
  expect(left).toHaveAttribute('aria-checked', 'true');
});

test('keeps provider host refs, styles, and reactive visual inheritance', async () => {
  const rootRef = ref<ComponentPublicInstance>();
  const variant = ref<'outline' | 'ghost'>('outline');
  const size = ref<'sm' | 'lg'>('sm');
  render(
    defineComponent({
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
    }),
  );
  const root = screen.getByRole('radiogroup', { name: 'Provider' });
  const left = screen.getByRole('radio', { name: 'Left' });
  expect(root.tagName).toBe('SECTION');
  expect(rootRef.value?.$el).toBe(root);
  expect(left).toHaveAttribute('data-variant', 'outline');
  expect(left).toHaveAttribute('data-size', 'sm');
  variant.value = 'ghost';
  size.value = 'lg';
  await nextTick();
  expect(root).toHaveAttribute('data-variant', 'ghost');
  expect(left).toHaveAttribute('data-variant', 'ghost');
  expect(left).toHaveAttribute('data-size', 'lg');
});

test('renders and hydrates the public anatomy without replacing hosts', async () => {
  const App = defineComponent({
    components: toggleGroupComponents,
    template: `
      <ToggleGroup :default-value="['left']" aria-label="Alignment">
        <ToggleGroupItem value="left">Left</ToggleGroupItem>
        <ToggleGroupItem value="center">Center</ToggleGroupItem>
      </ToggleGroup>
    `,
  });

  const html = await renderToString(createSSRApp(App));
  expect(html).toContain('data-slot="toggle-group-root"');
  expect(html).toContain('data-slot="toggle-group-item"');
  expect(html).toContain('data-state="on"');

  const host = document.createElement('div');
  host.innerHTML = html;
  document.body.append(host);
  const serverRoot = host.querySelector('[data-slot="toggle-group-root"]');
  const serverIds = [...host.querySelectorAll('[id]')].map((element) => element.id);
  const warn = rs.spyOn(console, 'warn');
  const error = rs.spyOn(console, 'error');
  const app = createSSRApp(App);

  try {
    app.mount(host);
    expect(host.querySelector('[data-slot="toggle-group-root"]')).toBe(serverRoot);
    expect([...host.querySelectorAll('[id]')].map((element) => element.id)).toEqual(serverIds);
    expect(warn).not.toHaveBeenCalled();
    expect(error).not.toHaveBeenCalled();
  } finally {
    app.unmount();
    host.remove();
    warn.mockRestore();
    error.mockRestore();
  }
});