import { FileUpload } from '@moduix/react';
import { PreviewLayout } from '@/components/examples/preview-layout';

const maxFiles = 5;
export default function FileUploadDropzoneDemo() {
  return (
    <PreviewLayout maxWidth="24rem">
      <FileUpload maxFiles={maxFiles}>
        <FileUpload.Label>Project files</FileUpload.Label>
        <FileUpload.Dropzone disableClick>
          <FileUpload.DropzoneIcon />
          <div className="file-upload-dropzone-content">
            <span className="file-upload-dropzone-title">Drag and drop files here</span>
            <span className="file-upload-dropzone-description">or browse from your device</span>
            <FileUpload.Trigger>Browse files</FileUpload.Trigger>
          </div>
        </FileUpload.Dropzone>
        <FileUpload.ItemGroup>
          <FileUpload.Items />
        </FileUpload.ItemGroup>
      </FileUpload>
    </PreviewLayout>
  );
}