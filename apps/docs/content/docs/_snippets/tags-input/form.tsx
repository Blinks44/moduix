/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { Button, TagsInput } from '@moduix/react';
import type { FormEvent } from 'react';
import { useState } from 'react';

export function FormTagsInput() {
  const [submittedValue, setSubmittedValue] = useState('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmittedValue(new FormData(event.currentTarget).get('frameworks')?.toString() ?? '');
  };

  return (
    <form onSubmit={handleSubmit}>
      <TagsInput defaultValue={['React', 'TypeScript']} name="frameworks">
        <TagsInput.Label>Frameworks</TagsInput.Label>
        <TagsInput.Control>
          <TagsInput.Items />
          <TagsInput.Input placeholder="Add framework" />
          <TagsInput.ClearTrigger aria-label="Clear frameworks" />
        </TagsInput.Control>
      </TagsInput>
      <Button type="submit">Submit</Button>
      <output>Submitted value: {submittedValue || 'none'}</output>
    </form>
  );
}

//#endregion