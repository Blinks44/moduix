import { FileUpload } from '@moduix/react';
import { PreviewLayout } from '@/components/examples/preview-layout';

const maxFiles = 3;
export default function FileUploadDemo() {
  return (
    <PreviewLayout maxWidth="24rem">
      <FileUpload className="file-upload-simple-demo" maxFiles={maxFiles}>
        <FileUpload.Label>Attachments</FileUpload.Label>
        <FileUpload.Trigger>Choose files</FileUpload.Trigger>
        <FileUpload.ItemGroup>
          <FileUpload.Items />
        </FileUpload.ItemGroup>
      </FileUpload>
    </PreviewLayout>
  );
}