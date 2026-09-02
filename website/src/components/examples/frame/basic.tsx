import { Frame } from '@ark-ui/react';
import { Card } from '@moduix/react/card';
import styles from '@/components/examples/frame/frame-basic.module.css';

const previewStylesheet = new URL('./frame-basic.module.css', import.meta.url).href;

export default function FrameBasicDemo() {
  return (
    <Card className={styles.root}>
      <Card.Header>
        <Card.Title>Release preview</Card.Title>
        <Card.Description>
          Render an isolated preview without leaving the workspace.
        </Card.Description>
      </Card.Header>
      <Card.Body>
        <Frame
          head={<link rel="stylesheet" href={previewStylesheet} />}
          className={styles.frame}
          title="Release preview"
        >
          <main data-frame-basic>
            <strong>Release 2.8.0</strong>
            <span>Ready for the final review.</span>
          </main>
        </Frame>
      </Card.Body>
    </Card>
  );
}