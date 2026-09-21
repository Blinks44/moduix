import { expect, test } from '@rstest/core';
import { fireEvent, render, screen } from '@solidjs/testing-library';
import {
  FileUpload,
  useFileUpload,
  FileUploadClearTrigger,
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
  FileUploadLabel,
  FileUploadRootProvider,
  FileUploadTrigger,
} from '../src';

const file = new File(['moduix'], 'moduix.txt', { type: 'text/plain' });
const imageWithoutMimeType = new File(['moduix'], 'moduix.png');

test('renders a keyboard-focusable dropzone and a clearly named default clear action', () => {
  render(() => (
    <FileUpload defaultAcceptedFiles={[file]}>
      <FileUploadLabel>Attachments</FileUploadLabel>
      <FileUploadDropzone data-testid="dropzone" />
      <FileUploadClearTrigger />
    </FileUpload>
  ));

  const dropzone = screen.getByTestId('dropzone');

  dropzone.focus();

  expect(dropzone).toHaveAttribute('role', 'button');
  expect(dropzone).toHaveAttribute('tabindex', '0');
  expect(dropzone).toHaveFocus();
  expect(screen.getByRole('button', { name: 'Clear files' })).toHaveAttribute(
    'data-slot',
    'file-upload-clear-trigger',
  );
});

test('keeps native form, disabled, and controlled file-change contracts intact', () => {
  const changes: File[][] = [];
  const { container } = render(() => (
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
    </form>
  ));
  const input = container.querySelector<HTMLInputElement>('input[type="file"]');

  expect(input).not.toBeNull();
  expect(input).toHaveAttribute('name', 'attachments');
  expect(input).toBeRequired();
  expect(input).toHaveAttribute('multiple');
  expect(input).toHaveAttribute('aria-hidden', 'true');
  expect(screen.getByTestId('disabled-dropzone')).toHaveAttribute('aria-disabled', 'true');
  const trigger = screen.getByRole('button', { name: 'Choose files' });
  expect(trigger).toHaveClass('text-primary-foreground');
  expect(trigger).toBeDisabled();

  fireEvent.change(input!, { target: { files: [file] } });

  expect(changes).toEqual([]);
});

test('preserves RootProvider state with an explicit hidden input', () => {
  function ProviderUpload() {
    const upload = useFileUpload({ defaultAcceptedFiles: [file] });

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

  render(() => <ProviderUpload />);

  expect(screen.getByTestId('provider')).toHaveAttribute('data-slot', 'file-upload-root-provider');
  expect(screen.getByText('moduix.txt')).toBeTruthy();
  expect(document.querySelector('input[type="file"]')).not.toBeNull();
});

test('uses a generic preview when an image filename has no image MIME type', () => {
  render(() => (
    <FileUpload defaultAcceptedFiles={[imageWithoutMimeType]}>
      <FileUploadLabel>Attachments</FileUploadLabel>
      <FileUploadItemGroup>
        <FileUploadItems />
      </FileUploadItemGroup>
    </FileUpload>
  ));

  expect(document.querySelector('[data-slot="file-upload-item-preview-image"]')).toBeNull();
  expect(document.querySelector('[data-slot="file-upload-item-preview-icon"]')).not.toBeNull();
  expect(screen.getByRole('button', { name: 'Remove moduix.png' })).toBeTruthy();
});

test('preserves Root asChild composition and an explicit hidden input', () => {
  let rootRef: HTMLDivElement | undefined;
  let triggerRef!: HTMLButtonElement;

  render(() => (
    <FileUpload
      asChild={(props) => <div {...props()} data-testid="custom-root" />}
      ref={(element) => (rootRef = element)}
    >
      <FileUploadLabel>Attachments</FileUploadLabel>
      <FileUploadTrigger ref={(element) => (triggerRef = element)}>
        Choose files
      </FileUploadTrigger>
      <FileUploadHiddenInput />
    </FileUpload>
  ));

  const root = screen.getByTestId('custom-root');

  expect(rootRef).toBeUndefined();
  expect(triggerRef).toBe(screen.getByRole('button', { name: 'Choose files' }));
  expect(root.querySelector('input[type="file"]')).not.toBeNull();
});

test('lets consumer utilities replace conflicting defaults', () => {
  render(() => (
    <FileUpload class="max-w-none text-muted-foreground">
      <FileUploadLabel>Attachments</FileUploadLabel>
      <FileUploadTrigger class="bg-foreground">Choose files</FileUploadTrigger>
    </FileUpload>
  ));

  const root = screen.getByText('Attachments').parentElement!;
  const trigger = screen.getByRole('button', { name: 'Choose files' });

  expect(root).toHaveClass('max-w-none', 'text-muted-foreground');
  expect(root).not.toHaveClass('max-w-md', 'text-foreground');
  expect(trigger).toHaveClass('bg-foreground');
  expect(trigger).not.toHaveClass('bg-primary');
});

test('keeps empty visual parts visible with native utility defaults', () => {
  render(() => (
    <FileUpload>
      <FileUploadDropzone data-testid="dropzone">
        <FileUploadDropzoneIcon data-testid="dropzone-icon" />
      </FileUploadDropzone>
      <FileUploadItemGroup>
        <FileUploadItem file={file}>
          <FileUploadItemPreview data-testid="item-preview">
            <FileUploadItemPreviewIcon />
          </FileUploadItemPreview>
          <FileUploadItemName />
          <FileUploadItemDeleteTrigger aria-label="Remove file" />
        </FileUploadItem>
      </FileUploadItemGroup>
    </FileUpload>
  ));

  expect(screen.getByTestId('dropzone')).toHaveClass('grid', 'min-h-32', 'border-dashed', 'p-5');
  expect(screen.getByTestId('dropzone-icon')).toHaveClass('inline-flex', 'size-10', 'rounded-full');
  expect(screen.getByTestId('item-preview')).toHaveClass('inline-flex', 'size-10', 'bg-muted');
});
