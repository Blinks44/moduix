import { FieldLabel, FieldRoot } from '@ark-ui/vue/field';
import { page } from '@rstest/browser';
import { expect, rs, test } from '@rstest/core';
import { render, screen } from '@testing-library/vue';
import { renderToString } from '@vue/server-renderer';
import { createSSRApp, nextTick, ref } from 'vue';
import type { ComponentPublicInstance } from 'vue';
import { Textarea } from '../src';
import SsrTextarea from './fixtures/SsrTextarea.vue';

const fieldComponents = {
  FieldLabel,
  FieldRoot,
  Textarea,
};

test('preserves native field state and component-owned styling hooks', async () => {
  render({
    components: fieldComponents,
    template: `
      <FieldRoot disabled id="summary" invalid read-only required>
        <FieldLabel>Summary</FieldLabel>
        <Textarea
          class="consumer-class"
          data-part="consumer-part"
          data-scope="consumer-scope"
          data-slot="consumer-slot"
        />
      </FieldRoot>
    `,
  });

  const textarea = screen.getByRole('textbox', { name: 'Summary' });

  const textbox = page.getByRole('textbox', { name: 'Summary' });
  await expect.element(textbox).toBeDisabled();
  await expect.element(textbox).toHaveAttribute('aria-invalid', 'true');
  await expect.element(textbox).toHaveAttribute('readonly');
  expect(textarea?.hasAttribute('required')).toBe(true);
  expect(textarea.dataset).toMatchObject({
    part: 'textarea',
    scope: 'field',
    slot: 'textarea-root',
  });
  expect(textarea?.classList.contains('consumer-class')).toBe(true);
});

test('forwards the textarea ref on the ordinary path', () => {
  const textareaRef = ref<ComponentPublicInstance | null>(null);

  render({
    components: fieldComponents,
    setup() {
      return { textareaRef };
    },
    template: '<Textarea ref="textareaRef" aria-label="Repository summary" />',
  });

  const textarea = screen.getByRole('textbox', { name: 'Repository summary' });

  expect(textareaRef.value?.$el).toBe(textarea);
  expect(textarea.getAttribute('data-slot')).toBe('textarea-root');
});

test('preserves asChild composition and forwards its ref to the semantic textarea', async () => {
  const textareaRef = ref<ComponentPublicInstance | null>(null);

  render({
    components: fieldComponents,
    setup() {
      return { textareaRef };
    },
    template: `
      <Textarea ref="textareaRef" as-child>
        <textarea name="summary" aria-label="Repository summary" />
      </Textarea>
    `,
  });

  const textarea = screen.getByRole('textbox', { name: 'Repository summary' });

  expect(textareaRef.value?.$el).toBe(textarea);
  await expect
    .element(page.getByRole('textbox', { name: 'Repository summary' }))
    .toHaveAttribute('name', 'summary');
  expect(textarea.getAttribute('data-slot')).toBe('textarea-root');
});

test('resizes with multiline input and preserves the autoresize styling hook', async () => {
  render({
    components: fieldComponents,
    template: '<Textarea aria-label="Description" autoresize />',
  });

  const textarea = screen.getByRole('textbox', { name: 'Description' });

  expect(textarea.hasAttribute('data-autoresize')).toBe(true);
  expect(getComputedStyle(textarea!).resize).toBe('none');

  const initialHeight = textarea.getBoundingClientRect().height;
  expect(initialHeight).toBeGreaterThan(0);

  const textbox = page.getByRole('textbox', { name: 'Description' });
  await textbox.fill(Array.from({ length: 12 }, (_, index) => `Line ${index + 1}`).join('\n'));
  await expect.poll(() => textarea.getBoundingClientRect().height).toBeGreaterThan(initialHeight);

  await textbox.fill('Short description');
  await expect.poll(() => textarea.getBoundingClientRect().height).toBe(initialHeight);
});

