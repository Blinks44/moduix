import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render } from '@testing-library/react';
import { createRef } from 'react';
import {
  FileUpload,
  FileUploadClearTrigger,
  FileUploadDropzone,
  FileUploadHiddenInput,
  FileUploadItemGroup,
  FileUploadItems,
  FileUploadLabel,
  FileUploadRootProvider,
  FileUploadTrigger,
  useFileUpload,
} from '../src';

const file = new File(['moduix'], 'moduix.txt', { type: 'text/plain' });
const imageWithoutMimeType = new File(['moduix'], 'moduix.png');
const image = new File(
  [
    '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="24"><rect width="32" height="24" fill="red"/></svg>',
  ],
  'photo.svg',
  { type: 'image/svg+xml' },
);

test('focuses the dropzone and clears accepted files through the named action', async () => {
  render(
    <FileUpload defaultAcceptedFiles={[file]}>
      <FileUploadLabel>Attachments</FileUploadLabel>
      <FileUploadDropzone data-testid="dropzone" />
      <FileUploadItemGroup>
        <FileUploadItems />
      </FileUploadItemGroup>
      <FileUploadClearTrigger />
    </FileUpload>,
  );
  const dropzone = page.getByTestId('dropzone');
  await expect.element(dropzone).toHaveAttribute('role', 'button');
  await expect.element(dropzone).toHaveAttribute('tabindex', '0');
  await dropzone.focus();
  await expect.element(dropzone).toBeFocused();
  const clear = page.getByRole('button', { name: 'Clear files' });
  await expect.element(clear).toHaveAttribute('data-slot', 'file-upload-clear-trigger');
  await clear.click();
  await expect.element(page.getByText('moduix.txt', { exact: true })).toHaveCount(0);
  await expect
    .element(page.locator('[data-slot="file-upload-clear-trigger"]'))
    .toHaveAttribute('hidden', '');
});

test('preserves native input attributes and ignores change while disabled', async () => {
  const changes: File[][] = [];
  const { container } = render(
    <form>
      <FileUpload
        disabled
        name="attachments"
        required
        maxFiles={2}
        onFileChange={(details) => changes.push(details.acceptedFiles)}
      >
        <FileUploadLabel>Attachments</FileUploadLabel>
        <FileUploadDropzone data-testid="disabled-dropzone" />
        <FileUploadTrigger>Choose files</FileUploadTrigger>
        <FileUploadHiddenInput />
      </FileUpload>
    </form>,
  );
  const input = page.locator('input[type="file"]');
  await expect.element(input).toHaveAttribute('name', 'attachments');
  await expect.element(input).toHaveAttribute('required', '');
  await expect.element(input).toHaveAttribute('multiple', '');
  await expect.element(input).toHaveAttribute('aria-hidden', 'true');
  await expect
    .element(page.getByTestId('disabled-dropzone'))
    .toHaveAttribute('aria-disabled', 'true');
  await expect.element(page.getByRole('button', { name: 'Choose files' })).toBeDisabled();

  // Native FileList preserves the disabled change-event contract without overriding input properties.
  const transfer = new DataTransfer();
  transfer.items.add(file);
  container.querySelector<HTMLInputElement>('input[type="file"]')!.files = transfer.files;
  await input.dispatchEvent('change');
  expect(changes).toEqual([]);
});

test('preserves provider state, one preview per file, MIME fallback, and removal', async () => {
  function ProviderUpload() {
    const upload = useFileUpload({
      defaultAcceptedFiles: [image, file, imageWithoutMimeType],
      maxFiles: 3,
    });
    return (
      <FileUploadRootProvider value={upload} data-testid="provider">
        <FileUploadLabel>Attachments</FileUploadLabel>
        <FileUploadItemGroup>
          <FileUploadItems />
        </FileUploadItemGroup>
        <FileUploadHiddenInput />
      </FileUploadRootProvider>
    );
  }
  const { container } = render(<ProviderUpload />);
  await expect
    .element(page.getByTestId('provider'))
    .toHaveAttribute('data-slot', 'file-upload-root-provider');
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

  await page.getByRole('button', { name: 'Remove moduix.png' }).click();
  await expect.element(page.getByRole('button', { name: 'Remove moduix.png' })).toHaveCount(0);
  await expect.element(page.locator('[data-slot="file-upload-item"]')).toHaveCount(2);
});

test('preserves asChild composition, native refs, and an explicit hidden input', async () => {
  const rootRef = createRef<HTMLDivElement>();
  const triggerRef = createRef<HTMLButtonElement>();
  const { container } = render(
    <FileUpload asChild ref={rootRef}>
      <div data-testid="custom-root">
        <FileUploadLabel>Attachments</FileUploadLabel>
        <FileUploadTrigger ref={triggerRef}>Choose files</FileUploadTrigger>
        <FileUploadHiddenInput />
      </div>
    </FileUpload>,
  );
  await expect.element(page.getByRole('button', { name: 'Choose files' })).toBeVisible();
  const root = container.querySelector('[data-testid="custom-root"]')!;
  expect(rootRef.current).toBe(root);
  expect(triggerRef.current).toBe(root.querySelector('button'));
  expect(root.querySelectorAll('input[type="file"]')).toHaveLength(1);
});