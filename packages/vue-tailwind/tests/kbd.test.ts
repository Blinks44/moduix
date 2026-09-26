import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/vue';
import { renderToString } from '@vue/server-renderer';
import { createSSRApp, defineComponent, ref } from 'vue';
import type { ComponentPublicInstance } from 'vue';
import { Kbd, KbdGroup } from '../src';

const kbdComponents = { Kbd, KbdGroup };

test('renders semantic keycaps and a labelled shortcut group with stable hooks', () => {
  const groupRef = ref<ComponentPublicInstance>();
  const Harness = defineComponent({
    components: kbdComponents,
    setup() {
      return { groupRef };
    },
    template: `
      <KbdGroup ref="groupRef" aria-label="Command K" data-testid="group">
        <Kbd data-testid="key">Cmd</Kbd>+<Kbd>K</Kbd>
      </KbdGroup>
    `,
  });

  render(Harness);

  const group = screen.getByRole('group', { name: 'Command K' });
  const key = screen.getByTestId('key');

  expect(group.tagName).toBe('SPAN');
  expect(groupRef.value?.$el).toBe(group);
  expect(group).toHaveAttribute('data-scope', 'kbd');
  expect(group).toHaveAttribute('data-part', 'group');
  expect(group).toHaveAttribute('data-slot', 'kbd-group');
  expect(group).toHaveAttribute('aria-label', 'Command K');
  expect(key.tagName).toBe('KBD');
  expect(key).toHaveAttribute('data-scope', 'kbd');
  expect(key).toHaveAttribute('data-part', 'root');
  expect(key).toHaveAttribute('data-slot', 'kbd-root');
});

test('preserves semantic children and refs with asChild', () => {
  const keyRef = ref<ComponentPublicInstance>();
  const groupRef = ref<ComponentPublicInstance>();
  const Harness = defineComponent({
    components: kbdComponents,
    setup() {
      return { groupRef, keyRef };
    },
    template: `
      <KbdGroup ref="groupRef" as-child aria-label="Command K">
        <span title="Command K">
          <Kbd ref="keyRef" as-child>
            <kbd title="Escape">Esc</kbd>
          </Kbd>
        </span>
      </KbdGroup>
    `,
  });

  render(Harness);

  const group = screen.getByRole('group', { name: 'Command K' });
  const key = screen.getByTitle('Escape');

  expect(group.tagName).toBe('SPAN');
  expect(groupRef.value?.$el).toBe(group);
  expect(key.tagName).toBe('KBD');
  expect(keyRef.value?.$el).toBe(key);
  expect(group).toHaveAttribute('data-part', 'group');
  expect(group).toHaveAttribute('data-slot', 'kbd-group');
  expect(key).toHaveAttribute('data-part', 'root');
  expect(key).toHaveAttribute('data-slot', 'kbd-root');
});

test('applies Tailwind utilities to the root and group parts', () => {
  const Harness = defineComponent({
    components: kbdComponents,
    template: `
      <KbdGroup data-testid="group">
        <Kbd data-testid="key">Cmd</Kbd>
      </KbdGroup>
    `,
  });

  render(Harness);

  expect(screen.getByTestId('key')).toHaveClass(
    'box-border',
    'inline-flex',
    'flex-none',
    'min-h-control-xs',
    'min-w-control-xs',
    'rounded-sm',
    'border',
    'border-border',
    'bg-muted',
    'px-2',
    'font-mono',
    'text-xs',
    'font-medium',
    'tabular-nums',
    'align-middle',
    'text-foreground',
    'wrap-anywhere',
    'select-none',
  );
  expect(screen.getByTestId('group')).toHaveClass(
    'box-border',
    'inline-flex',
    'flex-wrap',
    'items-center',
    'gap-1',
    'border-0',
    'bg-transparent',
    'p-0',
    'text-muted-foreground',
    'shadow-none',
    'align-middle',
  );
});

test('lets consumer Tailwind classes override conflicting defaults', () => {
  const Harness = defineComponent({
    components: kbdComponents,
    template: `
      <KbdGroup
        class="gap-3 bg-card p-2 text-foreground"
        data-testid="group"
        aria-label="Command K"
      >
        <Kbd
          class="min-h-8 min-w-8 rounded-md bg-card px-3 text-card-foreground shadow-none"
          data-testid="key"
        >
          Cmd
        </Kbd>
      </KbdGroup>
    `,
  });

  render(Harness);

  const group = screen.getByTestId('group');
  const key = screen.getByTestId('key');

  expect(group).toHaveClass('gap-3', 'p-2', 'bg-card', 'text-foreground');
  expect(group).not.toHaveClass('gap-1', 'p-0', 'bg-transparent', 'text-muted-foreground');
  expect(key).toHaveClass(
    'min-h-8',
    'min-w-8',
    'rounded-md',
    'px-3',
    'bg-card',
    'text-card-foreground',
    'shadow-none',
  );
  expect(key).not.toHaveClass(
    'min-h-control-xs',
    'min-w-control-xs',
    'rounded-sm',
    'px-2',
    'bg-muted',
    'text-foreground',
  );
});

test('renders the static factory composition on the server', async () => {
  const App = defineComponent({
    components: kbdComponents,
    template: `
      <KbdGroup aria-label="Command K">
        <Kbd>Cmd</Kbd>+<Kbd>K</Kbd>
      </KbdGroup>
    `,
  });

  const html = await renderToString(createSSRApp(App));

  expect(html).toContain('<span');
  expect(html).toContain('data-scope="kbd"');
  expect(html).toContain('data-part="group"');
  expect(html).toContain('data-slot="kbd-root"');
});