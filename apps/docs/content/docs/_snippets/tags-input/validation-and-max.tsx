/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { TagsInput } from '@moduix/react';
import { useState } from 'react';

const max = 3;

const maxLength = 12;

export function ValidationTagsInput() {
  const [invalidReason, setInvalidReason] = useState('none');
  return (
    <TagsInput
      max={3}
      maxLength={12}
      defaultValue={['alpha', 'beta', 'gamma']}
      validate={(details) => {
        return details.inputValue.length >= 3 && !details.value.includes(details.inputValue);
      }}
      onValueInvalid={(details) => {
        setInvalidReason(details.reason);
      }}
    >
      <TagsInput.Label>Labels</TagsInput.Label>
      <TagsInput.Control>
        <TagsInput.Items />
        <TagsInput.Input placeholder="Add unique label" />
        <TagsInput.ClearTrigger aria-label="Clear labels" />
      </TagsInput.Control>
    </TagsInput>
  );
}

//#endregion