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
  FileUploadTrigger,
} from '@/index';

const file = new File(['moduix'], 'moduix.txt', { type: 'text/plain' });

test('uses MIME type or FILE for filenames without an extension', async () => {
  const files = [
    new File(['readme'], 'README', { type: 'text/plain' }),
    new File(['license'], 'LICENSE'),
  ];
  render(
    <FileUpload defaultAcceptedFiles={files} maxFiles={2}>
      <FileUploadItemGroup>
        <FileUploadItems />
      </FileUploadItemGroup>
    </FileUpload>,
  );
  const metadata = page.locator('[data-slot="file-upload-item-metadata"]');
  await expect.element(metadata.nth(0)).toContainText('text/plain');
  await expect.element(metadata.nth(1)).toContainText('FILE');
});

test('focuses the dropzone and clears accepted files through the named action', async () => {
  render(
    <FileUpload defaultAcceptedFiles={[file]}>
      <FileUploadLabel>Attachments</FileUploadLabel>
      <FileUploadDropzone data-testid="dropzone" />
      <FileUploadItemGroup>
        <FileUploadItems />
      </FileUploadItemGroup>
      <FileUploadClearTrigger>Clear files</FileUploadClearTrigger>
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

test('lets Ark translations name the default delete trigger', async () => {
  render(
    <FileUpload
      defaultAcceptedFiles={[file]}
      translations={{ deleteFile: (item) => `Delete ${item.name}` }}
    >
      <FileUploadItemGroup>
        <FileUploadItems />
      </FileUploadItemGroup>
    </FileUpload>,
  );
  await expect.element(page.getByRole('button', { name: 'Delete moduix.txt' })).toBeVisible();
});

test('leaves the trigger and clear trigger unstyled for asChild composition', async () => {
  render(
    <FileUpload defaultAcceptedFiles={[file]}>
      <FileUploadTrigger>Choose files</FileUploadTrigger>
      <FileUploadClearTrigger>Clear files</FileUploadClearTrigger>
    </FileUpload>,
  );
  await expect.element(page.getByRole('button', { name: 'Clear files' })).toBeVisible();
});