import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { defineComponent, ref, type Component, type PropType } from 'vue';
import { Field, FieldErrorText, FieldHelperText } from '@/components/field';
import {
  FileUpload,
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
  useFileUpload,
} from '@/components/file-upload';
import styles from './FileUpload.stories.module.css';

const meta = {
  title: 'Components/FileUpload',
  component: FileUpload,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
} satisfies Meta<typeof FileUpload>;

export default meta;
type Story = StoryObj<typeof meta>;

const initialFiles = [
  new File(['Welcome to moduix'], 'README.md', { type: 'text/plain' }),
  new File(['{}'], 'package.json', { type: 'application/json' }),
  new File(
    [
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 160"><rect width="160" height="160" fill="#93c5fd"/><circle cx="120" cy="40" r="18" fill="#fcd34d"/><path d="M0 160 60 60 160 160" fill="#166534"/></svg>',
    ],
    'landscape.svg',
    { type: 'image/svg+xml' },
  ),
];
const missingImageMimeTypeFile = new File([''], 'diagram.png');

const components = {
  Field,
  FieldErrorText,
  FieldHelperText,
  FileUpload,
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
} as Record<string, Component>;

const FileUploadItemList = defineComponent({
  components,
  template: `
    <FileUploadContext v-slot="{ acceptedFiles }">
      <FileUploadItem v-for="file in acceptedFiles" :key="file.name + file.size" :file="file">
        <FileUploadItemPreview>
          <FileUploadItemPreviewImage v-if="file.type.startsWith('image/')" />
          <FileUploadItemPreviewIcon v-else />
        </FileUploadItemPreview>
        <FileUploadItemName />
        <FileUploadItemMetadata :file="file" />
        <FileUploadItemDeleteTrigger :aria-label="'Remove ' + file.name" />
      </FileUploadItem>
    </FileUploadContext>
  `,
});

const FileUploadDemo = defineComponent({
  components: {
    FileUpload,
    FileUploadHiddenInput,
    FileUploadItemGroup,
    FileUploadItems,
    FileUploadLabel,
    FileUploadTrigger,
  } as Record<string, Component>,
  props: {
    accept: { type: String, default: undefined },
    acceptedFiles: { type: Array as PropType<File[]>, default: undefined },
    defaultAcceptedFiles: { type: Array as PropType<File[]>, default: undefined },
    maxFiles: { type: Number, default: 3 },
  },
  setup: () => ({ styles }),
  template: `
    <FileUpload :class="styles.simpleDemo" :accept="accept" :accepted-files="acceptedFiles" :default-accepted-files="defaultAcceptedFiles" :max-files="maxFiles">
      <FileUploadLabel>Attachments</FileUploadLabel>
      <FileUploadTrigger>Choose files</FileUploadTrigger>
      <FileUploadItemGroup><FileUploadItems /></FileUploadItemGroup>
      <FileUploadHiddenInput />
    </FileUpload>
  `,
});

const storyComponents = { ...components, FileUploadDemo, FileUploadItemList };

function renderStory(template: string, setup?: () => Record<string, unknown>) {
  return () =>
    defineComponent({
      components: storyComponents,
      setup() {
        return { initialFiles, missingImageMimeTypeFile, styles, ...setup?.() };
      },
      template,
    });
}

export const Basic: Story = { render: renderStory('<FileUploadDemo />') };

export const Dropzone: Story = {
  render: renderStory(`
    <FileUpload :max-files="5">
      <FileUploadLabel>Project files</FileUploadLabel>
      <FileUploadHiddenInput />
      <FileUploadDropzone disable-click>
        <FileUploadDropzoneIcon />
        <div :class="styles.dropzoneContent">
          <span :class="styles.dropzoneTitle">Drag and drop files here</span>
          <span :class="styles.dropzoneDescription">or browse from your device</span>
          <FileUploadTrigger>Browse files</FileUploadTrigger>
        </div>
      </FileUploadDropzone>
      <FileUploadItemGroup><FileUploadItemList /></FileUploadItemGroup>
    </FileUpload>
  `),
};