test.each([false, true])(
  'supports controlled v-model updates and external value changes (asChild=%s)',
  async (asChild) => {
    const value = ref('Draft');
    const changes: string[] = [];

    render({
      components: fieldComponents,
      setup() {
        return { asChild, changes, value };
      },
      template: `
      <Textarea
        v-model="value"
        :as-child="asChild"
        aria-label="Summary"
        @update:model-value="changes.push($event)"
      >${asChild ? '<textarea />' : ''}</Textarea>
      <output>{{ value }}</output>
    `,
    });

    await expect.element(page.getByRole('textbox', { name: 'Summary' })).toHaveValue('Draft');
    await page.getByRole('textbox', { name: 'Summary' }).fill('Published');

    await expect.element(page.getByRole('textbox', { name: 'Summary' })).toHaveValue('Published');
    await expect.element(page.getByText('Published')).toBeAttached();
    expect(changes).toEqual(['Published']);

    value.value = 'Imported';
    await nextTick();

    await expect.element(page.getByRole('textbox', { name: 'Summary' })).toHaveValue('Imported');
    expect(changes).toEqual(['Published']);
  },
);

test('preserves native form ownership', async () => {
  render({
    components: fieldComponents,
    template: `
      <form aria-label="Project form" id="project-form" />
      <Textarea
        aria-label="Summary"
        form="project-form"
        name="summary"
      />
    `,
  });

  const form = screen.getByRole('form', { name: 'Project form' }) as HTMLFormElement;

  await page.getByRole('textbox', { name: 'Summary' }).fill('Published');

  await expect.element(page.getByRole('textbox', { name: 'Summary' })).toHaveValue('Published');
  expect(new FormData(form).get('summary')).toBe('Published');
});

test('restores the native textarea default value on reset', async () => {
  render({
    components: fieldComponents,
    template: `
      <form aria-label="Project form" id="project-form" />
      <Textarea
        aria-label="Summary"
        :defaultValue="'Draft'"
        form="project-form"
        name="summary"
      />
    `,
  });

  const form = screen.getByRole('form', { name: 'Project form' }) as HTMLFormElement;

  await page.getByRole('textbox', { name: 'Summary' }).fill('Published');

  form.reset();

  await expect.element(page.getByRole('textbox', { name: 'Summary' })).toHaveValue('Draft');
  expect(new FormData(form).get('summary')).toBe('Draft');
});

test('applies native utilities to the textarea', () => {
  render({ components: fieldComponents, template: '<Textarea aria-label="Project notes" />' });
  const textarea = screen.getByRole('textbox', { name: 'Project notes' });
  expect([...textarea.classList]).toEqual(
    expect.arrayContaining([
      'min-h-24',
      'w-full',
      'max-w-none',
      'resize-y',
      'rounded-md',
      'border',
      'border-border',
      'bg-background',
      'px-3.5',
      'py-2',
      'text-md',
      'leading-6',
    ]),
  );
});

test('lets consumer utilities replace component defaults', () => {
  render({
    components: fieldComponents,
    template: `
      <Textarea
        aria-label="Project notes"
        class="min-h-20 w-80 max-w-sm resize-none rounded-lg bg-muted px-0 py-0 leading-5"
      />
    `,
  });

  const textarea = screen.getByRole('textbox', { name: 'Project notes' });
  expect([...textarea.classList]).toEqual(
    expect.arrayContaining([
      'w-80',
      'max-w-sm',
      'min-h-20',
      'resize-none',
      'rounded-lg',
      'bg-muted',
      'px-0',
      'py-0',
      'leading-5',
    ]),
  );
  for (const utility of [
    'w-full',
    'max-w-none',
    'min-h-24',
    'resize-y',
    'rounded-md',
    'bg-background',
    'px-3.5',
    'py-2',
    'leading-6',
  ]) {
    expect(textarea.classList.contains(utility)).toBe(false);
  }
});

test('hydrates the native textarea without replacing its host and supports editing', async () => {
  const host = document.createElement('div');
  host.innerHTML = await renderToString(createSSRApp(SsrTextarea));
  document.body.append(host);
  const serverInput = host.querySelector('textarea');
  const serverIds = [...host.querySelectorAll('[id]')].map((element) => element.id);
  const warn = rs.spyOn(console, 'warn');
  const error = rs.spyOn(console, 'error');
  const app = createSSRApp(SsrTextarea);
  const textbox = page.getByRole('textbox', { name: 'Server textarea' });
  try {
    app.mount(host);
    await nextTick();
    expect(host.querySelectorAll('textarea')).toHaveLength(1);
    expect(host.querySelector('textarea')).toBe(serverInput);
    expect([...host.querySelectorAll('[id]')].map((element) => element.id)).toEqual(serverIds);
    await expect.element(textbox).toHaveAttribute('rows', '4');
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