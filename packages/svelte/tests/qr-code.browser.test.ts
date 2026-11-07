import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/svelte';
import AnatomyQrCode from './qr-code/AnatomyQrCode.svelte';
import AsChildQrCode from './qr-code/AsChildQrCode.svelte';
import ContextQrCode from './qr-code/ContextQrCode.svelte';
import DisabledQrCode from './qr-code/DisabledQrCode.svelte';
import ProviderQrCode from './qr-code/ProviderQrCode.svelte';
import ValueQrCode from './qr-code/ValueQrCode.svelte';

test('renders Ark anatomy with stable hooks, accessible SVG output, and forwarded refs', () => {
  const { component, container } = render(AnatomyQrCode);
  const { frameRef, patternRef, rootRef } = component.getRefs();
  const frame = screen.getByRole('img', { name: 'QR code for moduix documentation' });
  const pattern = container.querySelector('[data-slot="qr-code-pattern"]')!;
  const trigger = screen.getByRole('button', { name: 'Download PNG' });

  expect(rootRef!.getAttribute('data-scope')).toBe('qr-code');
  expect(rootRef!.getAttribute('data-part')).toBe('root');
  expect(rootRef!.getAttribute('data-slot')).toBe('qr-code-root');
  expect(frameRef).toBe(frame);
  expect(frame.getAttribute('data-part')).toBe('frame');
  expect(frame.getAttribute('data-slot')).toBe('qr-code-frame');
  expect(patternRef).toBe(pattern);
  expect(pattern.getAttribute('data-part')).toBe('pattern');
  expect(pattern.getAttribute('data-slot')).toBe('qr-code-pattern');
  expect(screen.getByText('MX')!.getAttribute('data-slot')).toBe('qr-code-overlay');
  expect(trigger.getAttribute('type')).toBe('button');
  expect(trigger.getAttribute('data-slot')).toBe('qr-code-download-trigger');
});

test('forwards context value changes through Svelte callbacks and bind:value', async () => {
  const values: string[] = [];
  render(ContextQrCode, { props: { onValueChange: (details) => values.push(details.value) } });
  await page.getByRole('button', { name: 'Change context value' }).click();

  await expect
    .element(page.getByText('Parent value: https://chakra-ui.com', { exact: true }))
    .toBeVisible();
  expect(values).toEqual(['https://chakra-ui.com']);
});

test('keeps the disabled download trigger unavailable', async () => {
  render(DisabledQrCode);

  await expect.element(page.getByRole('button', { name: 'Download PNG' })).toBeDisabled();
});

test('preserves semantic root and download composition with asChild', () => {
  const { component } = render(AsChildQrCode);

  const root = screen.getByRole('region', { name: 'QR code' });
  const trigger = screen.getByRole('link', { name: 'Download SVG' });

  expect(component.getRefs().rootRef).toBe(root);
  expect(root.getAttribute('data-slot')).toBe('qr-code-root');
  expect(trigger.getAttribute('data-slot')).toBe('qr-code-download-trigger');
  expect(trigger.getAttribute('href')).toBe('#download');
});

test('supports controlled Svelte value updates', async () => {
  const { container } = render(ValueQrCode);
  const pattern = container.querySelector('[data-slot="qr-code-pattern"]')!;
  const initialPath = pattern.getAttribute('d');

  await page.getByRole('button', { name: 'Update code' }).click();

  await expect.element(page.getByText('https://moduix.dev', { exact: true })).toBeVisible();
  expect(initialPath).toBeTruthy();
  await expect
    .element(page.locator('[data-slot="qr-code-pattern"]'))
    .not.toHaveAttribute('d', initialPath!);
});

test('keeps RootProvider, Context, and useQrCodeContext on the Svelte surface', async () => {
  render(ProviderQrCode);

  const root = screen.getByTestId('qr-code-provider');

  expect(root.getAttribute('data-slot')).toBe('qr-code-root-provider');
  expect(root.getAttribute('data-scope')).toBe('qr-code');
  expect(screen.getByText('Hook: https://moduix.dev/docs/qr-code')?.isConnected).toBe(true);
  expect(screen.getByText('Context: https://moduix.dev/docs/qr-code')?.isConnected).toBe(true);

  await page.getByRole('button', { name: 'Change context value' }).click();

  await expect
    .element(page.getByText('Context: https://chakra-ui.com', { exact: true }))
    .toBeVisible();
  expect(screen.getByText('Hook: https://chakra-ui.com')?.isConnected).toBe(true);
});