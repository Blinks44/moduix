import { Button } from '@moduix/react/button';
import { FileUpload } from '@moduix/react/file-upload';
import { useState } from 'react';
import { PreviewMeta } from '@/components/mdx/Components';
import styles from '@/components/examples/file-upload/file-upload-form-usage.module.css';

const name = 'project-assets';
const maxFiles = 3;
export default function FileUploadFormDemo() {
  const [submitted, setSubmitted] = useState('Nothing submitted');

  return (
    <form
      className={styles.stack}
      onSubmit={(event) => {
        event.preventDefault();
        setSubmitted(`${new FormData(event.currentTarget).getAll(name).length} file(s) submitted`);
      }}
    >
      <FileUpload className={styles.root} name={name} maxFiles={maxFiles}>
        <FileUpload.Label>Project assets</FileUpload.Label>
        <FileUpload.HiddenInput />
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