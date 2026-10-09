import { FieldLabel, FieldRoot } from '@ark-ui/vue/field';
import { page } from '@rstest/browser';
import { expect, rs, test } from '@rstest/core';
import { render, screen } from '@testing-library/vue';
import { renderToString } from '@vue/server-renderer';
import { createSSRApp, nextTick, ref } from 'vue';
import type { ComponentPublicInstance } from 'vue';
import { Input as TextInput } from '../src';
import SsrInput from './fixtures/SsrInput.vue';

const fieldComponents = { FieldLabel, FieldRoot, TextInput };

test('preserves native field state and component-owned styling hooks', async () => {
  render({
    components: fieldComponents,
    template: `
      <FieldRoot disabled id="email" invalid read-only required>
        <FieldLabel>Email</FieldLabel>
        <TextInput
          :data-part="'consumer-part'"
          :data-scope="'consumer-scope'"
          :data-size="'xs'"
          :data-slot="'consumer-slot'"
          :html-size="8"
          class="consumer-class"
        />
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
  expect(input?.classList.contains('consumer-class')).toBe(true);
});

test('forwards the input ref on the ordinary path', () => {
  const inputRef = ref<ComponentPublicInstance | null>(null);

  render({
    components: fieldComponents,
    setup() {
      return { inputRef };
    },
    template: '<TextInput ref="inputRef" aria-label="Repository" />',
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
      <TextInput ref="inputRef" as-child>
        <input name="repository" aria-label="Repository" />
      </TextInput>
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
      <TextInput
        v-model="value"
        :as-child="asChild"
        aria-label="Project key"
        @update:model-value="changes.push($event)"
      ><input v-if="asChild" /></TextInput>
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

test('applies native utilities to the input', () => {
  render({ components: fieldComponents, template: '<TextInput aria-label="Project key" />' });
  const input = screen.getByRole('textbox', { name: 'Project key' });
  expect([...input.classList]).toEqual(
    expect.arrayContaining([
      'w-full',
      'max-w-none',
      'min-h-control-md',
      'rounded-md',
      'border',
      'border-border',
      'bg-background',
      'px-3',
      'py-1',
      'text-md',
      'leading-6',
      'file:border-primary',
      'file:bg-primary',
      'file:px-2',
      'file:py-0.5',
    ]),
  );
});

test('applies each visual size with native utilities', () => {
  render({
    components: fieldComponents,
    template: `
      <TextInput size="xs" aria-label="Extra-small input" />
      <TextInput size="sm" aria-label="Small input" />
      <TextInput size="md" aria-label="Medium input" />
      <TextInput size="lg" aria-label="Large input" />
      <TextInput size="xl" aria-label="Extra-large input" />
    `,
  });

  expect([...screen.getByLabelText('Extra-small input')!.classList]).toEqual(
    expect.arrayContaining(['min-h-control-xs', 'px-2', 'py-0.5', 'text-xs', 'leading-4']),
  );
  expect([...screen.getByLabelText('Small input')!.classList]).toEqual(
    expect.arrayContaining(['min-h-control-sm', 'px-2', 'py-1', 'text-sm', 'leading-5']),
  );
  expect(screen.getByLabelText('Medium input')?.classList.contains('min-h-control-md')).toBe(true);
  expect([...screen.getByLabelText('Large input')!.classList]).toEqual(
    expect.arrayContaining(['min-h-control-lg', 'px-4', 'py-1', 'text-lg', 'leading-7']),
  );
  expect([...screen.getByLabelText('Extra-large input')!.classList]).toEqual(
    expect.arrayContaining(['min-h-control-xl', 'px-4', 'py-2', 'text-lg', 'leading-7']),
  );
});

test('lets consumer utilities replace component defaults', () => {
  render({
    components: fieldComponents,
    template: `
      <TextInput
        size="lg"
        :html-size="8"
        aria-label="Project key"
        class="min-h-20 w-80 max-w-sm rounded-lg bg-muted px-0 py-0 leading-5"
      />
    `,
  });

  const input = screen.getByRole('textbox', { name: 'Project key' });
  expect([...input.classList]).toEqual(
    expect.arrayContaining([
      'w-80',
      'max-w-sm',
      'min-h-20',
      'rounded-lg',
      'bg-muted',
      'px-0',
      'py-0',
      'leading-5',
    ]),
  );
  for (const utility of [
    'w-full',
    'w-auto',
    'max-w-none',
    'min-h-control-lg',
    'rounded-md',
    'bg-background',
    'px-4',
    'py-1',
    'leading-7',
  ]) {
    expect(input.classList.contains(utility)).toBe(false);
  }
  expect(getComputedStyle(input)).toMatchObject({
    minHeight: '80px',
    width: '320px',
    paddingLeft: '0px',
    paddingRight: '0px',
    paddingTop: '0px',
    paddingBottom: '0px',
    lineHeight: '20px',
  });
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