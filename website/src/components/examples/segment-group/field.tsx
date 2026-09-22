import { Field, FieldErrorText, FieldHelperText } from '@moduix/react/field';
import { SegmentGroup, SegmentGroupIndicator, SegmentGroupItems } from '@moduix/react/segment-group';
import styles from '@/components/examples/segment-group/segment-group-field.module.css';

const frameworks = [
  { value: 'React', label: 'React' },
  { value: 'Solid', label: 'Solid' },
  { value: 'Svelte', label: 'Svelte' },
  { value: 'Vue', label: 'Vue' },
];

export default function FieldSegmentGroupDemo() {
  return (
    <Field className={styles.root} invalid>
      <SegmentGroup aria-label="Framework" defaultValue="React" name="framework" required>
        <SegmentGroupIndicator />
        <SegmentGroupItems items={frameworks} />
      </SegmentGroup>
      <FieldHelperText>Choose the framework used by this project.</FieldHelperText>
      <FieldErrorText>Choose a supported framework.</FieldErrorText>
    </Field>
  );
}
