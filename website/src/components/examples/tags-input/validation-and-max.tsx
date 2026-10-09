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
import styles from '@/components/examples/tags-input/tags-input-validation-and-max.module.css';

export default function ValidationTagsInput() {
  const [invalidReason, setInvalidReason] = useState('none');
  return (
    <div className={styles.root}>
      <TagsInput
        max={3}
        maxLength={12}
        defaultValue={['alpha', 'beta', 'gamma']}
        validate={(details) => {
          return details.inputValue.length >= 3 && !details.value.includes(details.inputValue);
        }}
        onValueInvalid={(details) => {
          setInvalidReason(details.reason);
        }}
      >
        <TagsInputLabel>Labels</TagsInputLabel>
        <TagsInputControl>
          <TagsInputItems />
          <TagsInputInput placeholder="Add unique label" />
          <TagsInputClearTrigger aria-label="Clear labels" />
        </TagsInputControl>
      </TagsInput>
      <PreviewMeta>
        <output>Last invalid reason: {invalidReason}</output>
      </PreviewMeta>
    </div>
  );
}