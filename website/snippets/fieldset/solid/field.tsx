import { Field, FieldHelperText, FieldLabel } from '@moduix/solid/field';
import { Fieldset, FieldsetLegend } from '@moduix/solid/fieldset';
import { Input } from '@moduix/solid/input';
import styles from '@/components/examples/fieldset/fieldset-field.module.css';

export default function PersonalInformation() {
  return (
    <Fieldset class={styles.root}>
      <FieldsetLegend>Personal information</FieldsetLegend>
      <Field>
        <FieldLabel>First name</FieldLabel>
        <Input />
        <FieldHelperText>As it appears on your ID.</FieldHelperText>
      </Field>
      <Field>
        <FieldLabel>Last name</FieldLabel>
        <Input />
      </Field>
    </Fieldset>
  );
}
