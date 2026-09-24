import { expect, test } from '@rstest/core';
import { fireEvent, render, screen } from '@testing-library/vue';
import { renderToString } from '@vue/server-renderer';
import { createSSRApp, defineComponent, ref } from 'vue';
import type { ComponentPublicInstance } from 'vue';
import { Button } from '../src';

test('renders a native button with safe defaults, stable hooks, attrs, classes, and a Vue ref', () => {
  const buttonRef = ref<ComponentPublicInstance | null>(null);
  const Harness = defineComponent({
    components: { Button },
    setup() {
      return { buttonRef };
    },
    template:
      '<Button ref="buttonRef" id="save-button" data-testid="button" data-probe="root" class="consumer-class" aria-label="Save changes">Save changes</Button>',
  });

  render(Harness);

  const button = screen.getByRole('button', { name: 'Save changes' });

  expect(buttonRef.value?.$el).toBe(button);
  expect(button).toHaveAttribute('id', 'save-button');
  expect(button).toHaveAttribute('data-probe', 'root');
  expect(button).toHaveAttribute('type', 'button');
  expect(button).not.toHaveAttribute('aria-busy');
  expect(button).toHaveAttribute('data-scope', 'button');
  expect(button).toHaveAttribute('data-part', 'root');
  expect(button).toHaveAttribute('data-slot', 'button-root');
  expect(button).toHaveAttribute('data-variant', 'default');
  expect(button).toHaveAttribute('data-size', 'md');
  expect(button.className.endsWith('consumer-class')).toBe(true);
});

test('preserves semantic anchors, refs, data hooks, and composed event handlers with asChild', async () => {
  const buttonRef = ref<ComponentPublicInstance | null>(null);
  const calls: string[] = [];
  const Harness = defineComponent({
    components: { Button },
    setup() {
      return {
        buttonRef,
        calls,
        handleButtonCapture: () => calls.push('button capture'),
        handleButtonClick: () => calls.push('button click'),
        handleLinkClick: () => calls.push('link click'),
      };
    },
    template: `
      <Button
        ref="buttonRef"
        as-child
        data-scope="dialog"
        data-part="trigger"
        data-slot="custom-trigger"
        variant="outline"
        @click.capture="handleButtonCapture"
        @click="handleButtonClick"
      >
        <a href="#docs" @click="handleLinkClick">Read the docs</a>
      </Button>
    `,
  });

  render(Harness);

  const link = screen.getByRole('link', { name: 'Read the docs' });

  expect(buttonRef.value?.$el).toBe(link);
  expect(link).toHaveAttribute('href', '#docs');
  expect(link).not.toHaveAttribute('type');
  expect(link).toHaveAttribute('data-scope', 'dialog');
  expect(link).toHaveAttribute('data-part', 'trigger');
  expect(link).toHaveAttribute('data-slot', 'custom-trigger');

  await fireEvent.click(link);

  expect(calls).toEqual(['button capture', 'link click', 'button click']);
});

test('disables custom hosts accessibly and prevents activation', async () => {
  let activationCount = 0;
  const Harness = defineComponent({
    components: { Button },
    setup() {
      return { handleClick: () => activationCount++ };
    },
    template: `
      <Button as-child disabled @click="handleClick">
        <a href="#docs" @click="handleClick">Read the docs</a>
      </Button>
    `,
  });

  render(Harness);

  const link = screen.getByRole('link', { name: 'Read the docs' });

  expect(link).toHaveAttribute('aria-disabled', 'true');
  expect(link).toHaveAttribute('data-disabled');

  await fireEvent.click(link);

  expect(activationCount).toBe(0);
});

test('aria-disabled prevents activation and disables a native button', async () => {
  let activationCount = 0;
  const Harness = defineComponent({
    components: { Button },
    setup() {
      return { handleClick: () => activationCount++ };
    },
    template: '<Button aria-disabled="true" @click="handleClick">Unavailable</Button>',
  });

  render(Harness);

  const button = screen.getByRole('button', { name: 'Unavailable' });

  expect(button).toBeDisabled();
  expect(button).toHaveAttribute('aria-disabled', 'true');
  expect(button).toHaveAttribute('data-disabled');

  await fireEvent.click(button);

  expect(activationCount).toBe(0);
});

test('wires the loading state without taking over its content', () => {
  render({
    components: { Button },
    template: '<Button loading>Saving</Button>',
  });

  const button = screen.getByRole('button', { name: 'Saving' });

  expect(button).toBeDisabled();
  expect(button).toHaveAttribute('aria-busy', 'true');
  expect(button).toHaveAttribute('aria-disabled', 'true');
  expect(button).toHaveAttribute('data-disabled');
  expect(button).toHaveAttribute('data-loading');
});

test('applies explicit variant and size values to the root', () => {
  render({
    components: { Button },
    template:
      '<Button aria-label="Delete item" size="icon-lg" variant="destructive-outline">×</Button>',
  });

  const button = screen.getByRole('button', { name: 'Delete item' });

  expect(button).toHaveAttribute('data-size', 'icon-lg');
  expect(button).toHaveAttribute('data-variant', 'destructive-outline');
});

test('renders and hydrates the semantic asChild host on the server', async () => {
  const App = defineComponent({
    components: { Button },
    template: `
      <Button as-child variant="outline" class="consumer-class">
        <a href="#docs" aria-label="Open docs">Read the docs</a>
      </Button>
    `,
  });

  const html = await renderToString(createSSRApp(App));
  expect(html).toContain('<a');
  expect(html).toContain('data-slot="button-root"');
  expect(html).not.toContain('type="button"');

  const host = document.createElement('div');
  host.innerHTML = html;
  document.body.append(host);
  const app = createSSRApp(App);
  app.mount(host);

  const link = host.querySelector('a');
  expect(host.querySelectorAll('a')).toHaveLength(1);
  expect(link).toHaveAttribute('href', '#docs');
  expect(link).toHaveAttribute('data-variant', 'outline');
  expect(link).toHaveClass('consumer-class');

  app.unmount();
  host.remove();
});