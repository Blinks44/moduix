import { page } from '@rstest/browser';
import { expect, rs, test } from '@rstest/core';
import { render } from '@testing-library/svelte';
import ClearUpload from './file-upload/ClearUpload.svelte';
import ContextUpload from './file-upload/ContextUpload.svelte';
import DropzoneUpload from './file-upload/DropzoneUpload.svelte';
import ItemsUpload from './file-upload/ItemsUpload.svelte';
import NativeUpload from './file-upload/NativeUpload.svelte';
import ProviderUpload from './file-upload/ProviderUpload.svelte';
import RootAsChildUpload from './file-upload/RootAsChildUpload.svelte';
import TranslatedUpload from './file-upload/TranslatedUpload.svelte';
import UnstyledUpload from './file-upload/UnstyledUpload.svelte';

test('uses MIME type or FILE for filenames without an extension', async () => {
  const files = [
    new File(['readme'], 'README', { type: 'text/plain' }),
    new File(['license'], 'LICENSE'),
  ];
  render(ItemsUpload, { props: { files } });
  const metadata = page.locator('[data-slot="file-upload-item-metadata"]');
  await expect.element(metadata.nth(0)).toContainText('text/plain');
  await expect.element(metadata.nth(1)).toContainText('FILE');
});

test.each([false, true])(
  'forwards clear trigger attrs, refs, and Ark state with asChild=%s',
  async (asChild) => {
    const changes = rs.fn();
    const click = rs.fn();
    const { component, container, rerender } = render(ClearUpload, {
      props: { asChild, changes, click, disabled: true },
    });
    const clear = page.getByTestId('clear');
    await expect.element(clear).toBeDisabled();
    await expect.element(clear).toHaveAttribute('data-slot', 'file-upload-clear-trigger');
    await expect.element(clear).toHaveAttribute('title', 'Clear attachments');
    const trigger = container.querySelector('[data-testid="clear"]')!;
    expect(component.getState().triggerRef).toBe(trigger);
    expect([...trigger.classList]).toEqual(['consumer-clear']);
    // Deliberate dispatch verifies Ark's guard even for a programmatic disabled click.
    await clear.dispatchEvent('click');
    expect(changes).not.toHaveBeenCalled();
    await rerender({ disabled: false });
    await expect.element(clear).toBeEnabled();
    click.mockClear();
    await page.getByRole('button', { name: 'Clear files' }).click();
    await expect.poll(() => component.getState().acceptedFiles).toEqual([]);
    expect(changes).toHaveBeenCalledWith({ acceptedFiles: [], rejectedFiles: [] });
    expect(click).toHaveBeenCalledTimes(1);
    await expect.element(clear).toHaveAttribute('hidden', '');
  },
);

test('focuses the dropzone and forwards disableClick to Ark', async () => {
  const { rerender } = render(DropzoneUpload, { props: { disableClick: false } });
  const dropzone = page.getByTestId('dropzone');
  await expect.element(dropzone).toHaveAttribute('role', 'button');
  await expect.element(dropzone).toHaveAttribute('tabindex', '0');
  await dropzone.focus();
  await expect.element(dropzone).toBeFocused();
  await rerender({ disableClick: true });
  await expect.element(dropzone).toHaveAttribute('role', 'application');
  await expect.element(dropzone).not.toHaveAttribute('tabindex');
});

test('preserves native input attributes and ignores change while disabled', async () => {
  const changes: File[][] = [];
  const { component, container } = render(NativeUpload, { props: { changes } });
  const input = page.locator('input[type="file"]');
  await expect.element(input).toHaveAttribute('name', 'attachments');
  await expect.element(input).toHaveAttribute('required', '');
  await expect.element(input).toHaveAttribute('multiple', '');
  await expect.element(input).toHaveAttribute('aria-hidden', 'true');
  await expect
    .element(page.getByTestId('disabled-dropzone'))
    .toHaveAttribute('aria-disabled', 'true');
  await expect.element(page.getByRole('button', { name: 'Choose files' })).toBeDisabled();
  const transfer = new DataTransfer();
  transfer.items.add(new File(['moduix'], 'moduix.txt', { type: 'text/plain' }));
  container.querySelector<HTMLInputElement>('input[type="file"]')!.files = transfer.files;
  await input.dispatchEvent('change');
  expect(changes).toEqual([]);
  expect(component.getState().acceptedFiles).toEqual([]);
});

test('renders snippet context with omitted item name and size children', async () => {
  render(ContextUpload);
  await expect.element(page.getByText('moduix.txt', { exact: true })).toBeVisible();
  await expect
    .element(page.locator('[data-slot="file-upload-item-size-text"]'))
    .toHaveText('6 byte');
});

test('preserves Root asChild refs and an explicit hidden input', async () => {
  const { component, container } = render(RootAsChildUpload);
  await expect.element(page.getByRole('button', { name: 'Choose files' })).toBeVisible();
  const root = container.querySelector('[data-testid="custom-root"]')!;
  expect(component.getRefs().rootRef).toBe(root);
  expect(component.getRefs().triggerRef).toBe(root.querySelector('button'));
  expect(root.querySelectorAll('input[type="file"]')).toHaveLength(1);
  expect(root.getAttribute('data-slot')).toBe('file-upload-root');
});

test('lets Ark translations name the default delete trigger', async () => {
  render(TranslatedUpload);
  await expect.element(page.getByRole('button', { name: 'Delete moduix.txt' })).toBeVisible();
});

test('leaves the trigger and clear trigger unstyled for asChild composition', async () => {
  render(UnstyledUpload);
  await expect.element(page.getByRole('button', { name: 'Clear files' })).toBeVisible();
});

test('preserves provider refs, one preview per file, MIME fallback, and removal', async () => {
  const { component, container } = render(ProviderUpload);
  await expect
    .element(page.getByTestId('provider'))
    .toHaveAttribute('data-slot', 'file-upload-root-provider');
  expect(component.getRefs().rootRef).toBe(container.querySelector('[data-testid="provider"]'));
  await expect.element(page.locator('input[type="file"]')).toHaveCount(1);
  await expect.element(page.getByText('moduix.txt', { exact: true })).toBeVisible();
  await expect.element(page.locator('[data-slot="file-upload-item"]')).toHaveCount(3);
  const items = container.querySelectorAll('[data-slot="file-upload-item"]');
  for (const [index, item] of [...items].entries()) {
    expect(item.querySelectorAll('[data-slot="file-upload-item-preview"]')).toHaveLength(1);
    expect(item.querySelector('[data-slot="file-upload-item-preview-image"]') !== null).toBe(
      index === 0,
    );
    expect(item.querySelector('[data-slot="file-upload-item-preview-icon"]') !== null).toBe(
      index !== 0,
    );
  }
  const preview = items[0]!.querySelector<HTMLImageElement>('img')!;
  await expect.poll(() => preview.naturalWidth).toBe(32);
  await page.getByRole('button', { name: 'delete file moduix.png' }).click();
  await expect.element(page.getByRole('button', { name: 'delete file moduix.png' })).toHaveCount(0);
  await expect.element(page.locator('[data-slot="file-upload-item"]')).toHaveCount(2);
});