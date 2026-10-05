import { FieldLabel, FieldRoot } from '@ark-ui/vue/field';
import { page } from '@rstest/browser';
import { expect, test, rs } from '@rstest/core';
import { render, screen } from '@testing-library/vue';
import { renderToString } from '@vue/server-renderer';
import { createSSRApp, nextTick, ref } from 'vue';
import type { ComponentPublicInstance } from 'vue';
import { NativeSelect } from '../src';
import styles from '../src/components/native-select/NativeSelect.module.css';

const components = {
  FieldLabel,
  FieldRoot,
  NativeSelect,
};

test('preserves Field state, anatomy, and control styling hooks', async () => {
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

  const selectLocator = page.getByRole('combobox', { name: 'Framework', exact: true });
  await expect.element(selectLocator).toBeDisabled();
  await expect.element(selectLocator).toHaveAttribute('aria-invalid', 'true');
  await expect.element(selectLocator).toHaveAttribute('required');
  await expect.element(selectLocator).toHaveAttribute('data-part', 'select');
  await expect.element(selectLocator).toHaveAttribute('data-scope', 'field');
  await expect.element(selectLocator).toHaveAttribute('data-slot', 'native-select-root');
  expect([...select.classList]).toEqual(expect.arrayContaining([styles.root, 'consumer-select']));
  expect(select.parentElement?.getAttribute('data-slot')).toBe('native-select-control');
  expect(select.parentElement?.getAttribute('title')).toBe('Native select control');
  expect([...select.parentElement!.classList]).toEqual(
    expect.arrayContaining([styles.control, 'consumer-control']),
  );
  expect(
    select.parentElement?.querySelector('[data-slot="native-select-indicator"] svg')?.isConnected,
  ).toBe(true);
});

test('shows the selected option while disabled', async () => {
  render({
    components,
    template: `
      <NativeSelect disabled model-value="react" aria-label="Framework">
        <option value="react">React</option>
        <option value="vue">Vue</option>
      </NativeSelect>
    `,
  });

  await expect
    .element(page.getByRole('combobox', { name: 'Framework', exact: true }))
    .toHaveValue('react');
});

test.each([false, true])(
  'forwards the native select ref and controlled events (asChild=%s)',
  async (asChild) => {
    const selectRef = ref<ComponentPublicInstance | null>(null);
    const value = ref('react');
    const changes: string[] = [];
    const modelChanges: string[] = [];

    render({
      components,
      setup() {
        return { asChild, changes, modelChanges, selectRef, value };
      },
      template: `
      <NativeSelect
        ref="selectRef"
        v-model="value"
        :as-child="asChild"
        aria-label="Framework"
        @change="changes.push($event.target.value)"
        @update:model-value="modelChanges.push($event)"
      >
        ${asChild ? '<select>' : ''}
        <option value="react">React</option>
        <option value="vue">Vue</option>
        ${asChild ? '</select>' : ''}
      </NativeSelect>
    `,
    });

    const select = screen.getByRole('combobox', { name: 'Framework' });

    expect(selectRef.value?.$el).toBe(select);
    expect(NativeSelect).not.toHaveProperty('Root');
    const selectLocator = page.getByRole('combobox', { name: 'Framework', exact: true });
    await expect.element(selectLocator).toHaveAttribute('data-scope', 'field');
    await expect.element(selectLocator).toHaveAttribute('data-part', 'select');
    await expect.element(selectLocator).toHaveAttribute('data-slot', 'native-select-root');
    expect(select.parentElement?.getAttribute('data-slot')).toBe('native-select-control');
    await selectLocator.selectOption('vue');

    await expect.element(selectLocator).toHaveValue('vue');
    expect(value.value).toBe('vue');
    expect(changes).toEqual(['vue']);
    expect(modelChanges).toEqual(['vue']);

    value.value = 'react';
    await nextTick();
    await expect.element(selectLocator).toHaveValue('react');
    expect(changes).toEqual(['vue']);
    expect(modelChanges).toEqual(['vue']);
  },
);

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

  await page.getByRole('combobox', { name: 'Framework', exact: true }).selectOption('vue');

  expect(new FormData(form).get('framework')).toBe('vue');

  form.reset();

  await expect
    .element(page.getByRole('combobox', { name: 'Framework', exact: true }))
    .toHaveValue('react');
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

  const combobox = page.getByRole('combobox', { name: 'Priority', exact: true });
  await expect.element(combobox).toHaveValue('normal');
  await combobox.selectOption('low');
  form.reset();

  await expect.element(combobox).toHaveValue('normal');
});

test('hides the indicator for native list controls', async () => {
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

  await expect
    .element(page.getByRole('listbox', { name: 'Frameworks', exact: true }))
    .toHaveAttribute('multiple');
  await expect
    .element(page.getByRole('listbox', { name: 'Frameworks', exact: true }))
    .toHaveAttribute('size', '3');
  expect(indicator?.isConnected).toBe(true);
});

test('hydrates without replacing hosts or generated ids', async () => {
  const host = document.createElement('div');
  host.innerHTML = await renderToString(createSSRApp(SsrNativeSelect));
  document.body.append(host);
  const serverRoot = host.querySelector('select');
  const serverIds = [...host.querySelectorAll('[id]')].map((element) => element.id);
  const warn = rs.spyOn(console, 'warn');
  const error = rs.spyOn(console, 'error');
  const app = createSSRApp(SsrNativeSelect);
  try {
    app.mount(host);
    await nextTick();
    expect(host.querySelectorAll('select')).toHaveLength(1);
    expect(host.querySelector('select')).toBe(serverRoot);
    expect([...host.querySelectorAll('[id]')].map((element) => element.id)).toEqual(serverIds);
    expect(host.querySelector('[data-slot="native-select-indicator"]')?.isConnected).toBe(true);
    await page.getByRole('combobox', { name: 'Server select' }).selectOption('vue');
    await expect.element(page.getByRole('combobox', { name: 'Server select' })).toHaveValue('vue');
    expect(warn).not.toHaveBeenCalled();
    expect(error).not.toHaveBeenCalled();
  } finally {
    app.unmount();
    host.remove();
    warn.mockRestore();
    error.mockRestore();
  }
});
import SsrNativeSelect from './fixtures/SsrNativeSelect.vue';