import { For, createSignal } from 'solid-js';
import type { ComponentProps } from 'solid-js';
import type { Meta, StoryObj } from 'storybook-solidjs-vite';
import { Field, FieldErrorText, FieldHelperText } from '@/components/field';
import {
  FileUpload,
  useFileUpload,
  FileUploadContext,
  FileUploadDropzone,
  FileUploadDropzoneIcon,
  FileUploadHiddenInput,
  FileUploadItem,
  FileUploadItemDeleteTrigger,
  FileUploadItemGroup,
  FileUploadItemMetadata,
  FileUploadItemName,
  FileUploadItems,
  FileUploadItemPreview,
  FileUploadItemPreviewIcon,
  FileUploadItemPreviewImage,
  FileUploadLabel,
  FileUploadRootProvider,
  FileUploadTrigger,
} from '@/components/file-upload/FileUpload';
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

const isImageFile = (file: File) => file.type.startsWith('image/');

function FileUploadItemList() {
  return (
    <FileUploadContext>
      {(context) => (
        <For each={context().acceptedFiles}>
          {(file) => (
            <FileUploadItem file={file}>
              {isImageFile(file) ? (
                <FileUploadItemPreview>
                  <FileUploadItemPreviewImage />
                </FileUploadItemPreview>
              ) : (
                <FileUploadItemPreview>
                  <FileUploadItemPreviewIcon />
                </FileUploadItemPreview>
              )}
              <FileUploadItemName />
              <FileUploadItemMetadata file={file} />
              <FileUploadItemDeleteTrigger aria-label={`Remove ${file.name}`} />
            </FileUploadItem>
          )}
        </For>
      )}
    </FileUploadContext>
  );
}

function FileUploadDemo(props: ComponentProps<typeof FileUpload>) {
  return (
    <FileUpload class={styles.simpleDemo} maxFiles={3} {...props}>
      <FileUploadLabel>Attachments</FileUploadLabel>
      <FileUploadTrigger>Choose files</FileUploadTrigger>
      <FileUploadItemGroup>
        <FileUploadItems />
      </FileUploadItemGroup>
      <FileUploadHiddenInput />
    </FileUpload>
  );
}

export const Basic: Story = {
  render: () => <FileUploadDemo />,
};

export const Dropzone: Story = {
  render: () => (
    <FileUpload maxFiles={5}>
      <FileUploadLabel>Project files</FileUploadLabel>
      <FileUploadHiddenInput />
      <FileUploadDropzone disableClick>
        <FileUploadDropzoneIcon />
        <div class={styles.dropzoneContent}>
          <span class={styles.dropzoneTitle}>Drag and drop files here</span>
          <span class={styles.dropzoneDescription}>or browse from your device</span>
          <FileUploadTrigger>Browse files</FileUploadTrigger>
        </div>
      </FileUploadDropzone>
      <FileUploadItemGroup>
        <FileUploadItemList />
      </FileUploadItemGroup>
    </FileUpload>
  ),
};

export const AcceptedTypes: Story = {
  render: () => <FileUploadDemo accept="image/png,image/jpeg" maxFiles={4} />,
};

export const InitialFiles: Story = {
  render: () => <FileUploadDemo defaultAcceptedFiles={initialFiles} />,
};

export const MissingImageMimeType: Story = {
  render: () => <FileUploadDemo defaultAcceptedFiles={[new File([''], 'diagram.png')]} />,
};

export const Controlled: Story = {
  render: () => {
    const [files, setFiles] = createSignal<File[]>(initialFiles.slice(0, 1));

    return (
      <div class={styles.stack}>
        <FileUploadDemo
          acceptedFiles={files()}
          onFileChange={(details) => setFiles(details.acceptedFiles)}
        />
        <p class={styles.state}>Selected files: {files().length}</p>
      </div>
    );
  },
};

export const RejectedFiles: Story = {
  render: () => (
    <FileUpload accept="image/*" maxFiles={2} maxFileSize={120_000}>
      <FileUploadLabel>Images</FileUploadLabel>
      <FileUploadHiddenInput />
      <FileUploadDropzone disableClick>
        <FileUploadDropzoneIcon />
        <div class={styles.dropzoneContent}>
          <span class={styles.dropzoneTitle}>Drop image files here</span>
          <span class={styles.dropzoneDescription}>PNG or JPEG, up to 120 KB</span>
          <FileUploadTrigger>Select images</FileUploadTrigger>
        </div>
      </FileUploadDropzone>
      <FileUploadItemGroup>
        <FileUploadItemList />
      </FileUploadItemGroup>
      <FileUploadItemGroup type="rejected">
        <FileUploadContext>
          {(context) => (
            <For each={context().rejectedFiles}>
              {(rejection) => (
                <FileUploadItem file={rejection.file}>
                  <FileUploadItemPreview type=".*">
                    <FileUploadItemPreviewIcon />
                  </FileUploadItemPreview>
                  <div>
                    <FileUploadItemName />
                    <p class={styles.errorText}>{rejection.errors.join(', ')}</p>
                  </div>
                  <FileUploadItemDeleteTrigger aria-label={`Remove ${rejection.file.name}`} />
                </FileUploadItem>
              )}
            </For>
          )}
        </FileUploadContext>
      </FileUploadItemGroup>
    </FileUpload>
  ),
};

export const WithField: Story = {
  render: () => (
    <Field required>
      <FileUpload name="attachments" maxFiles={3}>
        <FileUploadLabel>Required attachments</FileUploadLabel>
        <FileUploadHiddenInput />
        <FileUploadTrigger>Choose files</FileUploadTrigger>
        <FileUploadItemGroup>
          <FileUploadItemList />
        </FileUploadItemGroup>
      </FileUpload>
      <FieldHelperText>Upload up to three files.</FieldHelperText>
      <FieldErrorText>Upload at least one file.</FieldErrorText>
    </Field>
  ),
};

export const RootProvider: Story = {
  render: () => {
    const fileUpload = useFileUpload({ maxFiles: 3, accept: 'image/*' });

    return (
      <FileUploadRootProvider value={fileUpload}>
        <FileUploadLabel>Images</FileUploadLabel>
        <FileUploadHiddenInput />
        <FileUploadDropzone disableClick>
          <FileUploadDropzoneIcon />
          <div class={styles.dropzoneContent}>
            <span class={styles.dropzoneTitle}>Drop images here</span>
            <span class={styles.dropzoneDescription}>or browse from your device</span>
            <FileUploadTrigger>Choose images</FileUploadTrigger>
          </div>
        </FileUploadDropzone>
        <FileUploadItemGroup>
          <FileUploadItemList />
        </FileUploadItemGroup>
      </FileUploadRootProvider>
    );
  },
};

export const CustomStyling: Story = {
  render: () => (
    <FileUpload maxFiles={2}>
      <FileUploadLabel>Brand assets</FileUploadLabel>
      <FileUploadHiddenInput />
      <FileUploadDropzone class={styles.customDropzone} disableClick>
        <FileUploadDropzoneIcon />
        <div class={styles.dropzoneContent}>
          <span class={styles.dropzoneTitle}>Drop files here</span>
          <span class={styles.dropzoneDescription}>SVG, PNG, or PDF</span>
          <FileUploadTrigger class={styles.customTrigger}>Browse files</FileUploadTrigger>
        </div>
      </FileUploadDropzone>
      <FileUploadItemGroup>
        <FileUploadItemList />
      </FileUploadItemGroup>
    </FileUpload>
  ),
};
