import { expect, test } from '@rstest/core';
import userEvent from '@testing-library/user-event';
import { fireEvent, render, screen } from '@testing-library/vue';
import { renderToString } from '@vue/server-renderer';
import { createSSRApp, defineComponent, mergeProps, nextTick, ref } from 'vue';
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
      '<Button ref="buttonRef" id="save-button" data-testid="button" data-probe="root" class="px-8" aria-label="Save changes">Save changes</Button>',
  });

  render(Harness);

  const button = screen.getByRole('button', { name: 'Save changes' });

  expect(buttonRef.value?.$el).toBe(button);
  expect(button).toHaveAttribute('id', 'save-button');
  expect(button).toHaveAttribute('data-probe', 'root');
  expect(button).toHaveAttribute('type', 'button');
  expect(button).not.toHaveAttribute('aria-busy');
  expect(button).not.toHaveAttribute('aria-disabled');
  expect(button).toHaveAttribute('data-scope', 'button');
  expect(button).toHaveAttribute('data-part', 'root');
  expect(button).toHaveAttribute('data-slot', 'button-root');
  expect(button).toHaveClass(
    'transition-[background-color,border-color,color,opacity,transform,translate]',
    'duration-150',
    'motion-reduce:transition-none',
  );
  expect(button).toHaveClass(
    "motion-safe:[&[data-slot='button-root']:not([data-variant='link']):not([aria-haspopup]):active]:translate-y-px",
  );
  expect(button).not.toHaveClass(
    "motion-safe:[&:not([data-variant='link']):active]:translate-y-px",
  );
  expect(button).toHaveAttribute('data-variant', 'default');
  expect(button).toHaveAttribute('data-size', 'md');
  expect(button).toHaveClass('px-8');
  expect(button.className).not.toContain('px-4');
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

    for (const value of [true, 'true'] as const) {
      ariaDisabled.value = value;
      ariaBusy.value = true;
      await nextTick();
      expect(host).toHaveAttribute('aria-disabled', 'true');
      expect(host).toHaveAttribute('aria-busy', 'true');
      expect(host).toHaveAttribute('data-disabled');
      await fireEvent.click(host);
      expect(activations).toBe(0);
    }

    ariaDisabled.value = false;
    ariaBusy.value = undefined;
    await nextTick();
    expect(host).toHaveAttribute('aria-disabled', 'false');
    expect(host).not.toHaveAttribute('aria-busy');
    expect(host).not.toHaveAttribute('data-disabled');
    if (!asChild) expect(host).not.toBeDisabled();
    await fireEvent.click(host);
    expect(activations).toBe(1);

    loading.value = true;
    await nextTick();
    expect(host).toHaveAttribute('aria-busy', 'true');
    expect(host).toHaveAttribute('aria-disabled', 'true');
    loading.value = false;
    await nextTick();
    expect(host).not.toHaveAttribute('aria-busy');
    expect(host).toHaveAttribute('aria-disabled', 'false');
    expect(screen.getByRole(asChild ? 'link' : 'button', { name: 'Continue' })).toBe(host);
  },
);

test.each([false, true])(
  'invokes merged native listeners once in event order (asChild=%s)',
  async (asChild) => {
    const user = userEvent.setup();
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
    await user.click(screen.getByRole(asChild ? 'link' : 'button', { name: 'Continue' }));
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
  const user = userEvent.setup();
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
  await user.click(screen.getByRole('link', { name: 'Continue' }));
  expect(calls).toEqual(['first capture', 'second capture', 'click true']);
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
      <Button as-child variant="outline" class="px-8">
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
  expect(link).toHaveClass('px-8');

  app.unmount();
  host.remove();
});