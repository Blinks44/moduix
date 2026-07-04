/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { FileUpload as ArkFileUpload } from '@ark-ui/react/file-upload';
import { FileUpload } from '@moduix/react';

const maxFiles = 2;
export function CustomFileUploadDemo() {
  return (
    <FileUpload className="file-upload-demo" maxFiles={maxFiles}>
      <FileUpload.Label>Brand assets</FileUpload.Label>
      <FileUpload.Dropzone className="file-upload-custom-dropzone" disableClick>
        <FileUpload.DropzoneIcon />
        <div className="file-upload-dropzone-content">
          <span className="file-upload-dropzone-title">Drop files here</span>
          <span className="file-upload-dropzone-description">SVG, PNG, or PDF</span>
          <FileUpload.Trigger className="file-upload-custom-trigger">
            Browse files
          </FileUpload.Trigger>
        </div>
      </FileUpload.Dropzone>
      <FileUpload.ItemGroup>
        <ArkFileUpload.Context>
          {({ acceptedFiles }) =>
            acceptedFiles.map((file) => (
              <FileUpload.Item key={file.name} file={file}>
                <FileUpload.ItemName />
                <FileUpload.ItemSizeText />
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