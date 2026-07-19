import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ComponentProps } from 'react';
import { useState } from 'react';
import { Field } from '../field';
import { FileUpload, useFileUpload } from './FileUpload';
import styles from './FileUpload.stories.module.css';

const meta = {
  title: 'Components/FileUpload',
  component: FileUpload,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof FileUpload>;

export default meta;

type Story = StoryObj<typeof meta>;

const initialFiles = [
  new File(['Welcome to moduix'], 'README.md', { type: 'text/plain' }),
  new File(['{}'], 'package.json', { type: 'application/json' }),
];

const isImageFile = (file: File) =>
  file.type.startsWith('image/') || /\.(avif|bmp|gif|jpe?g|png|svg|webp)$/i.test(file.name);

function FileUploadItems() {
  return (
    <FileUpload.Context>
      {({ acceptedFiles }) =>
        acceptedFiles.map((file) => (
          <FileUpload.Item key={`${file.name}-${file.size}`} file={file}>
            {isImageFile(file) ? (
              <FileUpload.ItemPreview>
                <FileUpload.ItemPreviewImage />
              </FileUpload.ItemPreview>
            ) : (
              <FileUpload.ItemPreview>
                <FileUpload.ItemPreviewIcon />
              </FileUpload.ItemPreview>
            )}
            <FileUpload.ItemName />
            <FileUpload.ItemMetadata file={file} />
            <FileUpload.ItemDeleteTrigger aria-label={`Remove ${file.name}`} />
          </FileUpload.Item>
        ))
      }
    </FileUpload.Context>
  );
}

function FileUploadDemo(props: ComponentProps<typeof FileUpload.Root>) {
  return (
    <FileUpload.Root className={styles.simpleDemo} maxFiles={3} {...props}>
      <FileUpload.Label>Attachments</FileUpload.Label>
      <FileUpload.Trigger>Choose files</FileUpload.Trigger>
      <FileUpload.ItemGroup>
        <FileUpload.Items />
      </FileUpload.ItemGroup>
    </FileUpload.Root>
  );
}

export const Basic: Story = {
  render: () => <FileUploadDemo />,
};

export const Dropzone: Story = {
  render: () => (
    <FileUpload.Root maxFiles={5}>
      <FileUpload.Label>Project files</FileUpload.Label>
      <FileUpload.Dropzone disableClick>
        <FileUpload.DropzoneIcon />
        <div className={styles.dropzoneContent}>
          <span className={styles.dropzoneTitle}>Drag and drop files here</span>
          <span className={styles.dropzoneDescription}>or browse from your device</span>
          <FileUpload.Trigger>Browse files</FileUpload.Trigger>
        </div>
      </FileUpload.Dropzone>
      <FileUpload.ItemGroup>
        <FileUploadItems />
      </FileUpload.ItemGroup>
    </FileUpload.Root>
  ),
};

export const AcceptedTypes: Story = {
  render: () => <FileUploadDemo accept="image/png,image/jpeg" maxFiles={4} />,
};

export const InitialFiles: Story = {
  render: () => <FileUploadDemo defaultAcceptedFiles={initialFiles} />,
};

export const Controlled: Story = {
  render: () => {
    const [files, setFiles] = useState<File[]>(initialFiles.slice(0, 1));

    return (
      <div className={styles.stack}>
        <FileUploadDemo
          acceptedFiles={files}
          onFileChange={(details) => setFiles(details.acceptedFiles)}
        />
        <p className={styles.state}>Selected files: {files.length}</p>
      </div>
    );
  },
};

export const RejectedFiles: Story = {
  render: () => (
    <FileUpload.Root accept="image/*" maxFiles={2} maxFileSize={120_000}>
      <FileUpload.Label>Images</FileUpload.Label>
      <FileUpload.Dropzone disableClick>
        <FileUpload.DropzoneIcon />
        <div className={styles.dropzoneContent}>
          <span className={styles.dropzoneTitle}>Drop image files here</span>
          <span className={styles.dropzoneDescription}>PNG or JPEG, up to 120 KB</span>
          <FileUpload.Trigger>Select images</FileUpload.Trigger>
        </div>
      </FileUpload.Dropzone>
      <FileUpload.ItemGroup>
        <FileUploadItems />
      </FileUpload.ItemGroup>
      <FileUpload.ItemGroup type="rejected">
        <FileUpload.Context>
          {({ rejectedFiles }) =>
            rejectedFiles.map(({ file, errors }) => (
              <FileUpload.Item key={`${file.name}-${file.size}`} file={file}>
                <FileUpload.ItemPreview type=".*">
                  <FileUpload.ItemPreviewIcon />
                </FileUpload.ItemPreview>
                <div>
                  <FileUpload.ItemName />
                  <p className={styles.errorText}>{errors.join(', ')}</p>
                </div>
                <FileUpload.ItemDeleteTrigger aria-label={`Remove ${file.name}`} />
              </FileUpload.Item>
            ))
          }
        </FileUpload.Context>
      </FileUpload.ItemGroup>
    </FileUpload.Root>
  ),
};

export const WithField: Story = {
  render: () => (
    <Field.Root required>
      <FileUpload.Root name="attachments" maxFiles={3}>
        <FileUpload.Label>Required attachments</FileUpload.Label>
        <FileUpload.Trigger>Choose files</FileUpload.Trigger>
        <FileUpload.ItemGroup>
          <FileUploadItems />
        </FileUpload.ItemGroup>
      </FileUpload.Root>
      <Field.HelperText>Upload up to three files.</Field.HelperText>
      <Field.ErrorText>Upload at least one file.</Field.ErrorText>
    </Field.Root>
  ),
};

export const RootProvider: Story = {
  render: () => {
    const fileUpload = useFileUpload({ maxFiles: 3, accept: 'image/*' });

    return (
      <FileUpload.RootProvider value={fileUpload}>
        <FileUpload.Label>Images</FileUpload.Label>
        <FileUpload.Dropzone disableClick>
          <FileUpload.DropzoneIcon />
          <div className={styles.dropzoneContent}>
            <span className={styles.dropzoneTitle}>Drop images here</span>
            <span className={styles.dropzoneDescription}>or browse from your device</span>
            <FileUpload.Trigger>Choose images</FileUpload.Trigger>
          </div>
        </FileUpload.Dropzone>
        <FileUpload.ItemGroup>
          <FileUploadItems />
        </FileUpload.ItemGroup>
      </FileUpload.RootProvider>
    );
  },
};

export const CustomStyling: Story = {
  render: () => (
    <FileUpload.Root maxFiles={2}>
      <FileUpload.Label>Brand assets</FileUpload.Label>
      <FileUpload.Dropzone className={styles.customDropzone} disableClick>
        <FileUpload.DropzoneIcon />
        <div className={styles.dropzoneContent}>
          <span className={styles.dropzoneTitle}>Drop files here</span>
          <span className={styles.dropzoneDescription}>SVG, PNG, or PDF</span>
          <FileUpload.Trigger className={styles.customTrigger}>Browse files</FileUpload.Trigger>
        </div>
      </FileUpload.Dropzone>
      <FileUpload.ItemGroup>
        <FileUploadItems />
      </FileUpload.ItemGroup>
    </FileUpload.Root>
  ),
};