/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { FileUpload } from '@moduix/react';

const maxFiles = 5;
export function AdvancedFileUploadDemo() {
  return (
    <FileUpload className="file-upload-demo" maxFiles={maxFiles}>
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
                <FileUpload.ItemName />
                <FileUpload.ItemSizeText />
                <FileUpload.ItemDeleteTrigger aria-label={`Remove ${file.name}`} />
              </FileUpload.Item>
            ))
          }
        </FileUpload.Context>
      </FileUpload.ItemGroup>
      <FileUpload.HiddenInput />
    </FileUpload>
  );
}

//#endregion