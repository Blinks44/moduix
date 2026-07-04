/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { FileUpload as ArkFileUpload } from '@ark-ui/react/file-upload';
import { FileUpload } from '@moduix/react';
import { useState } from 'react';

const accept = 'image/*';
const maxFiles = 2;
const maxFileSize = 120_000;
export function ErrorHandlingFileUploadDemo() {
  const [message, setMessage] = useState('');
  return (
    <div className="file-upload-stack">
      <FileUpload
        className="file-upload-demo file-upload-simple-demo"
        accept={accept}
        maxFiles={maxFiles}
        maxFileSize={maxFileSize}
        onFileReject={(details) => setMessage(`${details.files.length} file(s) rejected`)}
        onFileAccept={() => setMessage('Files accepted')}
      >
        <FileUpload.Label>Images</FileUpload.Label>
        <FileUpload.Trigger>Select images</FileUpload.Trigger>
        <FileUpload.ItemGroup>
          <ArkFileUpload.Context>
            {({ acceptedFiles }) =>
              acceptedFiles.map((file) => (
                <FileUpload.Item key={file.name} file={file}>
                  <FileUpload.ItemName />
                  <FileUpload.ItemDeleteTrigger aria-label={`Remove ${file.name}`} />
                </FileUpload.Item>
              ))
            }
          </ArkFileUpload.Context>
        </FileUpload.ItemGroup>
        <FileUpload.ItemGroup type="rejected">
          <ArkFileUpload.Context>
            {({ rejectedFiles }) =>
              rejectedFiles.map(({ file, errors }) => (
                <FileUpload.Item key={file.name} file={file}>
                  <FileUpload.ItemName />
                  <p className="file-upload-error">{errors.join(', ')}</p>
                  <FileUpload.ItemDeleteTrigger aria-label={`Remove ${file.name}`} />
                </FileUpload.Item>
              ))
            }
          </ArkFileUpload.Context>
        </FileUpload.ItemGroup>
        <FileUpload.HiddenInput />
      </FileUpload>
      <p className="file-upload-state">{message || 'No files selected'}</p>
    </div>
  );
}

//#endregion