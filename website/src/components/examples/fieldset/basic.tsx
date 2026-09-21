import { Field, FieldLabel } from '@moduix/react/field';
import { Fieldset, FieldsetHelperText, FieldsetLegend } from '@moduix/react/fieldset';
import { Input } from '@moduix/react/input';
import styles from '@/components/examples/fieldset/fieldset-basic.module.css';

export default function ContactDetails() {
  return (
    <Fieldset className={styles.root}>
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
