import { FileUpload } from '@moduix/react';
import { PreviewLayout } from '@/components/examples/preview-layout';

const accept = 'image/*';
async function transformFiles(files: File[]) {
  return files.map(
    (file) =>
      new File([file], file.name.toLowerCase(), {
        type: file.type,
      }),
  );
}
export default function TransformFilesUploadDemo() {
  return (
    <PreviewLayout maxWidth="24rem">
      <FileUpload
        className="file-upload-simple-demo"
        accept={accept}
        transformFiles={transformFiles}
      >
        <FileUpload.Label>Images</FileUpload.Label>
        <FileUpload.Trigger>Choose images</FileUpload.Trigger>
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