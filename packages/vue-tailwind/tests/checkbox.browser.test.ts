import { page } from '@rstest/browser';
import { expect, rs, test } from '@rstest/core';
import { render, screen } from '@testing-library/vue';
import { renderToString } from '@vue/server-renderer';
import { createSSRApp, nextTick, defineComponent, ref } from 'vue';
import type { ComponentPublicInstance } from 'vue';
import {
  Checkbox,
  CheckboxControl,
  CheckboxGroup,
  CheckboxHiddenInput,
  CheckboxIndicator,
  CheckboxLabel,
  CheckboxRootProvider,
  useCheckbox,
  useCheckboxContext,
} from '../src';

const checkboxComponents = {
  Checkbox,
  CheckboxControl,
  CheckboxGroup,
  CheckboxHiddenInput,
  CheckboxIndicator,
  CheckboxLabel,
  CheckboxRootProvider,
};

test('submits through explicit Ark inputs for roots', () => {
  const { container } = render({
    components: checkboxComponents,
    setup() {
      return {
        providerCheckbox: useCheckbox({ defaultChecked: true, name: 'provider-notifications' }),
      };
    },
    template: `
      <form>
        <Checkbox :default-checked="true" name="notifications" value="email">
          <CheckboxControl />
          <CheckboxLabel>Email notifications</CheckboxLabel>
          <CheckboxHiddenInput />
        </Checkbox>
        <CheckboxRootProvider :value="providerCheckbox">
          <CheckboxControl />
          <CheckboxLabel>Provider notifications</CheckboxLabel>
          <CheckboxHiddenInput />
        </CheckboxRootProvider>
        <CheckboxGroup :default-value="['react']" name="frameworks">
          <Checkbox value="react"><CheckboxControl /><CheckboxHiddenInput /><CheckboxLabel>React</CheckboxLabel></Checkbox>
          <Checkbox value="vue"><CheckboxControl /><CheckboxHiddenInput /><CheckboxLabel>Vue</CheckboxLabel></Checkbox>
        </CheckboxGroup>
      </form>
    `,
  });
  const form = container.querySelector('form')!;

  expect(container.querySelectorAll('input[type="checkbox"]')).toHaveLength(4);
  expect(Array.from(new FormData(form).entries())).toEqual([
    ['notifications', 'email'],
    ['provider-notifications', 'on'],
    ['frameworks', 'react'],
  ]);
  const root = screen.getByText('Email notifications').parentElement!;
  const control = root.querySelector('[data-slot="checkbox-control"]')!;
  const checkedIcon = root.querySelector('[data-slot="checkbox-indicator-checked-icon"]')!;
  const label = screen.getByText('Email notifications');

  expect([...root.classList]).toEqual(expect.arrayContaining(['inline-flex', 'gap-2']));
  expect([...control.classList]).toEqual(
    expect.arrayContaining(['inline-flex', 'size-5', 'rounded-xs', 'bg-background']),
  );
  expect([...control.classList]).toEqual(
    expect.arrayContaining(['data-[state=checked]:bg-primary']),
  );
  expect([...checkedIcon.classList]).toEqual(expect.arrayContaining(['inline-flex', 'size-3']));
  expect([...label.classList]).toEqual(expect.arrayContaining(['text-sm', 'font-medium']));
});

test('preserves Ark behavior and semantic asChild composition', async () => {
  render({
    components: checkboxComponents,
    template: `
      <Checkbox as-child>
        <label aria-label="Accept terms">
          <CheckboxControl />
          <CheckboxHiddenInput />
          <CheckboxLabel>Accept terms</CheckboxLabel>
        </label>
      </Checkbox>
    `,
  });

  const checkbox = page.getByRole('checkbox', { name: 'Accept terms', exact: true });
  await expect.element(checkbox).not.toBeChecked();
  await page.getByText('Accept terms', { exact: true }).click();
  await expect.element(checkbox).toBeChecked();
  await expect.element(checkbox).toHaveAttribute('type', 'checkbox');
  await checkbox.press('Space');
  await expect.element(checkbox).not.toBeChecked();
});

