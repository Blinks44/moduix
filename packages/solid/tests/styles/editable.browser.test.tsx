import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render } from '@solidjs/testing-library';
import {
  Editable,
  EditableArea,
  EditableControls,
  EditableInput,
  EditableLabel,
  EditablePreview,
  Field,
} from '@/index';

test('inherits Field state and preserves public styling hooks', async () => {
  const { container } = render(() => (
    <Field disabled id="layer-name" invalid readOnly required>
      <Editable defaultValue="Layer name">
        <EditableLabel>Layer name</EditableLabel>
        <EditableArea>
          <EditableInput />
          <EditablePreview />
        </EditableArea>
        <EditableControls />
      </Editable>
    </Field>
  ));

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