import { expect, test } from '@rstest/core';
import { fireEvent, render, screen, waitFor } from '@testing-library/vue';
import { renderToString } from '@vue/server-renderer';
import { createSSRApp, defineComponent, ref } from 'vue';
import type { Component, ComponentPublicInstance } from 'vue';
import {
  Checkbox,
  CheckboxContext,
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
  CheckboxContext,
  CheckboxControl,
  CheckboxGroup,
  CheckboxHiddenInput,
  CheckboxIndicator,
  CheckboxLabel,
  CheckboxRootProvider,
} as unknown as Record<string, Component>;

test('submits through explicit Ark inputs for roots', () => {
  const Harness = defineComponent({
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

  const { container } = render(Harness);
  const form = container.querySelector('form')!;

  expect(container.querySelectorAll('input[type="checkbox"]')).toHaveLength(4);
  expect(Array.from(new FormData(form).entries())).toEqual([
    ['notifications', 'email'],
    ['provider-notifications', 'on'],
    ['frameworks', 'react'],
  ]);
});

test('preserves Ark behavior and semantic asChild composition', () => {
  const Harness = defineComponent({
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

  render(Harness);
  const checkbox = screen.getByRole('checkbox', { name: 'Accept terms' });

  expect(checkbox).not.toBeChecked();
  fireEvent.click(checkbox);
  expect(checkbox).toBeChecked();
  expect(checkbox).toHaveAttribute('type', 'checkbox');
});

test('forwards Vue refs and exposes stable slots on public parts', () => {
  const refs = {
    root: ref<ComponentPublicInstance | null>(null),
    control: ref<ComponentPublicInstance | null>(null),
    indicator: ref<ComponentPublicInstance | null>(null),
    label: ref<ComponentPublicInstance | null>(null),
    group: ref<ComponentPublicInstance | null>(null),
  };
  const Harness = defineComponent({
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

  render(Harness);

  expect(refs.root.value?.$el).toHaveAttribute('data-slot', 'checkbox-root');
  expect(refs.root.value?.$el).toHaveAttribute('data-size', 'lg');
  expect(refs.control.value?.$el).toHaveAttribute('data-slot', 'checkbox-control');
  expect(refs.indicator.value?.$el).toHaveAttribute('data-slot', 'checkbox-indicator');
  expect(refs.label.value?.$el).toHaveAttribute('data-slot', 'checkbox-label');
  expect(refs.group.value?.$el).toHaveAttribute('data-slot', 'checkbox-group');
});

test('preserves disabled, read-only, invalid, and required semantics', () => {
  const Harness = defineComponent({
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

  render(Harness);
  const disabled = screen.getByRole('checkbox', { name: 'Disabled option' });
  const readOnly = screen.getByRole('checkbox', { name: 'Read-only option' });
  const required = screen.getByRole('checkbox', { name: 'Required option' });
  const groupReadOnly = screen.getByRole('checkbox', { name: 'Read-only group option' });

  fireEvent.click(disabled);
  fireEvent.click(readOnly);
  fireEvent.click(groupReadOnly);

  expect(disabled).not.toBeChecked();
  expect(disabled).toBeDisabled();
  expect(readOnly).not.toBeChecked();
  expect(groupReadOnly).not.toBeChecked();
  expect(required).toBeRequired();
  expect(required).toHaveAttribute('aria-invalid', 'true');
});

test('keeps controlled indeterminate state transitions Ark-shaped', async () => {
  const Harness = defineComponent({
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

  render(Harness);
  const checkbox = screen.getByRole('checkbox', { name: 'Select all' });
  const control = screen
    .getByText('Select all')
    .parentElement!.querySelector('[data-slot="checkbox-control"]')!;

  expect(control).toHaveAttribute('data-state', 'indeterminate');
  await fireEvent.click(control);
  await waitFor(() => expect(control).toHaveAttribute('data-state', 'checked'));
  expect(checkbox).toBeChecked();
});

test('supports v-model for group state and forwards Ark value details once', async () => {
  const details: string[][] = [];
  const Harness = defineComponent({
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

  render(Harness);
  await fireEvent.click(screen.getByRole('checkbox', { name: 'Push' }));

  await waitFor(() => expect(screen.getByText('Selected: email, push')).toBeInTheDocument());
  expect(details).toEqual([['email', 'push']]);
});

test('keeps provider and context composition connected', () => {
  const ContextState = defineComponent({
    setup() {
      return { checkbox: useCheckboxContext() };
    },
    template: '<output>State: {{ checkbox.checked ? "checked" : "unchecked" }}</output>',
  });
  const Harness = defineComponent({
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

  render(Harness);
  expect(screen.getByText('State: checked')).toBeInTheDocument();
  expect(screen.getByRole('checkbox', { name: 'Provider checkbox' })).toBeChecked();
});

test('renders the default indicators and allows custom slots', () => {
  const Harness = defineComponent({
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

  render(Harness);
  expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
  expect(
    document.querySelector('[data-slot="checkbox-indicator-checked-icon"]'),
  ).toBeInTheDocument();
  expect(
    document.querySelector('[data-slot="checkbox-indicator-indeterminate-icon"]'),
  ).toBeInTheDocument();
});

test('renders and hydrates the public anatomy without changing generated ids', async () => {
  const App = defineComponent({
    components: checkboxComponents,
    template: `
      <Checkbox :default-checked="true">
        <CheckboxControl />
        <CheckboxLabel>Hydrated checkbox</CheckboxLabel>
        <CheckboxHiddenInput />
      </Checkbox>
    `,
  });

  const html = await renderToString(createSSRApp(App));
  expect(html).toContain('data-slot="checkbox-root"');
  expect(html).toContain('data-slot="checkbox-control"');
  expect(html).toContain('type="checkbox"');

  const host = document.createElement('div');
  host.innerHTML = html;
  document.body.append(host);
  const serverIds = [...host.querySelectorAll('[id]')].map((element) => element.id);
  const app = createSSRApp(App);
  app.mount(host);

  expect(host.querySelectorAll('[data-slot="checkbox-root"]')).toHaveLength(1);
  expect(host.querySelectorAll('input[type="checkbox"]')).toHaveLength(1);
  expect([...host.querySelectorAll('[id]')].map((element) => element.id)).toEqual(serverIds);

  app.unmount();
  host.remove();
});

test('applies native utilities to component-owned visual parts', () => {
  const Harness = defineComponent({
    components: checkboxComponents,
    template: `
      <Checkbox default-checked>
        <CheckboxControl />
        <CheckboxLabel>Notifications</CheckboxLabel>
        <CheckboxHiddenInput />
      </Checkbox>
    `,
  });

  render(Harness);
  const root = screen.getByText('Notifications').parentElement!;
  const control = root.querySelector('[data-slot="checkbox-control"]')!;
  const checkedIcon = root.querySelector('[data-slot="checkbox-indicator-checked-icon"]')!;
  const label = screen.getByText('Notifications');

  expect(root).toHaveClass('inline-flex', 'gap-2');
  expect(control).toHaveClass('inline-flex', 'size-5', 'rounded-xs', 'bg-background');
  expect(control).toHaveClass('data-[state=checked]:bg-primary');
  expect(checkedIcon).toHaveClass('inline-flex', 'size-3');
  expect(label).toHaveClass('text-sm', 'font-medium');
});

test('lets consumer Tailwind classes override conflicting defaults', () => {
  const Harness = defineComponent({
    components: checkboxComponents,
    template: `
      <Checkbox class="gap-4 text-primary" data-testid="root">
        <CheckboxControl class="rounded-md bg-muted p-1" />
        <CheckboxLabel>Notifications</CheckboxLabel>
        <CheckboxHiddenInput />
      </Checkbox>
    `,
  });

  render(Harness);
  const root = screen.getByTestId('root');
  const control = root.querySelector('[data-slot="checkbox-control"]')!;

  expect(root).toHaveClass('gap-4', 'text-primary');
  expect(root).not.toHaveClass('gap-2', 'text-foreground');
  expect(control).toHaveClass('rounded-md', 'bg-muted', 'p-1');
  expect(control).not.toHaveClass('rounded-xs', 'bg-background', 'p-0');
});