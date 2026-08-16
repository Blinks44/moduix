import { Button } from '@moduix/react/button';
import { SegmentGroup, useSegmentGroup } from '@moduix/react/segment-group';
import { PreviewMeta } from '@/components/mdx/Components';

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
    <div className="segment-stack">
      <SegmentGroup.RootProvider aria-label="Framework" value={segmentGroup}>
        <SegmentGroup.Indicator />
        <SegmentGroup.Items items={frameworks} />
      </SegmentGroup.RootProvider>
      <PreviewMeta>
        <output>Selected: {segmentGroup.value ?? 'none'}</output>
        <Button type="button" size="sm" onClick={() => segmentGroup.setValue('Solid')}>
          Set to Solid
        </Button>
      </PreviewMeta>
    </div>
  );
}