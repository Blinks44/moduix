import { expect, rs, test } from '@rstest/core';
import userEvent from '@testing-library/user-event';
import { fireEvent, render, screen, waitFor } from '@testing-library/vue';
import { renderToString } from '@vue/server-renderer';
import { createSSRApp, defineComponent, nextTick, ref } from 'vue';
import type { ComponentPublicInstance } from 'vue';
import { Toggle, ToggleContext, ToggleIndicator, useToggleContext } from '../src';
import * as toggleEntry from '../src/components/toggle';
import * as toggleSource from '../src/components/toggle/Toggle.vue';

const toggleComponents = { Toggle, ToggleContext, ToggleIndicator };

const ToggleStateLabel = defineComponent({
  setup() {
    return { toggle: useToggleContext() };
  },
  template: '<span>{{ toggle.pressed ? "Enabled" : "Disabled" }}</span>',
});

test('keeps toggleVariants out of package and registry source entry points', () => {
  expect('toggleVariants' in toggleEntry).toBe(false);
  expect('toggleVariants' in toggleSource).toBe(false);
});

test('preserves the Ark button contract, Vue refs, named fallback slot, and styled icon slots', () => {
  const rootRef = ref<ComponentPublicInstance>();
  const indicatorRef = ref<ComponentPublicInstance>();
  const Harness = defineComponent({
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

  render(Harness);

  const toggle = screen.getByTestId('toggle');
  const indicator = document.querySelector('[data-slot="toggle-indicator"]');

  expect(rootRef.value?.$el).toBe(toggle);
  expect(indicatorRef.value?.$el).toBe(indicator);
  expect(toggle).toHaveAttribute('type', 'button');
  expect(toggle).toHaveAttribute('aria-pressed', 'true');
  expect(toggle).toHaveAttribute('data-scope', 'toggle');
  expect(toggle).toHaveAttribute('data-part', 'root');
  expect(toggle).toHaveAttribute('data-state', 'on');
  expect(toggle).toHaveAttribute('data-slot', 'toggle-root');
  expect(toggle).toHaveAttribute('data-variant', 'default');
  expect(toggle).toHaveAttribute('data-size', 'md');
  expect(indicator).toHaveAttribute('data-part', 'indicator');
  expect(indicator).toHaveAttribute('data-slot', 'toggle-indicator');
  expect(screen.getByLabelText('On icon')).toBeVisible();
  expect(screen.queryByLabelText('Off icon')).toBeNull();
  expect(screen.getByTestId('context-state')).toHaveTextContent('On');
});

test('keeps controlled state, context, disabled, and asChild behavior Ark-shaped', async () => {
  const changes: boolean[] = [];
  const updates: boolean[] = [];
  const pressed = ref(false);
  const rootRef = ref<ComponentPublicInstance>();
  const Harness = defineComponent({
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

  render(Harness);
  const controlledToggle = screen.getByRole('button', { name: 'Disabled' });

  expect(controlledToggle).toHaveAttribute('aria-pressed', 'false');
  await fireEvent.click(controlledToggle);
  await waitFor(() => expect(controlledToggle).toHaveAttribute('aria-pressed', 'true'));
  expect(screen.getByText('Enabled')).toBeVisible();
  expect(changes).toEqual([true]);
  expect(updates).toEqual([true]);
  expect(pressed.value).toBe(true);

  const disabledToggle = screen.getByRole('button', { name: 'Disabled toggle' });
  const customToggle = screen.getByRole('button', { name: 'Custom toggle' });

  expect(disabledToggle).toBeDisabled();
  expect(disabledToggle).toHaveAttribute('data-disabled');
  await fireEvent.click(disabledToggle);
  expect(disabledToggle).toHaveAttribute('aria-pressed', 'false');
  expect(customToggle.tagName).toBe('BUTTON');
  expect(customToggle).toHaveAttribute('aria-pressed', 'true');
  expect(customToggle).toHaveAttribute('data-slot', 'toggle-root');
  expect(rootRef.value?.$el).toBe(customToggle);
});

test('preserves ToggleIndicator asChild composition', () => {
  render({
    components: toggleComponents,
    template:
      '<Toggle default-pressed><ToggleIndicator as-child><span data-testid="indicator-host">On</span></ToggleIndicator></Toggle>',
  });

  const indicator = screen.getByTestId('indicator-host');

  expect(indicator.tagName).toBe('SPAN');
  expect(indicator).toHaveAttribute('data-part', 'indicator');
  expect(indicator).toHaveAttribute('data-slot', 'toggle-indicator');
  expect(indicator).toHaveTextContent('On');
});

test('supports native button keyboard activation', async () => {
  const user = userEvent.setup();

  render({
    components: toggleComponents,
    template: '<Toggle>Notifications</Toggle>',
  });

  const toggle = screen.getByRole('button', { name: 'Notifications' });

  await user.tab();
  expect(toggle).toHaveFocus();
  await user.keyboard(' ');
  expect(toggle).toHaveAttribute('aria-pressed', 'true');

  await user.keyboard('{Enter}');
  expect(toggle).toHaveAttribute('aria-pressed', 'false');
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
  const Harness = defineComponent({
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
  render(Harness);
  const toggle = screen.getByRole('button', { name: 'Favorite' });
  const indicator = toggle.querySelector('[data-slot="toggle-indicator"]')!;
  expect(screen.getByText('Off')).toBeVisible();
  expect(toggle).toHaveClass('consumer-toggle', 'conditional-class');
  expect(indicator).toHaveClass('consumer-indicator');
  expect(toggle).toHaveStyle({ color: 'red', marginTop: '7px' });
  expect(toggle).toHaveAttribute('data-slot', 'toggle-root');
  expect(toggle).toHaveAttribute('data-size', 'md');
  await fireEvent.click(toggle);
  expect(pressed.value).toBe(true);
  expect(clicks).toHaveBeenCalledTimes(1);
  expect(changes).toHaveBeenCalledExactlyOnceWith(true);
  expect(submit).not.toHaveBeenCalled();
  expect(screen.getByText('On')).toBeVisible();
  expect(screen.queryByText('Off')).toBeNull();

  size.value = 'icon-lg';
  variant.value = 'ghost';
  label.value = 'Saved';
  consumerClass.value = 'updated-toggle';
  disabled.value = true;
  await nextTick();
  expect(toggle).toHaveAttribute('data-size', 'icon-lg');
  expect(toggle).toHaveAttribute('data-variant', 'ghost');
  expect(toggle).toHaveAccessibleName('Saved');
  expect(toggle).toHaveClass('updated-toggle');
  expect(toggle).not.toHaveClass('consumer-toggle');
  expect(toggle).toBeDisabled();
  await userEvent.setup().click(toggle);
  expect(changes).toHaveBeenCalledTimes(1);

  pressed.value = false;
  await nextTick();
  expect(screen.getByText('Off')).toBeVisible();
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
  const toggle = screen.getByRole('button');
  await fireEvent.click(screen.getByText('Enable'));
  expect(changes).toHaveBeenCalledExactlyOnceWith(true);
  expect(updates).toHaveBeenCalledExactlyOnceWith(true);
  expect(toggle).toHaveAttribute('aria-pressed', 'false');
  pressed.value = true;
  await nextTick();
  expect(toggle).toHaveAttribute('aria-pressed', 'true');
});

test('hydrates asChild hosts and switches indicator hosts through native slots', async () => {
  const rootRef = ref<ComponentPublicInstance>();
  const indicatorRef = ref<ComponentPublicInstance>();
  const pressed = ref(false);
  const App = defineComponent({
    components: toggleComponents,
    setup: () => ({ rootRef, indicatorRef, pressed }),
    template: `
      <Toggle ref="rootRef" as-child v-model:pressed="pressed">
        <button aria-label="Favorite">
          <ToggleIndicator ref="indicatorRef" as-child>
            <strong data-testid="on">On</strong>
            <template #fallback><em data-testid="off">Off</em></template>
          </ToggleIndicator>
        </button>
      </Toggle>
    `,
  });
  const html = await renderToString(createSSRApp(App));
  const host = document.createElement('div');
  host.innerHTML = html;
  document.body.append(host);
  const serverToggle = host.querySelector('button');
  const serverIndicator = host.querySelector('em');
  const warn = rs.spyOn(console, 'warn');
  const error = rs.spyOn(console, 'error');
  const app = createSSRApp(App);
  try {
    app.mount(host);
    expect(rootRef.value?.$el).toBe(serverToggle);
    expect(indicatorRef.value?.$el).toBe(serverIndicator);
    expect(warn).not.toHaveBeenCalled();
    expect(error).not.toHaveBeenCalled();
    await fireEvent.click(serverToggle!);
    const indicator = host.querySelector('strong');
    expect(indicator).toHaveAttribute('data-part', 'indicator');
    expect(indicatorRef.value?.$el).toBe(indicator);
    expect(host.querySelector('em')).toBeNull();
    expect(serverToggle).toHaveAttribute('aria-pressed', 'true');
  } finally {
    app.unmount();
    host.remove();
    warn.mockRestore();
    error.mockRestore();
  }
});

test('renders and hydrates the public anatomy without replacing the host', async () => {
  const App = defineComponent({
    components: toggleComponents,
    template: `
      <Toggle default-pressed>
        Favorite
        <ToggleIndicator><span>On</span><template #fallback><span>Off</span></template></ToggleIndicator>
      </Toggle>
    `,
  });

  const html = await renderToString(createSSRApp(App));
  expect(html).toContain('data-slot="toggle-root"');
  expect(html).toContain('data-slot="toggle-indicator"');
  expect(html).toContain('aria-pressed="true"');

  const host = document.createElement('div');
  host.innerHTML = html;
  document.body.append(host);
  const serverToggle = host.querySelector('[data-slot="toggle-root"]');
  const app = createSSRApp(App);
  app.mount(host);

  expect(host.querySelector('[data-slot="toggle-root"]')).toBe(serverToggle);
  expect(host.querySelector('[data-slot="toggle-indicator"]')).toBeInTheDocument();

  app.unmount();
  host.remove();
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

  expect(toggle).toHaveClass(
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
  );
  expect(toggle).toHaveClass('[&>svg]:block', '[&>svg]:size-4', '[&>svg]:shrink-0');
  expect(indicator).toHaveClass(
    'inline-flex',
    'items-center',
    'justify-center',
    '[&>svg]:block',
    '[&>svg]:size-4',
  );
});

test('lets consumer Tailwind classes override conflicting defaults', () => {
  render({
    components: toggleComponents,
    template:
      '<Toggle class="border-primary bg-secondary p-0 text-xs" size="lg" variant="outline">Save changes</Toggle>',
  });

  const toggle = screen.getByRole('button', { name: 'Save changes' });

  expect(toggle).toHaveClass('border-primary', 'bg-secondary', 'p-0', 'text-xs');
  expect(toggle).not.toHaveClass(
    'border-border',
    'bg-background',
    'min-h-control-lg',
    'px-5',
    'py-1.5',
    'text-md',
  );
});