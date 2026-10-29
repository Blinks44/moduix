import { Field as FieldPrimitive } from '@ark-ui/react/field';
import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/react';
import {
  Editable,
  EditableArea,
  EditableControls,
  EditableInput,
  EditableLabel,
  EditablePreview,
} from '@/index';

test('preserves semantic hosts with asChild composition', async () => {
  render(
    <Editable asChild defaultValue="Layer name">
      <section aria-label="Editable section">
        <EditableLabel>Name</EditableLabel>
        <EditableArea>
          <EditableInput />
          <EditablePreview />
        </EditableArea>
      </section>
    </Editable>,
  );

  const root = screen.getByRole('region', { name: 'Editable section' });

  expect(root.tagName).toBe('SECTION');
  await expect
    .element(page.getByRole('region', { name: 'Editable section', exact: true }))
    .toHaveAttribute('data-slot', 'editable-root');
});

test('inherits Field state and preserves public styling hooks', async () => {
  const { container } = render(
    <FieldPrimitive.Root disabled id="layer-name" invalid readOnly required>
      <Editable defaultValue="Layer name">
        <EditableLabel>Layer name</EditableLabel>
        <EditableArea>
          <EditableInput />
          <EditablePreview />
        </EditableArea>
        <EditableControls />
      </Editable>
    </FieldPrimitive.Root>,
  );

  const root = container.querySelector<HTMLElement>('[data-slot="editable-root"]');
  const area = container.querySelector<HTMLElement>('[data-slot="editable-area"]');
  const input = container.querySelector<HTMLInputElement>('[data-slot="editable-input"]');
  const label = container.querySelector<HTMLElement>('[data-slot="editable-label"]');

  expect(root).not.toBeNull();
  expect(area).not.toBeNull();
  expect(input).not.toBeNull();
  expect(label).not.toBeNull();
  await expect
    .element(page.locator('[data-slot="editable-root"]'))
    .toHaveAttribute('data-slot', 'editable-root');
  await expect
    .element(page.locator('[data-slot="editable-area"]'))
    .toHaveAttribute('data-disabled');
  const rootLocator = page.locator('[data-slot="editable-input"]');
  await expect.element(rootLocator).toHaveAttribute('data-slot', 'editable-input');
  await expect.element(rootLocator).toBeDisabled();
  await expect.element(rootLocator).toHaveAttribute('aria-invalid', 'true');
  await expect.element(rootLocator).toHaveAttribute('readonly');
  await expect.element(rootLocator).toHaveAttribute('required');
  await expect
    .element(page.locator('[data-slot="editable-label"]'))
    .toHaveAttribute('data-invalid');
  await expect
    .element(page.locator('[data-slot="editable-label"]'))
    .toHaveAttribute('for', input!.id);
});

test('lets consumer Tailwind classes override conflicting defaults', () => {
  render(
    <Editable className="max-w-md gap-0">
      <EditableLabel>Name</EditableLabel>
      <EditableArea className="border-primary px-6">
        <EditableInput />
        <EditablePreview />
      </EditableArea>
      <EditableControls />
    </Editable>,
  );

  const root = screen.getByText('Name').closest('[data-slot="editable-root"]');
  const area = screen.getByText('Name').parentElement?.querySelector('[data-slot="editable-area"]');

  expect([...root!.classList]).toEqual(expect.arrayContaining(['gap-0', 'max-w-md']));
  expect([...area!.classList]).toEqual(expect.arrayContaining(['border-primary', 'px-6']));
  expect(getComputedStyle(root!).gap).toBe('0px');
  expect(getComputedStyle(area!).paddingLeft).toBe('24px');
});