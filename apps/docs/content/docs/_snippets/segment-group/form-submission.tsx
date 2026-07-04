/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { SegmentGroup } from '@moduix/react';
import { useState, type FormEvent } from 'react';

const frameworks = ['React', 'Solid', 'Svelte', 'Vue'];

export function FormSegmentGroupDemo() {
  const [submitted, setSubmitted] = useState('none');
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const form = event.currentTarget as HTMLFormElement;
    const formData = new FormData(form);
    setSubmitted(String(formData.get('framework') ?? 'none'));
  };
  return (
    <form className="segment-form" onSubmit={handleSubmit}>
      <SegmentGroup aria-label="Framework" name="framework" defaultValue="React">
        <SegmentGroup.Indicator />
        {frameworks.map((framework) => (
          <SegmentGroup.Item key={framework} value={framework}>
            <SegmentGroup.ItemText>{framework}</SegmentGroup.ItemText>
            <SegmentGroup.ItemControl />
            <SegmentGroup.ItemHiddenInput />
          </SegmentGroup.Item>
        ))}
      </SegmentGroup>
      <button className="segment-button" type="submit">
        Submit
      </button>
      <output className="segment-output">submitted: {submitted}</output>
    </form>
  );
}

//#endregion