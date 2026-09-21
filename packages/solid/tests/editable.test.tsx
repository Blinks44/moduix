import { expect, test } from '@rstest/core';
import { fireEvent, render, screen, waitFor, within } from '@solidjs/testing-library';
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

  fireEvent.click(screen.getByRole('button', { name: 'edit' }));
  const input = await screen.findByRole('textbox', { name: 'editable input' });
  fireEvent.input(input, { target: { value: 'Draft name' } });
  fireEvent.keyDown(input, { key: 'Escape' });

  await waitFor(() => expect(screen.getByText('Layer name')).toBeVisible());
  expect(commits).toEqual([]);

  fireEvent.click(screen.getByRole('button', { name: 'edit' }));
  const committedInput = await screen.findByRole('textbox', { name: 'editable input' });
  fireEvent.input(committedInput, { target: { value: 'Published name' } });
  fireEvent.keyDown(committedInput, { key: 'Enter' });

  await waitFor(() => expect(commits).toEqual(['Published name']));
  expect(screen.getByText('Published name')).toBeVisible();
});

test('switches Controls to submit and cancel triggers while editing', async () => {
  render(() => <TestEditable />);

  const editable = screen
    .getByText('Layer name')
    .closest<HTMLElement>('[data-slot="editable-root"]');

  expect(editable).not.toBeNull();
  fireEvent.click(within(editable!).getByRole('button', { name: 'edit' }));

  expect(await within(editable!).findByRole('button', { name: 'submit' })).toBeVisible();
  expect(within(editable!).getByRole('button', { name: 'cancel' })).toBeVisible();
  expect(within(editable!).queryByRole('button', { name: 'edit' })).not.toBeInTheDocument();
});

test('activates the preview with the moduix double-click default', async () => {
  render(() => <TestEditable />);

  fireEvent.dblClick(screen.getByText('Layer name'));

  expect(await screen.findByRole('textbox', { name: 'editable input' })).toBeVisible();
});

test('keeps disabled triggers unavailable and read-only values unchanged', () => {
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
  expect(within(disabledEditable!).getByRole('button', { name: 'edit' })).toBeDisabled();

  fireEvent.click(within(readOnlyEditable!).getByRole('button', { name: 'edit' }));
  expect(within(readOnlyEditable!).getByText('Read-only value')).toBeVisible();
  expect(within(readOnlyEditable!).queryByRole('textbox')).not.toBeInTheDocument();
});

test('inherits Field state and preserves public styling hooks', () => {
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
  expect(root!).toHaveAttribute('data-slot', 'editable-root');
  expect(area!).toHaveAttribute('data-disabled');
  expect(input!).toHaveAttribute('data-slot', 'editable-input');
  expect(input!).toBeDisabled();
  expect(input!).toHaveAttribute('aria-invalid', 'true');
  expect(input!).toHaveAttribute('readonly');
  expect(input!).toBeRequired();
  expect(label!).toHaveAttribute('data-invalid');
  expect(label!).toHaveAttribute('for', input!.id);
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

  fireEvent.click(screen.getByRole('button', { name: 'edit' }));
  const input = await screen.findByRole('textbox', { name: 'editable input' });
  fireEvent.input(input, { target: { value: 'Published name' } });
  fireEvent.keyDown(input, { key: 'Enter' });

  await waitFor(() => expect(screen.getByText('Published name')).toBeVisible());
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

  const input = screen.getByRole('textbox', { name: 'editable input' });
  fireEvent.input(input, { target: { value: 'Published description' } });
  fireEvent.keyDown(input, { ctrlKey: true, key: 'Enter' });

  await waitFor(() => expect(commits).toEqual(['Published description']));
  expect(input).toHaveAttribute('hidden');
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

  expect(controlsRef).toHaveAttribute('data-slot', 'editable-control');
  fireEvent.click(screen.getByRole('button', { name: 'Edit externally' }));
  expect(await screen.findByRole('textbox', { name: 'editable input' })).toBeVisible();
});

test('forwards refs on ordinary parts and exposes context state', () => {
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
      <EditableContext>
        {(editable) => <span>{`render:${editable().value}`}</span>}
      </EditableContext>
      <EditableStatus />
    </Editable>
  ));

  expect(rootRef).toHaveAttribute('data-slot', 'editable-root');
  expect(inputRef).toHaveAttribute('data-slot', 'editable-input');
  expect(screen.getByText('render:Context value')).toBeInTheDocument();
  expect(screen.getByText('Context value:false')).toBeInTheDocument();
});

test('preserves semantic hosts with asChild composition', () => {
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
  expect(root).toHaveAttribute('data-slot', 'editable-root');
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
