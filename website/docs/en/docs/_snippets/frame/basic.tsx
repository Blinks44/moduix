import { Frame } from '@ark-ui/react';
import { Card } from '@moduix/react/card';

const frameStyle = {
  blockSize: '10rem',
  border: '1px solid color-mix(in srgb, currentColor 18%, transparent)',
  borderRadius: '0.75rem',
  display: 'block',
  inlineSize: '100%',
};

export default function FrameBasicDemo() {
  return (
    <Card style={{ inlineSize: '100%' }}>
      <Card.Header>
        <Card.Title>Release preview</Card.Title>
        <Card.Description>
          Render an isolated preview without leaving the workspace.
        </Card.Description>
      </Card.Header>
      <Card.Body>
        <Frame style={frameStyle} title="Release preview">
          <main
            style={{
              display: 'grid',
              fontFamily: 'system-ui, sans-serif',
              gap: '0.5rem',
              minBlockSize: '8rem',
              padding: '1.25rem',
            }}
          >
            <strong>Release 2.8.0</strong>
            <span>Ready for the final review.</span>
          </main>
        </Frame>
      </Card.Body>
    </Card>
  );
}