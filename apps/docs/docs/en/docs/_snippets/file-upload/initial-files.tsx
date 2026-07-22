import { FileUpload } from '@moduix/react';
import { PreviewLayout } from '@/components/examples/preview-layout';

const initialFiles = [
  new File(['Welcome to moduix'], 'README.md', {
    type: 'text/plain',
  }),
];
export default function InitialFilesUploadDemo() {
  return (
    <PreviewLayout maxWidth="24rem">
      <FileUpload className="file-upload-simple-demo" defaultAcceptedFiles={initialFiles}>
        <FileUpload.Label>Attachments</FileUpload.Label>
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
    </PreviewLayout>
  );
}