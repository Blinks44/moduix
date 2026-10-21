import { Field, FieldErrorText, FieldHelperText } from '@moduix/solid/field';
import {
  SegmentGroup,
  SegmentGroupIndicator,
  SegmentGroupItems,
} from '@moduix/solid/segment-group';
import styles from '@/components/examples/segment-group/segment-group-field.module.css';

const frameworks = ['React', 'Solid', 'Svelte', 'Vue'];

export default function FieldSegmentGroupDemo() {
  return (
    <Field class={styles.root} invalid>
      <SegmentGroup aria-label="Framework" defaultValue="React" name="framework" invalid required>
        <SegmentGroupIndicator />
        <SegmentGroupItems items={frameworks} />
      </SegmentGroup>
      <FieldHelperText>Choose the framework used by this project.</FieldHelperText>
      <FieldErrorText>Choose a supported framework.</FieldErrorText>
    </Field>
  );
}