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
import styles from '@/components/examples/file-upload/file-upload-error-handling.module.css';

const accept = 'image/*';
const maxFiles = 2;
const maxFileSize = 120_000;
export default function ErrorHandlingFileUploadDemo() {
  const [message, setMessage] = useState('');
  return (
    <>
      <FileUpload
        className={styles.root}
        accept={accept}
        maxFiles={maxFiles}
        maxFileSize={maxFileSize}
        onFileReject={(details) => setMessage(`${details.files.length} file(s) rejected`)}
        onFileAccept={() => setMessage('Files accepted')}
      >
        <FileUploadLabel>Images</FileUploadLabel>
        <FileUploadTrigger>Select images</FileUploadTrigger>
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
        <FileUploadItemGroup type="rejected">
          <FileUploadContext>
            {({ rejectedFiles }) =>
              rejectedFiles.map(({ file, errors }) => (
                <FileUploadItem key={file.name} file={file}>
                  <FileUploadItemName />
                  <p className={styles.error}>{errors.join(', ')}</p>
                  <FileUploadItemDeleteTrigger aria-label={`Remove ${file.name}`} />
                </FileUploadItem>
              ))
            }
          </FileUploadContext>
        </FileUploadItemGroup>
        <FileUploadHiddenInput />
      </FileUpload>
      <PreviewMeta>
        <output>Status: {message || 'No files selected'}</output>
      </PreviewMeta>
    </>
  );
}
