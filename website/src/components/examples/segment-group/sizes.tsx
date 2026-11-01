import {
  SegmentGroup,
  SegmentGroupIndicator,
  SegmentGroupItems,
} from '@moduix/react/segment-group';
import { Stack } from '@moduix/react/stack';

const sizes = ['sm', 'md', 'lg'] as const;
const frameworks = ['React', 'Solid', 'Vue'];

export default function SegmentGroupSizesDemo() {
  return (
    <Stack align="center" gap="3">
      {sizes.map((size) => (
        <SegmentGroup key={size} size={size} aria-label={`Framework, ${size}`} defaultValue="React">
          <SegmentGroupIndicator />
          <SegmentGroupItems items={frameworks} />
        </SegmentGroup>
      ))}
    </Stack>
  );
}