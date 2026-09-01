import { Field } from '@moduix/react/field';
import { FileUpload } from '@moduix/react/file-upload';
import styles from '@/components/examples/file-upload/file-upload-with-field.module.css';

const name = 'attachments';
const maxFiles = 3;
export default function FileUploadWithFieldDemo() {
  return (
    <Field.Root className={styles.root} required>
      <FileUpload name={name} maxFiles={maxFiles}>
        <FileUpload.Label>Required attachments</FileUpload.Label>
        <FileUpload.Trigger>Choose files</FileUpload.Trigger>
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
      <Field.HelperText>Upload up to three files.</Field.HelperText>
      <Field.ErrorText>Upload at least one file.</Field.ErrorText>
    </Field.Root>
  );
}