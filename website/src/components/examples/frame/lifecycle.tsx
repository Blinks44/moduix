import { Frame } from '@ark-ui/react';
import { useRef } from 'react';

export default function FrameLifecycleDemo() {
  const frameRef = useRef<HTMLIFrameElement>(null);

  return (
    <Frame
      ref={frameRef}
      title="Interactive preview"
      onMount={() => {
        const frameDocument = frameRef.current?.contentDocument;
        if (!frameDocument) return;

        const script = frameDocument.createElement('script');
        script.textContent = 'document.body.dataset.ready = "true";';
        frameDocument.body.append(script);
      }}
      onUnmount={() => {
        // Release application-owned listeners and other resources here.
      }}
    >
      <main>Interactive preview</main>
    </Frame>
  );
}