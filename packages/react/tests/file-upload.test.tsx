import { expect, test } from '@rstest/core';
import { fireEvent, render, screen } from '@testing-library/react';
import { FileUpload, useFileUpload } from '../src';

const file = new File(['moduix'], 'moduix.txt', { type: 'text/plain' });

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