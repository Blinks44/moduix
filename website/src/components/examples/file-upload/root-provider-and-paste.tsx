import {
  useFileUpload,
  FileUploadContext,
  FileUploadHiddenInput,
  FileUploadItem,
  FileUploadItemDeleteTrigger,
  FileUploadItemGroup,
  FileUploadItemName,
  FileUploadLabel,
  FileUploadRootProvider,
} from '@moduix/react/file-upload';
import { Textarea } from '@moduix/react/textarea';
import styles from '@/components/examples/file-upload/file-upload-root-provider-and-paste.module.css';

const maxFiles = 3;
const accept = 'image/*';
export default function RootProviderPasteUploadDemo() {
  const fileUpload = useFileUpload({
    maxFiles,
    accept,
  });
  return (
    <FileUploadRootProvider className={styles.root} value={fileUpload}>
      <FileUploadLabel>Images</FileUploadLabel>
      <Textarea
        placeholder="Paste an image here"
        onPaste={(event) => fileUpload.setClipboardFiles(event.clipboardData)}
      />
      <FileUploadItemGroup>
        <FileUploadContext>
          {({ acceptedFiles }) =>
            acceptedFiles.map((file) => (
              <FileUploadItem key={file.name} file={file}>
                <FileUploadItemName />
                <FileUploadItemDeleteTrigger aria-label={`Remove ${file.name}`} />
              </FileUploadItem>
            ))
          }
        </FileUploadContext>
      </FileUploadItemGroup>
      <FileUploadHiddenInput />
    </FileUploadRootProvider>
  );
}
