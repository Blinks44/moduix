import { page } from '@rstest/browser';
import { expect, rs, test } from '@rstest/core';
import { render, screen } from '@solidjs/testing-library';
import { createSignal } from 'solid-js';
import {
  Clipboard,
  ClipboardContext,
  ClipboardControl,
  ClipboardIndicator,
  ClipboardInput,
  ClipboardLabel,
  ClipboardRootProvider,
  ClipboardTrigger,
  useClipboard,
  useClipboardContext,
} from '../src';

function ProviderClipboard() {
  const clipboard = useClipboard({ defaultValue: 'provider-value' });

  return (
    <ClipboardRootProvider value={clipboard}>
      <ClipboardLabel>Provider value</ClipboardLabel>
      <ClipboardControl>
        <ClipboardInput asChild={(props) => <input {...props()} readOnly />} />
        <ClipboardTrigger asChild={(props) => <button {...props()} type="button" />}>
          Copy provider value
        </ClipboardTrigger>
      </ClipboardControl>
    </ClipboardRootProvider>
  );
}

test('keeps controlled value changes Ark-shaped', async () => {
  function ControlledClipboard() {
    const [value, setValue] = createSignal('https://ark-ui.com');

    return (
      <Clipboard value={value()} onValueChange={(details) => setValue(details.value)}>
        <ClipboardLabel>Share URL</ClipboardLabel>
        <ClipboardControl>
          <ClipboardInput />
          <ClipboardTrigger aria-label="Copy share URL" />
          <ClipboardContext>
            {(clipboard) => (
              <button type="button" onClick={() => clipboard().setValue('https://chakra-ui.com')}>
                Change URL
              </button>
            )}
          </ClipboardContext>
        </ClipboardControl>
      </Clipboard>
    );
  }

  render(() => <ControlledClipboard />);

  await page.getByRole('button', { name: 'Change URL' }).click();

  await expect
    .element(page.getByRole('textbox', { name: 'Share URL', exact: true }))
    .toHaveValue('https://chakra-ui.com');
});

test('keeps RootProvider and asChild composition semantic', async () => {
  render(() => <ProviderClipboard />);

  await expect
    .element(page.getByRole('textbox', { name: 'Provider value', exact: true }))
    .toHaveValue('provider-value');
  await expect
    .element(page.getByRole('textbox', { name: 'Provider value', exact: true }))
    .toHaveAttribute('data-slot', 'clipboard-input');
  await expect
    .element(page.locator('[data-slot="clipboard-trigger"]'))
    .toHaveAttribute('data-slot', 'clipboard-trigger');
});

test('does not forward refs through native Ark Solid asChild composition', () => {
  let rootRef: HTMLDivElement | undefined;

  render(() => (
    <Clipboard
      ref={(element) => (rootRef = element)}
      asChild={(props) => <section {...props()} aria-label="Clipboard" />}
    >
      <ClipboardControl>
        <ClipboardTrigger />
      </ClipboardControl>
    </Clipboard>
  ));

  expect(rootRef).toBeUndefined();
});

test('forwards refs and renders the default copy affordance', async () => {
  let rootRef!: HTMLDivElement;
  let inputRef!: HTMLInputElement;
  let triggerRef!: HTMLButtonElement;

  render(() => (
    <Clipboard
      ref={(element) => (rootRef = element)}
      defaultValue="https://moduix.dev/docs/clipboard"
    >
      <ClipboardLabel>Copy this link</ClipboardLabel>
      <ClipboardControl>
        <ClipboardInput ref={(element) => (inputRef = element)} readOnly />
        <ClipboardTrigger ref={(element) => (triggerRef = element)}>
          <ClipboardIndicator />
        </ClipboardTrigger>
      </ClipboardControl>
    </Clipboard>
  ));

  expect(rootRef?.getAttribute('data-slot')).toBe('clipboard-root');
  expect(inputRef).toBe(screen.getByRole('textbox', { name: 'Copy this link' }));
  expect(triggerRef).toBe(screen.getByRole('button', { name: 'Copy to clipboard' }));
  await expect.element(page.locator('[data-slot="clipboard-indicator-idle-icon"]')).toBeAttached();

  await page.locator('[data-slot="clipboard-trigger"]').click();

  await expect
    .element(page.locator('[data-slot="clipboard-trigger"]'))
    .toHaveAttribute('data-copied');
  await expect.poll(() => navigator.clipboard.readText()).toBe('https://moduix.dev/docs/clipboard');
  await expect.element(page.locator('[data-slot="clipboard-indicator-idle-icon"]')).toHaveCount(0);
  await expect
    .element(page.locator('[data-slot="clipboard-indicator-copied-icon"]'))
    .toBeAttached();
});

test('exposes the Ark clipboard state through context', async () => {
  function ClipboardStatus() {
    const clipboard = useClipboardContext();

    return <output>{`${clipboard().value}:${String(clipboard().copied)}`}</output>;
  }

  render(() => (
    <Clipboard defaultValue="context-value">
      <ClipboardContext>
        {(clipboard) => <span>{`render:${clipboard().value}`}</span>}
      </ClipboardContext>
      <ClipboardStatus />
    </Clipboard>
  ));

  await expect.element(page.getByText('render:context-value')).toBeAttached();
  await expect.element(page.getByText('context-value:false')).toBeAttached();
});

test('preserves native disabled semantics on the input and trigger', async () => {
  render(() => (
    <Clipboard defaultValue="disabled-value">
      <ClipboardLabel>Disabled value</ClipboardLabel>
      <ClipboardControl>
        <ClipboardInput disabled />
        <ClipboardTrigger disabled>Copy</ClipboardTrigger>
      </ClipboardControl>
    </Clipboard>
  ));

  await expect
    .element(page.getByRole('textbox', { name: 'Disabled value', exact: true }))
    .toBeDisabled();
  await expect.element(page.locator('[data-slot="clipboard-trigger"]')).toBeDisabled();
});

test('clears copied state after the configured timeout', async () => {
  const statusChange = rs.fn();
  render(() => (
    <Clipboard defaultValue="workspace-secret" timeout={250} onStatusChange={statusChange}>
      <ClipboardControl>
        <ClipboardTrigger>Copy secret</ClipboardTrigger>
      </ClipboardControl>
    </Clipboard>
  ));

  const copyTrigger = page.locator('[data-slot="clipboard-trigger"]');
  await copyTrigger.click();

  expect(statusChange).toHaveBeenCalledExactlyOnceWith({ copied: true });
  await expect.element(copyTrigger).not.toHaveAttribute('data-copied');
});