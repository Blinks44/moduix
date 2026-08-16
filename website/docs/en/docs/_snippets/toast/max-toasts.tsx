import { Button } from '@moduix/react/button';
import { Toaster, createToaster } from '@moduix/react/toast';
import { useState } from 'react';
import { PreviewMeta } from '@/components/mdx/Components';

const toaster = createToaster({ placement: 'bottom-end', overlap: true, gap: 16, max: 3 });
const descriptions = [
  'John liked your post',
  'Sarah commented on your photo',
  'New follower: @designpro',
  'Your post was shared 10 times',
  'Meeting reminder in 15 minutes',
];

export default function App() {
  const [event, setEvent] = useState('No toast created');

  return (
    <div className="toast-preview-stack">
      <Toaster toaster={toaster} />
      <PreviewMeta>
        <output>Last event: {event}</output>
        <Button
          onClick={() => {
            toaster.info({
              title: 'New notification',
              description: 'You have a new message in your inbox.',
            });
            setEvent('One notification created');
          }}
        >
          Add notification
        </Button>
        <Button
          onClick={() => {
            descriptions.forEach((description) => {
              toaster.info({ title: 'Notification', description });
            });
            setEvent('Five notifications created');
          }}
        >
          Add 5 notifications
        </Button>
      </PreviewMeta>
    </div>
  );
}