/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { FileUpload as ArkFileUpload } from '@ark-ui/react/file-upload';
import { FileUpload } from '@moduix/react';

const capture = 'environment';
const accept = 'image/*';
const maxFiles = 1;
export function MediaCaptureUploadDemo() {
  return (
    <FileUpload className="file-upload-demo" accept={accept} capture={capture} maxFiles={maxFiles}>
      <FileUpload.Label>Photo</FileUpload.Label>
      <FileUpload.Dropzone disableClick>
        <FileUpload.DropzoneIcon />
        <div className="file-upload-dropzone-content">
          <span className="file-upload-dropzone-title">Drop an image or open the camera</span>
          <span className="file-upload-dropzone-description">
            One image from the environment camera
          </span>
          <FileUpload.Trigger>Open camera</FileUpload.Trigger>
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