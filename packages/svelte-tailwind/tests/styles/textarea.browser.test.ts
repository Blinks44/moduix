import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/svelte';
import TextareaOverride from './TextareaOverride.svelte';
import TextareaState from './TextareaState.svelte';

test('preserves native field state and component-owned styling hooks', async () => {
  render(TextareaState);

  const textarea = screen.getByRole('textbox', { name: 'Summary' });

  const textbox = page.getByRole('textbox', { name: 'Summary' });
  await expect.element(textbox).toBeDisabled();
  await expect.element(textbox).toHaveAttribute('aria-invalid', 'true');
  await expect.element(textbox).toHaveAttribute('readonly');
  expect(textarea.hasAttribute('required')).toBe(true);
  expect(textarea.dataset).toMatchObject({
    part: 'textarea',
    scope: 'field',
    slot: 'textarea-root',
  });
  expect(textarea.classList.contains('consumer-class')).toBe(true);
});

test('lets consumer utilities replace component defaults', () => {
  render(TextareaOverride);

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
});