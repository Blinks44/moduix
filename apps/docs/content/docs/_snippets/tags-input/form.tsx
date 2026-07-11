/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { TagsInput } from '@moduix/react';
import { useState } from 'react';

export function FormTagsInput() {
  const [submittedValue, setSubmittedValue] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    setSubmittedValue(new FormData(event.currentTarget).get('frameworks')?.toString() ?? '');
  }

  return (
    <form onSubmit={handleSubmit}>
      <TagsInput defaultValue={['React', 'TypeScript']} name="frameworks">
        <TagsInput.Label>Frameworks</TagsInput.Label>
        <TagsInput.Control>
          <TagsInput.Items />
          <TagsInput.Input placeholder="Add framework" />
          <TagsInput.ClearTrigger aria-label="Clear frameworks" />
        </TagsInput.Control>
        <TagsInput.HiddenInput />
      </TagsInput>
      <button type="submit">Submit</button>
      <output>Submitted value: {submittedValue || 'none'}</output>
    </form>
  );
}

//#endregion