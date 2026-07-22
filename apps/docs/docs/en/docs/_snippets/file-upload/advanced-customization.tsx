import { FileUpload } from '@moduix/react';
import { PreviewLayout } from '@/components/examples/preview-layout';

const maxFiles = 5;
const isImageFile = (file: File) =>
  file.type.startsWith('image/') || /\.(avif|bmp|gif|jpe?g|png|svg|webp)$/i.test(file.name);
export default function AdvancedFileUploadDemo() {
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
          <FileUpload.Context>
            {({ acceptedFiles }) =>
              acceptedFiles.map((file) => (
                <FileUpload.Item key={file.name} file={file}>
                  {isImageFile(file) ? (
                    <FileUpload.ItemPreview>
                      <FileUpload.ItemPreviewImage />
                    </FileUpload.ItemPreview>
                  ) : (
                    <FileUpload.ItemPreview>
                      <FileUpload.ItemPreviewIcon />
                    </FileUpload.ItemPreview>
                  )}
                  <FileUpload.ItemName />
                  <FileUpload.ItemMetadata file={file} />
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