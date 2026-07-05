/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { FileUpload as ArkFileUpload } from '@ark-ui/react/file-upload';
import { FileUpload } from '@moduix/react';

const maxFiles = 3;
export function ClearTriggerFileUploadDemo() {
  return (
    <FileUpload className="file-upload-demo file-upload-simple-demo" maxFiles={maxFiles}>
      <FileUpload.Label>Attachments</FileUpload.Label>
      <div className="file-upload-actions">
        <FileUpload.Trigger>Choose files</FileUpload.Trigger>
        <FileUpload.ClearTrigger>Clear files</FileUpload.ClearTrigger>
      </div>
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
      <FileUpload.HiddenInput />
    </FileUpload>
  );
}

//#endregion