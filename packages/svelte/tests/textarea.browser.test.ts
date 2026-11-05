import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/svelte';
import { Textarea } from '@/components/textarea';
import BoundTextarea from './textarea/BoundTextarea.svelte';
import FormTextarea from './textarea/FormTextarea.svelte';
import TextareaRefs from './textarea/TextareaRefs.svelte';

test('forwards the textarea ref on the ordinary path', () => {
  const { component } = render(TextareaRefs);

  const textarea = screen.getByRole('textbox', { name: 'Repository summary' });

  expect(component.getRef()).toBe(textarea);
  expect(textarea.getAttribute('data-slot')).toBe('textarea-root');
});

test('preserves asChild composition and forwards its ref to the semantic textarea', async () => {
  const { component } = render(TextareaRefs, { props: { asChild: true } });

  const textarea = screen.getByRole('textbox', { name: 'Repository summary' });

  expect(component.getRef()).toBe(textarea);
  await expect
    .element(page.getByRole('textbox', { name: 'Repository summary' }))
    .toHaveAttribute('name', 'summary');
  expect(textarea.getAttribute('data-slot')).toBe('textarea-root');
});

test('resizes with multiline input', async () => {
  render(Textarea, { props: { 'aria-label': 'Description', autoresize: true } });

  const textarea = screen.getByRole('textbox', { name: 'Description' });

  expect(getComputedStyle(textarea).resize).toBe('none');

  const initialHeight = textarea.getBoundingClientRect().height;
  expect(initialHeight).toBeGreaterThan(0);

  const textbox = page.getByRole('textbox', { name: 'Description' });
  await textbox.fill(Array.from({ length: 12 }, (_, index) => `Line ${index + 1}`).join('\n'));
  await expect.poll(() => textarea.getBoundingClientRect().height).toBeGreaterThan(initialHeight);

  await textbox.fill('Short description');
  await expect.poll(() => textarea.getBoundingClientRect().height).toBe(initialHeight);
});

test.each([false, true])(
  'supports controlled bind:value updates and external value changes (asChild=%s)',
  async (asChild) => {
    const changes: string[] = [];
    const { component } = render(BoundTextarea, { props: { asChild, changes } });

    await expect.element(page.getByRole('textbox', { name: 'Summary' })).toHaveValue('Draft');
    await page.getByRole('textbox', { name: 'Summary' }).fill('Published');

    await expect.element(page.getByRole('textbox', { name: 'Summary' })).toHaveValue('Published');
    await expect.element(page.getByText('Published')).toBeAttached();
    expect(changes).toEqual(['Published']);

    component.setValue('Imported');

    await expect.element(page.getByRole('textbox', { name: 'Summary' })).toHaveValue('Imported');
    expect(changes).toEqual(['Published']);
  },
);

test('preserves native form ownership', async () => {
  render(FormTextarea);

  const form = screen.getByRole('form', { name: 'Project form' }) as HTMLFormElement;

  await page.getByRole('textbox', { name: 'Summary' }).fill('Published');

  await expect.element(page.getByRole('textbox', { name: 'Summary' })).toHaveValue('Published');
  expect(new FormData(form).get('summary')).toBe('Published');
});

test('restores the native textarea default value on reset', async () => {
  render(FormTextarea, { props: { defaultValue: 'Draft' } });

  const form = screen.getByRole('form', { name: 'Project form' }) as HTMLFormElement;

  await page.getByRole('textbox', { name: 'Summary' }).fill('Published');

  form.reset();

  await expect.element(page.getByRole('textbox', { name: 'Summary' })).toHaveValue('Draft');
  expect(new FormData(form).get('summary')).toBe('Draft');
});