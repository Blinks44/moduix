import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render, screen } from '@solidjs/testing-library';
import {
  Editable,
  EditableArea,
  EditableContext,
  EditableControls,
  EditableInput,
  EditableLabel,
  EditablePreview,
  EditableRootProvider,
  Field,
  useEditable,
  useEditableContext,
} from '../src';

function TestEditable(props: {
  defaultValue?: string;
  form?: string;
  name?: string;
  onValueCommit?: (details: { value: string }) => void;
}) {
  return (
    <Editable
      defaultValue={props.defaultValue ?? 'Layer name'}
      form={props.form}
      name={props.name}
      onValueCommit={props.onValueCommit}
    >
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
  render(() => <TestEditable onValueCommit={(details) => commits.push(details.value)} />);

  const editTrigger = page.getByRole('button', { name: 'edit', exact: true });
  await editTrigger.click();
  await expect.element(page.getByRole('button', { name: 'submit', exact: true })).toBeVisible();
  await expect.element(page.getByRole('button', { name: 'cancel', exact: true })).toBeVisible();
  await expect.element(editTrigger).toHaveCount(0);

  const input = page.getByRole('textbox', { name: 'editable input', exact: true });
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
  render(() => <TestEditable />);

  await page.getByText('Layer name').dblclick();

  await expect
    .element(page.getByRole('textbox', { name: 'editable input', exact: true }))
    .toBeVisible();
});

test('keeps disabled triggers unavailable and read-only values unchanged', async () => {
  render(() => (
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
    </>
  ));

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

test('participates in native form submission', () => {
  const { container } = render(() => (
    <form>
      <TestEditable defaultValue="Layer name" name="title" />
    </form>
  ));
  const form = container.querySelector('form');

  expect(form).not.toBeNull();
  expect(new FormData(form!).get('title')).toBe('Layer name');
});

test('submits the committed value through an external form owner', async () => {
  render(() => (
    <>
      <form id="editable-form" />
      <TestEditable defaultValue="Layer name" form="editable-form" name="title" />
    </>
  ));

  await page.getByRole('button', { name: 'edit', exact: true }).click();

  await page.getByRole('textbox', { name: 'editable input', exact: true }).fill('Published name');
  await page.getByRole('textbox', { name: 'editable input', exact: true }).press('Enter');

  await expect.element(page.getByText('Published name')).toBeVisible();
  const form = document.getElementById('editable-form');

  expect(form).toBeInstanceOf(HTMLFormElement);
  expect(new FormData(form as HTMLFormElement).get('title')).toBe('Published name');
});

test('commits textarea values with Ctrl or Cmd + Enter', async () => {
  const commits: string[] = [];
  render(() => (
    <Editable
      defaultEdit
      defaultValue="Draft description"
      onValueCommit={(details) => commits.push(details.value)}
    >
      <EditableLabel>Description</EditableLabel>
      <EditableArea>
        <EditableInput asChild={(props) => <textarea {...props()} />} />
        <EditablePreview />
      </EditableArea>
      <EditableControls />
    </Editable>
  ));

  await page
    .getByRole('textbox', { name: 'editable input', exact: true })
    .fill('Published description');
  await page
    .getByRole('textbox', { name: 'editable input', exact: true })
    .press('ControlOrMeta+Enter');

  await expect.poll(() => commits).toEqual(['Published description']);
  await expect.element(page.locator('[data-slot="editable-input"]')).toHaveAttribute('hidden');
});

test('forwards the controls ref and supports RootProvider state', async () => {
  let controlsRef!: HTMLDivElement;

  function RootProviderEditable() {
    const editable = useEditable({ defaultValue: 'Provider value' });

    return (
      <>
        <button type="button" onClick={() => editable().edit()}>
          Edit externally
        </button>
        <EditableRootProvider value={editable}>
          <EditableLabel>Provider name</EditableLabel>
          <EditableArea>
            <EditableInput />
            <EditablePreview />
          </EditableArea>
          <EditableControls ref={(element) => (controlsRef = element)} />
        </EditableRootProvider>
      </>
    );
  }

  render(() => <RootProviderEditable />);

  expect(controlsRef?.getAttribute('data-slot')).toBe('editable-control');
  await page.getByRole('button', { name: 'Edit externally', exact: true }).click();
  await expect
    .element(page.getByRole('textbox', { name: 'editable input', exact: true }))
    .toBeVisible();
});

test('forwards refs on ordinary parts and exposes context state', async () => {
  let rootRef!: HTMLDivElement;
  let inputRef!: HTMLInputElement;

  function EditableStatus() {
    const editable = useEditableContext();

    return <output>{`${editable().value}:${String(editable().editing)}`}</output>;
  }

  render(() => (
    <Editable ref={(element) => (rootRef = element)} defaultValue="Context value">
      <EditableLabel>Name</EditableLabel>
      <EditableArea>
        <EditableInput ref={(element) => (inputRef = element)} />
        <EditablePreview />
      </EditableArea>
      <EditableContext>{(editable) => <span>{`render:${editable().value}`}</span>}</EditableContext>
      <EditableStatus />
    </Editable>
  ));

  expect(rootRef?.getAttribute('data-slot')).toBe('editable-root');
  expect(inputRef?.getAttribute('data-slot')).toBe('editable-input');
  await expect.element(page.getByText('render:Context value')).toBeAttached();
  await expect.element(page.getByText('Context value:false')).toBeAttached();
});

test('preserves semantic hosts with asChild composition', async () => {
  render(() => (
    <Editable
      asChild={(props) => <section {...props()} aria-label="Editable section" />}
      defaultValue="Layer name"
    >
      <EditableLabel>Name</EditableLabel>
      <EditableArea>
        <EditableInput />
        <EditablePreview />
      </EditableArea>
    </Editable>
  ));

  const root = screen.getByRole('region', { name: 'Editable section' });

  expect(root.tagName).toBe('SECTION');
  await expect
    .element(page.getByRole('region', { name: 'Editable section', exact: true }))
    .toHaveAttribute('data-slot', 'editable-root');
});

test('does not forward refs through native Ark Solid asChild composition', () => {
  let rootRef: HTMLDivElement | undefined;

  render(() => (
    <Editable
      ref={(element) => (rootRef = element)}
      asChild={(props) => <section {...props()} aria-label="Editable section" />}
      defaultValue="Layer name"
    >
      <EditableArea>
        <EditableInput />
        <EditablePreview />
      </EditableArea>
    </Editable>
  ));

  expect(rootRef).toBeUndefined();
});