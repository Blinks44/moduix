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

test('keeps owned anatomy and group semantics when consumer props conflict', () => {
  const Harness = defineComponent({
    components: kbdComponents,
    template: `
      <Kbd data-part="consumer" data-scope="consumer" data-testid="kbd">
        A
        <KbdGroup data-part="consumer" data-scope="consumer" role="presentation">
          B
        </KbdGroup>
      </Kbd>
    `,
  });

  render(Harness);

  expect(screen.getByTestId('kbd')).toHaveAttribute('data-scope', 'kbd');
  expect(screen.getByTestId('kbd')).toHaveAttribute('data-part', 'root');
  expect(screen.getByRole('group')).toHaveAttribute('data-scope', 'kbd');
  expect(screen.getByRole('group')).toHaveAttribute('data-part', 'group');
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