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

test('applies native utilities to the component-owned parts', () => {
  const { container } = render(() => (
    <Clipboard>
      <ClipboardLabel>Copy link</ClipboardLabel>
      <ClipboardControl>
        <ClipboardInput />
        <ClipboardTrigger>
          <ClipboardIndicator />
        </ClipboardTrigger>
      </ClipboardControl>
    </Clipboard>
  ));

  expect([...container.querySelector('[data-slot="clipboard-root"]')!.classList]).toEqual(
    expect.arrayContaining(['flex', 'w-full', 'flex-col', 'gap-1.5', 'text-foreground']),
  );
  expect([...container.querySelector('[data-slot="clipboard-label"]')!.classList]).toEqual(
    expect.arrayContaining(['text-sm', 'font-medium']),
  );
  expect([...container.querySelector('[data-slot="clipboard-control"]')!.classList]).toEqual(
    expect.arrayContaining(['flex', 'w-full', 'items-center', 'gap-2']),
  );
  expect([...container.querySelector('[data-slot="clipboard-input"]')!.classList]).toEqual(
    expect.arrayContaining(['min-h-control-md', 'w-full', 'rounded-md', 'border-border']),
  );
  expect([...container.querySelector('[data-slot="clipboard-trigger"]')!.classList]).toEqual(
    expect.arrayContaining(['inline-flex', 'min-h-control-md', 'rounded-md', 'bg-background']),
  );
  expect([...container.querySelector('[data-slot="clipboard-indicator"]')!.classList]).toEqual(
    expect.arrayContaining(['inline-flex', 'items-center', 'justify-center']),
  );
});

test('lets consumer Tailwind classes override conflicting defaults', () => {
  const { container } = render(() => (
    <Clipboard class="gap-4 text-primary">
      <ClipboardControl class="gap-5">
        <ClipboardInput class="bg-muted px-0" />
        <ClipboardTrigger class="rounded-lg bg-muted px-2" />
      </ClipboardControl>
    </Clipboard>
  ));

  const root = container.querySelector('[data-slot="clipboard-root"]');
  const control = container.querySelector('[data-slot="clipboard-control"]');
  const input = container.querySelector('[data-slot="clipboard-input"]');
  const trigger = container.querySelector('[data-slot="clipboard-trigger"]');

  expect([...root!.classList]).toEqual(expect.arrayContaining(['gap-4', 'text-primary']));
  expect(['gap-1.5', 'text-foreground'].some((name) => root?.classList.contains(name))).toBe(false);
  expect([...control!.classList]).toEqual(expect.arrayContaining(['gap-5']));
  expect(control?.classList.contains('gap-2')).toBe(false);
  expect([...input!.classList]).toEqual(expect.arrayContaining(['bg-muted', 'px-0']));
  expect(['bg-background', 'px-3.5'].some((name) => input?.classList.contains(name))).toBe(false);
  expect([...trigger!.classList]).toEqual(
    expect.arrayContaining(['rounded-lg', 'bg-muted', 'px-2']),
  );
  expect(
    ['rounded-md', 'bg-background', 'px-4'].some((name) => trigger?.classList.contains(name)),
  ).toBe(false);
  expect(getComputedStyle(root!).gap).toBe('16px');
  expect(getComputedStyle(input!).paddingLeft).toBe('0px');
  expect(getComputedStyle(trigger!).paddingLeft).toBe('8px');
});