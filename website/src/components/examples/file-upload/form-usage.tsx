import { Button } from '@moduix/react/button';
import {
  FileUpload,
  FileUploadContext,
  FileUploadHiddenInput,
  FileUploadItem,
  FileUploadItemDeleteTrigger,
  FileUploadItemGroup,
  FileUploadItemName,
  FileUploadLabel,
  FileUploadTrigger,
} from '@moduix/react/file-upload';
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
        <FileUploadLabel>Project assets</FileUploadLabel>
        <FileUploadHiddenInput />
        <FileUploadTrigger>Choose files</FileUploadTrigger>
        <FileUploadItemGroup>
          <FileUploadContext>
            {({ acceptedFiles }) =>
              acceptedFiles.map((file) => (
                <FileUploadItem key={file.name} file={file}>
                  <FileUploadItemName />
                  <FileUploadItemDeleteTrigger aria-label={`Remove ${file.name}`} />
                </FileUploadItem>
              ))
            }
          </FileUploadContext>
        </FileUploadItemGroup>
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
