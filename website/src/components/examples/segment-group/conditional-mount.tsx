import { Button } from '@moduix/react/button';
import {
  SegmentGroup,
  SegmentGroupIndicator,
  SegmentGroupItems,
} from '@moduix/react/segment-group';
import { useState } from 'react';
import styles from '@/components/examples/segment-group/segment-group-conditional-mount.module.css';

const frameworks = ['React', 'Solid', 'Svelte', 'Vue'];

export default function ConditionalSegmentGroupDemo() {
  const [visible, setVisible] = useState(true);
  return (
    <div className={styles.root}>
      {visible ? (
        <SegmentGroup aria-label="Framework" defaultValue="React">
          <SegmentGroupIndicator />
          <SegmentGroupItems items={frameworks} />
        </SegmentGroup>
      ) : null}
      <div data-preview-meta>
        <output>Segment group: {visible ? 'visible' : 'hidden'}</output>
        <Button type="button" size="sm" onClick={() => setVisible((value) => !value)}>
          {visible ? 'Hide' : 'Show'}
        </Button>
      </div>
    </div>
  );
}