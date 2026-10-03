import { expect, test } from '@rstest/core';
import { fireEvent, render, screen, waitFor } from '@testing-library/vue';
import { renderToString } from '@vue/server-renderer';
import { createSSRApp, defineComponent, ref } from 'vue';
import type { Component, ComponentPublicInstance } from 'vue';
import {
  Switch,
  SwitchContext,
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
  SwitchContext,
  SwitchControl,
  SwitchHiddenInput,
  SwitchLabel,
  SwitchRootProvider,
  SwitchThumb,
} as unknown as Record<string, Component>;

test('submits through explicit Ark inputs for roots', () => {
  const Harness = defineComponent({
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

  const { container } = render(Harness);
  const form = container.querySelector('form')!;

  expect(container.querySelectorAll('input[type="checkbox"]')).toHaveLength(2);
  expect(Array.from(new FormData(form).entries())).toEqual([
    ['notifications', 'email'],
    ['provider-notifications', 'on'],
  ]);
});

test('preserves Ark behavior and semantic asChild composition', () => {
  const rootRef = ref<ComponentPublicInstance | null>(null);
  const Harness = defineComponent({
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

  render(Harness);
  const switchInput = screen.getByRole('checkbox', { name: 'Enable reminders' });

  expect(switchInput).not.toBeChecked();
  fireEvent.click(switchInput);
  expect(switchInput).toBeChecked();
  expect(switchInput).toHaveAttribute('type', 'checkbox');
  expect(rootRef.value?.$el).toBe(switchInput.closest('label'));
});

test('forwards Vue refs and exposes stable slots on public parts', () => {
  const refs = {
    root: ref<ComponentPublicInstance | null>(null),
    control: ref<ComponentPublicInstance | null>(null),
    thumb: ref<ComponentPublicInstance | null>(null),
    label: ref<ComponentPublicInstance | null>(null),
  };
  const Harness = defineComponent({
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
      <Switch ref="rootRef" size="lg">
        <SwitchControl ref="controlRef">
          <SwitchThumb ref="thumbRef" />
        </SwitchControl>
        <SwitchHiddenInput />
        <SwitchLabel ref="labelRef">Email notifications</SwitchLabel>
      </Switch>
    `,
  });

  render(Harness);

  expect(refs.root.value?.$el).toHaveAttribute('data-slot', 'switch-root');
  expect(refs.root.value?.$el).toHaveAttribute('data-size', 'lg');
  expect(refs.control.value?.$el).toHaveAttribute('data-slot', 'switch-control');
  expect(refs.thumb.value?.$el).toHaveAttribute('data-slot', 'switch-thumb');
  expect(refs.label.value?.$el).toHaveAttribute('data-slot', 'switch-label');
});

test('preserves disabled, read-only, invalid, and required semantics', () => {
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

  const disabled = screen.getByRole('checkbox', { name: 'Disabled option' });
  const readOnly = screen.getByRole('checkbox', { name: 'Read-only option' });
  const required = screen.getByRole('checkbox', { name: 'Required option' });

  fireEvent.click(disabled);
  fireEvent.click(readOnly);

  expect(disabled).not.toBeChecked();
  expect(disabled).toBeDisabled();
  expect(readOnly).not.toBeChecked();
  expect(readOnly.closest('[data-slot="switch-root"]')).toHaveAttribute('data-readonly');
  expect(required).toBeRequired();
  expect(required).toHaveAttribute('aria-invalid', 'true');
});

test('supports controlled v-model:checked and preserves Ark details', async () => {
  const details: boolean[] = [];
  const Harness = defineComponent({
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

  render(Harness);
  const switchInput = screen.getByRole('checkbox', { name: 'Enable alerts' });
  const control = document.querySelector('[data-slot="switch-control"]')!;

  expect(control).toHaveAttribute('data-invalid');
  expect(control).toHaveAttribute('data-state', 'unchecked');
  await fireEvent.click(control);
  await waitFor(() => expect(control).toHaveAttribute('data-state', 'checked'));
  expect(switchInput).toBeChecked();
  expect(details).toEqual([true]);
});

test('keeps provider and context composition connected', async () => {
  const ContextState = defineComponent({
    setup() {
      return { switchApi: useSwitchContext() };
    },
    template: '<output>State: {{ switchApi.checked ? "checked" : "unchecked" }}</output>',
  });
  const Harness = defineComponent({
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

  render(Harness);
  expect(screen.getByText('State: checked')).toBeInTheDocument();

  await fireEvent.click(screen.getByRole('checkbox', { name: 'Provider switch' }));
  await waitFor(() => expect(screen.getByText('State: unchecked')).toBeInTheDocument());
});

test('applies native utilities to component-owned visual parts', () => {
  render({
    components: switchComponents,
    template: `
      <Switch :default-checked="true">
        <SwitchControl />
        <SwitchLabel>Notifications</SwitchLabel>
        <SwitchHiddenInput />
      </Switch>
    `,
  });

  const root = screen.getByText('Notifications').parentElement!;
  const control = root.querySelector('[data-slot="switch-control"]')!;
  const thumb = root.querySelector('[data-slot="switch-thumb"]')!;
  const label = screen.getByText('Notifications');

  expect(root).toHaveClass('inline-flex', 'gap-2', 'w-fit');
  expect(control).toHaveClass(
    'inline-flex',
    'w-11',
    'h-[var(--switch-height)]',
    'rounded-full',
    'bg-muted',
  );
  expect(control).toHaveClass(
    'data-invalid:border-destructive',
    'data-[state=checked]:data-invalid:border-destructive',
    'data-[state=checked]:bg-primary',
  );
  expect(thumb).toHaveClass(
    'inline-flex',
    'size-[var(--switch-thumb-size)]',
    'rounded-full',
    'bg-background',
    'shadow-sm',
    'transition-[inset-inline-start,translate,background-color,color]',
  );
  expect(label).toHaveClass('text-sm', 'font-medium');
});

test('lets consumer Tailwind classes override conflicting defaults', () => {
  render({
    components: switchComponents,
    template: `
      <Switch class="gap-4" data-testid="root">
        <SwitchControl class="w-10 rounded-md bg-background p-1">
          <SwitchThumb class="size-4 bg-muted-foreground" />
        </SwitchControl>
        <SwitchLabel class="text-lg">Notifications</SwitchLabel>
        <SwitchHiddenInput />
      </Switch>
    `,
  });

  const root = screen.getByTestId('root');
  const control = root.querySelector('[data-slot="switch-control"]')!;
  const thumb = root.querySelector('[data-slot="switch-thumb"]')!;
  const label = screen.getByText('Notifications');

  expect(root).toHaveClass('gap-4');
  expect(root).not.toHaveClass('gap-2');
  expect(control).toHaveClass('w-10', 'rounded-md', 'bg-background', 'p-1');
  expect(control).not.toHaveClass('w-11', 'rounded-full', 'bg-muted', 'p-0.5');
  expect(thumb).toHaveClass('size-4', 'bg-muted-foreground');
  expect(thumb).not.toHaveClass('size-[var(--switch-thumb-size)]', 'bg-background');
  expect(label).toHaveClass('text-lg');
  expect(label).not.toHaveClass('text-sm');
});

test('renders and hydrates the public anatomy without changing generated ids', async () => {
  const App = defineComponent({
    components: switchComponents,
    template: `
      <Switch :default-checked="true">
        <SwitchControl />
        <SwitchLabel>Server rendered switch</SwitchLabel>
        <SwitchHiddenInput />
      </Switch>
    `,
  });

  const html = await renderToString(createSSRApp(App));
  expect(html).toContain('data-slot="switch-root"');
  expect(html).toContain('data-slot="switch-control"');
  expect(html).toContain('data-slot="switch-label"');

  const host = document.createElement('div');
  host.innerHTML = html;
  document.body.append(host);
  const serverIds = [...host.querySelectorAll('[id]')].map((element) => element.id);
  const app = createSSRApp(App);
  app.mount(host);

  expect(host.querySelectorAll('[data-slot="switch-root"]')).toHaveLength(1);
  expect(host.querySelector('[data-slot="switch-control"]')).toHaveAttribute(
    'data-state',
    'checked',
  );
  expect([...host.querySelectorAll('[id]')].map((element) => element.id)).toEqual(serverIds);

  app.unmount();
  host.remove();
});