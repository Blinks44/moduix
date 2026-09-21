import {
  FileUpload,
  FileUploadHiddenInput,
  FileUploadItemGroup,
  FileUploadItems,
  FileUploadLabel,
  FileUploadTrigger,
} from '@moduix/solid/file-upload';
import styles from '@/components/examples/file-upload/file-upload-file-previews.module.css';

const previewFiles = [
  new File(
    [
      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240"><rect width="240" height="240" fill="#dbeafe"/><circle cx="78" cy="86" r="28" fill="#60a5fa"/><path d="M0 190l68-66 45 42 35-30 92 92v12H0z" fill="#2563eb"/></svg>`,
    ],
    'workspace.svg',
    { type: 'image/svg+xml' },
  ),
  new File(['Project brief'], 'project-brief.pdf', { type: 'application/pdf' }),
];

export default function FileUploadPreviewDemo() {
  return (
    <FileUpload class={styles.root} defaultAcceptedFiles={previewFiles} maxFiles={4}>
      <FileUploadLabel>Project attachments</FileUploadLabel>
      <FileUploadTrigger>Add files</FileUploadTrigger>
      <FileUploadItemGroup>
        <FileUploadItems />
      </FileUploadItemGroup>
      <FileUploadHiddenInput />
    </FileUpload>
  );
}
