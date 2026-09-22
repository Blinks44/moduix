import { Button } from '@moduix/react/button';
import { Stack } from '@moduix/react/stack';
import {
  TagsInput,
  TagsInputClearTrigger,
  TagsInputControl,
  TagsInputInput,
  TagsInputItems,
  TagsInputLabel,
} from '@moduix/react/tags-input';
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
        <TagsInputLabel>Frameworks</TagsInputLabel>
        <TagsInputControl>
          <TagsInputItems />
          <TagsInputInput placeholder="Add framework" />
          <TagsInputClearTrigger aria-label="Clear frameworks" />
        </TagsInputControl>
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