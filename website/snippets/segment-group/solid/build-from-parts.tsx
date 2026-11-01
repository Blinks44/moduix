import {
  SegmentGroup,
  SegmentGroupIndicator,
  SegmentGroupItem,
  SegmentGroupItemHiddenInput,
  SegmentGroupItemText,
} from '@moduix/solid/segment-group';
import { For } from 'solid-js';

const frameworks = ['React', 'Solid', 'Svelte', 'Vue'];

export default function BuildFromPartsSegmentGroupDemo() {
  return (
    <SegmentGroup aria-label="Framework" defaultValue="React">
      <SegmentGroupIndicator />
      <For each={frameworks}>
        {(framework) => (
          <SegmentGroupItem value={framework}>
            <SegmentGroupItemText>{framework}</SegmentGroupItemText>
            <SegmentGroupItemHiddenInput />
          </SegmentGroupItem>
        )}
      </For>
    </SegmentGroup>
  );
}