import { SegmentGroup } from '@moduix/react';

export default function SegmentGroupAsChildDemo() {
  return (
    <SegmentGroup aria-label="Billing cycle" defaultValue="Monthly">
      <SegmentGroup.Indicator />
      {[
        ['Monthly', 'Pay monthly'],
        ['Annual', 'Save 20%'],
      ].map(([item, description]) => (
        <SegmentGroup.Item key={item} value={item} asChild>
          <label className="segment-card-item">
            <SegmentGroup.ItemText className="segment-card-title">{item}</SegmentGroup.ItemText>
            <span className="segment-card-description">{description}</span>
            <SegmentGroup.ItemControl />
          </label>
        </SegmentGroup.Item>
      ))}
    </SegmentGroup>
  );
}