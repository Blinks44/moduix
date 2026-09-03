import { For, createSignal } from 'solid-js';
import type { ComponentProps } from 'solid-js';
import type { Meta, StoryObj } from 'storybook-solidjs-vite';
import { Field } from '@/components/field';
import { FileUpload, useFileUpload } from '@/components/file-upload/FileUpload';
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

function FileUploadItems() {
  return (
    <FileUpload.Context>
      {(context) => (
        <For each={context().acceptedFiles}>
          {(file) => (
            <FileUpload.Item file={file}>
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
          )}
        </For>
      )}
    </FileUpload.Context>
  );
}

function FileUploadDemo(props: ComponentProps<typeof FileUpload.Root>) {
  return (
    <FileUpload class={styles.simpleDemo} maxFiles={3} {...props}>
      <FileUpload.Label>Attachments</FileUpload.Label>
      <FileUpload.Trigger>Choose files</FileUpload.Trigger>
      <FileUpload.ItemGroup>
        <FileUpload.Items />
      </FileUpload.ItemGroup>
    </FileUpload>
  );
}

export const Basic: Story = {
  render: () => <FileUploadDemo />,
};

export const Dropzone: Story = {
  render: () => (
    <FileUpload maxFiles={5}>
      <FileUpload.Label>Project files</FileUpload.Label>
      <FileUpload.Dropzone disableClick>
        <FileUpload.DropzoneIcon />
        <div class={styles.dropzoneContent}>
          <span class={styles.dropzoneTitle}>Drag and drop files here</span>
          <span class={styles.dropzoneDescription}>or browse from your device</span>
          <FileUpload.Trigger>Browse files</FileUpload.Trigger>
        </div>
      </FileUpload.Dropzone>
      <FileUpload.ItemGroup>
        <FileUploadItems />
      </FileUpload.ItemGroup>
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
      <FileUpload.Label>Images</FileUpload.Label>
      <FileUpload.Dropzone disableClick>
        <FileUpload.DropzoneIcon />
        <div class={styles.dropzoneContent}>
          <span class={styles.dropzoneTitle}>Drop image files here</span>
          <span class={styles.dropzoneDescription}>PNG or JPEG, up to 120 KB</span>
          <FileUpload.Trigger>Select images</FileUpload.Trigger>
        </div>
      </FileUpload.Dropzone>
      <FileUpload.ItemGroup>
        <FileUploadItems />
      </FileUpload.ItemGroup>
      <FileUpload.ItemGroup type="rejected">
        <FileUpload.Context>
          {(context) => (
            <For each={context().rejectedFiles}>
              {(rejection) => (
                <FileUpload.Item file={rejection.file}>
                  <FileUpload.ItemPreview type=".*">
                    <FileUpload.ItemPreviewIcon />
                  </FileUpload.ItemPreview>
                  <div>
                    <FileUpload.ItemName />
                    <p class={styles.errorText}>{rejection.errors.join(', ')}</p>
                  </div>
                  <FileUpload.ItemDeleteTrigger aria-label={`Remove ${rejection.file.name}`} />
                </FileUpload.Item>
              )}
            </For>
          )}
        </FileUpload.Context>
      </FileUpload.ItemGroup>
    </FileUpload>
  ),
};

export const WithField: Story = {
  render: () => (
    <Field.Root required>
      <FileUpload name="attachments" maxFiles={3}>
        <FileUpload.Label>Required attachments</FileUpload.Label>
        <FileUpload.Trigger>Choose files</FileUpload.Trigger>
        <FileUpload.ItemGroup>
          <FileUploadItems />
        </FileUpload.ItemGroup>
      </FileUpload>
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
          <div class={styles.dropzoneContent}>
            <span class={styles.dropzoneTitle}>Drop images here</span>
            <span class={styles.dropzoneDescription}>or browse from your device</span>
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
    <FileUpload maxFiles={2}>
      <FileUpload.Label>Brand assets</FileUpload.Label>
      <FileUpload.Dropzone class={styles.customDropzone} disableClick>
        <FileUpload.DropzoneIcon />
        <div class={styles.dropzoneContent}>
          <span class={styles.dropzoneTitle}>Drop files here</span>
          <span class={styles.dropzoneDescription}>SVG, PNG, or PDF</span>
          <FileUpload.Trigger class={styles.customTrigger}>Browse files</FileUpload.Trigger>
        </div>
      </FileUpload.Dropzone>
      <FileUpload.ItemGroup>
        <FileUploadItems />
      </FileUpload.ItemGroup>
    </FileUpload>
  ),
};