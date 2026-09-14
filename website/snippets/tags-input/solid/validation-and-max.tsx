import { TagsInput } from '@moduix/solid/tags-input';
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
        <TagsInput.Label>Labels</TagsInput.Label>
        <TagsInput.Control>
          <TagsInput.Items />
          <TagsInput.Input placeholder="Add unique label" />
          <TagsInput.ClearTrigger aria-label="Clear labels" />
        </TagsInput.Control>
      </TagsInput>
      <output>Last invalid reason: {invalidReason()}</output>
    </div>
  );
}