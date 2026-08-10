import { expect, test } from '@rstest/core';
import { fireEvent, render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { FileUpload, useFileUpload } from '../src';

const file = new File(['moduix'], 'moduix.txt', { type: 'text/plain' });
const imageWithoutMimeType = new File(['moduix'], 'moduix.png');

test('renders a keyboard-focusable dropzone and a clearly named default clear action', () => {
  render(
    <FileUpload defaultAcceptedFiles={[file]}>
      <FileUpload.Label>Attachments</FileUpload.Label>
      <FileUpload.Dropzone data-testid="dropzone" />
      <FileUpload.ClearTrigger />
    </FileUpload>,
  );

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
  const { container } = render(
    <form>
      <FileUpload
        disabled
        name="attachments"
        required
        maxFiles={2}
        onFileChange={(details) => changes.push(details.acceptedFiles)}
      >
        <FileUpload.Label>Attachments</FileUpload.Label>
        <FileUpload.Dropzone data-testid="disabled-dropzone" />
        <FileUpload.Trigger>Choose files</FileUpload.Trigger>
      </FileUpload>
    </form>,
  );
  const input = container.querySelector<HTMLInputElement>('input[type="file"]');

  expect(input).not.toBeNull();
  expect(input).toHaveAttribute('name', 'attachments');
  expect(input).toBeRequired();
  expect(input).toHaveAttribute('multiple');
  expect(input).toHaveAttribute('aria-hidden', 'true');
  expect(screen.getByTestId('disabled-dropzone')).toHaveAttribute('aria-disabled', 'true');
  expect(screen.getByRole('button', { name: 'Choose files' })).toBeDisabled();

  fireEvent.change(input!, { target: { files: [file] } });

  expect(changes).toEqual([]);
});

test('preserves RootProvider state and the automatic hidden input', () => {
  function ProviderUpload() {
    const upload = useFileUpload({ defaultAcceptedFiles: [file] });

    return (
      <FileUpload.RootProvider value={upload} data-testid="provider">
        <FileUpload.Label>Attachments</FileUpload.Label>
        <FileUpload.ItemGroup>
          <FileUpload.Items />
        </FileUpload.ItemGroup>
      </FileUpload.RootProvider>
    );
  }

  render(<ProviderUpload />);

  expect(screen.getByTestId('provider')).toHaveAttribute('data-slot', 'file-upload-root-provider');
  expect(screen.getByText('moduix.txt')).toBeTruthy();
  expect(document.querySelector('input[type="file"]')).not.toBeNull();
});

test('uses a generic preview when an image filename has no image MIME type', () => {
  render(
    <FileUpload defaultAcceptedFiles={[imageWithoutMimeType]}>
      <FileUpload.Label>Attachments</FileUpload.Label>
      <FileUpload.ItemGroup>
        <FileUpload.Items />
      </FileUpload.ItemGroup>
    </FileUpload>,
  );

  expect(document.querySelector('[data-slot="file-upload-item-preview-image"]')).toBeNull();
  expect(document.querySelector('[data-slot="file-upload-item-preview-icon"]')).not.toBeNull();
  expect(screen.getByRole('button', { name: 'Remove moduix.png' })).toBeTruthy();
});

test('preserves Root asChild composition, refs, and the automatic hidden input', () => {
  const rootRef = createRef<HTMLDivElement>();
  const triggerRef = createRef<HTMLButtonElement>();

  render(
    <FileUpload asChild ref={rootRef}>
      <div data-testid="custom-root">
        <FileUpload.Label>Attachments</FileUpload.Label>
        <FileUpload.Trigger ref={triggerRef}>Choose files</FileUpload.Trigger>
      </div>
    </FileUpload>,
  );

  const root = screen.getByTestId('custom-root');

  expect(rootRef.current).toBe(root);
  expect(triggerRef.current).toBe(screen.getByRole('button', { name: 'Choose files' }));
  expect(root.querySelector('input[type="file"]')).not.toBeNull();
});