/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { FileUpload as ArkFileUpload } from '@ark-ui/react/file-upload';
import { FileUpload } from '@moduix/react';

const name = 'project-assets';
const maxFiles = 3;
export function FileUploadFormDemo() {
  return (
    <form className="file-upload-stack" onSubmit={(event) => event.preventDefault()}>
      <FileUpload
        className="file-upload-demo file-upload-simple-demo"
        name={name}
        maxFiles={maxFiles}
      >
        <FileUpload.Label>Project assets</FileUpload.Label>
        <FileUpload.Trigger>Choose files</FileUpload.Trigger>
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
      <button className="file-upload-submit" type="submit">
        Submit
      </button>
    </form>
  );
}

//#endregion