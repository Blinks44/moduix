import { ToastToaster, createToaster } from '@moduix/react/toast';
import { useEffect, useState } from 'react';

// Anatomy scene: one toast that stays open inside an inline toaster so every part can be outlined.
export default function ToastAnatomy() {
  // Each scene on the page gets its own toaster, so the anatomy and CSS variables scenes show one toast each.
  const [toaster] = useState(() => createToaster({ placement: 'bottom-end' }));

  useEffect(() => {
    const id = toaster.create({
      title: 'Scheduled for tomorrow',
      description: 'Your meeting has been scheduled for tomorrow at 10am.',
      type: 'info',
      duration: Infinity,
      action: { label: 'Undo', onClick: () => {} },
    });
    return () => toaster.remove(id);
  }, [toaster]);

  return (
    <div style={{ minHeight: 220, width: '100%' }}>
      <ToastToaster toaster={toaster} portalled={false} />
    </div>
  );
}