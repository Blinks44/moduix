import { page } from '@rstest/browser';
import { expect, test, rs } from '@rstest/core';
import { render, screen } from '@testing-library/react';
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
  InputGroupTextarea,
} from '../src';

test('keeps the Input slot that drives grouped field state styling', async () => {
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

  const text = screen.getByText('.com');
  const button = screen.getByRole('button', { name: 'Copy' });

  const groupLocator = page.getByTestId('input-group');
  await expect.element(groupLocator).toHaveAttribute('data-slot', 'input-group-root');
  await expect.element(groupLocator).toHaveAttribute('data-scope', 'input-group');
  await expect.element(groupLocator).toHaveAttribute('data-part', 'root');
  await expect.element(groupLocator).toHaveAttribute('data-size', 'lg');
  expect([...group.classList]).toEqual(expect.arrayContaining(['consumer-root']));
  const textLocator = page.getByText('@', { exact: true });
  await expect.element(textLocator).toHaveAttribute('data-slot', 'input-group-addon');
  await expect.element(textLocator).toHaveAttribute('data-scope', 'input-group');
  await expect.element(textLocator).toHaveAttribute('data-part', 'addon');
  expect([...addon.classList]).toEqual(expect.arrayContaining(['consumer-addon']));
  const textbox = page.getByRole('textbox', { name: 'Workspace', exact: true });
  await expect.element(textbox).toHaveAttribute('data-slot', 'input-root');
  await expect.element(textbox).toHaveAttribute('data-size', 'lg');
  await expect.element(textbox).toHaveAttribute('data-invalid');
  await expect.element(textbox).toBeDisabled();
  await expect.element(textbox).toHaveAttribute('readonly');
  const textLocator2 = page.getByText('.com', { exact: true });
  await expect.element(textLocator2).toHaveAttribute('data-slot', 'input-group-text');
  await expect.element(textLocator2).toHaveAttribute('data-scope', 'input-group');
  await expect.element(textLocator2).toHaveAttribute('data-part', 'text');
  expect([...text.classList]).toEqual(expect.arrayContaining(['consumer-text']));
  const buttonLocator = page.getByRole('button', { name: 'Copy', exact: true });
  await expect.element(buttonLocator).toHaveAttribute('data-slot', 'input-group-button');
  await expect.element(buttonLocator).toHaveAttribute('data-size', 'lg');
  await expect.element(buttonLocator).toHaveAttribute('type', 'button');
  expect([...button.classList]).toEqual(expect.arrayContaining(['consumer-button']));
  await expect.element(buttonLocator).toBeEnabled();
});

test('clear trigger forwards a single click, inherits size, and does not submit or reset a form', async () => {
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
  const buttonLocator = page.getByRole('button', { name: 'Clear input', exact: true });
  await expect.element(buttonLocator).toHaveAttribute('type', 'button');
  await expect.element(buttonLocator).toHaveAttribute('data-size', 'lg');
  await expect.element(buttonLocator).toHaveAttribute('data-slot', 'input-group-clear-trigger');
  await expect.element(buttonLocator).toHaveAttribute('data-scope', 'input-group');
  await expect.element(buttonLocator).toHaveAttribute('data-part', 'clear-trigger');
  expect([...button.classList]).toEqual(expect.arrayContaining(['consumer-clear']));
  expect(button.querySelector('svg')!.getAttribute('aria-hidden')).toBe('true');
  await buttonLocator.click();
  expect(clear).toHaveBeenCalledTimes(1);
  expect(submit).not.toHaveBeenCalled();
  await expect
    .element(page.getByRole('textbox', { name: 'Search', exact: true }))
    .toHaveValue('moduix');
});

test('clear trigger supports app-owned value, visibility, and focus', async () => {
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

  await page.getByRole('button', { name: 'Clear input', exact: true }).click();
  await expect.element(page.getByRole('textbox', { name: 'Search', exact: true })).toHaveValue('');
  await expect.element(page.getByRole('textbox', { name: 'Search', exact: true })).toBeFocused();
  await expect.element(page.getByRole('button')).toHaveCount(0);
});

test('clear trigger preserves custom labels, children, asChild hosts, refs, and disabled behavior', async () => {
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
  const buttonLocator = page.getByRole('button', { name: 'Erase query', exact: true });
  await expect.element(buttonLocator).not.toHaveAttribute('aria-label');
  await expect.element(buttonLocator).toContainText('Custom icon');
  await expect.element(buttonLocator).toHaveAttribute('data-size', 'sm');
  await buttonLocator.click();
  expect(clear).toHaveBeenCalledTimes(1);
  await expect
    .element(page.getByRole('button', { name: 'Disabled clear', exact: true }))
    .toBeDisabled();
  expect(clear).toHaveBeenCalledTimes(1);
});

