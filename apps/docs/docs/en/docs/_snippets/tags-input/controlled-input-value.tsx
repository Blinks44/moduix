import { Button, Stack, TagsInput } from '@moduix/react';
import { useState } from 'react';

export default function ControlledInputValueTagsInput() {
  const [inputValue, setInputValue] = useState('');
  return (
    <Stack gap="var(--moduix-spacing-3)">
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
      <Button type="button" onClick={() => setInputValue('React')}>
        Set React
      </Button>
    </Stack>
  );
}