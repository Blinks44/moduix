import { expect, test, rs } from '@rstest/core';
import { fireEvent, render, screen } from '@testing-library/react';
import { useState } from 'react';
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
  render(
    <Field disabled id="workspace" invalid readOnly>
      <FieldLabel>Workspace</FieldLabel>
      <InputGroup
        className="consumer-root"
        data-part="consumer-part"
        data-scope="consumer-scope"
        data-size="xs"
        data-slot="consumer-slot"
        data-testid="input-group"
        size="lg"
      >
        <InputGroupAddon
          className="consumer-addon"
          data-part="consumer-part"
          data-scope="consumer-scope"
          data-slot="consumer-slot"
        >
          @
        </InputGroupAddon>
        <InputGroupInput />
        <InputGroupText
          className="consumer-text"
          data-part="consumer-part"
          data-scope="consumer-scope"
          data-slot="consumer-slot"
        >
          .com
        </InputGroupText>
        <InputGroupButton className="consumer-button" data-slot="consumer-slot">
          Copy
        </InputGroupButton>
      </InputGroup>
    </Field>,
  );

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

test('clear trigger forwards a single click, inherits size, and does not submit or reset a form', () => {
  const clear = rs.fn();
  const submit = rs.fn();
  render(
    <form onSubmit={submit}>
      <InputGroup size="lg">
        <InputGroupInput aria-label="Search" value="moduix" readOnly />
        <InputGroupClearTrigger className="consumer-clear" data-slot="override" onClick={clear} />
      </InputGroup>
    </form>,
  );
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
  function Search() {
    const [value, setValue] = useState('moduix');
    let input: HTMLInputElement | null = null;
    return (
      <InputGroup>
        <InputGroupInput
          ref={(element) => {
            input = element;
          }}
          aria-label="Search"
          value={value}
          onChange={(event) => setValue(event.currentTarget.value)}
        />
        {value && (
          <InputGroupClearTrigger
            onClick={() => {
              setValue('');
              input?.focus();
            }}
          />
        )}
      </InputGroup>
    );
  }
  render(<Search />);

  fireEvent.click(screen.getByRole('button', { name: 'Clear input' }));
  expect(screen.getByRole('textbox', { name: 'Search' })).toHaveValue('');
  expect(screen.getByRole('textbox', { name: 'Search' })).toHaveFocus();
  expect(screen.queryByRole('button')).not.toBeInTheDocument();
});

test('clear trigger preserves custom labels, children, asChild hosts, refs, and disabled behavior', () => {
  const clear = rs.fn();
  let trigger: HTMLButtonElement | undefined;
  render(
    <>
      <span id="clear-label">Erase query</span>
      <InputGroupClearTrigger
        ref={(element) => {
          trigger = element ?? undefined;
        }}
        asChild
        aria-labelledby="clear-label"
        size="sm"
        onClick={clear}
      >
        <button type="button">Custom icon</button>
      </InputGroupClearTrigger>
      <InputGroupClearTrigger aria-label="Disabled clear" disabled onClick={clear} />
    </>,
  );
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