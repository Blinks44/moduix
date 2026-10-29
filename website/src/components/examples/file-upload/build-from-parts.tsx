import { Button } from '@moduix/react/button';
import {
  FileUpload,
  FileUploadContext,
  FileUploadHiddenInput,
  FileUploadItem,
  FileUploadItemDeleteTrigger,
  FileUploadItemGroup,
  FileUploadItemMetadata,
  FileUploadItemName,
  FileUploadItemPreview,
  FileUploadItemPreviewIcon,
  FileUploadItemPreviewImage,
  FileUploadLabel,
  FileUploadTrigger,
} from '@moduix/react/file-upload';
import { Trash2 as TrashIcon } from 'lucide-react';
import styles from '@/components/examples/file-upload/file-upload-basic.module.css';

const maxFiles = 3;
const isImageFile = (file: File) => file.type.startsWith('image/');

export default function BuildFromPartsFileUploadDemo() {
  return (
    <FileUpload className={styles.root} maxFiles={maxFiles}>
      <FileUploadLabel>Attachments</FileUploadLabel>
      <FileUploadHiddenInput />
      <FileUploadTrigger asChild>
        <Button>Choose files</Button>
      </FileUploadTrigger>
      <FileUploadItemGroup>
        <FileUploadContext>
          {({ acceptedFiles }) =>
            acceptedFiles.map((file) => (
              <FileUploadItem key={`${file.name}-${file.size}`} file={file}>
                <FileUploadItemPreview>
                  {isImageFile(file) ? (
                    <FileUploadItemPreviewImage />
                  ) : (
                    <FileUploadItemPreviewIcon />
                  )}
                </FileUploadItemPreview>
                <FileUploadItemName />
                <FileUploadItemMetadata file={file} />
                <FileUploadItemDeleteTrigger>
                  <TrashIcon />
                </FileUploadItemDeleteTrigger>
              </FileUploadItem>
            ))
          }
        </FileUploadContext>
      </FileUploadItemGroup>
    </FileUpload>
  );
}