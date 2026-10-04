import { expect, test, rs } from '@rstest/core';
import { fireEvent, render, screen } from '@solidjs/testing-library';
import { createSignal } from 'solid-js';
import {
  Field,
  FieldLabel,
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupClearTrigger,
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

test('uses the default size when parts are rendered without a group provider', () => {
  render(() => (
    <>
      <InputGroupInput aria-label="Standalone input" />
      <InputGroupButton>Standalone action</InputGroupButton>
      <InputGroupClearTrigger />
    </>
  ));

  expect(screen.getByRole('textbox', { name: 'Standalone input' })).toHaveAttribute(
    'data-size',
    'md',
  );
  expect(screen.getByRole('button', { name: 'Standalone action' })).toHaveAttribute(
    'data-size',
    'md',
  );
  expect(screen.getByRole('button', { name: 'Clear input' })).toHaveAttribute('data-size', 'md');
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

test('clear trigger forwards a single click, inherits size, and does not submit or reset a form', () => {
  const clear = rs.fn();
  const submit = rs.fn();
  render(() => (
    <form onSubmit={submit}>
      <InputGroup size="lg">
        <InputGroupInput aria-label="Search" value="moduix" />
        <InputGroupClearTrigger class="consumer-clear" data-slot="override" onClick={clear} />
      </InputGroup>
    </form>
  ));
  const button = screen.getByRole('button', { name: 'Clear input' });
  expect(button).toHaveAttribute('type', 'button');
  expect(button).toHaveAttribute('data-size', 'lg');
  expect(button).toHaveAttribute('data-slot', 'input-group-clear-trigger');
  expect(button).toHaveAttribute('data-scope', 'input-group');
  expect(button).toHaveAttribute('data-part', 'clear-trigger');
  expect(button).toHaveClass('consumer-clear');
  expect(button.querySelector('svg')).toHaveAttribute('aria-hidden', 'true');
  fireEvent.click(button);
  expect(clear).toHaveBeenCalledTimes(1);
  expect(submit).not.toHaveBeenCalled();
  expect(screen.getByRole('textbox', { name: 'Search' })).toHaveValue('moduix');
});

test('clear trigger supports app-owned value, visibility, and focus', () => {
  const [value, setValue] = createSignal('moduix');
  let input: HTMLInputElement | undefined;
  render(() => (
    <InputGroup>
      <InputGroupInput
        ref={(element) => {
          input = element;
        }}
        aria-label="Search"
        value={value()}
        onInput={(event) => setValue(event.currentTarget.value)}
      />
      {value() && (
        <InputGroupClearTrigger
          onClick={() => {
            setValue('');
            input?.focus();
          }}
        />
      )}
    </InputGroup>
  ));

  fireEvent.click(screen.getByRole('button', { name: 'Clear input' }));
  expect(screen.getByRole('textbox', { name: 'Search' })).toHaveValue('');
  expect(screen.getByRole('textbox', { name: 'Search' })).toHaveFocus();
  expect(screen.queryByRole('button')).not.toBeInTheDocument();
});

test('clear trigger preserves custom labels, children, asChild hosts, refs, and disabled behavior', () => {
  const clear = rs.fn();
  let trigger: HTMLButtonElement | undefined;
  render(() => (
    <>
      <span id="clear-label">Erase query</span>
      <InputGroupClearTrigger
        aria-labelledby="clear-label"
        size="sm"
        onClick={clear}
        asChild={(props) => (
          <button
            {...props()}
            ref={(element) => {
              trigger = element;
            }}
            type="button"
          >
            Custom icon
          </button>
        )}
      />
      <InputGroupClearTrigger aria-label="Disabled clear" disabled onClick={clear} />
    </>
  ));
  const button = screen.getByRole('button', { name: 'Erase query' });
  expect(trigger).toBe(button);
  expect(button).not.toHaveAttribute('aria-label');
  expect(button).toHaveTextContent('Custom icon');
  expect(button).toHaveAttribute('data-size', 'sm');
  fireEvent.click(button);
  expect(clear).toHaveBeenCalledTimes(1);
  const disabled = screen.getByRole('button', { name: 'Disabled clear' });
  expect(disabled).toBeDisabled();
  fireEvent.click(disabled);
  expect(clear).toHaveBeenCalledTimes(1);
});