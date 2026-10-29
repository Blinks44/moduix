import {
  SegmentGroup,
  SegmentGroupIndicator,
  SegmentGroupItems,
} from '@moduix/solid/segment-group';
import { Stack } from '@moduix/solid/stack';
import { For } from 'solid-js';

const sizes = ['sm', 'md', 'lg'] as const;
const frameworks = ['React', 'Solid', 'Vue'];

export default function SegmentGroupSizesDemo() {
  return (
    <Stack align="center" gap="3">
      <For each={sizes}>
        {(size) => (
          <SegmentGroup size={size} aria-label={`Framework, ${size}`} defaultValue="React">
            <SegmentGroupIndicator />
            <SegmentGroupItems items={frameworks} />
          </SegmentGroup>
        )}
      </For>
    </Stack>
  );
}