test('forwards Vue refs and exposes stable slots on public parts', () => {
  const refs = {
    root: ref<ComponentPublicInstance | null>(null),
    control: ref<ComponentPublicInstance | null>(null),
    indicator: ref<ComponentPublicInstance | null>(null),
    label: ref<ComponentPublicInstance | null>(null),
    group: ref<ComponentPublicInstance | null>(null),
  };

  render({
    components: checkboxComponents,
    setup() {
      return {
        rootRef: refs.root,
        controlRef: refs.control,
        indicatorRef: refs.indicator,
        labelRef: refs.label,
        groupRef: refs.group,
      };
    },
    template: `
      <CheckboxGroup ref="groupRef" :default-value="['email']">
        <Checkbox ref="rootRef" value="email" size="lg">
          <CheckboxControl ref="controlRef">
            <CheckboxIndicator ref="indicatorRef" />
          </CheckboxControl>
          <CheckboxHiddenInput />
          <CheckboxLabel ref="labelRef">Email notifications</CheckboxLabel>
        </Checkbox>
      </CheckboxGroup>
    `,
  });

  expect(refs.root.value?.$el?.getAttribute('data-slot')).toBe('checkbox-root');
  expect(refs.root.value?.$el?.getAttribute('data-size')).toBe('lg');
  expect(refs.control.value?.$el?.getAttribute('data-slot')).toBe('checkbox-control');
  expect(refs.indicator.value?.$el?.getAttribute('data-slot')).toBe('checkbox-indicator');
  expect(refs.label.value?.$el?.getAttribute('data-slot')).toBe('checkbox-label');
  expect(refs.group.value?.$el?.getAttribute('data-slot')).toBe('checkbox-group');
});

test('preserves disabled, read-only, invalid, and required semantics', async () => {
  render({
    components: checkboxComponents,
    template: `
      <Checkbox disabled><CheckboxControl /><CheckboxHiddenInput /><CheckboxLabel>Disabled option</CheckboxLabel></Checkbox>
      <Checkbox read-only><CheckboxControl /><CheckboxHiddenInput /><CheckboxLabel>Read-only option</CheckboxLabel></Checkbox>
      <Checkbox invalid required><CheckboxControl /><CheckboxHiddenInput /><CheckboxLabel>Required option</CheckboxLabel></Checkbox>
      <CheckboxGroup read-only>
        <Checkbox value="group-option"><CheckboxControl /><CheckboxHiddenInput /><CheckboxLabel>Read-only group option</CheckboxLabel></Checkbox>
      </CheckboxGroup>
    `,
  });

  await page.getByText('Read-only option', { exact: true }).click();
  await page.getByText('Read-only group option', { exact: true }).click();

  await expect
    .element(page.getByRole('checkbox', { name: 'Disabled option', exact: true }))
    .not.toBeChecked();
  await expect
    .element(page.getByRole('checkbox', { name: 'Disabled option', exact: true }))
    .toBeDisabled();
  await expect
    .element(page.getByRole('checkbox', { name: 'Read-only option', exact: true }))
    .not.toBeChecked();
  await expect
    .element(page.getByRole('checkbox', { name: 'Read-only group option', exact: true }))
    .not.toBeChecked();
  await expect
    .element(page.getByRole('checkbox', { name: 'Required option', exact: true }))
    .toHaveAttribute('required');
  await expect
    .element(page.getByRole('checkbox', { name: 'Required option', exact: true }))
    .toHaveAttribute('aria-invalid', 'true');
});

test('keeps controlled indeterminate state transitions Ark-shaped', async () => {
  render({
    components: checkboxComponents,
    setup() {
      return { checked: ref<boolean | 'indeterminate'>('indeterminate') };
    },
    template: `
      <Checkbox :checked="checked" @checked-change="checked = $event.checked">
        <CheckboxControl />
        <CheckboxHiddenInput />
        <CheckboxLabel>Select all</CheckboxLabel>
      </Checkbox>
    `,
  });

  await expect
    .element(page.locator('[data-slot="checkbox-control"]'))
    .toHaveAttribute('data-state', 'indeterminate');
  await page.locator('[data-slot="checkbox-control"]').click();
  await expect
    .element(page.locator('[data-slot="checkbox-control"]'))
    .toHaveAttribute('data-state', 'checked');
  await expect
    .element(page.getByRole('checkbox', { name: 'Select all', exact: true }))
    .toBeChecked();
});

test('supports v-model for group state and forwards Ark value details once', async () => {
  const details: string[][] = [];

  render({
    components: checkboxComponents,
    setup() {
      return { details, value: ref(['email']) };
    },
    template: `
      <CheckboxGroup v-model="value" name="channels" @value-change="details.push($event)">
        <Checkbox value="email"><CheckboxControl /><CheckboxLabel>Email</CheckboxLabel><CheckboxHiddenInput /></Checkbox>
        <Checkbox value="push"><CheckboxControl /><CheckboxLabel>Push</CheckboxLabel><CheckboxHiddenInput /></Checkbox>
      </CheckboxGroup>
      <output>Selected: {{ value.join(', ') }}</output>
    `,
  });
  await page.getByText('Push', { exact: true }).click();

  await expect.element(page.getByText('Selected: email, push', { exact: true })).toBeAttached();
  expect(details).toEqual([['email', 'push']]);
});

