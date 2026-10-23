import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render, screen } from '@solidjs/testing-library';
import { createSignal } from 'solid-js';
import { Field, FieldLabel, Input, Textarea } from '../src';

test('preserves native field state and component-owned styling hooks', async () => {
  render(() => (
    <Field disabled id="summary" invalid readOnly required>
      <FieldLabel>Summary</FieldLabel>
      <Textarea data-part="consumer-part" data-scope="consumer-scope" data-slot="consumer-slot" />
    </Field>
  ));

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
  expect(textarea.getAttribute('data-slot')).toBe('textarea-root');
  expect((textarea as HTMLTextAreaElement).value).toBe('');
});

test('preserves asChild composition without forwarding the ref through Ark Solid', async () => {
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

  const textbox = page.getByRole('textbox', { name: 'Repository summary' });
  await expect.element(textbox).toHaveAttribute('name', 'summary');
  expect(
    screen.getByRole('textbox', { name: 'Repository summary' }).getAttribute('data-slot'),
  ).toBe('textarea-root');
  await expect.element(textbox).toHaveValue('Draft');
  expect(textareaRef).toBeUndefined();
});

test('resizes with multiline input', async () => {
  render(() => <Textarea aria-label="Description" autoresize />);

  const textarea = screen.getByRole('textbox', { name: 'Description' });

  expect(getComputedStyle(textarea!).resize).toBe('none');

  const initialHeight = textarea.getBoundingClientRect().height;
  expect(initialHeight).toBeGreaterThan(0);

  const textbox = page.getByRole('textbox', { name: 'Description' });
  await textbox.fill(Array.from({ length: 12 }, (_, index) => `Line ${index + 1}`).join('\n'));
  await expect.poll(() => textarea.getBoundingClientRect().height).toBeGreaterThan(initialHeight);

  await textbox.fill('Short description');
  await expect.poll(() => textarea.getBoundingClientRect().height).toBe(initialHeight);
});

test('keeps controlled textarea values synchronized with external updates', async () => {
  const [value, setValue] = createSignal('Draft');

  render(() => <Textarea aria-label="Summary" onChange={() => undefined} value={value()} />);

  const textbox = page.getByRole('textbox', { name: 'Summary' });
  await textbox.fill('Published');

  await expect.element(textbox).toHaveValue('Published');

  setValue('Imported');

  await expect.element(textbox).toHaveValue('Imported');
});

test('preserves native form ownership, data, and reset behavior', async () => {
  render(() => (
    <>
      <form aria-label="Project form" id="project-form" />
      <Textarea aria-label="Summary" defaultValue="Draft" form="project-form" name="summary" />
    </>
  ));

  const form = screen.getByRole('form', { name: 'Project form' }) as HTMLFormElement;

  const textbox = page.getByRole('textbox', { name: 'Summary' });
  await textbox.fill('Published');

  await expect.element(textbox).toHaveValue('Published');
  expect(new FormData(form).get('summary')).toBe('Published');

  form.reset();

  await expect.element(textbox).toHaveValue('Draft');
  expect(new FormData(form).get('summary')).toBe('Draft');
});
test('dims a disabled textarea once inside a disabled Field', () => {
  render(() => (
    <>
      <Field disabled data-testid="disabled-field">
        <FieldLabel>Notes</FieldLabel>
        <Textarea />
      </Field>
      <Textarea aria-label="Standalone" disabled />
    </>
  ));

  const opacity = (element: HTMLElement) => getComputedStyle(element).opacity;

  expect(opacity(screen.getByTestId('disabled-field'))).toBe('0.5');
  expect(opacity(screen.getByRole('textbox', { name: 'Notes' }))).toBe('1');
  expect(opacity(screen.getByRole('textbox', { name: 'Standalone' }))).toBe('0.5');
});
test('matches Input padding and type at every size and defaults to md', () => {
  const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;

  render(() => (
    <>
      <Textarea aria-label="Default" />
      {sizes.map((size) => (
        <div>
          <Textarea aria-label={`Textarea ${size}`} size={size} />
          <Input aria-label={`Input ${size}`} size={size} />
        </div>
      ))}
    </>
  ));

  expect(screen.getByRole('textbox', { name: 'Default' }).dataset.size).toBe('md');
  for (const size of sizes) {
    const textarea = getComputedStyle(screen.getByRole('textbox', { name: `Textarea ${size}` }));
    const input = getComputedStyle(screen.getByRole('textbox', { name: `Input ${size}` }));
    expect([textarea.paddingInlineStart, textarea.fontSize]).toEqual([
      input.paddingInlineStart,
      input.fontSize,
    ]);
  }
  expect(screen.getByRole('textbox', { name: 'Textarea xs' }).offsetHeight).toBeLessThan(
    screen.getByRole('textbox', { name: 'Textarea xl' }).offsetHeight,
  );
});