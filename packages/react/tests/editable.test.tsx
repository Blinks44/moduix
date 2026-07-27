import { expect, test } from '@rstest/core';
import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef } from 'react';
import { Editable, useEditable } from '../src';

function TestEditable({
  defaultValue = 'Layer name',
  name,
  onValueCommit,
}: {
  defaultValue?: string;
  name?: string;
  onValueCommit?: (details: { value: string }) => void;
}) {
  return (
    <Editable defaultValue={defaultValue} name={name} onValueCommit={onValueCommit}>
      <Editable.Label>Name</Editable.Label>
      <Editable.Area>
        <Editable.Input />
        <Editable.Preview />
      </Editable.Area>
      <Editable.Controls />
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

test('keeps disabled triggers unavailable and read-only values unchanged', () => {
  render(
    <>
      <Editable disabled defaultValue="Disabled value">
        <Editable.Label>Disabled name</Editable.Label>
        <Editable.Area>
          <Editable.Input />
          <Editable.Preview />
        </Editable.Area>
        <Editable.Controls />
      </Editable>

      <Editable readOnly defaultValue="Read-only value">
        <Editable.Label>Read-only name</Editable.Label>
        <Editable.Area>
          <Editable.Input />
          <Editable.Preview />
        </Editable.Area>
        <Editable.Controls />
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

test('commits textarea values with Ctrl or Cmd + Enter', async () => {
  const commits: string[] = [];
  const user = userEvent.setup();
  render(
    <Editable
      defaultEdit
      defaultValue="Draft description"
      onValueCommit={(details) => commits.push(details.value)}
    >
      <Editable.Label>Description</Editable.Label>
      <Editable.Area>
        <Editable.Input asChild>
          <textarea />
        </Editable.Input>
        <Editable.Preview />
      </Editable.Area>
      <Editable.Controls />
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
        <Editable.RootProvider value={editable}>
          <Editable.Label>Provider name</Editable.Label>
          <Editable.Area>
            <Editable.Input />
            <Editable.Preview />
          </Editable.Area>
          <Editable.Controls ref={controlsRef} />
        </Editable.RootProvider>
      </>
    );
  }

  render(<RootProviderEditable />);

  expect(controlsRef.current).toHaveAttribute('data-slot', 'editable-control');
  await user.click(screen.getByRole('button', { name: 'Edit externally' }));
  expect(await screen.findByRole('textbox', { name: 'editable input' })).toBeVisible();
});