export const AcceptedTypes: Story = {
  render: renderStory('<FileUploadDemo accept="image/png,image/jpeg" :max-files="4" />'),
};
export const InitialFiles: Story = {
  render: renderStory('<FileUploadDemo :default-accepted-files="initialFiles" />'),
};
export const MissingImageMimeType: Story = {
  render: renderStory('<FileUploadDemo :default-accepted-files="[missingImageMimeTypeFile]" />'),
};

export const Controlled: Story = {
  render: renderStory(
    `<div :class="styles.stack"><FileUploadDemo :accepted-files="files" @file-change="files = $event.acceptedFiles" /><p :class="styles.state">Selected files: {{ files.length }}</p></div>`,
    () => ({ files: ref(initialFiles.slice(0, 1)) }),
  ),
};

export const RejectedFiles: Story = {
  render: renderStory(`
    <FileUpload accept="image/*" :max-files="2" :max-file-size="120000">
      <FileUploadLabel>Images</FileUploadLabel>
      <FileUploadHiddenInput />
      <FileUploadDropzone disable-click>
        <FileUploadDropzoneIcon />
        <div :class="styles.dropzoneContent">
          <span :class="styles.dropzoneTitle">Drop image files here</span>
          <span :class="styles.dropzoneDescription">PNG or JPEG, up to 120 KB</span>
          <FileUploadTrigger>Select images</FileUploadTrigger>
        </div>
      </FileUploadDropzone>
      <FileUploadItemGroup><FileUploadItemList /></FileUploadItemGroup>
      <FileUploadItemGroup type="rejected">
        <FileUploadContext v-slot="{ rejectedFiles }">
          <FileUploadItem v-for="{ file, errors } in rejectedFiles" :key="file.name + file.size" :file="file">
            <FileUploadItemPreview type=".*"><FileUploadItemPreviewIcon /></FileUploadItemPreview>
            <div><FileUploadItemName /><p :class="styles.errorText">{{ errors.join(', ') }}</p></div>
            <FileUploadItemDeleteTrigger :aria-label="'Remove ' + file.name" />
          </FileUploadItem>
        </FileUploadContext>
      </FileUploadItemGroup>
    </FileUpload>
  `),
};

export const WithField: Story = {
  render: renderStory(`
    <Field required>
      <FileUpload name="attachments" :max-files="3">
        <FileUploadLabel>Required attachments</FileUploadLabel>
        <FileUploadHiddenInput />
        <FileUploadTrigger>Choose files</FileUploadTrigger>
        <FileUploadItemGroup><FileUploadItemList /></FileUploadItemGroup>
      </FileUpload>
      <FieldHelperText>Upload up to three files.</FieldHelperText>
      <FieldErrorText>Upload at least one file.</FieldErrorText>
    </Field>
  `),
};

export const RootProvider: Story = {
  render: renderStory(
    `
    <FileUploadRootProvider :value="fileUpload">
      <FileUploadLabel>Images</FileUploadLabel>
      <FileUploadHiddenInput />
      <FileUploadDropzone disable-click>
        <FileUploadDropzoneIcon />
        <div :class="styles.dropzoneContent">
          <span :class="styles.dropzoneTitle">Drop images here</span>
          <span :class="styles.dropzoneDescription">or browse from your device</span>
          <FileUploadTrigger>Choose images</FileUploadTrigger>
        </div>
      </FileUploadDropzone>
      <FileUploadItemGroup><FileUploadItemList /></FileUploadItemGroup>
    </FileUploadRootProvider>
  `,
    () => ({ fileUpload: useFileUpload({ maxFiles: 3, accept: 'image/*' }) }),
  ),
};

export const CustomStyling: Story = {
  render: renderStory(`
    <FileUpload :max-files="2">
      <FileUploadLabel>Brand assets</FileUploadLabel>
      <FileUploadHiddenInput />
      <FileUploadDropzone :class="styles.customDropzone" disable-click>
        <FileUploadDropzoneIcon />
        <div :class="styles.dropzoneContent">
          <span :class="styles.dropzoneTitle">Drop files here</span>
          <span :class="styles.dropzoneDescription">SVG, PNG, or PDF</span>
          <FileUploadTrigger :class="styles.customTrigger">Browse files</FileUploadTrigger>
        </div>
      </FileUploadDropzone>
      <FileUploadItemGroup><FileUploadItemList /></FileUploadItemGroup>
    </FileUpload>
  `),
};