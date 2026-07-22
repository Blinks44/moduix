import { FileUpload } from '@moduix/react';
import { PreviewLayout } from '@/components/examples/preview-layout';

const accept = 'image/*';
const maxFiles = 2;
const maxFileSize = 120_000;
export default function RejectedFilesUploadDemo() {
  return (
    <PreviewLayout maxWidth="24rem">
      <FileUpload accept={accept} maxFiles={maxFiles} maxFileSize={maxFileSize}>
        <FileUpload.Label>Images</FileUpload.Label>
        <FileUpload.Dropzone disableClick>
          <FileUpload.DropzoneIcon />
          <div className="file-upload-dropzone-content">
            <span className="file-upload-dropzone-title">Drop image files here</span>
            <span className="file-upload-dropzone-description">PNG or JPEG, up to 120 KB</span>
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
        <FileUpload.ItemGroup type="rejected">
          <FileUpload.Context>
            {({ rejectedFiles }) =>
              rejectedFiles.map(({ file, errors }) => (
                <FileUpload.Item key={file.name} file={file}>
                  <FileUpload.ItemName />
                  <p className="file-upload-error">{errors.join(', ')}</p>
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