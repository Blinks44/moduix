import {
  TagsInput,
  TagsInputClearTrigger,
  TagsInputControl,
  TagsInputInput,
  TagsInputItems,
  TagsInputLabel,
} from '@moduix/react/tags-input';
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
      <TagsInputLabel>Skills</TagsInputLabel>
      <TagsInputControl>
        <TagsInputItems />
        <TagsInputInput placeholder="Add skill" />
        <TagsInputClearTrigger aria-label="Clear skills" />
      </TagsInputControl>
    </TagsInput>
  );
}