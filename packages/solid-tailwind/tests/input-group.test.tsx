import { expect, test } from '@rstest/core';
import { render, screen } from '@solidjs/testing-library';
import { createSignal } from 'solid-js';
import { Field, InputGroup } from '../src';

test('keeps the Input slot that drives grouped field state styling', () => {
  render(() => (
    <Field disabled id="workspace" invalid readOnly>
      <Field.Label>Workspace</Field.Label>
      <InputGroup
        class="consumer-root"
        data-part="consumer-part"
        data-scope="consumer-scope"
        data-size="xs"
        data-slot="consumer-slot"
        data-testid="input-group"
        size="lg"
      >
        <InputGroup.Addon
          class="consumer-addon"
          data-part="consumer-part"
          data-scope="consumer-scope"
          data-slot="consumer-slot"
        >
          @
        </InputGroup.Addon>
        <InputGroup.Input />
        <InputGroup.Text
          class="consumer-text"
          data-part="consumer-part"
          data-scope="consumer-scope"
          data-slot="consumer-slot"
        >
          .com
        </InputGroup.Text>
        <InputGroup.Button class="consumer-button" data-slot="consumer-slot">
          Copy
        </InputGroup.Button>
      </InputGroup>
    </Field>
  ));

  const group = screen.getByTestId('input-group');
  const addon = screen.getByText('@');
  const input = screen.getByRole('textbox', { name: 'Workspace' });
  const text = screen.getByText('.com');
  const button = screen.getByRole('button', { name: 'Copy' });

  expect(group).toHaveAttribute('data-slot', 'input-group-root');
  expect(group).toHaveAttribute('data-scope', 'input-group');
  expect(group).toHaveAttribute('data-part', 'root');
  expect(group).toHaveAttribute('data-size', 'lg');
  expect(group).toHaveClass('consumer-root');
  expect(addon).toHaveAttribute('data-slot', 'input-group-addon');
  expect(addon).toHaveAttribute('data-scope', 'input-group');
  expect(addon).toHaveAttribute('data-part', 'addon');
  expect(addon).toHaveClass('consumer-addon');
  expect(input).toHaveAttribute('data-slot', 'input-root');
  expect(input).toHaveAttribute('data-size', 'lg');
  expect(input).toHaveAttribute('data-invalid');
  expect(input).toBeDisabled();
  expect(input).toHaveAttribute('readonly');
  expect(text).toHaveAttribute('data-slot', 'input-group-text');
  expect(text).toHaveAttribute('data-scope', 'input-group');
  expect(text).toHaveAttribute('data-part', 'text');
  expect(text).toHaveClass('consumer-text');
  expect(button).toHaveAttribute('data-slot', 'input-group-button');
  expect(button).toHaveAttribute('data-size', 'lg');
  expect(button).toHaveAttribute('type', 'button');
  expect(button).toHaveClass('consumer-button');
  expect(button).toBeEnabled();
});

test('keeps the group size context reactive', () => {
  const [size, setSize] = createSignal<'sm' | 'xl'>('sm');

  render(() => (
    <InputGroup size={size()} data-testid="responsive-group">
      <InputGroup.Input aria-label="Workspace" />
      <InputGroup.Button>Copy</InputGroup.Button>
    </InputGroup>
  ));

  const group = screen.getByTestId('responsive-group');
  const input = screen.getByRole('textbox', { name: 'Workspace' });
  const button = screen.getByRole('button', { name: 'Copy' });

  expect(group).toHaveAttribute('data-size', 'sm');
  expect(input).toHaveAttribute('data-size', 'sm');
  expect(button).toHaveAttribute('data-size', 'sm');

  setSize('xl');

  expect(group).toHaveAttribute('data-size', 'xl');
  expect(input).toHaveAttribute('data-size', 'xl');
  expect(button).toHaveAttribute('data-size', 'xl');
});

