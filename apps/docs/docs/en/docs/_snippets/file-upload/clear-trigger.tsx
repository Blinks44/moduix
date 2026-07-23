import { FileUpload } from '@moduix/react';

const maxFiles = 3;
export default function ClearTriggerFileUploadDemo() {
  return (
    <FileUpload className="file-upload-simple-demo" maxFiles={maxFiles}>
      <FileUpload.Label>Attachments</FileUpload.Label>
      <div className="file-upload-actions">
        <FileUpload.Trigger>Choose files</FileUpload.Trigger>
        <FileUpload.ClearTrigger>Clear files</FileUpload.ClearTrigger>
      </div>
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