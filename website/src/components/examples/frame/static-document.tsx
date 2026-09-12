import { Frame } from '@ark-ui/react';

const previewDocument = `<!doctype html>
<html>
  <head>
    <style>
      body { margin: 0; padding: 1.25rem; font-family: system-ui, sans-serif; }
    </style>
  </head>
  <body><main><h2>Release notes</h2></main></body>
</html>`;

export default function FrameStaticDocumentDemo() {
  return (
    <Frame
      sandbox=""
      srcDoc={previewDocument}
      title="Release notes preview"
      style={{
        display: 'block',
        inlineSize: '100%',
        blockSize: '10rem',
        border: '1px solid #d1d5db',
        borderRadius: '0.75rem',
      }}
    />
  );
}