test('forwards refs to ordinary parts', () => {
  let rootRef!: HTMLDivElement;
  let addonRef!: HTMLSpanElement;
  let inputRef!: HTMLInputElement;
  let textRef!: HTMLSpanElement;
  let buttonRef!: HTMLButtonElement;

  render(() => (
    <InputGroup.Root ref={(element) => (rootRef = element)} data-testid="ordinary-root">
      <InputGroup.Addon ref={(element) => (addonRef = element)}>@</InputGroup.Addon>
      <InputGroup.Input ref={(element) => (inputRef = element)} aria-label="Workspace" />
      <InputGroup.Text ref={(element) => (textRef = element)}>.com</InputGroup.Text>
      <InputGroup.Button ref={(element) => (buttonRef = element)}>Copy</InputGroup.Button>
    </InputGroup.Root>
  ));

  expect(rootRef).toBe(screen.getByTestId('ordinary-root'));
  expect(addonRef).toBe(screen.getByText('@'));
  expect(inputRef).toBe(screen.getByRole('textbox', { name: 'Workspace' }));
  expect(textRef).toBe(screen.getByText('.com'));
  expect(buttonRef).toBe(screen.getByRole('button', { name: 'Copy' }));
});

test('preserves factory asChild composition without forwarding refs', () => {
  let rootRef: HTMLElement | undefined;
  let addonRef: HTMLElement | undefined;
  let textRef: HTMLElement | undefined;

  render(() => (
    <InputGroup.Root
      ref={(element) => (rootRef = element)}
      data-testid="as-child-root"
      asChild={(props) => (
        <section {...props()} aria-label="Workspace group">
          <InputGroup.Addon
            ref={(element) => (addonRef = element)}
            asChild={(props) => <strong {...props()}>@</strong>}
          />
          <InputGroup.Input aria-label="Workspace" />
          <InputGroup.Text
            ref={(element) => (textRef = element)}
            asChild={(props) => <em {...props()}>.com</em>}
          />
        </section>
      )}
    />
  ));

  const root = screen.getByTestId('as-child-root');

  expect(root.tagName).toBe('SECTION');
  expect(root).toHaveAttribute('data-slot', 'input-group-root');
  expect(screen.getByText('@')).toHaveAttribute('data-slot', 'input-group-addon');
  expect(screen.getByText('.com')).toHaveAttribute('data-slot', 'input-group-text');
  expect(rootRef).toBeUndefined();
  expect(addonRef).toBeUndefined();
  expect(textRef).toBeUndefined();
});

test('applies native utilities to the component-owned parts', () => {
  const { container } = render(() => (
    <InputGroup>
      <InputGroup.Addon>@</InputGroup.Addon>
      <InputGroup.Input aria-label="Workspace" />
      <InputGroup.Text>.com</InputGroup.Text>
      <InputGroup.Button>Copy</InputGroup.Button>
    </InputGroup>
  ));

  expect(container.querySelector('[data-slot="input-group-root"]')).toHaveClass(
    'flex',
    'w-full',
    'max-w-none',
    'min-h-control-md',
    'items-stretch',
    'overflow-hidden',
    'rounded-md',
    'border',
    'border-border',
    'bg-background',
    'text-foreground',
  );
  expect(container.querySelector('[data-slot="input-group-addon"]')).toHaveClass(
    'inline-flex',
    'min-w-0',
    'items-center',
    'justify-center',
    'gap-2',
    'truncate',
    'bg-muted',
    'text-muted-foreground',
    'px-3.5',
    'text-md',
    'leading-6',
    'border-s',
    'border-e',
  );
  expect(container.querySelector('[data-slot="input-root"]')).toHaveClass(
    'min-h-0',
    'min-w-0',
    'grow',
    'basis-auto',
    'rounded-none',
    'border-0',
    'bg-transparent',
    'outline-0',
    'px-3.5',
    'py-1',
    'text-md',
    'leading-6',
  );
  expect(container.querySelector('[data-slot="input-group-text"]')).toHaveClass(
    'inline-flex',
    'min-w-0',
    'items-center',
    'justify-center',
    'gap-2',
    'truncate',
    'bg-transparent',
    'text-muted-foreground',
  );
  expect(container.querySelector('[data-slot="input-group-button"]')).toHaveClass(
    'h-auto',
    'self-stretch',
    'rounded-none',
    'border-0',
  );
});

