import { Field } from '@moduix/react/field';
import { SegmentGroup } from '@moduix/react/segment-group';

const frameworks = [
  { value: 'React', label: 'React' },
  { value: 'Solid', label: 'Solid' },
  { value: 'Svelte', label: 'Svelte' },
  { value: 'Vue', label: 'Vue' },
];

export default function FieldSegmentGroupDemo() {
  return (
    <Field invalid>
      <SegmentGroup aria-label="Framework" defaultValue="React" name="framework" required>
        <SegmentGroup.Indicator />
        <SegmentGroup.Items items={frameworks} />
      </SegmentGroup>
      <Field.HelperText>Choose the framework used by this project.</Field.HelperText>
      <Field.ErrorText>Choose a supported framework.</Field.ErrorText>
    </Field>
  );
}