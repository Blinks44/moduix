import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/svelte';
import EditableOverride from './EditableOverride.svelte';
import FormEditable from './FormEditable.svelte';
import TextareaEditable from './TextareaEditable.svelte';

test('participates in native form submission', () => {
  render(FormEditable);

  const form = document.querySelector('form');
  expect(form).not.toBeNull();
  expect(new FormData(form as HTMLFormElement).get('title')).toBe('Layer name');
});

test('commits textarea values with Ctrl or Cmd + Enter', async () => {
  const commits: string[] = [];
  render(TextareaEditable, { props: { commits } });

  await page
    .getByRole('textbox', { name: 'Description', exact: true })
    .fill('Published description');
  await page
    .getByRole('textbox', { name: 'Description', exact: true })
    .press('ControlOrMeta+Enter');
  await expect.poll(() => commits).toEqual(['Published description']);
  await expect.element(page.locator('[data-slot="editable-input"]')).toHaveAttribute('hidden');
});

test('lets consumer Tailwind classes override conflicting defaults', () => {
  render(EditableOverride);

  const root = screen.getByText('Name').closest('[data-slot="editable-root"]');
  const area = screen.getByText('Name').parentElement?.querySelector('[data-slot="editable-area"]');
  expect([...root!.classList]).toEqual(expect.arrayContaining(['gap-0', 'max-w-md']));
  expect([...area!.classList]).toEqual(expect.arrayContaining(['border-primary', 'px-6']));
  expect(getComputedStyle(root!).gap).toBe('0px');
  expect(getComputedStyle(area!).paddingLeft).toBe('24px');
});