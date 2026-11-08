import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/svelte';
import InputGroupOverride from './InputGroupOverride.svelte';
import InputGroupState from './InputGroupState.svelte';

test('preserves grouped field state, owned hooks, and native refs', async () => {
  const { component } = render(InputGroupState);

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
  await expect.element(buttonLocator).toBeEnabled();
  const refs = component.getRefs();
  expect(refs.rootRef).toBe(group);
  expect(refs.addonRef).toBe(addon);
  expect(refs.inputRef).toBe(input);
  expect(refs.textRef).toBe(text);
  expect(refs.buttonRef).toBe(button);
});

test('lets consumer Tailwind classes override conflicting defaults', async () => {
  const { container } = render(InputGroupOverride);

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