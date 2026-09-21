import {
  FileUpload,
  FileUploadContext,
  FileUploadHiddenInput,
  FileUploadItem,
  FileUploadItemDeleteTrigger,
  FileUploadItemGroup,
  FileUploadItemName,
  FileUploadLabel,
  FileUploadTrigger,
} from '@moduix/react/file-upload';
import { useState } from 'react';
import { PreviewMeta } from '@/components/mdx/Components';
import styles from '@/components/examples/file-upload/file-upload-controlled.module.css';

const initialFiles = [
  new File(['Welcome to moduix'], 'README.md', {
    type: 'text/plain',
  }),
];
export default function ControlledFileUploadDemo() {
  const [files, setFiles] = useState(initialFiles);
  return (
    <>
      <FileUpload
        className={styles.root}
        acceptedFiles={files}
        onFileChange={(details) => setFiles(details.acceptedFiles)}
      >
        <FileUploadLabel>Attachments</FileUploadLabel>
        <FileUploadTrigger>Choose files</FileUploadTrigger>
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
      </FileUpload>
      <PreviewMeta>
        <output>Selected: {files.length}</output>
      </PreviewMeta>
    </>
  );
}
