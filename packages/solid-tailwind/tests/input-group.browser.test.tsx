import { page } from '@rstest/browser';
import { expect, test, rs } from '@rstest/core';
import { render, screen } from '@solidjs/testing-library';
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

test('preserves grouped field state, owned hooks, and native refs', async () => {
  let rootRef!: HTMLDivElement;
  let addonRef!: HTMLSpanElement;
  let inputRef!: HTMLInputElement;
  let textRef!: HTMLSpanElement;
  let buttonRef!: HTMLButtonElement;

  render(() => (
    <Field disabled id="workspace" invalid readOnly>
      <FieldLabel>Workspace</FieldLabel>
      <InputGroup
        ref={(element) => (rootRef = element)}
        class="consumer-root"
        data-part="consumer-part"
        data-scope="consumer-scope"
        data-size="xs"
        data-slot="consumer-slot"
        data-testid="input-group"
        size="lg"
      >
        <InputGroupAddon
          ref={(element) => (addonRef = element)}
          class="consumer-addon"
          data-part="consumer-part"
          data-scope="consumer-scope"
          data-slot="consumer-slot"
        >
          @
        </InputGroupAddon>
        <InputGroupInput ref={(element) => (inputRef = element)} />
        <InputGroupText
          ref={(element) => (textRef = element)}
          class="consumer-text"
          data-part="consumer-part"
          data-scope="consumer-scope"
          data-slot="consumer-slot"
        >
          .com
        </InputGroupText>
        <InputGroupButton
          ref={(element) => (buttonRef = element)}
          class="consumer-button"
          data-slot="consumer-slot"
        >
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
  const inputLocator = page.getByRole('textbox', { name: 'Workspace', exact: true });
  await expect.element(inputLocator).toHaveAttribute('data-slot', 'input-root');
  await expect.element(inputLocator).toHaveAttribute('data-size', 'lg');
  await expect.element(inputLocator).toHaveAttribute('data-invalid');
  await expect.element(inputLocator).toBeDisabled();
  await expect.element(inputLocator).toHaveAttribute('readonly');
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
  expect(rootRef).toBe(group);
  expect(addonRef).toBe(addon);
  expect(inputRef).toBe(input);
  expect(textRef).toBe(text);
  expect(buttonRef).toBe(button);
});

test('uses the default size when parts are rendered without a group provider', async () => {
  render(() => (
    <>
      <InputGroupInput aria-label="Standalone input" />
      <InputGroupButton>Standalone action</InputGroupButton>
      <InputGroupClearTrigger />
    </>
  ));

  await expect
    .element(page.getByRole('textbox', { name: 'Standalone input', exact: true }))
    .toHaveAttribute('data-size', 'md');
  await expect
    .element(page.getByRole('button', { name: 'Standalone action', exact: true }))
    .toHaveAttribute('data-size', 'md');
  await expect
    .element(page.getByRole('button', { name: 'Clear input', exact: true }))
    .toHaveAttribute('data-size', 'md');
});

test('keeps the group size context reactive', async () => {
  const [size, setSize] = createSignal<'sm' | 'xl'>('sm');

  render(() => (
    <InputGroup size={size()} data-testid="responsive-group">
      <InputGroupInput aria-label="Workspace" />
      <InputGroupButton>Copy</InputGroupButton>
    </InputGroup>
  ));

  await expect.element(page.getByTestId('responsive-group')).toHaveAttribute('data-size', 'sm');
  await expect
    .element(page.getByRole('textbox', { name: 'Workspace', exact: true }))
    .toHaveAttribute('data-size', 'sm');
  await expect
    .element(page.getByRole('button', { name: 'Copy', exact: true }))
    .toHaveAttribute('data-size', 'sm');

  setSize('xl');

  await expect.element(page.getByTestId('responsive-group')).toHaveAttribute('data-size', 'xl');
  await expect
    .element(page.getByRole('textbox', { name: 'Workspace', exact: true }))
    .toHaveAttribute('data-size', 'xl');
  await expect
    .element(page.getByRole('button', { name: 'Copy', exact: true }))
    .toHaveAttribute('data-size', 'xl');
});

test('preserves factory asChild composition without forwarding refs', async () => {
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
  await expect
    .element(page.getByTestId('as-child-root'))
    .toHaveAttribute('data-slot', 'input-group-root');
  await expect
    .element(page.getByText('@', { exact: true }))
    .toHaveAttribute('data-slot', 'input-group-addon');
  await expect
    .element(page.getByText('.com', { exact: true }))
    .toHaveAttribute('data-slot', 'input-group-text');
  expect(rootRef).toBeUndefined();
  expect(addonRef).toBeUndefined();
  expect(textRef).toBeUndefined();
});

test('applies native utilities to the component-owned parts', () => {
  const { container } = render(() => (
    <InputGroup>
      <InputGroupAddon>@</InputGroupAddon>
      <InputGroupInput aria-label="Workspace" />
      <InputGroupText>.com</InputGroupText>
      <InputGroupButton>Copy</InputGroupButton>
    </InputGroup>
  ));

  expect([...container.querySelector('[data-slot="input-group-root"]')!.classList]).toEqual(
    expect.arrayContaining([
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
    ]),
  );
  expect([...container.querySelector('[data-slot="input-group-addon"]')!.classList]).toEqual(
    expect.arrayContaining([
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
    ]),
  );
  expect([...container.querySelector('[data-slot="input-root"]')!.classList]).toEqual(
    expect.arrayContaining([
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
    ]),
  );
  expect([...container.querySelector('[data-slot="input-group-text"]')!.classList]).toEqual(
    expect.arrayContaining([
      'inline-flex',
      'min-w-0',
      'items-center',
      'justify-center',
      'gap-2',
      'truncate',
      'bg-transparent',
      'text-muted-foreground',
    ]),
  );
  expect([...container.querySelector('[data-slot="input-group-button"]')!.classList]).toEqual(
    expect.arrayContaining(['h-auto', 'self-stretch', 'rounded-none', 'border-0']),
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
          <InputGroupAddon>@</InputGroupAddon>
          <InputGroupInput aria-label={`${size} input`} />
          <InputGroupButton>Copy</InputGroupButton>
        </InputGroup>
      ))}
    </>
  ));

  sizes.forEach(([size, rootHeight, padding, fontSize, lineHeight]) => {
    const group = container.querySelector(`[data-testid="group-${size}"]`)!;
    const addon = group.querySelector('[data-slot="input-group-addon"]')!;
    const input = group.querySelector('[data-slot="input-root"]')!;
    const button = group.querySelector('[data-slot="input-group-button"]')!;

    expect([...group.classList]).toEqual(expect.arrayContaining([rootHeight]));
    expect([...addon.classList]).toEqual(expect.arrayContaining([padding, fontSize, lineHeight]));
    expect([...input.classList]).toEqual(expect.arrayContaining([padding, fontSize, lineHeight]));
    expect(button.getAttribute('data-size')).toBe(size);
  });
});

