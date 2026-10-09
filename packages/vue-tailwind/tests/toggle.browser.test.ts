import { page } from '@rstest/browser';
import { expect, rs, test } from '@rstest/core';
import { render, screen } from '@testing-library/vue';
import { renderToString } from '@vue/server-renderer';
import { createSSRApp, nextTick, ref } from 'vue';
import type { ComponentPublicInstance } from 'vue';
import { Toggle, ToggleContext, ToggleIndicator, useToggleContext } from '../src';
import * as toggleEntry from '../src/components/toggle';
import * as toggleSource from '../src/components/toggle/Toggle.vue';
import SsrToggle from './fixtures/SsrToggle.vue';
import SsrToggleHost from './fixtures/SsrToggleHost.vue';

const toggleComponents = { Toggle, ToggleContext, ToggleIndicator };

const ToggleStateLabel = {
  setup() {
    return { toggle: useToggleContext() };
  },
  template: '<span>{{ toggle.pressed ? "Enabled" : "Disabled" }}</span>',
};

test('keeps toggleVariants out of package and registry source entry points', () => {
  expect('toggleVariants' in toggleEntry).toBe(false);
  expect('toggleVariants' in toggleSource).toBe(false);
});

test('preserves the Ark button contract, Vue refs, named fallback slot, and styled icon slots', async () => {
  const rootRef = ref<ComponentPublicInstance>();
  const indicatorRef = ref<ComponentPublicInstance>();

  render({
    components: toggleComponents,
    setup() {
      return { indicatorRef, rootRef };
    },
    template: `
      <Toggle ref="rootRef" default-pressed data-testid="toggle">
        <svg aria-hidden="true" />
        Favorite
        <ToggleIndicator ref="indicatorRef">
          <svg aria-label="On icon" />
          <template #fallback><svg aria-label="Off icon" /></template>
        </ToggleIndicator>
        <ToggleContext v-slot="context">
          <span data-testid="context-state">{{ context.pressed ? 'On' : 'Off' }}</span>
        </ToggleContext>
      </Toggle>
    `,
  });

  const toggle = screen.getByTestId('toggle');
  const indicator = document.querySelector<HTMLElement>('[data-slot="toggle-indicator"]')!;

  expect(rootRef.value?.$el).toBe(toggle);
  expect(indicatorRef.value?.$el).toBe(indicator);
  await expect.element(page.getByTestId('toggle')).toHaveAttribute('type', 'button');
  await expect.element(page.getByTestId('toggle')).toHaveAttribute('aria-pressed', 'true');
  expect(toggle.dataset).toMatchObject({ scope: 'toggle', part: 'root' });
  await expect.element(page.getByTestId('toggle')).toHaveAttribute('data-state', 'on');
  expect(toggle.dataset).toMatchObject({ slot: 'toggle-root', variant: 'default', size: 'md' });
  expect(indicator.dataset).toMatchObject({ part: 'indicator', slot: 'toggle-indicator' });
  await expect.element(page.getByLabel('On icon')).toBeVisible();
  expect(screen.queryByLabelText('Off icon')).toBeNull();
  await expect.element(page.getByTestId('context-state')).toContainText('On');
});

test('keeps controlled state, context, disabled, and asChild behavior Ark-shaped', async () => {
  const changes: boolean[] = [];
  const updates: boolean[] = [];
  const pressed = ref(false);
  const rootRef = ref<ComponentPublicInstance>();

  render({
    components: { ...toggleComponents, ToggleStateLabel },
    setup() {
      return { changes, pressed, rootRef, updates };
    },
    template: `
      <Toggle
        v-model:pressed="pressed"
        @pressed-change="changes.push($event)"
        @update:pressed="updates.push($event)"
      >
        <ToggleStateLabel />
      </Toggle>
      <Toggle disabled>Disabled toggle</Toggle>
      <Toggle ref="rootRef" as-child default-pressed>
        <button type="button">Custom toggle</button>
      </Toggle>
    `,
  });

  await expect
    .element(page.getByRole('button', { name: 'Disabled', exact: true }))
    .toHaveAttribute('aria-pressed', 'false');
  await page.getByRole('button', { name: 'Disabled', exact: true }).click();
  await expect
    .element(page.getByRole('button', { name: 'Enabled' }))
    .toHaveAttribute('aria-pressed', 'true');
  await expect.element(page.getByText('Enabled')).toBeVisible();
  expect(changes).toEqual([true]);
  expect(updates).toEqual([true]);
  expect(pressed.value).toBe(true);

  const disabledToggle = screen.getByRole('button', { name: 'Disabled toggle' });
  const customToggle = screen.getByRole('button', { name: 'Custom toggle' });

  const disabledToggleLocator = page.getByRole('button', { name: 'Disabled toggle' });

  await expect.element(disabledToggleLocator).toBeDisabled();
  await expect.element(disabledToggleLocator).toHaveAttribute('data-disabled');
  disabledToggle.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));
  await expect.element(disabledToggleLocator).toHaveAttribute('aria-pressed', 'false');
  expect(customToggle.tagName).toBe('BUTTON');
  await expect
    .element(page.getByRole('button', { name: 'Custom toggle' }))
    .toHaveAttribute('aria-pressed', 'true');
  expect(customToggle.getAttribute('data-slot')).toBe('toggle-root');
  expect(rootRef.value?.$el).toBe(customToggle);
});

