import { Button, FileUpload } from '@moduix/react';
import { useState } from 'react';
import { PreviewMeta } from '@/components/mdx/Components';

const name = 'project-assets';
const maxFiles = 3;
export default function FileUploadFormDemo() {
  const [submitted, setSubmitted] = useState('Nothing submitted');

  return (
    <form
      className="file-upload-stack"
      onSubmit={(event) => {
        event.preventDefault();
        setSubmitted(`${new FormData(event.currentTarget).getAll(name).length} file(s) submitted`);
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
      <PreviewMeta>
        <output>Submitted: {submitted}</output>
        <Button type="submit" size="sm">
          Submit
        </Button>
      </PreviewMeta>
    </form>
  );
}