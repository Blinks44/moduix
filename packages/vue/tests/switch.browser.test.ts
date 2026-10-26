import { page } from '@rstest/browser';
import { expect, rs, test } from '@rstest/core';
import { render, screen } from '@testing-library/vue';
import { renderToString } from '@vue/server-renderer';
import { createSSRApp, nextTick, defineComponent, ref } from 'vue';
import type { ComponentPublicInstance } from 'vue';
import {
  Switch,
  SwitchControl,
  SwitchHiddenInput,
  SwitchLabel,
  SwitchRootProvider,
  SwitchThumb,
  useSwitch,
  useSwitchContext,
} from '../src';

const switchComponents = {
  Switch,
  SwitchControl,
  SwitchHiddenInput,
  SwitchLabel,
  SwitchRootProvider,
  SwitchThumb,
};

test('submits through explicit Ark inputs for roots', () => {
  const { container } = render({
    components: switchComponents,
    setup() {
      return {
        providerSwitch: useSwitch({ defaultChecked: true, name: 'provider-notifications' }),
      };
    },
    template: `
      <form>
        <Switch :default-checked="true" name="notifications" value="email">
          <SwitchControl />
          <SwitchHiddenInput />
          <SwitchLabel>Email notifications</SwitchLabel>
        </Switch>
        <SwitchRootProvider :value="providerSwitch">
          <SwitchControl />
          <SwitchHiddenInput />
          <SwitchLabel>Provider notifications</SwitchLabel>
        </SwitchRootProvider>
      </form>
    `,
  });
  const form = container.querySelector('form')!;

  expect(container.querySelectorAll('input[type="checkbox"]')).toHaveLength(2);
  expect(Array.from(new FormData(form).entries())).toEqual([
    ['notifications', 'email'],
    ['provider-notifications', 'on'],
  ]);
});

test('preserves Ark behavior and semantic asChild composition', async () => {
  const rootRef = ref<ComponentPublicInstance | null>(null);

  render({
    components: switchComponents,
    setup() {
      return { rootRef };
    },
    template: `
      <Switch ref="rootRef" as-child>
        <label aria-label="Enable reminders">
          <SwitchControl />
          <SwitchHiddenInput />
          <SwitchLabel>Enable reminders</SwitchLabel>
        </label>
      </Switch>
    `,
  });
  const switchInput = screen.getByRole('checkbox', { name: 'Enable reminders' });

  const switchInputLocator = page.getByRole('checkbox', { name: 'Enable reminders', exact: true });
  await expect.element(switchInputLocator).not.toBeChecked();
  await page.getByText('Enable reminders', { exact: true }).click();
  await expect.element(switchInputLocator).toBeChecked();
  await expect.element(switchInputLocator).toHaveAttribute('type', 'checkbox');
  expect(rootRef.value?.$el).toBe(switchInput.closest('label'));
});

test('forwards Vue refs and exposes stable slots on public parts', () => {
  const refs = {
    root: ref<ComponentPublicInstance | null>(null),
    control: ref<ComponentPublicInstance | null>(null),
    thumb: ref<ComponentPublicInstance | null>(null),
    label: ref<ComponentPublicInstance | null>(null),
  };

  render({
    components: switchComponents,
    setup() {
      return {
        rootRef: refs.root,
        controlRef: refs.control,
        thumbRef: refs.thumb,
        labelRef: refs.label,
      };
    },
    template: `
      <Switch ref="rootRef" size="lg" data-size="sm">
        <SwitchControl ref="controlRef">
          <SwitchThumb ref="thumbRef" />
        </SwitchControl>
        <SwitchHiddenInput />
        <SwitchLabel ref="labelRef">Email notifications</SwitchLabel>
      </Switch>
    `,
  });

  expect(refs.root.value?.$el?.getAttribute('data-slot')).toBe('switch-root');
  expect(refs.root.value?.$el?.getAttribute('data-size')).toBe('lg');
  expect(refs.control.value?.$el?.getAttribute('data-slot')).toBe('switch-control');
  expect(refs.thumb.value?.$el?.getAttribute('data-slot')).toBe('switch-thumb');
  expect(refs.label.value?.$el?.getAttribute('data-slot')).toBe('switch-label');
});

