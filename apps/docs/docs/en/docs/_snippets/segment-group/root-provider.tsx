import { SegmentGroup, useSegmentGroup } from '@moduix/react';

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
      <button
        className="segment-button"
        type="button"
        onClick={() => segmentGroup.setValue('Solid')}
      >
        Set to Solid
      </button>
      <output className="segment-output">selected: {segmentGroup.value ?? 'none'}</output>
    </div>
  );
}