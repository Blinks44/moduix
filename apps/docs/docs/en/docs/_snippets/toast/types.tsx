import { Button } from '@moduix/react/button';
import { Toaster, createToaster } from '@moduix/react/toast';
import { useState } from 'react';
import { PreviewMeta } from '@/components/mdx/Components';

const types = ['success', 'error', 'warning', 'info'] as const;
const toaster = createToaster({ placement: 'bottom-end', overlap: true, gap: 16 });

export default function App() {
  const [event, setEvent] = useState('No toast created');

  return (
    <div className="toast-preview-stack">
      <Toaster toaster={toaster} />
      <PreviewMeta>
        <output>Last event: {event}</output>
        {types.map((type) => (
          <Button
            key={type}
            onClick={() => {
              toaster[type]({
                title: type === 'info' ? 'Update available' : `${type} toast`,
                description: `This notification uses the ${type} status style.`,
              });
              setEvent(`${type} toast created`);
            }}
          >
            {type}
          </Button>
        ))}
      </PreviewMeta>
    </div>
  );
}