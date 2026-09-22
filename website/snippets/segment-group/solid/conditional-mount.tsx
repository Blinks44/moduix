import { Button } from '@moduix/solid/button';
import {
  SegmentGroup,
  SegmentGroupIndicator,
  SegmentGroupItems,
} from '@moduix/solid/segment-group';
import { createSignal } from 'solid-js';
import styles from '@/components/examples/segment-group/segment-group-conditional-mount.module.css';

const frameworks = [
  { value: 'React', label: 'React' },
  { value: 'Solid', label: 'Solid' },
  { value: 'Svelte', label: 'Svelte' },
  { value: 'Vue', label: 'Vue' },
];

export default function ConditionalSegmentGroupDemo() {
  const [visible, setVisible] = createSignal(true);

  return (
    <div class={styles.root}>
      {visible() ? (
        <SegmentGroup aria-label="Framework" defaultValue="React">
          <SegmentGroupIndicator />
          <SegmentGroupItems items={frameworks} />
        </SegmentGroup>
      ) : null}
      <output>Segment group: {visible() ? 'visible' : 'hidden'}</output>
      <Button type="button" size="sm" onClick={() => setVisible((value) => !value)}>
        {visible() ? 'Hide' : 'Show'}
      </Button>
    </div>
  );
}