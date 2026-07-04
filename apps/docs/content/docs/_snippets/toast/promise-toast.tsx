/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { Button, Toast, Toaster, createToaster } from '@moduix/react';

const uploadFile = () =>
  new Promise<void>((resolve, reject) => {
    window.setTimeout(() => {
      Math.random() > 0.5 ? resolve() : reject(new Error('Upload failed'));
    }, 2000);
  });

const toaster = createToaster({
  placement: 'bottom-end',
  overlap: true,
  gap: 16,
});

export function App() {
  return (
    <>
      <Button
        onClick={() =>
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
          })
        }
      >
        Upload file
      </Button>
      <Toaster toaster={toaster}>
        {(toast) => (
          <Toast key={toast.id}>
            <Toast.Title />
            <Toast.Description />
            {toast.closable !== false ? <Toast.CloseTrigger /> : null}
          </Toast>
        )}
      </Toaster>
    </>
  );
}

//#endregion