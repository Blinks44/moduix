import { FileUpload } from '@moduix/react';

const accept = 'image/png,image/jpeg';
const maxFiles = 4;
export default function AcceptedTypesFileUploadDemo() {
  return (
    <FileUpload className="file-upload-demo" accept={accept} maxFiles={maxFiles}>
      <FileUpload.Label>Images</FileUpload.Label>
      <FileUpload.Dropzone disableClick>
        <FileUpload.DropzoneIcon />
        <div className="file-upload-dropzone-content">
          <span className="file-upload-dropzone-title">Drop PNG or JPEG files here</span>
          <span className="file-upload-dropzone-description">
            Only PNG and JPEG files are accepted
          </span>
          <FileUpload.Trigger>Select images</FileUpload.Trigger>
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