test('preserves ToggleIndicator asChild composition', async () => {
  render({
    components: toggleComponents,
    template:
      '<Toggle default-pressed><ToggleIndicator as-child><span data-testid="indicator-host">On</span></ToggleIndicator></Toggle>',
  });

  const indicator = screen.getByTestId('indicator-host');

  expect(indicator.tagName).toBe('SPAN');
  expect(indicator.dataset).toMatchObject({ part: 'indicator', slot: 'toggle-indicator' });
  await expect.element(page.getByTestId('indicator-host')).toContainText('On');
});

test('supports native button keyboard activation', async () => {
  render({ template: '<button type="button">Before</button>' });

  render({
    components: toggleComponents,
    template: '<Toggle>Notifications</Toggle>',
  });

  await page.getByRole('button', { name: 'Before' }).press('Tab');
  const toggle = page.getByRole('button', { name: 'Notifications' });

  await expect.element(toggle).toBeFocused();
  await toggle.press('Space');
  await expect.element(toggle).toHaveAttribute('aria-pressed', 'true');

  await toggle.press('Enter');
  await expect.element(toggle).toHaveAttribute('aria-pressed', 'false');
});

test('reactively preserves attrs, visual props, fallback slots and single native listeners', async () => {
  const pressed = ref(false);
  const disabled = ref(false);
  const size = ref<'md' | 'icon-lg'>('md');
  const variant = ref<'default' | 'ghost'>('default');
  const label = ref('Favorite');
  const consumerClass = ref('consumer-toggle');
  const clicks = rs.fn();
  const changes = rs.fn();
  const submit = rs.fn();

  render({
    components: toggleComponents,
    setup: () => ({
      pressed,
      disabled,
      size,
      variant,
      label,
      consumerClass,
      clicks,
      changes,
      submit,
    }),
    template: `
      <form @submit.prevent="submit">
        <Toggle v-model:pressed="pressed" :disabled="disabled" :size="size" :variant="variant"
          :aria-label="label" :class="[consumerClass, { 'conditional-class': true }]"
          :style="[{ color: 'red' }, { marginTop: '7px' }]"
          data-slot="consumer-slot" data-size="consumer-size" @click="clicks" @pressed-change="changes">
          <ToggleIndicator class="consumer-indicator">
            <span>On</span><template #fallback><span>Off</span></template>
          </ToggleIndicator>
        </Toggle>
      </form>
    `,
  });
  const toggle = screen.getByRole('button', { name: 'Favorite' });
  const indicator = toggle.querySelector('[data-slot="toggle-indicator"]')!;
  await expect.element(page.getByText('Off')).toBeVisible();
  expect([...toggle!.classList]).toEqual(
    expect.arrayContaining(['consumer-toggle', 'conditional-class']),
  );
  expect(indicator?.classList.contains('consumer-indicator')).toBe(true);
  expect(getComputedStyle(toggle!).color).toBe('rgb(255, 0, 0)');
  expect(getComputedStyle(toggle!).marginTop).toBe('7px');
  expect(toggle.dataset).toMatchObject({ slot: 'toggle-root', size: 'md' });
  await page.getByRole('button', { name: 'Favorite' }).click();
  expect(pressed.value).toBe(true);
  expect(clicks).toHaveBeenCalledTimes(1);
  expect(changes).toHaveBeenCalledExactlyOnceWith(true);
  expect(submit).not.toHaveBeenCalled();
  await expect.element(page.getByText('On')).toBeVisible();
  expect(screen.queryByText('Off')).toBeNull();

  size.value = 'icon-lg';
  variant.value = 'ghost';
  label.value = 'Saved';
  consumerClass.value = 'updated-toggle';
  disabled.value = true;
  await nextTick();
  expect(toggle.dataset).toMatchObject({ size: 'icon-lg', variant: 'ghost' });
  expect(screen.getByRole('button', { name: 'Saved' })).toBe(toggle);
  expect(toggle?.classList.contains('updated-toggle')).toBe(true);
  expect(toggle?.classList.contains('consumer-toggle')).toBe(false);
  await expect.element(page.getByRole('button', { name: 'Saved' })).toBeDisabled();
  toggle.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));
  expect(changes).toHaveBeenCalledTimes(1);

  pressed.value = false;
  await nextTick();
  await expect.element(page.getByText('Off')).toBeVisible();
  expect(toggle.querySelector('[data-slot="toggle-indicator"]')).toBe(indicator);
});