test('keeps provider and context composition connected', async () => {
  const ContextState = defineComponent({
    setup() {
      return { checkbox: useCheckboxContext() };
    },
    template: '<output>State: {{ checkbox.checked ? "checked" : "unchecked" }}</output>',
  });

  render({
    components: { ...checkboxComponents, ContextState },
    setup() {
      return { checkbox: useCheckbox({ defaultChecked: true }) };
    },
    template: `
      <CheckboxRootProvider :value="checkbox">
        <ContextState />
        <CheckboxControl />
        <CheckboxLabel>Provider checkbox</CheckboxLabel>
        <CheckboxHiddenInput />
      </CheckboxRootProvider>
    `,
  });
  await expect.element(page.getByText('State: checked', { exact: true })).toBeAttached();
  await expect
    .element(page.getByRole('checkbox', { name: 'Provider checkbox', exact: true }))
    .toBeChecked();
});

test('renders the default indicators and allows custom slots', async () => {
  render({
    components: checkboxComponents,
    template: `
      <Checkbox :default-checked="true">
        <CheckboxControl />
        <CheckboxLabel>Default icons</CheckboxLabel>
        <CheckboxHiddenInput />
      </Checkbox>
      <Checkbox>
        <CheckboxControl><CheckboxIndicator><span data-testid="custom-icon">+</span></CheckboxIndicator></CheckboxControl>
        <CheckboxLabel>Custom icon</CheckboxLabel>
        <CheckboxHiddenInput />
      </Checkbox>
    `,
  });
  await expect.element(page.getByTestId('custom-icon')).toBeAttached();
  await expect
    .element(page.locator('[data-slot="checkbox-indicator-checked-icon"]'))
    .toBeAttached();
  await expect
    .element(page.locator('[data-slot="checkbox-indicator-indeterminate-icon"]'))
    .toBeAttached();
});

test('hydrates without replacing hosts or ids and responds to clicks', async () => {
  const host = document.createElement('div');
  host.innerHTML = await renderToString(createSSRApp(SsrCheckbox));
  document.body.append(host);
  const serverRoot = host.querySelector('[data-slot="checkbox-root"]');
  const serverInput = host.querySelector('input');
  const serverIds = [...host.querySelectorAll('[id]')].map((element) => element.id);
  const app = createSSRApp(SsrCheckbox);
  const warn = rs.spyOn(console, 'warn');
  const error = rs.spyOn(console, 'error');
  try {
    app.mount(host);
    await nextTick();
    expect(host.querySelectorAll('[data-slot="checkbox-root"]')).toHaveLength(1);
    expect(host.querySelector('[data-slot="checkbox-root"]')).toBe(serverRoot);
    expect(host.querySelectorAll('input[type="checkbox"]')).toHaveLength(1);
    expect(host.querySelector('input')).toBe(serverInput);
    expect([...host.querySelectorAll('[id]')].map((element) => element.id)).toEqual(serverIds);
    const checkbox = page.getByRole('checkbox', { name: 'Hydrated checkbox' });
    await expect.element(checkbox).toBeChecked();

    await page.getByText('Hydrated checkbox', { exact: true }).click();
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

test('lets consumer Tailwind classes override conflicting defaults', async () => {
  render({
    components: checkboxComponents,
    template: `
      <Checkbox class="gap-4 text-primary" data-testid="root">
        <CheckboxControl class="rounded-md bg-muted p-1" />
        <CheckboxLabel>Notifications</CheckboxLabel>
        <CheckboxHiddenInput />
      </Checkbox>
    `,
  });
  const root = screen.getByTestId('root');
  const control = root.querySelector('[data-slot="checkbox-control"]')!;

  expect([...root.classList]).toEqual(expect.arrayContaining(['gap-4', 'text-primary']));
  expect(['gap-2', 'text-foreground'].some((name) => root.classList.contains(name))).toBe(false);
  expect([...control.classList]).toEqual(expect.arrayContaining(['rounded-md', 'bg-muted', 'p-1']));
  expect(
    ['rounded-xs', 'bg-background', 'p-0'].some((name) => control.classList.contains(name)),
  ).toBe(false);
  await expect.element(page.getByTestId('root')).toHaveCSS('gap', '16px');
  await expect
    .element(page.locator('[data-slot="checkbox-control"]'))
    .toHaveCSS('padding-left', '4px');
});
import SsrCheckbox from './fixtures/SsrCheckbox.vue';