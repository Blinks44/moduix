import { Button } from '@moduix/solid/button';
import { SegmentGroup, useSegmentGroup } from '@moduix/solid/segment-group';
import styles from '@/components/examples/segment-group/segment-group-root-provider.module.css';

const frameworks = [
  { value: 'React', label: 'React' },
  { value: 'Solid', label: 'Solid' },
  { value: 'Svelte', label: 'Svelte' },
  { value: 'Vue', label: 'Vue' },
];

export default function SegmentGroupRootProviderDemo() {
  const segmentGroup = useSegmentGroup({
    defaultValue: 'React',
  });

  return (
    <div class={styles.root}>
      <SegmentGroup.RootProvider aria-label="Framework" value={segmentGroup}>
        <SegmentGroup.Indicator />
        <SegmentGroup.Items items={frameworks} />
      </SegmentGroup.RootProvider>
      <output>Selected: {segmentGroup().value ?? 'none'}</output>
      <Button type="button" size="sm" onClick={() => segmentGroup().setValue('Solid')}>
        Set to Solid
      </Button>
    </div>
  );
}