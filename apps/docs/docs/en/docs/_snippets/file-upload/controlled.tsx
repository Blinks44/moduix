import { FileUpload } from '@moduix/react';
import { useState } from 'react';
import { PreviewMeta } from '@/components/mdx/Components';

const initialFiles = [
  new File(['Welcome to moduix'], 'README.md', {
    type: 'text/plain',
  }),
];
export default function ControlledFileUploadDemo() {
  const [files, setFiles] = useState(initialFiles);
  return (
    <>
      <FileUpload
        className="file-upload-simple-demo"
        acceptedFiles={files}
        onFileChange={(details) => setFiles(details.acceptedFiles)}
      >
        <FileUpload.Label>Attachments</FileUpload.Label>
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
        <output>Selected: {files.length}</output>
      </PreviewMeta>
    </>
  );
}