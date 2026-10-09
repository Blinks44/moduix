import {
  Clipboard,
  ClipboardControl,
  ClipboardIndicator,
  ClipboardTrigger,
  ClipboardValueText,
} from '@moduix/react/clipboard';
import { useState } from 'react';
import { PreviewMeta } from '@/components/mdx/Components';
import styles from '@/components/examples/clipboard/component-copy-status.module.css';

export default function ClipboardStatusDemo() {
  const [copyCount, setCopyCount] = useState(0);

  return (
    <div className={styles.stack}>
      <Clipboard
        className={styles.root}
        defaultValue="maps-platform-token"
        onStatusChange={(details) => {
          if (details.copied) {
            setCopyCount((value) => value + 1);
          }
        }}
      >
        <ClipboardControl>
          <ClipboardTrigger>
            <ClipboardIndicator />
            <ClipboardValueText />
          </ClipboardTrigger>
        </ClipboardControl>
      </Clipboard>
      <PreviewMeta>
        <output>Copied {copyCount} times</output>
      </PreviewMeta>
    </div>
  );
}