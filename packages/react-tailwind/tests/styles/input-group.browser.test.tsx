import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render } from '@testing-library/react';
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from '@/index';

test('lets consumer Tailwind classes override conflicting defaults', async () => {
  const { container } = render(
    <InputGroup size="lg" className="min-h-20 w-80 max-w-sm rounded-lg bg-muted px-0 text-primary">
      <InputGroupAddon className="bg-background px-0 text-primary">@</InputGroupAddon>
      <InputGroupInput className="min-h-20 w-80 max-w-sm rounded-lg bg-muted px-0 py-0 leading-5" />
      <InputGroupButton className="rounded-lg bg-muted px-2 text-primary">Copy</InputGroupButton>
    </InputGroup>,
  );

  const root = container.querySelector('[data-slot="input-group-root"]')!;
  const addon = container.querySelector('[data-slot="input-group-addon"]')!;
  const input = container.querySelector('[data-slot="input-root"]')!;
  const button = container.querySelector('[data-slot="input-group-button"]')!;

  expect([...root.classList]).toEqual(
    expect.arrayContaining(['min-h-20', 'w-80', 'max-w-sm', 'rounded-lg', 'bg-muted', 'px-0']),
  );
  expect([...addon.classList]).toEqual(
    expect.arrayContaining(['bg-background', 'px-0', 'text-primary']),
  );
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
  expect([...button.classList]).toEqual(
    expect.arrayContaining(['rounded-lg', 'bg-muted', 'px-2', 'text-primary']),
  );
  await expect
    .element(page.locator('[data-slot="input-group-root"]'))
    .toHaveCSS('min-height', '80px');
  await expect.element(page.locator('[data-slot="input-root"]')).toHaveCSS('min-height', '80px');
  await expect.element(page.locator('[data-slot="input-root"]')).toHaveCSS('padding-left', '0px');
  await expect.element(page.locator('[data-slot="input-root"]')).toHaveCSS('padding-top', '0px');
  await expect.element(page.locator('[data-slot="input-root"]')).toHaveCSS('line-height', '20px');
});

test('uses a local Input size for its grouped utilities', async () => {
  render(
    <InputGroup size="lg">
      <InputGroupInput aria-label="Workspace" size="xs" />
    </InputGroup>,
  );

  await expect
    .element(page.getByRole('textbox', { name: 'Workspace', exact: true }))
    .toHaveAttribute('data-size', 'xs');
});