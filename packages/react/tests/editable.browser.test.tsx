import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import {
  Editable,
  EditableArea,
  EditableContext,
  EditableControls,
  EditableInput,
  EditableLabel,
  EditablePreview,
  EditableRootProvider,
  useEditable,
  useEditableContext,
} from '@/index';

function TestEditable({
  defaultValue = 'Layer name',
  form,
  name,
  onValueCommit,
}: {
  defaultValue?: string;
  form?: string;
  name?: string;
  onValueCommit?: (details: { value: string }) => void;
}) {
  return (
    <Editable defaultValue={defaultValue} form={form} name={name} onValueCommit={onValueCommit}>
      <EditableLabel>Name</EditableLabel>
      <EditableArea>
        <EditableInput />
        <EditablePreview />
      </EditableArea>
      <EditableControls />
    </Editable>
  );
}

test('commits with Enter and reverts with Escape', async () => {
  const commits: string[] = [];
  render(<TestEditable onValueCommit={(details) => commits.push(details.value)} />);

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

test('activates the preview with the moduix double-click default', async () => {
  render(<TestEditable />);

  await page.getByText('Layer name').dblclick();

  await expect.element(page.getByRole('textbox', { name: 'Name', exact: true })).toBeVisible();
});

test('forwards the controls ref and exposes context state', async () => {
  const controlsRef = createRef<HTMLDivElement>();

  render(
    <Editable defaultValue="Context value">
      <EditableArea>
        <EditableInput />
        <EditablePreview />
      </EditableArea>
      <EditableControls ref={controlsRef} />
      <EditableContext>{(editable) => <output>{editable.value}</output>}</EditableContext>
    </Editable>,
  );

  expect(controlsRef.current?.getAttribute('data-slot')).toBe('editable-control');
  await expect.element(page.getByRole('status')).toContainText('Context value');
});

test('keeps disabled triggers unavailable and read-only values unchanged', async () => {
  render(
    <>
      <Editable disabled defaultValue="Disabled value">
        <EditableLabel>Disabled name</EditableLabel>
        <EditableArea>
          <EditableInput />
          <EditablePreview />
        </EditableArea>
        <EditableControls />
      </Editable>

      <Editable readOnly defaultValue="Read-only value">
        <EditableLabel>Read-only name</EditableLabel>
        <EditableArea>
          <EditableInput />
          <EditablePreview />
        </EditableArea>
        <EditableControls />
      </Editable>
    </>,
  );

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

test('participates in native form submission', () => {
  const { container } = render(
    <form>
      <TestEditable defaultValue="Layer name" name="title" />
    </form>,
  );
  const form = container.querySelector('form');

  expect(form).not.toBeNull();
  expect(new FormData(form!).get('title')).toBe('Layer name');
});

test('submits the committed value through an external form owner', async () => {
  render(
    <>
      <form id="editable-form" />
      <TestEditable defaultValue="Layer name" form="editable-form" name="title" />
    </>,
  );

  await page.getByRole('button', { name: 'edit', exact: true }).click();

  await page.getByRole('textbox', { name: 'Name', exact: true }).fill('Published name');
  await page.getByRole('textbox', { name: 'Name', exact: true }).press('Enter');

  await expect.element(page.getByText('Published name')).toBeVisible();
  const form = document.getElementById('editable-form');

  expect(form).toBeInstanceOf(HTMLFormElement);
  expect(new FormData(form as HTMLFormElement).get('title')).toBe('Published name');
});

test('commits textarea values with Ctrl or Cmd + Enter', async () => {
  const commits: string[] = [];
  render(
    <Editable
      defaultEdit
      defaultValue="Draft description"
      onValueCommit={(details) => commits.push(details.value)}
    >
      <EditableLabel>Description</EditableLabel>
      <EditableArea>
        <EditableInput asChild>
          <textarea />
        </EditableInput>
        <EditablePreview />
      </EditableArea>
      <EditableControls />
    </Editable>,
  );

  await page
    .getByRole('textbox', { name: 'Description', exact: true })
    .fill('Published description');
  await page
    .getByRole('textbox', { name: 'Description', exact: true })
    .press('ControlOrMeta+Enter');

  await expect.poll(() => commits).toEqual(['Published description']);
  await expect.element(page.locator('[data-slot="editable-input"]')).toHaveAttribute('hidden');
});

test('forwards the controls ref and supports RootProvider state', async () => {
  const controlsRef = createRef<HTMLDivElement>();

  function RootProviderEditable() {
    const editable = useEditable({ defaultValue: 'Provider value' });

    return (
      <>
        <button type="button" onClick={() => editable.edit()}>
          Edit externally
        </button>
        <EditableRootProvider value={editable}>
          <EditableLabel>Provider name</EditableLabel>
          <EditableArea>
            <EditableInput />
            <EditablePreview />
          </EditableArea>
          <EditableControls ref={controlsRef} />
        </EditableRootProvider>
      </>
    );
  }

  render(<RootProviderEditable />);

  expect(controlsRef.current?.getAttribute('data-slot')).toBe('editable-control');
  await page.getByRole('button', { name: 'Edit externally', exact: true }).click();
  await expect
    .element(page.getByRole('textbox', { name: 'Provider name', exact: true }))
    .toBeVisible();
});

test('wraps long values inside the area', () => {
  render(
    <div style={{ width: '200px' }}>
      <TestEditable defaultValue={'x'.repeat(80)} />
    </div>,
  );

  const area = document.querySelector<HTMLElement>('[data-slot="editable-area"]')!;
  expect(area.scrollWidth).toBeLessThanOrEqual(area.clientWidth);
});

test('forwards refs on ordinary parts and exposes context state', async () => {
  const rootRef = createRef<HTMLDivElement>();
  const inputRef = createRef<HTMLInputElement>();

  function EditableStatus() {
    const editable = useEditableContext();

    return <output>{`${editable.value}:${String(editable.editing)}`}</output>;
  }

  render(
    <Editable ref={rootRef} defaultValue="Context value">
      <EditableLabel>Name</EditableLabel>
      <EditableArea>
        <EditableInput ref={inputRef} />
        <EditablePreview />
      </EditableArea>
      <EditableContext>{(editable) => <span>{`render:${editable.value}`}</span>}</EditableContext>
      <EditableStatus />
    </Editable>,
  );

  expect(rootRef.current?.getAttribute('data-slot')).toBe('editable-root');
  expect(inputRef.current?.getAttribute('data-slot')).toBe('editable-input');
  await expect.element(page.getByText('render:Context value')).toBeAttached();
  await expect.element(page.getByText('Context value:false')).toBeAttached();
});