import { Editable } from '@moduix/react';

export default function TextareaEditableDemo() {
  return (
    <Editable
      className="editable-textarea-root"
      defaultValue="Ark UI keeps the editable state, keyboard handling, and focus lifecycle."
      submitMode="none"
      placeholder="Enter a description"
    >
      <Editable.Label>Description</Editable.Label>
      <Editable.Area className="editable-textarea-area">
        <Editable.Input asChild className="editable-textarea-input">
          <textarea />
        </Editable.Input>
        <Editable.Preview className="editable-textarea-preview" />
      </Editable.Area>
      <Editable.Controls />
    </Editable>
  );
}