test('lets consumer Tailwind classes override conflicting defaults', async () => {
  const { container } = render(() => (
    <InputGroup size="lg" class="min-h-20 w-80 max-w-sm rounded-lg bg-muted px-0 text-primary">
      <InputGroupAddon class="bg-background px-0 text-primary">@</InputGroupAddon>
      <InputGroupInput class="min-h-20 w-80 max-w-sm rounded-lg bg-muted px-0 py-0 leading-5" />
      <InputGroupButton class="rounded-lg bg-muted px-2 text-primary">Copy</InputGroupButton>
    </InputGroup>
  ));

  const root = container.querySelector('[data-slot="input-group-root"]')!;
  const addon = container.querySelector('[data-slot="input-group-addon"]')!;
  const input = container.querySelector('[data-slot="input-root"]')!;
  const button = container.querySelector('[data-slot="input-group-button"]')!;

  expect([...root.classList]).toEqual(
    expect.arrayContaining(['min-h-20', 'w-80', 'max-w-sm', 'rounded-lg', 'bg-muted', 'px-0']),
  );
  expect(
    ['min-h-control-lg', 'w-full', 'max-w-none', 'rounded-md', 'bg-background', 'px-4'].some(
      (name) => root.classList.contains(name),
    ),
  ).toBe(false);
  expect([...addon.classList]).toEqual(
    expect.arrayContaining(['bg-background', 'px-0', 'text-primary']),
  );
  expect(['bg-muted', 'px-4'].some((name) => addon.classList.contains(name))).toBe(false);
  expect([...input.classList]).toEqual(
    expect.arrayContaining([
      'min-h-20',
      'w-80',
      'max-w-sm',
      'rounded-lg',
      'bg-muted',
      'px-0',
      'py-0',
      'leading-5',
    ]),
  );
  expect(
    [
      'min-h-control-lg',
      'w-full',
      'max-w-none',
      'rounded-none',
      'bg-transparent',
      'px-4',
      'py-1',
      'leading-7',
    ].some((name) => input.classList.contains(name)),
  ).toBe(false);
  expect([...button.classList]).toEqual(
    expect.arrayContaining(['rounded-lg', 'bg-muted', 'px-2', 'text-primary']),
  );
  expect(['rounded-none', 'px-4'].some((name) => button.classList.contains(name))).toBe(false);
  await expect
    .element(page.locator('[data-slot="input-group-root"]'))
    .toHaveCSS('min-height', '80px');
  await expect.element(page.locator('[data-slot="input-root"]')).toHaveCSS('min-height', '80px');
  await expect.element(page.locator('[data-slot="input-root"]')).toHaveCSS('padding-left', '0px');
  await expect.element(page.locator('[data-slot="input-root"]')).toHaveCSS('padding-top', '0px');
  await expect.element(page.locator('[data-slot="input-root"]')).toHaveCSS('line-height', '20px');
});

test('uses a local Input size for its grouped utilities', async () => {
  render(() => (
    <InputGroup size="lg">
      <InputGroupInput aria-label="Workspace" size="xs" />
    </InputGroup>
  ));

  const input = screen.getByRole('textbox', { name: 'Workspace' });

  await expect
    .element(page.getByRole('textbox', { name: 'Workspace', exact: true }))
    .toHaveAttribute('data-size', 'xs');
  expect([...input.classList]).toEqual(expect.arrayContaining(['px-2.5', 'text-xs', 'leading-4']));
  expect(['px-4', 'text-lg', 'leading-7'].some((name) => input.classList.contains(name))).toBe(
    false,
  );
});

test('clear trigger forwards a single click, inherits size, and does not submit or reset a form', async () => {
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

  await page.getByRole('button', { name: 'Clear input', exact: true }).click();
  await expect.element(page.getByRole('textbox', { name: 'Search', exact: true })).toHaveValue('');
  await expect.element(page.getByRole('textbox', { name: 'Search', exact: true })).toBeFocused();
  await expect.element(page.getByRole('button')).toHaveCount(0);
});

test('clear trigger preserves custom labels, children, asChild hosts, refs, and disabled behavior', async () => {
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