import { Button } from '@moduix/solid/button';
import { Stack } from '@moduix/solid/stack';
import { TagsInput, TagsInputClearTrigger, TagsInputControl, TagsInputInput, TagsInputItems, TagsInputLabel } from '@moduix/solid/tags-input';
import { createSignal } from 'solid-js';
import styles from '@/components/examples/tags-input/tags-input-controlled-input-value.module.css';

export default function ControlledInputValueTagsInput() {
  const [inputValue, setInputValue] = createSignal('');

  return (
    <Stack class={styles.root}>
      <TagsInput
        defaultValue={['Solid']}
        inputValue={inputValue()}
        onInputValueChange={(details) => setInputValue(details.inputValue)}
      >
        <TagsInputLabel>Frameworks</TagsInputLabel>
        <TagsInputControl>
          <TagsInputItems />
          <TagsInputInput placeholder="Add framework" />
          <TagsInputClearTrigger aria-label="Clear frameworks" />
        </TagsInputControl>
      </TagsInput>
      <output>Input: {inputValue() || 'empty'}</output>
      <Button type="button" size="sm" onClick={() => setInputValue('React')}>
        Set React
      </Button>
    </Stack>
  );
}
