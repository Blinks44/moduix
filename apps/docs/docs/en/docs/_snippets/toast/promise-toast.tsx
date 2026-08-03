import { Button } from '@moduix/react/button';
import { Toaster, createToaster } from '@moduix/react/toast';
import { useState } from 'react';
import { PreviewMeta } from '@/components/mdx/Components';

const uploadFile = () =>
  new Promise<void>((resolve, reject) => {
    window.setTimeout(() => {
      if (Math.random() > 0.5) resolve();
      else reject(new Error('Upload failed'));
    }, 2000);
  });

const toaster = createToaster({ placement: 'bottom-end', overlap: true, gap: 16 });

export default function App() {
  const [event, setEvent] = useState('No upload started');

  return (
    <div className="toast-preview-stack">
      <Toaster toaster={toaster} />
      <PreviewMeta>
        <output>Last event: {event}</output>
        <Button
          onClick={() => {
            toaster.promise(uploadFile, {
              loading: {
                title: 'Uploading file...',
                description: 'Please wait while we upload your document.',
              },
              success: {
                title: 'Upload complete',
                description: 'Your file has been uploaded successfully.',
              },
              error: {
                title: 'Upload failed',
                description: 'Could not upload the file. Please try again.',
              },
            });
            setEvent('Upload started');
          }}
        >
          Upload file
        </Button>
      </PreviewMeta>
    </div>
  );
}