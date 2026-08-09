import { afterEach, expect, test } from '@rstest/core';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { createRef, useState } from 'react';
import { Clipboard, useClipboardContext } from '../src';

const clipboardDescriptor = Object.getOwnPropertyDescriptor(navigator, 'clipboard');

afterEach(() => {
  if (clipboardDescriptor) {
    Object.defineProperty(navigator, 'clipboard', clipboardDescriptor);
  } else {
    Reflect.deleteProperty(navigator, 'clipboard');
  }
});

function ProviderClipboard() {
  const clipboard = Clipboard.useClipboard({ defaultValue: 'provider-value' });

  return (
    <Clipboard.RootProvider value={clipboard}>
      <Clipboard.Label>Provider value</Clipboard.Label>
      <Clipboard.Control>
        <Clipboard.Input asChild>
          <input readOnly />
        </Clipboard.Input>
        <Clipboard.Trigger asChild>
          <button type="button">Copy provider value</button>
        </Clipboard.Trigger>
      </Clipboard.Control>
    </Clipboard.RootProvider>
  );
}

test('keeps controlled value changes Ark-shaped', async () => {
  function ControlledClipboard() {
    const [value, setValue] = useState('https://ark-ui.com');

    return (
      <Clipboard value={value} onValueChange={(details) => setValue(details.value)}>
        <Clipboard.Label>Share URL</Clipboard.Label>
        <Clipboard.Control>
          <Clipboard.Input />
          <Clipboard.Trigger aria-label="Copy share URL" />
        </Clipboard.Control>
      </Clipboard>
    );
  }

  render(<ControlledClipboard />);

  const input = screen.getByRole('textbox', { name: 'Share URL' });
  fireEvent.change(input, { target: { value: 'https://chakra-ui.com' } });

  await waitFor(() => expect(input).toHaveValue('https://chakra-ui.com'));
});

test('keeps RootProvider and asChild composition semantic', () => {
  render(<ProviderClipboard />);

  const input = screen.getByRole('textbox', { name: 'Provider value' });
  const trigger = screen.getByRole('button', { name: 'Copy to clipboard' });

  expect(input).toHaveValue('provider-value');
  expect(input).toHaveAttribute('data-slot', 'clipboard-input');
  expect(trigger).toHaveAttribute('data-slot', 'clipboard-trigger');
});

test('forwards refs and renders the default copy affordance', async () => {
  Object.defineProperty(navigator, 'clipboard', {
    configurable: true,
    value: { writeText: async () => undefined },
  });

  const rootRef = createRef<HTMLDivElement>();
  const inputRef = createRef<HTMLInputElement>();
  const triggerRef = createRef<HTMLButtonElement>();

  const { container } = render(
    <Clipboard ref={rootRef} defaultValue="https://moduix.dev/docs/clipboard">
      <Clipboard.Label>Copy this link</Clipboard.Label>
      <Clipboard.Control>
        <Clipboard.Input ref={inputRef} readOnly />
        <Clipboard.Trigger ref={triggerRef}>
          <Clipboard.Indicator />
          <Clipboard.CopyText />
        </Clipboard.Trigger>
      </Clipboard.Control>
    </Clipboard>,
  );

  expect(rootRef.current).toHaveAttribute('data-slot', 'clipboard-root');
  expect(inputRef.current).toBe(screen.getByRole('textbox', { name: 'Copy this link' }));
  expect(triggerRef.current).toBe(screen.getByRole('button', { name: 'Copy to clipboard' }));
  expect(screen.getByText('Copy')).toHaveAttribute('data-slot', 'clipboard-copy-text');
  expect(
    container.querySelector('[data-slot="clipboard-indicator-idle-icon"]'),
  ).toBeInTheDocument();

  fireEvent.click(triggerRef.current!);

  await waitFor(() => expect(screen.getByText('Copied')).toBeInTheDocument());
  expect(
    container.querySelector('[data-slot="clipboard-indicator-idle-icon"]'),
  ).not.toBeInTheDocument();
  expect(
    container.querySelector('[data-slot="clipboard-indicator-copied-icon"]'),
  ).toBeInTheDocument();
});

test('exposes the Ark clipboard state through context', () => {
  function ClipboardStatus() {
    const clipboard = useClipboardContext();

    return <output>{`${clipboard.value}:${String(clipboard.copied)}`}</output>;
  }

  render(
    <Clipboard defaultValue="context-value">
      <Clipboard.Context>
        {(clipboard) => <span>{`render:${clipboard.value}`}</span>}
      </Clipboard.Context>
      <ClipboardStatus />
    </Clipboard>,
  );

  expect(screen.getByText('render:context-value')).toBeInTheDocument();
  expect(screen.getByText('context-value:false')).toBeInTheDocument();
});

test('preserves native disabled semantics on the input and trigger', () => {
  render(
    <Clipboard defaultValue="disabled-value">
      <Clipboard.Label>Disabled value</Clipboard.Label>
      <Clipboard.Control>
        <Clipboard.Input disabled />
        <Clipboard.Trigger disabled>Copy</Clipboard.Trigger>
      </Clipboard.Control>
    </Clipboard>,
  );

  expect(screen.getByRole('textbox', { name: 'Disabled value' })).toBeDisabled();
  expect(screen.getByRole('button', { name: 'Copy to clipboard' })).toBeDisabled();
});

test('clears copied state after the configured timeout', async () => {
  Object.defineProperty(navigator, 'clipboard', {
    configurable: true,
    value: { writeText: async () => undefined },
  });

  render(
    <Clipboard defaultValue="workspace-secret" timeout={1}>
      <Clipboard.Control>
        <Clipboard.Trigger>Copy secret</Clipboard.Trigger>
      </Clipboard.Control>
    </Clipboard>,
  );

  const trigger = screen.getByRole('button', { name: 'Copy to clipboard' });
  fireEvent.click(trigger);

  await waitFor(() => expect(trigger).toHaveAttribute('data-copied'));
  await waitFor(() => expect(trigger).not.toHaveAttribute('data-copied'));
});