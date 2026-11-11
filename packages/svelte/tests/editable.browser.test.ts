import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/svelte';
import AsChildEditable from './editable/AsChildEditable.svelte';
import BoundEditable from './editable/BoundEditable.svelte';
import ContextEditable from './editable/ContextEditable.svelte';
import FieldEditable from './editable/FieldEditable.svelte';
import FormEditable from './editable/FormEditable.svelte';
import LongEditable from './editable/LongEditable.svelte';
import RefsEditable from './editable/RefsEditable.svelte';
import RootProviderEditable from './editable/RootProviderEditable.svelte';
import StatesEditable from './editable/StatesEditable.svelte';
import TestEditable from './editable/TestEditable.svelte';

test('preserves Ark semantics, refs, anatomy, attrs, and moduix hooks', () => {
  const { component } = render(RefsEditable);
  const refs = component.getRefs();

  const root = refs.root as HTMLElement;
  const controls = refs.controls as HTMLElement;
  expect(root.getAttribute('data-slot')).toBe('editable-root');
  expect(root.getAttribute('data-scope')).toBe('editable');
  expect(root.getAttribute('data-probe')).toBe('root');
  expect(refs.label?.getAttribute('data-slot')).toBe('editable-label');
  expect(refs.area?.getAttribute('data-slot')).toBe('editable-area');
  expect(refs.input?.getAttribute('data-slot')).toBe('editable-input');
  expect(refs.preview?.getAttribute('data-slot')).toBe('editable-preview');
  expect(controls.getAttribute('data-slot')).toBe('editable-control');
  const editIcon = controls.querySelector('[data-slot="editable-edit-trigger"] svg');
  expect(Boolean(editIcon?.isConnected)).toBe(true);
  expect(editIcon?.getAttribute('aria-hidden')).toBe('true');
  expect(editIcon?.getAttribute('focusable')).toBe('false');
});

test('commits with Enter and reverts with Escape', async () => {
  const commits: string[] = [];
  render(TestEditable, { props: { onValueCommit: (details) => commits.push(details.value) } });

  const editTrigger = page.getByRole('button', { name: 'edit', exact: true });
  await editTrigger.click();
  await expect.element(page.getByRole('button', { name: 'submit', exact: true })).toBeVisible();
  await expect.element(page.getByRole('button', { name: 'cancel', exact: true })).toBeVisible();
  await expect.element(editTrigger).toHaveCount(0);
  const input = page.getByRole('textbox', { name: 'Name', exact: true });
  await input.fill('Draft name');
  await input.press('Escape');
  await expect.element(page.getByText('Layer name')).toBeVisible();
  expect(commits).toEqual([]);

  await editTrigger.click();
  await input.fill('Published name');
  await input.press('Enter');
  await expect.poll(() => commits).toEqual(['Published name']);
  await expect.element(page.getByText('Published name')).toBeVisible();
});

test('supports controlled bind:value updates through a parent', async () => {
  const { component } = render(BoundEditable);

  await page.getByRole('button', { name: 'edit', exact: true }).click();
  await page.getByRole('textbox').fill('Published name');
  await page.getByRole('textbox').press('Enter');
  await expect.poll(() => component.getValue()).toBe('Published name');
  await expect.element(page.getByText('Published name')).toBeVisible();
});

test('activates the preview with the moduix double-click default', async () => {
  render(TestEditable);

  await page.getByText('Layer name').dblclick();
  await expect.element(page.getByRole('textbox', { name: 'Name', exact: true })).toBeVisible();
});

