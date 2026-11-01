import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render } from '@testing-library/vue';
import { ref } from 'vue';
import type { ComponentPublicInstance } from 'vue';
import {
  FileUpload,
  FileUploadClearTrigger,
  FileUploadContext,
  FileUploadDropzone,
  FileUploadHiddenInput,
  FileUploadItem,
  FileUploadItemGroup,
  FileUploadItemName,
  FileUploadItems,
  FileUploadItemSizeText,
  FileUploadLabel,
  FileUploadRootProvider,
  FileUploadTrigger,
  useFileUpload,
  FileUploadDropzoneIcon,
  FileUploadItemDeleteTrigger,
  FileUploadItemPreview,
  FileUploadItemPreviewIcon,
} from '@/index';

const file = new File(['moduix'], 'moduix.txt', { type: 'text/plain' });

const imageWithoutMimeType = new File(['moduix'], 'moduix.png');

const image = new File(
  [
    '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="24"><rect width="32" height="24" fill="red"/></svg>',
  ],
  'photo.svg',
  { type: 'image/svg+xml' },
);

const components = {
  FileUpload,
  FileUploadClearTrigger,
  FileUploadContext,
  FileUploadDropzone,
  FileUploadHiddenInput,
  FileUploadItem,
  FileUploadItemGroup,
  FileUploadItemName,
  FileUploadItems,
  FileUploadItemSizeText,
  FileUploadLabel,
  FileUploadRootProvider,
  FileUploadTrigger,
  FileUploadDropzoneIcon,
  FileUploadItemDeleteTrigger,
  FileUploadItemPreview,
  FileUploadItemPreviewIcon,
};

test('preserves provider refs, one preview per file, MIME fallback, and removal', async () => {
  const rootRef = ref<ComponentPublicInstance>();
  const { container } = render({
    components,
    setup: () => ({
      rootRef,
      upload: useFileUpload({
        defaultAcceptedFiles: [image, file, imageWithoutMimeType],
        maxFiles: 3,
      }),
    }),
    template: `
      <FileUploadRootProvider ref="rootRef" :value="upload" data-testid="provider">
        <FileUploadLabel>Attachments</FileUploadLabel>
        <FileUploadItemGroup><FileUploadItems /></FileUploadItemGroup>
        <FileUploadHiddenInput />
      </FileUploadRootProvider>
    `,
  });
  await expect
    .element(page.getByTestId('provider'))
    .toHaveAttribute('data-slot', 'file-upload-root-provider');
  expect(rootRef.value?.$el).toBe(container.querySelector('[data-testid="provider"]'));
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