import { FileUpload } from '@moduix/react/file-upload';
import styles from '@/components/examples/file-upload/file-upload-media-capture.module.css';

const capture = 'environment';
const accept = 'image/*';
const maxFiles = 1;
export default function MediaCaptureUploadDemo() {
  return (
    <FileUpload className={styles.root} accept={accept} capture={capture} maxFiles={maxFiles}>
      <FileUpload.Label>Photo</FileUpload.Label>
      <FileUpload.Dropzone disableClick>
        <FileUpload.DropzoneIcon />
        <div className={styles.dropzoneContent}>
          <span className={styles.dropzoneTitle}>Drop an image or open the camera</span>
          <span className={styles.dropzoneDescription}>One image from the environment camera</span>
          <FileUpload.Trigger>Open camera</FileUpload.Trigger>
        </div>
      </FileUpload.Dropzone>
      <FileUpload.ItemGroup>
        <FileUpload.Context>
          {({ acceptedFiles }) =>
            acceptedFiles.map((file) => (
              <FileUpload.Item key={file.name} file={file}>
                <FileUpload.ItemName />
                <FileUpload.ItemSizeText />
                <FileUpload.ItemDeleteTrigger aria-label={`Remove ${file.name}`} />
              </FileUpload.Item>
            ))
          }
        </FileUpload.Context>
      </FileUpload.ItemGroup>
    </FileUpload>
  );
}