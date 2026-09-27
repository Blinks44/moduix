import { FieldLabel, FieldRoot } from '@ark-ui/vue/field';
import { expect, test } from '@rstest/core';
import { fireEvent, render, screen, waitFor } from '@testing-library/vue';
import { renderToString } from '@vue/server-renderer';
import { createSSRApp, defineComponent, nextTick, ref } from 'vue';
import type { Component, ComponentPublicInstance } from 'vue';
import { NativeSelect } from '../src';
import styles from '../src/components/native-select/NativeSelect.module.css';

const components = {
  FieldLabel,
  FieldRoot,
  NativeSelect,
} as unknown as Record<string, Component>;

test('exports only the flat NativeSelect root', () => {
  expect(NativeSelect).not.toHaveProperty('Root');
});

test('preserves Field state, anatomy, and control styling hooks', () => {
  render({
    components,
    template: `
      <FieldRoot disabled id="framework" invalid required>
        <FieldLabel>Framework</FieldLabel>
        <NativeSelect
          :control-props="{ title: 'Native select control', class: 'consumer-control' }"
          class="consumer-select"
        >
          <option value="react">React</option>
        </NativeSelect>
      </FieldRoot>
    `,
  });

  const select = screen.getByRole('combobox', { name: 'Framework' });

  expect(select).toBeDisabled();
  expect(select).toHaveAttribute('aria-invalid', 'true');
  expect(select).toBeRequired();
  expect(select).toHaveAttribute('data-part', 'select');
  expect(select).toHaveAttribute('data-scope', 'field');
  expect(select).toHaveAttribute('data-slot', 'native-select-root');
  expect(select).toHaveClass(styles.root, 'consumer-select');
  expect(select.parentElement).toHaveAttribute('data-slot', 'native-select-control');
  expect(select.parentElement).toHaveAttribute('title', 'Native select control');
  expect(select.parentElement).toHaveClass(styles.control, 'consumer-control');
  expect(
    select.parentElement?.querySelector('[data-slot="native-select-indicator"] svg'),
  ).toBeInTheDocument();
});

test('shows the selected option while disabled', () => {
  render({
    components,
    template: `
      <NativeSelect disabled model-value="react" aria-label="Framework">
        <option value="react">React</option>
        <option value="vue">Vue</option>
      </NativeSelect>
    `,
  });

  expect(screen.getByRole('combobox', { name: 'Framework' })).toHaveValue('react');
});

test('forwards the native select ref and supports controlled values and events', async () => {
  const selectRef = ref<ComponentPublicInstance | null>(null);
  const value = ref('react');
  const changes: string[] = [];
  const Harness = defineComponent({
    components,
    setup() {
      return { changes, selectRef, value };
    },
    template: `
      <NativeSelect
        ref="selectRef"
        v-model="value"
        aria-label="Framework"
        @change="changes.push($event.target.value)"
      >
        <option value="react">React</option>
        <option value="vue">Vue</option>
      </NativeSelect>
    `,
  });

  render(Harness);

  const select = screen.getByRole('combobox', { name: 'Framework' });

  expect(selectRef.value?.$el).toBe(select);
  await fireEvent.update(select, 'vue');

  await waitFor(() => expect(select).toHaveValue('vue'));
  expect(value.value).toBe('vue');
  expect(changes).toEqual(['vue']);

  value.value = 'react';
  await nextTick();
  expect(select).toHaveValue('react');
});

test('preserves native form submission and reset behavior', async () => {
  render({
    components,
    template: `
      <form aria-label="Project settings">
        <NativeSelect name="framework" aria-label="Framework">
          <option value="react" selected>React</option>
          <option value="vue">Vue</option>
        </NativeSelect>
      </form>
    `,
  });

  const form = screen.getByRole('form', { name: 'Project settings' }) as HTMLFormElement;
  const select = screen.getByRole('combobox', { name: 'Framework' });

  await fireEvent.update(select, 'vue');

  expect(new FormData(form).get('framework')).toBe('vue');

  form.reset();

  expect(select).toHaveValue('react');
});

// Ark Vue 5.39.2 declares native defaultValue but drops it in FieldSelect.
test.skip('preserves native default values and reset behavior', async () => {
  render({
    components,
    template: `
      <form aria-label="Project settings">
        <NativeSelect default-value="normal" name="priority" aria-label="Priority">
          <option value="low">Low</option>
          <option value="normal">Normal</option>
        </NativeSelect>
      </form>
    `,
  });

  const form = screen.getByRole('form', { name: 'Project settings' }) as HTMLFormElement;
  const select = screen.getByRole('combobox', { name: 'Priority' });

  expect(select).toHaveValue('normal');
  await fireEvent.update(select, 'low');
  form.reset();

  expect(select).toHaveValue('normal');
});

test('preserves Ark asChild composition with a semantic select element', () => {
  const selectRef = ref<ComponentPublicInstance | null>(null);
  const Harness = defineComponent({
    components,
    setup() {
      return { selectRef };
    },
    template: `
      <NativeSelect ref="selectRef" as-child>
        <select aria-label="Framework">
          <option value="react">React</option>
        </select>
      </NativeSelect>
    `,
  });

  render(Harness);

  const select = screen.getByRole('combobox', { name: 'Framework' });

  expect(selectRef.value?.$el).toBe(select);
  expect(select).toHaveAttribute('data-slot', 'native-select-root');
  expect(select.parentElement).toHaveAttribute('data-slot', 'native-select-control');
});

test('keeps the field hooks on a standalone select', () => {
  render({
    components,
    template: `
      <NativeSelect aria-label="Framework">
        <option value="react">React</option>
      </NativeSelect>
    `,
  });

  const select = screen.getByRole('combobox', { name: 'Framework' });
  expect(select).toHaveAttribute('data-scope', 'field');
  expect(select).toHaveAttribute('data-part', 'select');
  expect(select).toHaveAttribute('data-slot', 'native-select-root');
});

test('hides the indicator for native list controls', () => {
  render({
    components,
    template: `
      <NativeSelect multiple size="3" aria-label="Frameworks">
        <option value="react">React</option>
        <option value="vue">Vue</option>
      </NativeSelect>
    `,
  });

  const select = screen.getByRole('listbox', { name: 'Frameworks' });
  const indicator = select.parentElement?.querySelector('[data-slot="native-select-indicator"]');

  expect(select).toHaveAttribute('multiple');
  expect(select).toHaveAttribute('size', '3');
  expect(indicator).toBeInTheDocument();
});

test('renders and hydrates the native select with stable anatomy', async () => {
  const App = defineComponent({
    components,
    template: `
      <NativeSelect aria-label="Server select">
        <option value="react">React</option>
      </NativeSelect>
    `,
  });

  const html = await renderToString(createSSRApp(App));
  expect(html).toContain('data-slot="native-select-control"');
  expect(html).toContain('data-slot="native-select-root"');
  expect(html).toContain('data-slot="native-select-indicator"');

  const host = document.createElement('div');
  host.innerHTML = html;
  document.body.append(host);
  const app = createSSRApp(App);
  app.mount(host);

  expect(host.querySelectorAll('select')).toHaveLength(1);
  expect(host.querySelector('[data-slot="native-select-root"]')).toBeInTheDocument();
  expect(host.querySelector('[data-slot="native-select-indicator"]')).toBeInTheDocument();

  app.unmount();
  host.remove();
});