test('preserves disabled, read-only, invalid, and required semantics', async () => {
  render({
    components: switchComponents,
    template: `
      <Switch disabled>
        <SwitchControl />
        <SwitchHiddenInput />
        <SwitchLabel>Disabled option</SwitchLabel>
      </Switch>
      <Switch read-only>
        <SwitchControl />
        <SwitchHiddenInput />
        <SwitchLabel>Read-only option</SwitchLabel>
      </Switch>
      <Switch invalid required>
        <SwitchControl />
        <SwitchHiddenInput />
        <SwitchLabel>Required option</SwitchLabel>
      </Switch>
    `,
  });

  const readOnly = screen.getByRole('checkbox', { name: 'Read-only option' });

  await page.getByText('Read-only option', { exact: true }).click();

  await expect
    .element(page.getByRole('checkbox', { name: 'Disabled option', exact: true }))
    .not.toBeChecked();
  await expect
    .element(page.getByRole('checkbox', { name: 'Disabled option', exact: true }))
    .toBeDisabled();
  await expect
    .element(page.getByRole('checkbox', { name: 'Read-only option', exact: true }))
    .not.toBeChecked();
  expect(readOnly.closest('[data-slot="switch-root"]')!.hasAttribute('data-readonly')).toBe(true);
  await expect
    .element(page.getByRole('checkbox', { name: 'Required option', exact: true }))
    .toHaveAttribute('required');
  await expect
    .element(page.getByRole('checkbox', { name: 'Required option', exact: true }))
    .toHaveAttribute('aria-invalid', 'true');
});

test('supports controlled v-model:checked and preserves Ark details', async () => {
  const details: boolean[] = [];

  render({
    components: switchComponents,
    setup() {
      return { checked: ref(false), details };
    },
    template: `
      <Switch
        v-model:checked="checked"
        invalid
        @checked-change="details.push($event.checked)"
      >
        <SwitchControl />
        <SwitchHiddenInput />
        <SwitchLabel>Enable alerts</SwitchLabel>
      </Switch>
    `,
  });

  await expect
    .element(page.locator('[data-slot="switch-control"]'))
    .toHaveAttribute('data-invalid');
  await expect
    .element(page.locator('[data-slot="switch-control"]'))
    .toHaveAttribute('data-state', 'unchecked');
  await page.locator('[data-slot="switch-control"]').click();
  await expect
    .element(page.locator('[data-slot="switch-control"]'))
    .toHaveAttribute('data-state', 'checked');
  await expect
    .element(page.getByRole('checkbox', { name: 'Enable alerts', exact: true }))
    .toBeChecked();
  expect(details).toEqual([true]);
});

test('keeps provider and context composition connected', async () => {
  const ContextState = defineComponent({
    setup() {
      return { switchApi: useSwitchContext() };
    },
    template: '<output>State: {{ switchApi.checked ? "checked" : "unchecked" }}</output>',
  });

  render({
    components: { ...switchComponents, ContextState },
    setup() {
      return { switchApi: useSwitch({ defaultChecked: true }) };
    },
    template: `
      <SwitchRootProvider :value="switchApi">
        <ContextState />
        <SwitchControl />
        <SwitchLabel>Provider switch</SwitchLabel>
        <SwitchHiddenInput />
      </SwitchRootProvider>
    `,
  });
  await expect.element(page.getByText('State: checked', { exact: true })).toBeAttached();

  await page.getByText('Provider switch', { exact: true }).click();
  await expect.element(page.getByText('State: unchecked', { exact: true })).toBeAttached();
});

test('hydrates without replacing hosts or ids and responds to clicks', async () => {
  const host = document.createElement('div');
  host.innerHTML = await renderToString(createSSRApp(SsrSwitch));
  document.body.append(host);
  const serverRoot = host.querySelector('[data-slot="switch-root"]');
  const serverInput = host.querySelector('input');
  const serverIds = [...host.querySelectorAll('[id]')].map((element) => element.id);
  const app = createSSRApp(SsrSwitch);
  const warn = rs.spyOn(console, 'warn');
  const error = rs.spyOn(console, 'error');
  try {
    app.mount(host);
    await nextTick();
    expect(host.querySelectorAll('[data-slot="switch-root"]')).toHaveLength(1);
    expect(host.querySelector('[data-slot="switch-root"]')).toBe(serverRoot);
    expect(host.querySelectorAll('input[type="checkbox"]')).toHaveLength(1);
    expect(host.querySelector('input')).toBe(serverInput);
    expect([...host.querySelectorAll('[id]')].map((element) => element.id)).toEqual(serverIds);
    const checkbox = page.getByRole('checkbox', { name: 'Server rendered switch' });
    await expect.element(checkbox).toBeChecked();
    await expect
      .element(page.locator('[data-slot="switch-control"]'))
      .toHaveAttribute('data-state', 'checked');
    await page.getByText('Server rendered switch', { exact: true }).click();
    await expect.element(checkbox).not.toBeChecked();
    expect(warn).not.toHaveBeenCalled();
    expect(error).not.toHaveBeenCalled();
  } finally {
    app.unmount();
    host.remove();
    warn.mockRestore();
    error.mockRestore();
  }
});
import SsrSwitch from './fixtures/SsrSwitch.vue';