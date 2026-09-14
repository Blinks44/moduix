import { Frame } from '@ark-ui/solid';

export default function FrameLifecycleDemo() {
  let frameRef: HTMLIFrameElement | undefined;

  return (
    <Frame
      ref={(element) => (frameRef = element)}
      title="Interactive preview"
      onMount={() => {
        const frameDocument = frameRef?.contentDocument;
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