import { FieldLabel, FieldRoot } from '@ark-ui/vue/field';
import { expect, test } from '@rstest/core';
import { fireEvent, render, screen, waitFor } from '@testing-library/vue';
import { renderToString } from '@vue/server-renderer';
import { createSSRApp, defineComponent, nextTick, ref } from 'vue';
import type { Component, ComponentPublicInstance } from 'vue';
import { Textarea } from '../src';

const fieldComponents = {
  FieldLabel,
  FieldRoot,
  Textarea,
} as unknown as Record<string, Component>;

test('preserves native field state and component-owned styling hooks', () => {
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

  expect(textarea).toBeDisabled();
  expect(textarea).toHaveAttribute('aria-invalid', 'true');
  expect(textarea).toHaveAttribute('readonly');
  expect(textarea).toBeRequired();
  expect(textarea).toHaveAttribute('data-part', 'textarea');
  expect(textarea).toHaveAttribute('data-scope', 'field');
  expect(textarea).toHaveAttribute('data-slot', 'textarea-root');
  expect(textarea).toHaveClass('consumer-class');
});

test('forwards the textarea ref on the ordinary path', () => {
  const textareaRef = ref<ComponentPublicInstance | null>(null);
  const Harness = defineComponent({
    components: fieldComponents,
    setup() {
      return { textareaRef };
    },
    template: '<Textarea ref="textareaRef" aria-label="Repository summary" />',
  });

  render(Harness);

  const textarea = screen.getByRole('textbox', { name: 'Repository summary' });

  expect(textareaRef.value?.$el).toBe(textarea);
  expect(textarea).toHaveAttribute('data-slot', 'textarea-root');
});

test('preserves asChild composition and forwards its ref to the semantic textarea', () => {
  const textareaRef = ref<ComponentPublicInstance | null>(null);
  const Harness = defineComponent({
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

  render(Harness);

  const textarea = screen.getByRole('textbox', { name: 'Repository summary' });

  expect(textareaRef.value?.$el).toBe(textarea);
  expect(textarea).toHaveAttribute('name', 'summary');
  expect(textarea).toHaveAttribute('data-slot', 'textarea-root');
});

test('keeps Ark autoresize behavior and the moduix styling hook', () => {
  render({
    components: fieldComponents,
    template: '<Textarea aria-label="Description" autoresize />',
  });

  const textarea = screen.getByRole('textbox', { name: 'Description' });

  expect(textarea).toHaveAttribute('data-autoresize');
  expect(textarea).toHaveStyle({ resize: 'none' });
});

test('supports controlled v-model updates and external value changes', async () => {
  const value = ref('Draft');
  const changes: string[] = [];
  const Harness = defineComponent({
    components: fieldComponents,
    setup() {
      return { changes, value };
    },
    template: `
      <Textarea
        v-model="value"
        aria-label="Summary"
        @update:model-value="changes.push($event)"
      />
      <output>{{ value }}</output>
    `,
  });

  render(Harness);
  const textarea = screen.getByRole('textbox', { name: 'Summary' });

  expect(textarea).toHaveValue('Draft');
  await fireEvent.update(textarea, 'Published');

  await waitFor(() => expect(textarea).toHaveValue('Published'));
  expect(screen.getByText('Published')).toBeInTheDocument();
  expect(changes).toEqual(['Published']);

  value.value = 'Imported';
  await nextTick();

  expect(textarea).toHaveValue('Imported');
});

test('preserves native form ownership', async () => {
  render({
    components: fieldComponents,
    template: `
      <form aria-label="Project form" id="project-form" />
      <Textarea
        aria-label="Summary"
        default-value="Draft"
        form="project-form"
        name="summary"
      />
    `,
  });

  const form = screen.getByRole('form', { name: 'Project form' }) as HTMLFormElement;
  const textarea = screen.getByRole('textbox', { name: 'Summary' });

  await fireEvent.update(textarea, 'Published');

  expect(textarea).toHaveValue('Published');
  expect(new FormData(form).get('summary')).toBe('Published');
});

// Ark Vue 5.39.2 applies default-value initially but does not preserve it as the
// native defaultValue property, so form.reset() cannot restore the initial value.
test.skip('restores the native textarea default value on reset', async () => {
  render({
    components: fieldComponents,
    template: `
      <form aria-label="Project form" id="project-form" />
      <Textarea
        aria-label="Summary"
        default-value="Draft"
        form="project-form"
        name="summary"
      />
    `,
  });

  const form = screen.getByRole('form', { name: 'Project form' }) as HTMLFormElement;
  const textarea = screen.getByRole('textbox', { name: 'Summary' });

  await fireEvent.update(textarea, 'Published');

  form.reset();

  expect(textarea).toHaveValue('Draft');
  expect(new FormData(form).get('summary')).toBe('Draft');
});

test('applies native utilities to the textarea', () => {
  render({ components: fieldComponents, template: '<Textarea aria-label="Project notes" />' });
  const textarea = screen.getByRole('textbox', { name: 'Project notes' });

  expect(textarea).toHaveClass(
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

  expect(textarea).toHaveClass(
    'w-80',
    'max-w-sm',
    'min-h-20',
    'resize-none',
    'rounded-lg',
    'bg-muted',
    'px-0',
    'py-0',
    'leading-5',
  );
  expect(textarea).not.toHaveClass(
    'w-full',
    'max-w-none',
    'min-h-24',
    'resize-y',
    'rounded-md',
    'bg-background',
    'px-3.5',
    'py-2',
    'leading-6',
  );
});

test('renders and hydrates the native textarea with stable anatomy', async () => {
  const App = defineComponent({
    components: fieldComponents,
    template: '<Textarea aria-label="Server textarea" :rows="4" />',
  });

  const html = await renderToString(createSSRApp(App));
  expect(html).toContain('data-slot="textarea-root"');
  expect(html).toContain('data-scope="field"');
  expect(html).toContain('rows="4"');

  const host = document.createElement('div');
  host.innerHTML = html;
  document.body.append(host);
  const app = createSSRApp(App);
  app.mount(host);

  const textarea = host.querySelector('textarea');
  expect(host.querySelectorAll('textarea')).toHaveLength(1);
  expect(textarea).toHaveAttribute('data-slot', 'textarea-root');
  expect(textarea).toHaveAttribute('rows', '4');

  app.unmount();
  host.remove();
});