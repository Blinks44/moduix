import { TagsInput } from '@moduix/react/tags-input';
import { useState } from 'react';
import styles from '@/components/examples/tags-input/tags-input-controlled.module.css';

export default function ControlledTagsInput() {
  const [value, setValue] = useState(['React', 'TypeScript']);
  return (
    <TagsInput
      className={styles.root}
      value={value}
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