import { FieldLabel, FieldRoot } from '@ark-ui/vue/field';
import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/vue';
import { nextTick, ref } from 'vue';
import type { ComponentPublicInstance } from 'vue';
import { NativeSelect } from '@/index';

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
  expect([...select.classList]).toEqual(expect.arrayContaining(['consumer-select']));
  expect(select.parentElement?.getAttribute('data-slot')).toBe('native-select-control');
  expect(select.parentElement?.getAttribute('title')).toBe('Native select control');
  expect([...select.parentElement!.classList]).toEqual(
    expect.arrayContaining(['consumer-control']),
  );
  expect(
    select.parentElement?.querySelector('[data-slot="native-select-indicator"] svg')?.isConnected,
  ).toBe(true);
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
    const indicator = document.querySelector('[data-slot="native-select-indicator"]')!;

    expect(indicator.querySelector('svg')?.isConnected).toBe(true);
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

test('lets consumer utilities replace defaults and hides the indicator for list controls', async () => {
  render({
    components,
    template: `
      <NativeSelect
        class="h-20 w-80 rounded-lg bg-muted p-0"
        :control-props="{ class: 'w-full' }"
        multiple
        size="3"
        aria-label="Frameworks"
      >
        <option value="react">React</option>
        <option value="vue">Vue</option>
      </NativeSelect>
    `,
  });

  const control = document.querySelector('[data-slot="native-select-control"]')!;

  expect([...control.classList]).toEqual(expect.arrayContaining(['w-full']));
  await expect.element(page.locator('[data-slot="native-select-indicator"]')).not.toBeVisible();
  const rootLocator = page.getByRole('listbox', { name: 'Frameworks' });
  await expect.element(rootLocator).toHaveCSS('height', '80px');
  await expect.element(rootLocator).toHaveCSS('width', '320px');
  await expect.element(rootLocator).toHaveCSS('padding-left', '0px');
});