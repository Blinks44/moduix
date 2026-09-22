import {
  TagsInput,
  TagsInputClearTrigger,
  TagsInputControl,
  TagsInputInput,
  TagsInputItems,
  TagsInputLabel,
} from '@moduix/solid/tags-input';
import { createSignal } from 'solid-js';
import styles from '@/components/examples/tags-input/tags-input-validation-and-max.module.css';

export default function ValidationTagsInput() {
  const [invalidReason, setInvalidReason] = createSignal('none');

  return (
    <div class={styles.root}>
      <TagsInput
        max={3}
        maxLength={12}
        defaultValue={['alpha', 'beta', 'gamma']}
        validate={(details) =>
          details.inputValue.length >= 3 && !details.value.includes(details.inputValue)
        }
        onValueInvalid={(details) => setInvalidReason(details.reason)}
      >
        <TagsInputLabel>Labels</TagsInputLabel>
        <TagsInputControl>
          <TagsInputItems />
          <TagsInputInput placeholder="Add unique label" />
          <TagsInputClearTrigger aria-label="Clear labels" />
        </TagsInputControl>
      </TagsInput>
      <output>Last invalid reason: {invalidReason()}</output>
    </div>
  );
}