import { Field } from '@moduix/solid/field';
import { SegmentGroup } from '@moduix/solid/segment-group';
import styles from '@/components/examples/segment-group/segment-group-field.module.css';

const frameworks = [
  { value: 'React', label: 'React' },
  { value: 'Solid', label: 'Solid' },
  { value: 'Svelte', label: 'Svelte' },
  { value: 'Vue', label: 'Vue' },
];

export default function FieldSegmentGroupDemo() {
  return (
    <Field class={styles.root} invalid>
      <SegmentGroup aria-label="Framework" defaultValue="React" name="framework" required>
        <SegmentGroup.Indicator />
        <SegmentGroup.Items items={frameworks} />
      </SegmentGroup>
      <Field.HelperText>Choose the framework used by this project.</Field.HelperText>
      <Field.ErrorText>Choose a supported framework.</Field.ErrorText>
    </Field>
  );
}