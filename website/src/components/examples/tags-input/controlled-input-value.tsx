import { Button } from '@moduix/react/button';
import { Stack } from '@moduix/react/stack';
import { TagsInput } from '@moduix/react/tags-input';
import { useState } from 'react';
import { PreviewMeta } from '@/components/mdx/Components';
import styles from '@/components/examples/tags-input/tags-input-controlled-input-value.module.css';

export default function ControlledInputValueTagsInput() {
  const [inputValue, setInputValue] = useState('');
  return (
    <Stack className={styles.root}>
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
      <PreviewMeta>
        <output>Input: {inputValue || 'empty'}</output>
        <Button type="button" size="sm" onClick={() => setInputValue('React')}>
          Set React
        </Button>
      </PreviewMeta>
    </Stack>
  );
}