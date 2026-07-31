import { expect, test } from '@rstest/core';
import { fireEvent, render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { Field, Textarea } from '../src';

test('preserves native field state and component-owned styling hooks', () => {
  render(
    <Field disabled id="summary" invalid readOnly required>
      <Field.Label>Summary</Field.Label>
      <Textarea data-part="consumer-part" data-scope="consumer-scope" data-slot="consumer-slot" />
    </Field>,
  );

  const textarea = screen.getByRole('textbox', { name: 'Summary' });

  expect(textarea).toBeDisabled();
  expect(textarea).toHaveAttribute('aria-invalid', 'true');
  expect(textarea).toHaveAttribute('readonly');
  expect(textarea).toBeRequired();
  expect(textarea).toHaveAttribute('data-part', 'textarea');
  expect(textarea).toHaveAttribute('data-scope', 'field');
  expect(textarea).toHaveAttribute('data-slot', 'textarea-root');
});

test('forwards the textarea ref and preserves asChild composition', () => {
  const textareaRef = createRef<HTMLTextAreaElement>();

  render(
    <Field>
      <Field.Label>Repository summary</Field.Label>
      <Textarea asChild ref={textareaRef}>
        <textarea name="summary" />
      </Textarea>
    </Field>,
  );

  const textarea = screen.getByRole('textbox', { name: 'Repository summary' });

  expect(textareaRef.current).toBe(textarea);
  expect(textarea).toHaveAttribute('data-slot', 'textarea-root');
});

test('keeps Ark autoresize behavior and the moduix styling hook', () => {
  render(<Textarea aria-label="Description" autoresize />);

  const textarea = screen.getByRole('textbox', { name: 'Description' });

  expect(textarea).toHaveAttribute('data-autoresize');
  expect(textarea).toHaveStyle({ resize: 'none' });
});

test('participates in native form data with native change events', () => {
  render(
    <form aria-label="Project form">
      <Textarea aria-label="Summary" defaultValue="Draft" name="summary" />
    </form>,
  );

  const form = screen.getByRole('form', { name: 'Project form' }) as HTMLFormElement;
  const textarea = screen.getByRole('textbox', { name: 'Summary' });

  fireEvent.change(textarea, { target: { value: 'Published' } });

  expect(textarea).toHaveValue('Published');
  expect(new FormData(form).get('summary')).toBe('Published');
});