test('applies each group size with native utilities', () => {
  const sizes = [
    ['xs', 'min-h-control-xs', 'px-2.5', 'text-xs', 'leading-4'],
    ['sm', 'min-h-control-sm', 'px-3', 'text-sm', 'leading-5'],
    ['md', 'min-h-control-md', 'px-3.5', 'text-md', 'leading-6'],
    ['lg', 'min-h-control-lg', 'px-4', 'text-lg', 'leading-7'],
    ['xl', 'min-h-control-xl', 'px-4.5', 'text-lg', 'leading-7'],
  ] as const;

  const { container } = render(() => (
    <>
      {sizes.map(([size]) => (
        <InputGroup size={size} data-testid={`group-${size}`}>
          <InputGroup.Addon>@</InputGroup.Addon>
          <InputGroup.Input aria-label={`${size} input`} />
          <InputGroup.Button>Copy</InputGroup.Button>
        </InputGroup>
      ))}
    </>
  ));

  sizes.forEach(([size, rootHeight, padding, fontSize, lineHeight]) => {
    const group = container.querySelector(`[data-testid="group-${size}"]`);
    const addon = group?.querySelector('[data-slot="input-group-addon"]');
    const input = group?.querySelector('[data-slot="input-root"]');
    const button = group?.querySelector('[data-slot="input-group-button"]');

    expect(group).toHaveClass(rootHeight);
    expect(addon).toHaveClass(padding, fontSize, lineHeight);
    expect(input).toHaveClass(padding, fontSize, lineHeight);
    expect(button).toHaveAttribute('data-size', size);
  });
});

test('lets consumer Tailwind classes override conflicting defaults', () => {
  const { container } = render(() => (
    <InputGroup size="lg" class="min-h-20 w-80 max-w-sm rounded-lg bg-muted px-0 text-primary">
      <InputGroup.Addon class="bg-background px-0 text-primary">@</InputGroup.Addon>
      <InputGroup.Input class="min-h-20 w-80 max-w-sm rounded-lg bg-muted px-0 py-0 leading-5" />
      <InputGroup.Button class="rounded-lg bg-muted px-2 text-primary">Copy</InputGroup.Button>
    </InputGroup>
  ));

  const root = container.querySelector('[data-slot="input-group-root"]');
  const addon = container.querySelector('[data-slot="input-group-addon"]');
  const input = container.querySelector('[data-slot="input-root"]');
  const button = container.querySelector('[data-slot="input-group-button"]');

  expect(root).toHaveClass('min-h-20', 'w-80', 'max-w-sm', 'rounded-lg', 'bg-muted', 'px-0');
  expect(root).not.toHaveClass(
    'min-h-control-lg',
    'w-full',
    'max-w-none',
    'rounded-md',
    'bg-background',
    'px-4',
  );
  expect(addon).toHaveClass('bg-background', 'px-0', 'text-primary');
  expect(addon).not.toHaveClass('bg-muted', 'px-4', 'text-lg');
  expect(input).toHaveClass(
    'min-h-20',
    'w-80',
    'max-w-sm',
    'rounded-lg',
    'bg-muted',
    'px-0',
    'py-0',
    'leading-5',
  );
  expect(input).not.toHaveClass(
    'min-h-control-lg',
    'w-full',
    'max-w-none',
    'rounded-none',
    'bg-transparent',
    'px-4',
    'py-1',
    'leading-7',
  );
  expect(button).toHaveClass('rounded-lg', 'bg-muted', 'px-2', 'text-primary');
  expect(button).not.toHaveClass('rounded-none', 'px-4', 'text-lg');
});