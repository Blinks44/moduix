import { FieldErrorText, FieldLabel, FieldRoot } from '@ark-ui/vue/field';
import { page } from '@rstest/browser';
import { expect, rs, test } from '@rstest/core';
import { render, screen } from '@testing-library/vue';
import { renderToString } from '@vue/server-renderer';
import { createSSRApp, nextTick, ref } from 'vue';
import type { ComponentPublicInstance } from 'vue';
import { Input } from '../src';
import styles from '../src/components/input/Input.module.css';
import SsrInput from './fixtures/SsrInput.vue';

const fieldComponents = {
  FieldErrorText,
  FieldLabel,
  FieldRoot,
  Input,
};

test('preserves native field state and component-owned styling hooks', async () => {
  render({
    components: fieldComponents,
    template: `
      <FieldRoot disabled id="email" invalid read-only required>
        <FieldLabel>Email</FieldLabel>
        <Input
          :data-part="'consumer-part'"
          :data-scope="'consumer-scope'"
          :data-size="'xs'"
          :data-slot="'consumer-slot'"
          :html-size="8"
          class="consumer-class"
        />
        <FieldErrorText>Enter an email address.</FieldErrorText>
      </FieldRoot>
    `,
  });

  const input = screen.getByRole('textbox', { name: 'Email' });

  const textbox = page.getByRole('textbox', { name: 'Email' });
  await expect.element(textbox).toBeDisabled();
  await expect.element(textbox).toHaveAttribute('aria-invalid', 'true');
  await expect.element(textbox).toHaveAttribute('readonly');
  expect(input?.hasAttribute('required')).toBe(true);
  expect(input.dataset).toMatchObject({
    part: 'input',
    scope: 'field',
    size: 'md',
    slot: 'input-root',
  });
  expect(input.hasAttribute('data-html-size')).toBe(true);
  await expect.element(textbox).toHaveAttribute('size', '8');
  expect([...input!.classList]).toEqual(expect.arrayContaining([styles.root, 'consumer-class']));
});

test('forwards the input ref on the ordinary path', () => {
  const inputRef = ref<ComponentPublicInstance | null>(null);

  render({
    components: fieldComponents,
    setup() {
      return { inputRef };
    },
    template: '<Input ref="inputRef" aria-label="Repository" />',
  });

  const input = screen.getByRole('textbox', { name: 'Repository' });

  expect(inputRef.value?.$el).toBe(input);
  expect(input.getAttribute('data-slot')).toBe('input-root');
});

test('preserves asChild composition and forwards its ref to the semantic input', async () => {
  const inputRef = ref<ComponentPublicInstance | null>(null);

  render({
    components: fieldComponents,
    setup() {
      return { inputRef };
    },
    template: `
      <Input ref="inputRef" as-child>
        <input name="repository" aria-label="Repository" />
      </Input>
    `,
  });

  const input = screen.getByRole('textbox', { name: 'Repository' });

  expect(inputRef.value?.$el).toBe(input);
  await expect
    .element(page.getByRole('textbox', { name: 'Repository' }))
    .toHaveAttribute('name', 'repository');
  expect(input.getAttribute('data-slot')).toBe('input-root');
});

test.each([false, true])('supports controlled v-model updates (asChild=%s)', async (asChild) => {
  const changes: string[] = [];
  const value = ref('initial');

  render({
    components: fieldComponents,
    setup() {
      return {
        asChild,
        changes,
        value,
      };
    },
    template: `
      <Input
        v-model="value"
        :as-child="asChild"
        aria-label="Project key"
        @update:model-value="changes.push($event)"
      >${asChild ? '<input />' : ''}</Input>
      <output>{{ value }}</output>
    `,
  });

  await expect.element(page.getByRole('textbox', { name: 'Project key' })).toHaveValue('initial');
  await page.getByRole('textbox', { name: 'Project key' }).fill('next');

  await expect.element(page.getByRole('textbox', { name: 'Project key' })).toHaveValue('next');
  await expect.element(page.getByText('next')).toBeAttached();
  expect(changes).toEqual(['next']);

  value.value = 'from parent';
  await expect
    .element(page.getByRole('textbox', { name: 'Project key' }))
    .toHaveValue('from parent');
  expect(changes).toEqual(['next']);
});

test('hydrates the native input without replacing its host and supports editing', async () => {
  const host = document.createElement('div');
  host.innerHTML = await renderToString(createSSRApp(SsrInput));
  document.body.append(host);
  const serverInput = host.querySelector('input');
  const serverIds = [...host.querySelectorAll('[id]')].map((element) => element.id);
  const warn = rs.spyOn(console, 'warn');
  const error = rs.spyOn(console, 'error');
  const app = createSSRApp(SsrInput);
  const textbox = page.getByRole('textbox', { name: 'Server input' });
  try {
    app.mount(host);
    await nextTick();
    expect(host.querySelectorAll('input')).toHaveLength(1);
    expect(host.querySelector('input')).toBe(serverInput);
    expect([...host.querySelectorAll('[id]')].map((element) => element.id)).toEqual(serverIds);
    await expect.element(textbox).toHaveAttribute('size', '8');
    await textbox.fill('Hydrated value');
    await expect.element(textbox).toHaveValue('Hydrated value');
    expect(warn).not.toHaveBeenCalled();
    expect(error).not.toHaveBeenCalled();
  } finally {
    app.unmount();
    host.remove();
    warn.mockRestore();
    error.mockRestore();
  }
});