import { Field } from '@moduix/react/field';
import { RatingGroup } from '@moduix/react/rating-group';
import styles from '@/components/examples/rating-group/component-field.module.css';

export default function FieldRatingGroupDemo() {
  return (
    <Field className={styles.field}>
      <RatingGroup defaultValue={4} required>
        <RatingGroup.Label>Experience score</RatingGroup.Label>
        <RatingGroup.Control>
          <RatingGroup.Items />
        </RatingGroup.Control>
      </RatingGroup>
      <Field.HelperText>Required score from 1 to 5.</Field.HelperText>
      <Field.ErrorText>Choose a score before continuing.</Field.ErrorText>
    </Field>
  );
}