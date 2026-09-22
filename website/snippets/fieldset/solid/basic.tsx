import { Field, FieldLabel } from '@moduix/solid/field';
import { Fieldset, FieldsetHelperText, FieldsetLegend } from '@moduix/solid/fieldset';
import { Input } from '@moduix/solid/input';
import styles from '@/components/examples/fieldset/fieldset-basic.module.css';

export default function ContactDetails() {
  return (
    <Fieldset class={styles.root}>
      <FieldsetLegend>Contact details</FieldsetLegend>
      <Field>
        <FieldLabel>Name</FieldLabel>
        <Input name="name" />
      </Field>
      <Field>
        <FieldLabel>Email</FieldLabel>
        <Input name="email" type="email" />
      </Field>
      <FieldsetHelperText>We only use these details to contact you.</FieldsetHelperText>
    </Fieldset>
  );
}