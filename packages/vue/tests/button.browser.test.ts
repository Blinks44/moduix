import { page } from '@rstest/browser';
import { expect, rs, test } from '@rstest/core';
import { render, screen } from '@testing-library/vue';
import { renderToString } from '@vue/server-renderer';
import { createSSRApp, mergeProps, nextTick, ref } from 'vue';
import type { ComponentPublicInstance } from 'vue';
import { Button } from '../src';
import SsrButton from './fixtures/SsrButton.vue';

test('renders a native button with safe defaults, stable hooks, attrs, classes, and a Vue ref', async () => {
  const buttonRef = ref<ComponentPublicInstance | null>(null);

  render({
    components: { Button },
    setup() {
      return { buttonRef };
    },
    template:
      '<Button ref="buttonRef" id="save-button" data-testid="button" data-probe="root" class="consumer-class" aria-label="Save changes">Save changes</Button>',
  });

  const button = screen.getByRole('button', { name: 'Save changes' });

  expect(buttonRef.value?.$el).toBe(button);
  const buttonLocator = page.getByRole('button', { name: 'Save changes' });

  await expect.element(buttonLocator).toHaveAttribute('id', 'save-button');
  expect(button.getAttribute('data-probe')).toBe('root');
  await expect.element(buttonLocator).toHaveAttribute('type', 'button');
  await expect.element(buttonLocator).not.toHaveAttribute('aria-busy');
  await expect.element(buttonLocator).not.toHaveAttribute('aria-disabled');
  expect(button.dataset).toMatchObject({
    scope: 'button',
    part: 'root',
    slot: 'button-root',
    variant: 'default',
    size: 'md',
  });
  expect(button.className.endsWith('consumer-class')).toBe(true);
});

test('preserves semantic anchors, refs, data hooks, and composed event handlers with asChild', async () => {
  const buttonRef = ref<ComponentPublicInstance | null>(null);
  const calls: string[] = [];

  render({
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

  const link = screen.getByRole('link', { name: 'Read the docs' });

  expect(buttonRef.value?.$el).toBe(link);
  await expect
    .element(page.getByRole('link', { name: 'Read the docs' }))
    .toHaveAttribute('href', '#docs');
  await expect
    .element(page.getByRole('link', { name: 'Read the docs' }))
    .not.toHaveAttribute('type');
  expect(link.dataset).toMatchObject({ scope: 'dialog', part: 'trigger', slot: 'custom-trigger' });

  await page.getByRole('link', { name: 'Read the docs' }).click();

  expect(calls).toEqual(['button capture', 'link click', 'button click']);
});

test('disables custom hosts accessibly and prevents activation', async () => {
  let activationCount = 0;

  render({
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

  const link = screen.getByRole('link', { name: 'Read the docs' });

  await expect
    .element(page.getByRole('link', { name: 'Read the docs' }))
    .toHaveAttribute('aria-disabled', 'true');
  await expect
    .element(page.getByRole('link', { name: 'Read the docs' }))
    .toHaveAttribute('data-disabled');

  expect(link.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }))).toBe(
    false,
  );
  expect(activationCount).toBe(0);
});

test('aria-disabled prevents activation and disables a native button', async () => {
  let activationCount = 0;

  render({
    components: { Button },
    setup() {
      return { handleClick: () => activationCount++ };
    },
    template: '<Button aria-disabled="true" @click="handleClick">Unavailable</Button>',
  });

  const button = screen.getByRole('button', { name: 'Unavailable' });

  await expect.element(page.getByRole('button', { name: 'Unavailable' })).toBeDisabled();
  await expect
    .element(page.getByRole('button', { name: 'Unavailable' }))
    .toHaveAttribute('aria-disabled', 'true');
  await expect
    .element(page.getByRole('button', { name: 'Unavailable' }))
    .toHaveAttribute('data-disabled');

  expect(button.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }))).toBe(
    false,
  );

  expect(activationCount).toBe(0);
});

test('wires the loading state without taking over its content', async () => {
  render({
    components: { Button },
    template: '<Button loading>Saving</Button>',
  });

  const button = screen.getByRole('button', { name: 'Saving' });

  await expect.element(page.getByRole('button', { name: 'Saving' })).toBeDisabled();
  await expect
    .element(page.getByRole('button', { name: 'Saving' }))
    .toHaveAttribute('aria-busy', 'true');
  await expect
    .element(page.getByRole('button', { name: 'Saving' }))
    .toHaveAttribute('aria-disabled', 'true');
  await expect
    .element(page.getByRole('button', { name: 'Saving' }))
    .toHaveAttribute('data-disabled');
  expect(button.hasAttribute('data-loading')).toBe(true);
});

