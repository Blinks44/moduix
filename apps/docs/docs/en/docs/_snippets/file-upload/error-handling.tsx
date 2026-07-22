import { FileUpload } from '@moduix/react';
import { useState } from 'react';
import { PreviewLayout } from '@/components/examples/preview-layout';

const accept = 'image/*';
const maxFiles = 2;
const maxFileSize = 120_000;
export default function ErrorHandlingFileUploadDemo() {
  const [message, setMessage] = useState('');
  return (
    <PreviewLayout maxWidth="24rem">
      <div className="file-upload-stack">
        <FileUpload
          className="file-upload-simple-demo"
          accept={accept}
          maxFiles={maxFiles}
          maxFileSize={maxFileSize}
          onFileReject={(details) => setMessage(`${details.files.length} file(s) rejected`)}
          onFileAccept={() => setMessage('Files accepted')}
        >
          <FileUpload.Label>Images</FileUpload.Label>
          <FileUpload.Trigger>Select images</FileUpload.Trigger>
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
          <FileUpload.ItemGroup type="rejected">
            <FileUpload.Context>
              {({ rejectedFiles }) =>
                rejectedFiles.map(({ file, errors }) => (
                  <FileUpload.Item key={file.name} file={file}>
                    <FileUpload.ItemName />
                    <p className="file-upload-error">{errors.join(', ')}</p>
                    <FileUpload.ItemDeleteTrigger aria-label={`Remove ${file.name}`} />
                  </FileUpload.Item>
                ))
              }
            </FileUpload.Context>
          </FileUpload.ItemGroup>
        </FileUpload>
        <p className="file-upload-state">{message || 'No files selected'}</p>
      </div>
    </PreviewLayout>
  );
}