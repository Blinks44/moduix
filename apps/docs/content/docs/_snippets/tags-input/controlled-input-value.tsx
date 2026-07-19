/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { TagsInput } from '@moduix/react';
import { useState } from 'react';

export function ControlledInputValueTagsInput() {
  const [inputValue, setInputValue] = useState('');
  function handleInputValueChange(details) {
    setInputValue(details.inputValue);
  }
  return (
    <>
      <button type="button" onClick={() => setInputValue('React')}>
        Set React
      </button>
      <TagsInput
        defaultValue={['Solid']}
        inputValue={inputValue}
        onInputValueChange={handleInputValueChange}
      >
        <TagsInput.Label>Frameworks</TagsInput.Label>
        <TagsInput.Control>
          <TagsInput.Items />
          <TagsInput.Input placeholder="Add framework" />
          <TagsInput.ClearTrigger aria-label="Clear frameworks" />
        </TagsInput.Control>
      </TagsInput>
    </>
  );
}

//#endregion