/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { FileUpload } from '@moduix/react';

const accept = 'image/*';
async function transformFiles(files) {
  return files.map(
    (file) =>
      new File([file], file.name.toLowerCase(), {
        type: file.type,
      }),
  );
}
export function TransformFilesUploadDemo() {
  return (
    <FileUpload
      className="file-upload-demo file-upload-simple-demo"
      accept={accept}
      transformFiles={transformFiles}
    >
      <FileUpload.Label>Images</FileUpload.Label>
      <FileUpload.Trigger>Choose images</FileUpload.Trigger>
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
    </FileUpload>
  );
}

//#endregion