test.each([false, true])(
  'updates native ARIA state without remounting (asChild=%s)',
  async (asChild) => {
    const ariaDisabled = ref<boolean | 'false' | 'true'>('false');
    const ariaBusy = ref<boolean | undefined>(false);
    const loading = ref(false);
    let activations = 0;
    render({
      components: { Button },
      setup: () => ({ asChild, ariaDisabled, ariaBusy, loading, activate: () => activations++ }),
      template: `
      <Button :as-child="asChild" :aria-disabled="ariaDisabled" :aria-busy="ariaBusy" :loading="loading" @click="activate">
        <a v-if="asChild" href="#docs">Continue</a>
        <template v-else>Continue</template>
      </Button>
    `,
    });
    const host = screen.getByRole(asChild ? 'link' : 'button', { name: 'Continue' });

    const button = page.getByRole(asChild ? 'link' : 'button', { name: 'Continue' });

    for (const value of [true, 'true'] as const) {
      ariaDisabled.value = value;
      ariaBusy.value = true;
      await nextTick();
      await expect.element(button).toHaveAttribute('aria-disabled', 'true');
      await expect.element(button).toHaveAttribute('aria-busy', 'true');
      await expect.element(button).toHaveAttribute('data-disabled');
      expect(host.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }))).toBe(
        false,
      );
      expect(activations).toBe(0);
    }

    ariaDisabled.value = false;
    ariaBusy.value = undefined;
    await nextTick();
    await expect.element(button).toHaveAttribute('aria-disabled', 'false');
    await expect.element(button).not.toHaveAttribute('aria-busy');
    await expect.element(button).not.toHaveAttribute('data-disabled');
    if (!asChild) await expect.element(button).not.toBeDisabled();
    await button.click();
    expect(activations).toBe(1);

    loading.value = true;
    await nextTick();
    await expect.element(button).toHaveAttribute('aria-busy', 'true');
    await expect.element(button).toHaveAttribute('aria-disabled', 'true');
    loading.value = false;
    await nextTick();
    await expect.element(button).not.toHaveAttribute('aria-busy');
    await expect.element(button).toHaveAttribute('aria-disabled', 'false');
    expect(screen.getByRole(asChild ? 'link' : 'button', { name: 'Continue' })).toBe(host);
  },
);

test.each([false, true])(
  'invokes merged native listeners once in event order (asChild=%s)',
  async (asChild) => {
    const calls: string[] = [];
    const listeners = mergeProps(
      {
        onClickCapture: () => calls.push('first capture'),
        onClick: () => calls.push('first click'),
      },
      {
        onClickCapture: () => calls.push('second capture'),
        onClick: () => calls.push('second click'),
      },
    );
    render({
      components: { Button },
      setup: () => ({ asChild, listeners, childClick: () => calls.push('child click') }),
      template: `
      <Button v-bind="listeners" :as-child="asChild">
        <a v-if="asChild" href="#docs" @click="childClick">Continue</a>
        <template v-else>Continue</template>
      </Button>
    `,
    });
    await page.getByRole(asChild ? 'link' : 'button', { name: 'Continue' }).click();
    expect(calls).toEqual([
      'first capture',
      'second capture',
      ...(asChild ? ['child click'] : []),
      'first click',
      'second click',
    ]);
  },
);

test('preserves cancellation by merged capture listeners on a custom host', async () => {
  const calls: string[] = [];
  const listeners = mergeProps(
    {
      onClickCapture: (event: MouseEvent) => {
        calls.push('first capture');
        event.preventDefault();
      },
    },
    {
      onClickCapture: () => calls.push('second capture'),
      onClick: (event: MouseEvent) => calls.push(`click ${event.defaultPrevented}`),
    },
  );
  render({
    components: { Button },
    setup: () => ({ listeners }),
    template: '<Button as-child v-bind="listeners"><a href="#docs">Continue</a></Button>',
  });
  await page.getByRole('link', { name: 'Continue' }).click();
  expect(calls).toEqual(['first capture', 'second capture', 'click true']);
});

test('applies explicit variant and size values to the root', () => {
  render({
    components: { Button },
    template:
      '<Button aria-label="Delete item" size="icon-lg" variant="destructive-outline">×</Button>',
  });

  const button = screen.getByRole('button', { name: 'Delete item' });

  expect(button.dataset).toMatchObject({ size: 'icon-lg', variant: 'destructive-outline' });
});

test('hydrates button without replacing server hosts or ids', async () => {
  const html = await renderToString(createSSRApp(SsrButton));
  const host = document.createElement('div');
  host.innerHTML = html;
  document.body.append(host);
  const serverNodes = [...host.querySelectorAll('[data-slot]')];
  const serverIds = [...host.querySelectorAll('[id]')].map((node) => node.id);
  const warn = rs.spyOn(console, 'warn');
  const error = rs.spyOn(console, 'error');
  const app = createSSRApp(SsrButton);

  try {
    app.mount(host);
    await nextTick();
    const hydratedNodes = [...host.querySelectorAll('[data-slot]')];
    expect(hydratedNodes).toHaveLength(serverNodes.length);
    hydratedNodes.forEach((node, index) => expect(node).toBe(serverNodes[index]));
    expect([...host.querySelectorAll('[id]')].map((node) => node.id)).toEqual(serverIds);
    const link = host.querySelector('a')!;
    expect(host.querySelectorAll('a')).toHaveLength(1);
    expect(link.getAttribute('href')).toBe('#docs');
    expect(link.getAttribute('data-variant')).toBe('outline');
    expect(link.classList.contains('consumer-class')).toBe(true);
    expect(warn).not.toHaveBeenCalled();
    expect(error).not.toHaveBeenCalled();
  } finally {
    app.unmount();
    host.remove();
    warn.mockRestore();
    error.mockRestore();
  }
});