test('keeps disabled triggers unavailable and read-only values unchanged', async () => {
  render(StatesEditable);

  const disabledEditable = screen
    .getByText('Disabled name')
    .closest<HTMLElement>('[data-slot="editable-root"]');
  const readOnlyEditable = screen
    .getByText('Read-only name')
    .closest<HTMLElement>('[data-slot="editable-root"]');
  expect(disabledEditable).not.toBeNull();
  expect(readOnlyEditable).not.toBeNull();
  await expect
    .element(
      page
        .locator('[data-slot="editable-root"]')
        .filter({ hasText: 'Disabled name' })
        .getByRole('button', { name: 'edit' }),
    )
    .toBeDisabled();
  await page
    .locator('[data-slot="editable-root"]')
    .filter({ hasText: 'Read-only name' })
    .getByRole('button', { name: 'edit' })
    .click();
  await expect
    .element(
      page
        .locator('[data-slot="editable-root"]')
        .filter({ hasText: 'Read-only name' })
        .getByText('Read-only value'),
    )
    .toBeVisible();
  await expect
    .element(
      page
        .locator('[data-slot="editable-root"]')
        .filter({ hasText: 'Read-only name' })
        .getByRole('textbox'),
    )
    .toHaveCount(0);
});

test('inherits Field state and preserves public styling hooks', () => {
  render(FieldEditable);

  const fieldInput = document.querySelector<HTMLInputElement>('[data-slot="editable-input"]');
  const root = fieldInput?.closest('[data-slot="editable-root"]');
  const area = root?.querySelector<HTMLElement>('[data-slot="editable-area"]');
  const input = root?.querySelector<HTMLInputElement>('[data-slot="editable-input"]');
  const label = root?.querySelector<HTMLElement>('[data-slot="editable-label"]');
  expect(Boolean(root?.isConnected)).toBe(true);
  expect(area?.hasAttribute('data-disabled')).toBe(true);
  expect(input?.matches(':disabled')).toBe(true);
  expect(input?.getAttribute('aria-invalid')).toBe('true');
  expect(input?.hasAttribute('readonly')).toBe(true);
  expect(input?.hasAttribute('required')).toBe(true);
  expect(label?.hasAttribute('data-invalid')).toBe(true);
  expect(label?.getAttribute('for')).toBe(input?.id);
});

test('submits the committed value through an external form owner', async () => {
  render(FormEditable);

  await page.getByRole('button', { name: 'edit', exact: true }).click();
  await page.getByRole('textbox', { name: 'Name', exact: true }).fill('Published name');
  await page.getByRole('textbox', { name: 'Name', exact: true }).press('Enter');
  await expect.element(page.getByText('Published name')).toBeVisible();
  const form = document.getElementById('editable-form');
  expect(form).toBeInstanceOf(HTMLFormElement);
  expect(new FormData(form as HTMLFormElement).get('title')).toBe('Published name');
});

test('forwards the controls ref and supports RootProvider state', async () => {
  const { component } = render(RootProviderEditable);

  expect(component.getControlsRef()?.getAttribute('data-slot')).toBe('editable-control');
  await page.getByRole('button', { name: 'Edit externally', exact: true }).click();
  await expect.element(page.getByRole('textbox')).toBeVisible();
});

test('forwards refs on ordinary parts and exposes context state', async () => {
  const { component } = render(ContextEditable);
  const { rootRef, inputRef } = component.getRefs();

  expect(rootRef?.getAttribute('data-slot')).toBe('editable-root');
  expect(inputRef?.getAttribute('data-slot')).toBe('editable-input');
  await expect.element(page.getByText('render:Context value')).toBeAttached();
  await expect.element(page.getByText('Context value:false')).toBeAttached();
});

test('preserves semantic hosts with asChild composition', async () => {
  const { component } = render(AsChildEditable);

  const root = screen.getByRole('region', { name: 'Editable section' });
  expect(root.tagName).toBe('SECTION');
  await expect
    .element(page.getByRole('region', { name: 'Editable section', exact: true }))
    .toHaveAttribute('data-slot', 'editable-root');
  expect(component.getRootRef()).toBe(root);
});

test('wraps long values inside the area', async () => {
  render(LongEditable);

  await expect.element(page.locator('[data-slot="editable-area"]')).toBeVisible();
  const area = document.querySelector<HTMLElement>('[data-slot="editable-area"]')!;
  expect(area.scrollWidth).toBeLessThanOrEqual(area.clientWidth);
});