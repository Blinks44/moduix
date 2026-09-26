import {
  FileUpload,
  FileUploadContext,
  FileUploadHiddenInput,
  FileUploadItem,
  FileUploadItemDeleteTrigger,
  FileUploadItemGroup,
  FileUploadItemName,
  FileUploadLabel,
  FileUploadTrigger,
} from '@moduix/react/file-upload';
import styles from '@/components/examples/file-upload/file-upload-transform-files.module.css';

const accept = 'image/*';
async function transformFiles(files: File[]) {
  return files.map(
    (file) =>
      new File([file], file.name.toLowerCase(), {
        type: file.type,
      }),
  );
}
export default function TransformFilesUploadDemo() {
  return (
    <FileUpload className={styles.root} accept={accept} transformFiles={transformFiles}>
      <FileUploadLabel>Images</FileUploadLabel>
      <FileUploadTrigger>Choose images</FileUploadTrigger>
      <FileUploadItemGroup>
        <FileUploadContext>
          {({ acceptedFiles }) =>
            acceptedFiles.map((file) => (
              <FileUploadItem key={file.name} file={file}>
                <FileUploadItemName />
                <FileUploadItemDeleteTrigger aria-label={`Remove ${file.name}`} />
              </FileUploadItem>
            ))
          }
        </FileUploadContext>
      </FileUploadItemGroup>
      <FileUploadHiddenInput />
    </FileUpload>
  );
}