import { Editable } from '@moduix/react';
import type { CSSProperties } from 'react';

const rootStyle = {
  '--moduix-editable-area-width': '100%',
  '--moduix-editable-control-align': 'start',
} as CSSProperties;

const textareaStyle = {
  minHeight: '6rem',
  whiteSpace: 'pre-wrap',
};

export default function TextareaEditableDemo() {
  return (
    <Editable
      defaultValue="Ark UI keeps the editable state, keyboard handling, and focus lifecycle."
      submitMode="none"
      placeholder="Enter a description"
      style={rootStyle}
    >
      <Editable.Label>Description</Editable.Label>
      <Editable.Area style={{ alignItems: 'flex-start' }}>
        <Editable.Input asChild style={textareaStyle}>
          <textarea />
        </Editable.Input>
        <Editable.Preview style={textareaStyle} />
      </Editable.Area>
      <Editable.Controls />
    </Editable>
  );
}