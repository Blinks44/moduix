import { TagsInput } from '@moduix/react';
import { useState } from 'react';

export default function ControlledInputValueTagsInput() {
  const [inputValue, setInputValue] = useState('');
  return (
    <>
      <button type="button" onClick={() => setInputValue('React')}>
        Set React
      </button>
      <TagsInput
        defaultValue={['Solid']}
        inputValue={inputValue}
        onInputValueChange={(details) => setInputValue(details.inputValue)}
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