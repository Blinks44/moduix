import { afterEach, expect, test } from '@rstest/core';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { useState } from 'react';
import { Clipboard } from '../src';

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