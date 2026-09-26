import { expect, test } from '@rstest/core';
import { fireEvent, render, screen } from '@solidjs/testing-library';
import { createSignal } from 'solid-js';
import { Field, Textarea, FieldLabel } from '../src';

test('preserves native field state and component-owned styling hooks', () => {
  render(() => (
    <Field disabled id="summary" invalid readOnly required>
      <FieldLabel>Summary</FieldLabel>
      <Textarea data-part="consumer-part" data-scope="consumer-scope" data-slot="consumer-slot" />
    </Field>
  ));

  const textarea = screen.getByRole('textbox', { name: 'Summary' });

  expect(textarea).toBeDisabled();
  expect(textarea).toHaveAttribute('aria-invalid', 'true');
  expect(textarea).toHaveAttribute('readonly');
  expect(textarea).toBeRequired();
  expect(textarea).toHaveAttribute('data-part', 'textarea');
  expect(textarea).toHaveAttribute('data-scope', 'field');
  expect(textarea).toHaveAttribute('data-slot', 'textarea-root');
});

test('forwards the textarea ref on the ordinary path', () => {
  let textareaRef!: HTMLTextAreaElement;

  render(() => (
    <Field>
      <FieldLabel>Repository summary</FieldLabel>
      <Textarea ref={(element) => (textareaRef = element)} />
    </Field>
  ));

  const textarea = screen.getByRole('textbox', { name: 'Repository summary' });

  expect(textareaRef).toBe(textarea);
  expect(textarea).toHaveAttribute('data-slot', 'textarea-root');
});

test('preserves asChild composition without forwarding the ref through Ark Solid', () => {
  let textareaRef: HTMLTextAreaElement | undefined;

  render(() => (
    <Field>
      <FieldLabel>Repository summary</FieldLabel>
      <Textarea
        defaultValue="Draft"
        ref={(element) => (textareaRef = element)}
        asChild={(props) => <textarea {...props()} name="summary" />}
      />
    </Field>
  ));

  const textarea = screen.getByRole('textbox', { name: 'Repository summary' });

  expect(textarea).toHaveAttribute('name', 'summary');
  expect(textarea).toHaveAttribute('data-slot', 'textarea-root');
  expect(textarea).toHaveValue('Draft');
  expect(textareaRef).toBeUndefined();
});

test('keeps Ark autoresize behavior and the moduix styling hook', () => {
  render(() => <Textarea aria-label="Description" autoresize />);

  const textarea = screen.getByRole('textbox', { name: 'Description' });

  expect(textarea).toHaveAttribute('data-autoresize');
  expect(textarea).toHaveStyle({ resize: 'none' });
});

test('keeps controlled textarea values synchronized with external updates', () => {
  const [value, setValue] = createSignal('Draft');

  render(() => <Textarea aria-label="Summary" onChange={() => undefined} value={value()} />);

  const textarea = screen.getByRole('textbox', { name: 'Summary' });

  fireEvent.change(textarea, { target: { value: 'Published' } });

  expect(textarea).toHaveValue('Published');

  setValue('Imported');

  expect(textarea).toHaveValue('Imported');
});

test('preserves native form ownership, data, and reset behavior', () => {
  render(() => (
    <>
      <form aria-label="Project form" id="project-form" />
      <Textarea aria-label="Summary" defaultValue="Draft" form="project-form" name="summary" />
    </>
  ));

  const form = screen.getByRole('form', { name: 'Project form' }) as HTMLFormElement;
  const textarea = screen.getByRole('textbox', { name: 'Summary' });

  fireEvent.change(textarea, { target: { value: 'Published' } });

  expect(textarea).toHaveValue('Published');
  expect(new FormData(form).get('summary')).toBe('Published');

  form.reset();

  expect(textarea).toHaveValue('Draft');
  expect(new FormData(form).get('summary')).toBe('Draft');
});

test('applies native utilities to the textarea', () => {
  const { container } = render(() => <Textarea aria-label="Project summary" />);
  const textarea = container.querySelector('[data-slot="textarea-root"]');

  expect(textarea).toHaveClass(
    'w-full',
    'max-w-none',
    'min-h-24',
    'rounded-md',
    'border',
    'border-border',
    'bg-background',
    'px-3.5',
    'py-2',
    'text-md',
    'leading-6',
    'resize-y',
  );
});

test('lets consumer utilities replace component defaults', () => {
  const { container } = render(() => (
    <Textarea
      aria-label="Project summary"
      class="min-h-20 w-80 max-w-sm resize-none rounded-lg bg-muted px-0 py-0 leading-5"
    />
  ));

  const textarea = container.querySelector('[data-slot="textarea-root"]');

  expect(textarea).toHaveClass(
    'w-80',
    'max-w-sm',
    'min-h-20',
    'rounded-lg',
    'bg-muted',
    'px-0',
    'py-0',
    'leading-5',
    'resize-none',
  );
  expect(textarea).not.toHaveClass(
    'w-full',
    'max-w-none',
    'min-h-24',
    'rounded-md',
    'bg-background',
    'px-3.5',
    'py-2',
    'leading-6',
    'resize-y',
  );
});