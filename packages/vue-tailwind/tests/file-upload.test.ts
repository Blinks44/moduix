import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/vue';
import { renderToString } from '@vue/server-renderer';
import { createSSRApp, defineComponent, ref } from 'vue';
import type { Component, ComponentPublicInstance } from 'vue';
import {
  FileUpload,
  FileUploadClearTrigger,
  FileUploadContext,
  FileUploadDropzone,
  FileUploadDropzoneIcon,
  FileUploadHiddenInput,
  FileUploadItem,
  FileUploadItemDeleteTrigger,
  FileUploadItemGroup,
  FileUploadItemName,
  FileUploadItems,
  FileUploadItemPreview,
  FileUploadItemPreviewIcon,
  FileUploadItemSizeText,
  FileUploadLabel,
  FileUploadRootProvider,
  FileUploadTrigger,
  useFileUpload,
} from '../src';

const file = new File(['moduix'], 'moduix.txt', { type: 'text/plain' });
const imageWithoutMimeType = new File(['moduix'], 'moduix.png');
const components = {
  FileUpload,
  FileUploadClearTrigger,
  FileUploadContext,
  FileUploadDropzone,
  FileUploadDropzoneIcon,
  FileUploadHiddenInput,
  FileUploadItem,
  FileUploadItemDeleteTrigger,
  FileUploadItemGroup,
  FileUploadItemName,
  FileUploadItems,
  FileUploadItemPreview,
  FileUploadItemPreviewIcon,
  FileUploadItemSizeText,
  FileUploadLabel,
  FileUploadRootProvider,
  FileUploadTrigger,
} as Record<string, Component>;

test('keeps the native Tailwind defaults and consumer utility precedence', () => {
  render({
    components,
    template: `
      <FileUpload class="max-w-none text-muted-foreground">
        <FileUploadLabel>Attachments</FileUploadLabel>
        <FileUploadTrigger class="bg-foreground">Choose files</FileUploadTrigger>
      </FileUpload>
    `,
  });

  const root = screen.getByText('Attachments').parentElement!;
  const trigger = screen.getByRole('button', { name: 'Choose files' });
  expect(root).toHaveClass('max-w-none', 'text-muted-foreground');
  expect(root).not.toHaveClass('max-w-md', 'text-foreground');
  expect(trigger).toHaveClass('bg-foreground');
  expect(trigger).not.toHaveClass('bg-primary');
});

test('forwards Dropzone disable-click to Ark', () => {
  render({
    components,
    template: `
      <FileUpload>
        <FileUploadDropzone disable-click data-testid="dropzone" />
      </FileUpload>
    `,
  });

  const dropzone = screen.getByTestId('dropzone');
  expect(dropzone).toHaveAttribute('role', 'application');
  expect(dropzone).not.toHaveAttribute('tabindex');
});

test('keeps the default clear label when composing the trigger with asChild', () => {
  render({
    components,
    template: `
      <FileUpload :default-accepted-files="[file]">
        <FileUploadClearTrigger as-child>
          <button data-testid="custom-clear">Clear</button>
        </FileUploadClearTrigger>
      </FileUpload>
    `,
    setup: () => ({ file }),
  });

  expect(screen.getByTestId('custom-clear')).toHaveAccessibleName('Clear files');
});

test('uses a generic preview when an image filename has no image MIME type', () => {
  render({
    components,
    template: `
      <FileUpload :default-accepted-files="[file]">
        <FileUploadLabel>Attachments</FileUploadLabel>
        <FileUploadItemGroup><FileUploadItems /></FileUploadItemGroup>
      </FileUpload>
    `,
    setup: () => ({ file: imageWithoutMimeType }),
  });

  expect(document.querySelector('[data-slot="file-upload-item-preview-image"]')).toBeNull();
  expect(document.querySelector('[data-slot="file-upload-item-preview-icon"]')).not.toBeNull();
  expect(screen.getByRole('button', { name: 'Remove moduix.png' })).toBeInTheDocument();
});

test('keeps empty visual parts visible with native utility defaults', () => {
  render({
    components,
    template: `
      <FileUpload>
        <FileUploadDropzone data-testid="dropzone"><FileUploadDropzoneIcon data-testid="dropzone-icon" /></FileUploadDropzone>
        <FileUploadItemGroup>
          <FileUploadItem :file="file">
            <FileUploadItemPreview data-testid="item-preview"><FileUploadItemPreviewIcon /></FileUploadItemPreview>
            <FileUploadItemName />
            <FileUploadItemDeleteTrigger aria-label="Remove file" />
          </FileUploadItem>
        </FileUploadItemGroup>
      </FileUpload>
    `,
    setup: () => ({ file }),
  });

  expect(screen.getByTestId('dropzone')).toHaveClass('grid', 'min-h-32', 'border-dashed', 'p-5');
  expect(screen.getByTestId('dropzone-icon')).toHaveClass('inline-flex', 'size-10', 'rounded-full');
  expect(screen.getByTestId('item-preview')).toHaveClass('inline-flex', 'size-10', 'bg-muted');
});

test('keeps Ark item name and size fallbacks when their slots are omitted', () => {
  render({
    components,
    template: `
      <FileUpload :default-accepted-files="[file]">
        <FileUploadItemGroup>
          <FileUploadItem :file="file">
            <FileUploadItemName />
            <FileUploadItemSizeText />
          </FileUploadItem>
        </FileUploadItemGroup>
      </FileUpload>
    `,
    setup: () => ({ file }),
  });

  expect(screen.getByText('moduix.txt')).toBeInTheDocument();
  expect(document.querySelector('[data-slot="file-upload-item-size-text"]')).not.toBeNull();
});

test('preserves refs, RootProvider state, and the hidden input', () => {
  const rootRef = ref<ComponentPublicInstance>();
  const ProviderUpload = defineComponent({
    components,
    setup() {
      const upload = useFileUpload({ defaultAcceptedFiles: [file] });
      return { rootRef, upload };
    },
    template: `
      <FileUploadRootProvider ref="rootRef" :value="upload" data-testid="provider">
        <FileUploadLabel>Attachments</FileUploadLabel>
        <FileUploadItemGroup><FileUploadItems /></FileUploadItemGroup>
        <FileUploadHiddenInput />
      </FileUploadRootProvider>
    `,
  });
  render(ProviderUpload);
  expect(rootRef.value?.$el).toBe(screen.getByTestId('provider'));
  expect(screen.getByText('moduix.txt')).toBeInTheDocument();
  expect(document.querySelector('input[type="file"]')).toBeInTheDocument();
});

test('hydrates the Tailwind tree without changing its anatomy', async () => {
  const Harness = defineComponent({
    components,
    setup: () => ({ file }),
    template: `<FileUpload :default-accepted-files="[file]"><FileUploadDropzone><FileUploadDropzoneIcon /></FileUploadDropzone><FileUploadItemGroup><FileUploadItems /></FileUploadItemGroup><FileUploadHiddenInput /></FileUpload>`,
  });
  const markup = await renderToString(createSSRApp(Harness));
  const host = document.createElement('div');
  host.innerHTML = markup;
  document.body.append(host);
  const app = createSSRApp(Harness);
  app.mount(host);
  expect(host.querySelector('[data-slot="file-upload-root"]')).toBeInTheDocument();
  expect(host.querySelector('[data-slot="file-upload-dropzone-icon"]')).toHaveClass('size-10');
  app.unmount();
  host.remove();
});