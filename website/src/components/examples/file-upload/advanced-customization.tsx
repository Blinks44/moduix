import { FileUpload } from '@moduix/react/file-upload';
import styles from '@/components/examples/file-upload/file-upload-advanced-customization.module.css';

const maxFiles = 5;
const isImageFile = (file: File) => file.type.startsWith('image/');
export default function AdvancedFileUploadDemo() {
  return (
    <FileUpload className={styles.root} maxFiles={maxFiles}>
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
        <FileUpload.Context>
          {({ acceptedFiles }) =>
            acceptedFiles.map((file) => (
              <FileUpload.Item key={file.name} file={file}>
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
      </FileUpload.ItemGroup>
      <FileUpload.HiddenInput />
    </FileUpload>
  );
}