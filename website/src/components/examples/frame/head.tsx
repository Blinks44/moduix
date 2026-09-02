import { Frame } from '@ark-ui/react';
import { Card } from '@moduix/react/card';
import styles from '@/components/examples/frame/frame-head.module.css';

const previewStylesheet = new URL('./frame-head.module.css', import.meta.url).href;

export default function FrameHeadDemo() {
  return (
    <Card className={styles.root}>
      <Card.Header>
        <Card.Title>Embedded workspace</Card.Title>
        <Card.Description>Inject the preview styles into the iframe document.</Card.Description>
      </Card.Header>
      <Card.Body>
        <Frame
          head={<link rel="stylesheet" href={previewStylesheet} />}
          className={styles.frame}
          title="Embedded workspace preview"
        >
          <main data-frame-head>
            <strong>Marketing workspace</strong>
            <span data-frame-status>Published</span>
          </main>
        </Frame>
      </Card.Body>
    </Card>
  );
}