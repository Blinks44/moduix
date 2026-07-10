/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { FileUpload } from '@moduix/react';
import { useState } from 'react';

const initialFiles = [
  new File(['Welcome to moduix'], 'README.md', {
    type: 'text/plain',
  }),
];
export function ControlledFileUploadDemo() {
  const [files, setFiles] = useState(initialFiles);
  return (
    <div className="file-upload-stack">
      <FileUpload
        className="file-upload-demo file-upload-simple-demo"
        acceptedFiles={files}
        onFileChange={(details) => setFiles(details.acceptedFiles)}
      >
        <FileUpload.Label>Attachments</FileUpload.Label>
        <FileUpload.Trigger>Choose files</FileUpload.Trigger>
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
        <FileUpload.HiddenInput />
      </FileUpload>
      <p className="file-upload-state">Selected files: {files.length}</p>
    </div>
  );
}

//#endregion