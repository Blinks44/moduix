import { Field, FieldErrorText, FieldHelperText } from '@moduix/solid/field';
import {
  RatingGroup,
  RatingGroupControl,
  RatingGroupItems,
  RatingGroupLabel,
} from '@moduix/solid/rating-group';
import styles from '@/components/examples/rating-group/component-field.module.css';

export default function FieldRatingGroupDemo() {
  return (
    <Field class={styles.field}>
      <RatingGroup defaultValue={4} required>
        <RatingGroupLabel>Experience score</RatingGroupLabel>
        <RatingGroupControl>
          <RatingGroupItems />
        </RatingGroupControl>
      </RatingGroup>
      <FieldHelperText>Required score from 1 to 5.</FieldHelperText>
      <FieldErrorText>Choose a score before continuing.</FieldErrorText>
    </Field>
  );
}