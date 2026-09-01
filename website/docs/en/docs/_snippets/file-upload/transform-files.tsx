import { FileUpload } from '@moduix/react/file-upload';
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
      <FileUpload.Label>Images</FileUpload.Label>
      <FileUpload.Trigger>Choose images</FileUpload.Trigger>
      <FileUpload.ItemGroup>
        <FileUpload.Context>
          {({ acceptedFiles }) =>
            acceptedFiles.map((file) => (
              <FileUpload.Item key={file.name} file={file}>
                <FileUpload.ItemName />
                <FileUpload.ItemDeleteTrigger aria-label={`Remove ${file.name}`} />
              </FileUpload.Item>
            ))
          }
        </FileUpload.Context>
      </FileUpload.ItemGroup>
    </FileUpload>
  );
}