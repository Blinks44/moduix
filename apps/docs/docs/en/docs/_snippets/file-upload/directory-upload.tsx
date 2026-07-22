import { FileUpload } from '@moduix/react';
import { PreviewLayout } from '@/components/examples/preview-layout';

const maxFiles = 20;
export default function DirectoryUploadDemo() {
  return (
    <PreviewLayout maxWidth="24rem">
      <FileUpload className="file-upload-simple-demo" directory maxFiles={maxFiles}>
        <FileUpload.Label>Folder</FileUpload.Label>
        <FileUpload.Trigger>Choose folder</FileUpload.Trigger>
        <FileUpload.ItemGroup>
          <FileUpload.Context>
            {({ acceptedFiles }) =>
              acceptedFiles.map((file) => (
                <FileUpload.Item key={file.name} file={file}>
                  <FileUpload.ItemName>{file.webkitRelativePath || file.name}</FileUpload.ItemName>
                  <FileUpload.ItemSizeText />
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