/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { Button, CloseIcon, Toast, Toaster, createToaster } from '@moduix/react';
import { Info as InfoIcon } from 'lucide-react';
import styles from './toast.module.css';

const toaster = createToaster({
  placement: 'bottom-end',
  overlap: true,
  gap: 24,
});

export function App() {
  return (
    <>
      <Button
        onClick={() =>
          toaster.success({
            title: 'Workspace synced',
            description: 'Map edits are available to everyone.',
          })
        }
      >
        Create custom toast
      </Button>
      <Toaster toaster={toaster}>
        {(toast) => (
          <Toast key={toast.id} className={styles.customToast}>
            <div className={styles.customContent}>
              <InfoIcon className={styles.customIcon} />
              <Toast.Title />
              <Toast.Description />
            </div>
            <Toast.CloseTrigger>
              <CloseIcon className={styles.closeIcon} />
            </Toast.CloseTrigger>
          </Toast>
        )}
      </Toaster>
    </>
  );
}

//#endregion