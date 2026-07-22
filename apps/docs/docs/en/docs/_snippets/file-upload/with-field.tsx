import { Field, FileUpload } from '@moduix/react';
import { PreviewLayout } from '@/components/examples/preview-layout';

const name = 'attachments';
const maxFiles = 3;
export default function FileUploadWithFieldDemo() {
  return (
    <PreviewLayout maxWidth="24rem">
      <Field.Root className="file-upload-simple-demo" required>
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
    </PreviewLayout>
  );
}