test('keeps a controlled context setPressed request subject to the parent value', async () => {
  const pressed = ref(false);
  const changes = rs.fn();
  const updates = rs.fn();
  render({
    components: toggleComponents,
    setup: () => ({ pressed, changes, updates }),
    template: `
      <Toggle :pressed="pressed" @pressed-change="changes" @update:pressed="updates">
        <ToggleContext v-slot="context">
          <span @click.stop="context.setPressed(true)">Enable</span>
        </ToggleContext>
      </Toggle>
    `,
  });

  await page.getByText('Enable').click();
  expect(changes).toHaveBeenCalledExactlyOnceWith(true);
  expect(updates).toHaveBeenCalledExactlyOnceWith(true);
  await expect.element(page.getByRole('button')).toHaveAttribute('aria-pressed', 'false');
  pressed.value = true;
  await nextTick();
  await expect.element(page.getByRole('button')).toHaveAttribute('aria-pressed', 'true');
});

test('hydrates asChild hosts and switches indicator hosts through native slots', async () => {
  const html = await renderToString(createSSRApp(SsrToggleHost));
  const host = document.createElement('div');
  host.innerHTML = html;
  document.body.append(host);
  const serverNodes = [...host.querySelectorAll('[data-slot]')];
  const serverIds = [...host.querySelectorAll('[id]')].map((node) => node.id);
  const warn = rs.spyOn(console, 'warn');
  const error = rs.spyOn(console, 'error');
  const app = createSSRApp(SsrToggleHost);

  try {
    const instance = app.mount(host);
    await nextTick();
    const hydratedNodes = [...host.querySelectorAll('[data-slot]')];
    expect(hydratedNodes).toHaveLength(serverNodes.length);
    hydratedNodes.forEach((node, index) => expect(node).toBe(serverNodes[index]));
    expect([...host.querySelectorAll('[id]')].map((node) => node.id)).toEqual(serverIds);
    const toggle = host.querySelector('button');
    const off = host.querySelector('em');
    expect((instance.$refs.rootRef as ComponentPublicInstance).$el).toBe(toggle);
    expect((instance.$refs.indicatorRef as ComponentPublicInstance).$el).toBe(off);
    await page.getByRole('button', { name: 'Favorite' }).click();
    await expect.element(page.getByTestId('on')).toBeAttached();
    const indicator = host.querySelector('strong');
    expect(indicator?.getAttribute('data-part')).toBe('indicator');
    expect((instance.$refs.indicatorRef as ComponentPublicInstance).$el).toBe(indicator);
    expect(host.querySelector('em')).toBeNull();
    expect(toggle?.getAttribute('aria-pressed')).toBe('true');
    expect(warn).not.toHaveBeenCalled();
    expect(error).not.toHaveBeenCalled();
  } finally {
    app.unmount();
    host.remove();
    warn.mockRestore();
    error.mockRestore();
  }
});

test('hydrates toggle without replacing server hosts or ids', async () => {
  const html = await renderToString(createSSRApp(SsrToggle));
  const host = document.createElement('div');
  host.innerHTML = html;
  document.body.append(host);
  const serverNodes = [...host.querySelectorAll('[data-slot]')];
  const serverIds = [...host.querySelectorAll('[id]')].map((node) => node.id);
  const warn = rs.spyOn(console, 'warn');
  const error = rs.spyOn(console, 'error');
  const app = createSSRApp(SsrToggle);

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

test('applies native utilities to component-owned visual parts', () => {
  render({
    components: toggleComponents,
    template: `
      <Toggle variant="outline">
        <svg aria-hidden="true" />
        <ToggleIndicator><svg aria-hidden="true" /></ToggleIndicator>
      </Toggle>
    `,
  });

  const toggle = screen.getByRole('button');
  const indicator = document.querySelector('[data-slot="toggle-indicator"]')!;

  expect([...toggle!.classList]).toEqual(
    expect.arrayContaining([
      'box-border',
      'inline-flex',
      'min-h-control-md',
      'gap-2',
      'rounded-md',
      'border',
      'bg-background',
      'px-4',
      'py-1',
      'text-sm',
      '[&>svg]:block',
      '[&>svg]:size-4',
      '[&>svg]:shrink-0',
    ]),
  );
  expect([...indicator!.classList]).toEqual(
    expect.arrayContaining([
      'inline-flex',
      'items-center',
      'justify-center',
      '[&>svg]:block',
      '[&>svg]:size-4',
    ]),
  );
});

test('lets consumer Tailwind classes override conflicting defaults', () => {
  render({
    components: toggleComponents,
    template:
      '<Toggle class="border-primary bg-secondary p-0 text-xs" size="lg" variant="outline">Save changes</Toggle>',
  });

  const toggle = screen.getByRole('button', { name: 'Save changes' });

  expect([...toggle!.classList]).toEqual(
    expect.arrayContaining(['border-primary', 'bg-secondary', 'p-0', 'text-xs']),
  );
  for (const utility of ['border-border', 'bg-background', 'px-5', 'py-1.5', 'text-md']) {
    expect(toggle!.classList.contains(utility)).toBe(false);
  }
  expect(toggle.classList.contains('min-h-control-lg')).toBe(true);
  expect(getComputedStyle(toggle)).toMatchObject({
    minHeight: '40px',
    paddingTop: '0px',
    paddingRight: '0px',
    paddingBottom: '0px',
    paddingLeft: '0px',
    fontSize: '12px',
  });
});