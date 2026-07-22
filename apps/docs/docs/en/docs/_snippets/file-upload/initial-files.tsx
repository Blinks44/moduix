import { FileUpload } from '@moduix/react';

const initialFiles = [
  new File(['Welcome to moduix'], 'README.md', {
    type: 'text/plain',
  }),
];
export default function InitialFilesUploadDemo() {
  return (
    <FileUpload
      className="file-upload-demo file-upload-simple-demo"
      defaultAcceptedFiles={initialFiles}
    >
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
  );
}