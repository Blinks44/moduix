import { TagsInput } from '@moduix/solid/tags-input';
import { createSignal } from 'solid-js';
import styles from '@/components/examples/tags-input/tags-input-controlled.module.css';

export default function ControlledTagsInput() {
  const [value, setValue] = createSignal(['React', 'TypeScript']);

  return (
    <TagsInput
      class={styles.root}
      value={value()}
      onValueChange={(details) => setValue(details.value)}
    >
      <TagsInput.Label>Skills</TagsInput.Label>
      <TagsInput.Control>
        <TagsInput.Items />
        <TagsInput.Input placeholder="Add skill" />
        <TagsInput.ClearTrigger aria-label="Clear skills" />
      </TagsInput.Control>
    </TagsInput>
  );
}