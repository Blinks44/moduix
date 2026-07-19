/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { FileUpload } from '@moduix/react';

const maxFiles = 3;
export function FileUploadDemo() {
  return (
    <FileUpload className="file-upload-demo file-upload-simple-demo" maxFiles={maxFiles}>
      <FileUpload.Label>Attachments</FileUpload.Label>
      <FileUpload.Trigger>Choose files</FileUpload.Trigger>
      <FileUpload.ItemGroup>
        <FileUpload.Items />
      </FileUpload.ItemGroup>
    </FileUpload>
  );
}

//#endregion