test('removes the Input border and background inside the group', () => {
  render(
    <InputGroup>
      <InputGroupInput aria-label="Grouped" />
    </InputGroup>,
  );

  expect(getComputedStyle(screen.getByRole('textbox', { name: 'Grouped' }))).toMatchObject({
    backgroundColor: 'rgba(0, 0, 0, 0)',
    borderTopWidth: '0px',
    minHeight: '0px',
  });
});

test('keeps the group height when it holds a button', () => {
  render(
    <div>
      <InputGroup data-testid="plain">
        <InputGroupInput aria-label="Plain" />
      </InputGroup>
      <InputGroup data-testid="with-button">
        <InputGroupInput aria-label="With button" />
        <InputGroupButton>Go</InputGroupButton>
      </InputGroup>
    </div>,
  );

  expect(screen.getByTestId('with-button').offsetHeight).toBe(
    screen.getByTestId('plain').offsetHeight,
  );
});

test('uses a local input size for font and inline padding', () => {
  render(
    <InputGroup size="lg">
      <InputGroupInput aria-label="Local size" size="xs" />
    </InputGroup>,
  );

  expect(getComputedStyle(screen.getByRole('textbox', { name: 'Local size' }))).toMatchObject({
    fontSize: '12px',
    paddingLeft: '10px',
  });
});

test('renders a borderless textarea that follows the group size', () => {
  let textarea: HTMLTextAreaElement | undefined;
  render(
    <InputGroup size="sm" data-testid="textarea-group">
      <InputGroupTextarea
        aria-label="Message"
        ref={(element) => {
          textarea = element ?? undefined;
        }}
      />
    </InputGroup>,
  );

  const element = screen.getByRole('textbox', { name: 'Message' });
  expect(textarea).toBe(element);
  expect(element.getAttribute('data-slot')).toBe('textarea-root');
  expect(element.dataset.size).toBe('sm');
  expect(getComputedStyle(element)).toMatchObject({
    backgroundColor: 'rgba(0, 0, 0, 0)',
    borderTopWidth: '0px',
    resize: 'none',
    fontSize: '14px',
    paddingLeft: '12px',
  });
  expect(screen.getByTestId('textarea-group').offsetHeight).toBeGreaterThan(element.offsetHeight);
});

test('derives invalid and disabled group state from the textarea', () => {
  render(
    <div>
      <InputGroup data-testid="plain">
        <InputGroupTextarea aria-label="Plain" />
      </InputGroup>
      <InputGroup data-testid="invalid">
        <InputGroupTextarea aria-label="Invalid" aria-invalid="true" />
      </InputGroup>
      <InputGroup data-testid="disabled">
        <InputGroupTextarea aria-label="Disabled" disabled />
      </InputGroup>
    </div>,
  );

  expect(getComputedStyle(screen.getByTestId('invalid')).borderTopColor).not.toBe(
    getComputedStyle(screen.getByTestId('plain')).borderTopColor,
  );
  expect(getComputedStyle(screen.getByTestId('disabled')).opacity).toBe('0.5');
  expect(getComputedStyle(screen.getByRole('textbox', { name: 'Disabled' })).opacity).toBe('1');
});

test('stacks block addons above and below the control', () => {
  render(
    <InputGroup data-testid="block-group">
      <InputGroupText align="block">Prompt</InputGroupText>
      <InputGroupTextarea aria-label="Prompt" />
      <InputGroupAddon align="block">
        <button type="button">Send</button>
      </InputGroupAddon>
    </InputGroup>,
  );

  const group = screen.getByTestId('block-group');
  const text = screen.getByText('Prompt');
  const addon = screen.getByRole('button', { name: 'Send' }).parentElement!;

  expect(getComputedStyle(group).flexDirection).toBe('column');
  expect(text.getAttribute('data-align')).toBe('block');
  expect(addon.getAttribute('data-align')).toBe('block');
  expect(addon.offsetWidth).toBe(group.clientWidth);
  expect(getComputedStyle(addon)).toMatchObject({
    borderTopWidth: '1px',
    borderBottomWidth: '0px',
    borderLeftWidth: '0px',
  });
});