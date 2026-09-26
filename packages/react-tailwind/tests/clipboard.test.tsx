import { afterEach, expect, test } from '@rstest/core';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { createRef, useState } from 'react';
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

const clipboardDescriptor = Object.getOwnPropertyDescriptor(navigator, 'clipboard');

afterEach(() => {
  if (clipboardDescriptor) {
    Object.defineProperty(navigator, 'clipboard', clipboardDescriptor);
  } else {
    Reflect.deleteProperty(navigator, 'clipboard');
  }
});

function ProviderClipboard() {
  const clipboard = useClipboard({ defaultValue: 'provider-value' });

  return (
    <ClipboardRootProvider value={clipboard}>
      <ClipboardLabel>Provider value</ClipboardLabel>
      <ClipboardControl>
        <ClipboardInput asChild>
          <input readOnly />
        </ClipboardInput>
        <ClipboardTrigger asChild>
          <button type="button">Copy provider value</button>
        </ClipboardTrigger>
      </ClipboardControl>
    </ClipboardRootProvider>
  );
}

test('keeps controlled value changes Ark-shaped', async () => {
  function ControlledClipboard() {
    const [value, setValue] = useState('https://ark-ui.com');

    return (
      <Clipboard value={value} onValueChange={(details) => setValue(details.value)}>
        <ClipboardLabel>Share URL</ClipboardLabel>
        <ClipboardControl>
          <ClipboardInput />
          <ClipboardTrigger aria-label="Copy share URL" />
        </ClipboardControl>
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
      <ClipboardLabel>Copy this link</ClipboardLabel>
      <ClipboardControl>
        <ClipboardInput ref={inputRef} readOnly />
        <ClipboardTrigger ref={triggerRef}>
          <ClipboardIndicator />
        </ClipboardTrigger>
      </ClipboardControl>
    </Clipboard>,
  );

  expect(rootRef.current).toHaveAttribute('data-slot', 'clipboard-root');
  expect(inputRef.current).toBe(screen.getByRole('textbox', { name: 'Copy this link' }));
  expect(triggerRef.current).toBe(screen.getByRole('button', { name: 'Copy to clipboard' }));
  expect(
    container.querySelector('[data-slot="clipboard-indicator-idle-icon"]'),
  ).toBeInTheDocument();

  fireEvent.click(triggerRef.current!);

  await waitFor(() => expect(triggerRef.current ?? triggerRef).toHaveAttribute('data-copied'));
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
      <ClipboardContext>
        {(clipboard) => <span>{`render:${clipboard.value}`}</span>}
      </ClipboardContext>
      <ClipboardStatus />
    </Clipboard>,
  );

  expect(screen.getByText('render:context-value')).toBeInTheDocument();
  expect(screen.getByText('context-value:false')).toBeInTheDocument();
});

test('preserves native disabled semantics on the input and trigger', () => {
  render(
    <Clipboard defaultValue="disabled-value">
      <ClipboardLabel>Disabled value</ClipboardLabel>
      <ClipboardControl>
        <ClipboardInput disabled />
        <ClipboardTrigger disabled>Copy</ClipboardTrigger>
      </ClipboardControl>
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
      <ClipboardControl>
        <ClipboardTrigger>Copy secret</ClipboardTrigger>
      </ClipboardControl>
    </Clipboard>,
  );

  const trigger = screen.getByRole('button', { name: 'Copy to clipboard' });
  fireEvent.click(trigger);

  await waitFor(() => expect(trigger).toHaveAttribute('data-copied'));
  await waitFor(() => expect(trigger).not.toHaveAttribute('data-copied'));
});

test('applies native utilities to the component-owned parts', () => {
  const { container } = render(
    <Clipboard>
      <ClipboardLabel>Copy link</ClipboardLabel>
      <ClipboardControl>
        <ClipboardInput />
        <ClipboardTrigger>
          <ClipboardIndicator />
        </ClipboardTrigger>
      </ClipboardControl>
    </Clipboard>,
  );

  expect(container.querySelector('[data-slot="clipboard-root"]')).toHaveClass(
    'flex',
    'w-full',
    'flex-col',
    'gap-1.5',
    'text-foreground',
  );
  expect(container.querySelector('[data-slot="clipboard-label"]')).toHaveClass(
    'text-sm',
    'font-medium',
  );
  expect(container.querySelector('[data-slot="clipboard-control"]')).toHaveClass(
    'flex',
    'w-full',
    'items-center',
    'gap-2',
  );
  expect(container.querySelector('[data-slot="clipboard-input"]')).toHaveClass(
    'min-h-control-md',
    'w-full',
    'rounded-md',
    'border-border',
  );
  expect(container.querySelector('[data-slot="clipboard-trigger"]')).toHaveClass(
    'inline-flex',
    'min-h-control-md',
    'rounded-md',
    'bg-background',
  );
  expect(container.querySelector('[data-slot="clipboard-indicator"]')).toHaveClass(
    'inline-flex',
    'items-center',
    'justify-center',
  );
});

test('lets consumer Tailwind classes override conflicting defaults', () => {
  const { container } = render(
    <Clipboard className="gap-4 text-primary">
      <ClipboardControl className="gap-5">
        <ClipboardInput className="bg-muted px-0" />
        <ClipboardTrigger className="rounded-lg bg-muted px-2" />
      </ClipboardControl>
    </Clipboard>,
  );

  const root = container.querySelector('[data-slot="clipboard-root"]');
  const control = container.querySelector('[data-slot="clipboard-control"]');
  const input = container.querySelector('[data-slot="clipboard-input"]');
  const trigger = container.querySelector('[data-slot="clipboard-trigger"]');

  expect(root).toHaveClass('gap-4', 'text-primary');
  expect(root).not.toHaveClass('gap-1.5', 'text-foreground');
  expect(control).toHaveClass('gap-5');
  expect(control).not.toHaveClass('gap-2');
  expect(input).toHaveClass('bg-muted', 'px-0');
  expect(input).not.toHaveClass('bg-background', 'px-3.5');
  expect(trigger).toHaveClass('rounded-lg', 'bg-muted', 'px-2');
  expect(trigger).not.toHaveClass('rounded-md', 'bg-background', 'px-4');
});