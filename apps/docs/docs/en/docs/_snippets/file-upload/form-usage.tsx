import { Button, FileUpload } from '@moduix/react';
import { useState } from 'react';
import { PreviewLayout } from '@/components/examples/preview-layout';

const name = 'project-assets';
const maxFiles = 3;
export default function FileUploadFormDemo() {
  const [submitted, setSubmitted] = useState('Nothing submitted');

  return (
    <PreviewLayout maxWidth="24rem">
      <form
        className="file-upload-stack"
        onSubmit={(event) => {
          event.preventDefault();
          setSubmitted(
            `${new FormData(event.currentTarget).getAll(name).length} file(s) submitted`,
          );
        }}
      >
        <FileUpload className="file-upload-simple-demo" name={name} maxFiles={maxFiles}>
          <FileUpload.Label>Project assets</FileUpload.Label>
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
        </FileUpload>
        <Button className="file-upload-submit" type="submit">
          Submit
        </Button>
        <output className="file-upload-state">{submitted}</output>
      </form>
    </PreviewLayout>
  );
}