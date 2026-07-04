/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { FileUpload as ArkFileUpload, useFileUpload } from '@ark-ui/react/file-upload';
import { FileUpload, Textarea } from '@moduix/react';

const maxFiles = 3;
const accept = 'image/*';
export function RootProviderPasteUploadDemo() {
  const fileUpload = useFileUpload({
    maxFiles,
    accept,
  });
  return (
    <FileUpload.RootProvider
      className="file-upload-demo file-upload-simple-demo"
      value={fileUpload}
    >
      <FileUpload.Label>Images</FileUpload.Label>
      <Textarea
        placeholder="Paste an image here"
        onPaste={(event) => fileUpload.setClipboardFiles(event.clipboardData)}
      />
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
    </FileUpload.RootProvider>
  );
}

//#endregion