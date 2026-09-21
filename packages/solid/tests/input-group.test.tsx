import { expect, test } from '@rstest/core';
import { render, screen } from '@solidjs/testing-library';
import { createSignal } from 'solid-js';
import {
  Field,
  FieldLabel,
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
} from '../src';

test('keeps the Input slot that drives grouped field state styling', () => {
  render(() => (
    <Field disabled id="workspace" invalid readOnly>
      <FieldLabel>Workspace</FieldLabel>
      <InputGroup
        class="consumer-root"
        data-part="consumer-part"
        data-scope="consumer-scope"
        data-size="xs"
        data-slot="consumer-slot"
        data-testid="input-group"
        size="lg"
      >
        <InputGroupAddon
          class="consumer-addon"
          data-part="consumer-part"
          data-scope="consumer-scope"
          data-slot="consumer-slot"
        >
          @
        </InputGroupAddon>
        <InputGroupInput />
        <InputGroupText
          class="consumer-text"
          data-part="consumer-part"
          data-scope="consumer-scope"
          data-slot="consumer-slot"
        >
          .com
        </InputGroupText>
        <InputGroupButton class="consumer-button" data-slot="consumer-slot">
          Copy
        </InputGroupButton>
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
      <InputGroupInput aria-label="Workspace" />
      <InputGroupButton>Copy</InputGroupButton>
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
    <InputGroup ref={(element) => (rootRef = element)} data-testid="ordinary-root">
      <InputGroupAddon ref={(element) => (addonRef = element)}>@</InputGroupAddon>
      <InputGroupInput ref={(element) => (inputRef = element)} aria-label="Workspace" />
      <InputGroupText ref={(element) => (textRef = element)}>.com</InputGroupText>
      <InputGroupButton ref={(element) => (buttonRef = element)}>Copy</InputGroupButton>
    </InputGroup>
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
    <InputGroup
      ref={(element) => (rootRef = element)}
      data-testid="as-child-root"
      asChild={(props) => (
        <section {...props()} aria-label="Workspace group">
          <InputGroupAddon
            ref={(element) => (addonRef = element)}
            asChild={(props) => <strong {...props()}>@</strong>}
          />
          <InputGroupInput aria-label="Workspace" />
          <InputGroupText
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
