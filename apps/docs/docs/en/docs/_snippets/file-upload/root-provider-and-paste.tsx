import { FileUpload, Textarea, useFileUpload } from '@moduix/react';
import { PreviewLayout } from '@/components/examples/preview-layout';

const maxFiles = 3;
const accept = 'image/*';
export default function RootProviderPasteUploadDemo() {
  const fileUpload = useFileUpload({
    maxFiles,
    accept,
  });
  return (
    <PreviewLayout maxWidth="24rem">
      <FileUpload.RootProvider className="file-upload-simple-demo" value={fileUpload}>
        <FileUpload.Label>Images</FileUpload.Label>
        <Textarea
          placeholder="Paste an image here"
          onPaste={(event) => fileUpload.setClipboardFiles(event.clipboardData)}
        />
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
      </FileUpload.RootProvider>
    </PreviewLayout>
  );
}