import { Frame } from '@ark-ui/react';
import { Card } from '@moduix/react/card';

const frameStyle = {
  blockSize: '10rem',
  border: '1px solid color-mix(in srgb, currentColor 18%, transparent)',
  borderRadius: '0.75rem',
  display: 'block',
  inlineSize: '100%',
};

const previewStyles = (
  <style>{`
    .workspace-preview {
      align-items: center;
      background: #f3f4f6;
      color: #111827;
      display: flex;
      font-family: system-ui, sans-serif;
      justify-content: space-between;
      min-height: 8rem;
      padding: 1.25rem;
    }

    .workspace-preview__status {
      background: #dcfce7;
      border-radius: 999px;
      color: #166534;
      font-size: 0.875rem;
      padding: 0.25rem 0.625rem;
    }
  `}</style>
);

export default function FrameHeadDemo() {
  return (
    <Card style={{ inlineSize: '100%' }}>
      <Card.Header>
        <Card.Title>Embedded workspace</Card.Title>
        <Card.Description>Inject the preview styles into the iframe document.</Card.Description>
      </Card.Header>
      <Card.Body>
        <Frame head={previewStyles} style={frameStyle} title="Embedded workspace preview">
          <main className="workspace-preview">
            <strong>Marketing workspace</strong>
            <span className="workspace-preview__status">Published</span>
          </main>
        </Frame>
      </Card.Body>
    </Card>
  );
}