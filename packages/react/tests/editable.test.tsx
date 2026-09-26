import { expect, test } from '@rstest/core';
import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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
  Field,
  useEditable,
} from '../src';

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
  const user = userEvent.setup();
  render(<TestEditable onValueCommit={(details) => commits.push(details.value)} />);

  await user.click(screen.getByRole('button', { name: 'edit' }));
  const input = await screen.findByRole('textbox', { name: 'editable input' });
  await user.clear(input);
  await user.type(input, 'Draft name');
  await user.keyboard('{Escape}');

  await waitFor(() => expect(screen.getByText('Layer name')).toBeVisible());
  expect(commits).toEqual([]);

  await user.click(screen.getByRole('button', { name: 'edit' }));
  const committedInput = await screen.findByRole('textbox', { name: 'editable input' });
  await user.clear(committedInput);
  await user.type(committedInput, 'Published name');
  await user.keyboard('{Enter}');

  await waitFor(() => expect(commits).toEqual(['Published name']));
  expect(screen.getByText('Published name')).toBeVisible();
});

test('activates the preview with the moduix double-click default', async () => {
  const user = userEvent.setup();
  render(<TestEditable />);

  await user.dblClick(screen.getByText('Layer name'));

  expect(await screen.findByRole('textbox', { name: 'editable input' })).toBeVisible();
});

test('switches Controls to submit and cancel triggers while editing', async () => {
  render(<TestEditable />);

  const editable = screen
    .getByText('Layer name')
    .closest<HTMLElement>('[data-slot="editable-root"]');

  expect(editable).not.toBeNull();
  fireEvent.click(within(editable!).getByRole('button', { name: 'edit' }));

  expect(await within(editable!).findByRole('button', { name: 'submit' })).toBeVisible();
  expect(within(editable!).getByRole('button', { name: 'cancel' })).toBeVisible();
});

test('forwards the controls ref and exposes context state', () => {
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

  expect(controlsRef.current).toHaveAttribute('data-slot', 'editable-control');
  expect(screen.getByRole('status')).toHaveTextContent('Context value');
});

test('preserves semantic hosts with asChild composition', () => {
  render(
    <Editable asChild defaultValue="Layer name">
      <section aria-label="Editable section">
        <EditableArea>
          <EditableInput />
          <EditablePreview />
        </EditableArea>
      </section>
    </Editable>,
  );

  expect(screen.getByRole('region', { name: 'Editable section' })).toHaveAttribute(
    'data-slot',
    'editable-root',
  );
});

test('keeps disabled triggers unavailable and read-only values unchanged', () => {
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
  expect(within(disabledEditable!).getByRole('button', { name: 'edit' })).toBeDisabled();

  fireEvent.click(within(readOnlyEditable!).getByRole('button', { name: 'edit' }));
  expect(within(readOnlyEditable!).getByText('Read-only value')).toBeVisible();
  expect(within(readOnlyEditable!).queryByRole('textbox')).not.toBeInTheDocument();
});

test('inherits Field state and preserves public styling hooks', () => {
  const { container } = render(
    <Field disabled id="layer-name" invalid readOnly required>
      <Editable defaultValue="Layer name">
        <EditableLabel>Layer name</EditableLabel>
        <EditableArea>
          <EditableInput />
          <EditablePreview />
        </EditableArea>
        <EditableControls />
      </Editable>
    </Field>,
  );

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
  const user = userEvent.setup();
  render(
    <>
      <form id="editable-form" />
      <TestEditable defaultValue="Layer name" form="editable-form" name="title" />
    </>,
  );

  await user.click(screen.getByRole('button', { name: 'edit' }));
  const input = await screen.findByRole('textbox', { name: 'editable input' });
  await user.clear(input);
  await user.type(input, 'Published name');
  await user.keyboard('{Enter}');

  await waitFor(() => expect(screen.getByText('Published name')).toBeVisible());
  const form = document.getElementById('editable-form');

  expect(form).toBeInstanceOf(HTMLFormElement);
  expect(new FormData(form as HTMLFormElement).get('title')).toBe('Published name');
});

test('commits textarea values with Ctrl or Cmd + Enter', async () => {
  const commits: string[] = [];
  const user = userEvent.setup();
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

  const input = screen.getByRole('textbox', { name: 'editable input' });
  await user.clear(input);
  await user.type(input, 'Published description');
  fireEvent.keyDown(input, { ctrlKey: true, key: 'Enter' });

  await waitFor(() => expect(commits).toEqual(['Published description']));
  expect(input).toHaveAttribute('hidden');
});

test('forwards the controls ref and supports RootProvider state', async () => {
  const controlsRef = createRef<HTMLDivElement>();
  const user = userEvent.setup();

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

  expect(controlsRef.current).toHaveAttribute('data-slot', 'editable-control');
  await user.click(screen.getByRole('button', { name: 'Edit externally' }));
  expect(await screen.findByRole('textbox', { name: 'editable input' })).toBeVisible();
});