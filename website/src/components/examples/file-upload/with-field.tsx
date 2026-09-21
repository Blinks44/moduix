import { Field, FieldErrorText, FieldHelperText } from '@moduix/react/field';
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
import styles from '@/components/examples/file-upload/file-upload-with-field.module.css';

const name = 'attachments';
const maxFiles = 3;
export default function FileUploadWithFieldDemo() {
  return (
    <Field className={styles.root} required>
      <FileUpload name={name} maxFiles={maxFiles}>
        <FileUploadLabel>Required attachments</FileUploadLabel>
        <FileUploadTrigger>Choose files</FileUploadTrigger>
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
      <FieldHelperText>Upload up to three files.</FieldHelperText>
      <FieldErrorText>Upload at least one file.</FieldErrorText>
    </Field>
  );
}
