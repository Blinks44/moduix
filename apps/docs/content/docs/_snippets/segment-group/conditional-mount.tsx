/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { SegmentGroup } from '@moduix/react';
import { useState } from 'react';

const frameworks = ['React', 'Solid', 'Svelte', 'Vue'];

export function ConditionalSegmentGroupDemo() {
  const [visible, setVisible] = useState(true);
  return (
    <div className="segment-stack">
      <button
        className="segment-button"
        type="button"
        onClick={() => setVisible((value) => !value)}
      >
        {visible ? 'Hide' : 'Show'}
      </button>
      {visible ? (
        <SegmentGroup aria-label="Framework" defaultValue="React">
          <SegmentGroup.Indicator />
          {frameworks.map((framework) => (
            <SegmentGroup.Item key={framework} value={framework}>
              <SegmentGroup.ItemText>{framework}</SegmentGroup.ItemText>
              <SegmentGroup.ItemControl />
              <SegmentGroup.ItemHiddenInput />
            </SegmentGroup.Item>
          ))}
        </SegmentGroup>
      ) : null}
    </div>
  );
}

//#endregion