import { Button } from '@moduix/solid/button';
import { Stack } from '@moduix/solid/stack';
import { TagsInput } from '@moduix/solid/tags-input';
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
        <TagsInput.Label>Frameworks</TagsInput.Label>
        <TagsInput.Control>
          <TagsInput.Items />
          <TagsInput.Input placeholder="Add framework" />
          <TagsInput.ClearTrigger aria-label="Clear frameworks" />
        </TagsInput.Control>
      </TagsInput>
      <output>Input: {inputValue() || 'empty'}</output>
      <Button type="button" size="sm" onClick={() => setInputValue('React')}>
        Set React
      </Button>
    </Stack>
  );
}