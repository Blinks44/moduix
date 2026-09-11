import { SegmentGroup } from '@moduix/solid/segment-group';
import { createSignal } from 'solid-js';
import styles from '@/components/examples/segment-group/segment-group-controlled.module.css';

const frameworks = [
  { value: 'React', label: 'React' },
  { value: 'Solid', label: 'Solid' },
  { value: 'Svelte', label: 'Svelte' },
  { value: 'Vue', label: 'Vue' },
];

export default function ControlledSegmentGroupDemo() {
  const [value, setValue] = createSignal<string | null>('React');

  return (
    <div class={styles.root}>
      <SegmentGroup
        aria-label="Framework"
        value={value()}
        onValueChange={(details) => setValue(details.value)}
      >
        <SegmentGroup.Indicator />
        <SegmentGroup.Items items={frameworks} />
      </SegmentGroup>
      <output>Selected: {value() ?? 'none'}</output>
    </div>
  );
}