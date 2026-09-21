import { Field, FieldErrorText, FieldHelperText } from '@moduix/solid/field';
import { TagsInput } from '@moduix/solid/tags-input';
import styles from '@/components/examples/tags-input/tags-input-field.module.css';

export default function FieldTagsInput() {
  return (
    <Field class={styles.root} invalid required>
      <TagsInput defaultValue={['api']} name="topics">
        <TagsInput.Label>Topics</TagsInput.Label>
        <TagsInput.Control>
          <TagsInput.Items />
          <TagsInput.Input placeholder="Add topic" />
          <TagsInput.ClearTrigger aria-label="Clear topics" />
        </TagsInput.Control>
        <TagsInput.HiddenInput />
      </TagsInput>
      <FieldHelperText>Add at least one topic.</FieldHelperText>
      <FieldErrorText>Topics are required.</FieldErrorText>
    </Field>
  );
}
