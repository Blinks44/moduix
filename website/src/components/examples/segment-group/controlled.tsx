import {
  SegmentGroup,
  SegmentGroupIndicator,
  SegmentGroupItems,
} from '@moduix/react/segment-group';
import { useState } from 'react';
import styles from '@/components/examples/segment-group/segment-group-controlled.module.css';

const frameworks = ['React', 'Solid', 'Svelte', 'Vue'];

export default function ControlledSegmentGroupDemo() {
  const [value, setValue] = useState('React' as string | null);
  return (
    <div className={styles.root}>
      <SegmentGroup
        aria-label="Framework"
        value={value}
        onValueChange={(details) => setValue(details.value)}
      >
        <SegmentGroupIndicator />
        <SegmentGroupItems items={frameworks} />
      </SegmentGroup>
      <div data-preview-meta>
        <output>Selected: {value ?? 'none'}</output>
      </div>
    </div>
  );
}