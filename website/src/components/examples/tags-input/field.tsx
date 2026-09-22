import { Field, FieldErrorText, FieldHelperText } from '@moduix/react/field';
import {
  TagsInput,
  TagsInputClearTrigger,
  TagsInputControl,
  TagsInputHiddenInput,
  TagsInputInput,
  TagsInputItems,
  TagsInputLabel,
} from '@moduix/react/tags-input';
import styles from '@/components/examples/tags-input/tags-input-field.module.css';

export default function FieldTagsInput() {
  return (
    <Field className={styles.root} invalid required>
      <TagsInput defaultValue={['api']} name="topics">
        <TagsInputLabel>Topics</TagsInputLabel>
        <TagsInputControl>
          <TagsInputItems />
          <TagsInputInput placeholder="Add topic" />
          <TagsInputClearTrigger aria-label="Clear topics" />
        </TagsInputControl>
        <TagsInputHiddenInput />
      </TagsInput>
      <FieldHelperText>Add at least one topic.</FieldHelperText>
      <FieldErrorText>Topics are required.</FieldErrorText>
    </Field>
  );
}