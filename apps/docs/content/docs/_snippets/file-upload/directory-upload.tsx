/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { FileUpload } from '@moduix/react';

const maxFiles = 20;
export function DirectoryUploadDemo() {
  return (
    <FileUpload className="file-upload-demo file-upload-simple-demo" directory maxFiles={maxFiles}>
      <FileUpload.Label>Folder</FileUpload.Label>
      <FileUpload.Trigger>Choose folder</FileUpload.Trigger>
      <FileUpload.ItemGroup>
        <FileUpload.Context>
          {({ acceptedFiles }) =>
            acceptedFiles.map((file) => (
              <FileUpload.Item key={file.name} file={file}>
                <FileUpload.ItemName>{file.webkitRelativePath || file.name}</FileUpload.ItemName>
                <FileUpload.ItemSizeText />
                <FileUpload.ItemDeleteTrigger aria-label={`Remove ${file.name}`} />
              </FileUpload.Item>
            ))
          }
        </FileUpload.Context>
      </FileUpload.ItemGroup>
    </FileUpload>
  );
}

//#endregion