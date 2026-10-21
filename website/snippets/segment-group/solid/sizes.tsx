import {
  SegmentGroup,
  SegmentGroupIndicator,
  SegmentGroupItems,
} from '@moduix/solid/segment-group';
import { For } from 'solid-js';
import styles from '@/components/examples/segment-group/segment-group-sizes.module.css';

const sizes = ['sm', 'md', 'lg'] as const;
const frameworks = ['React', 'Solid', 'Vue'];

export default function SegmentGroupSizesDemo() {
  return (
    <div class={styles.root}>
      <For each={sizes}>
        {(size) => (
          <SegmentGroup size={size} aria-label={`Framework, ${size}`} defaultValue="React">
            <SegmentGroupIndicator />
            <SegmentGroupItems items={frameworks} />
          </SegmentGroup>
        )}
      </For>
    </div>
  );
}