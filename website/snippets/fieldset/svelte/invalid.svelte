<script lang="ts">
  import { FieldErrorText, FieldLabel, FieldRoot as Field } from '@ark-ui/svelte/field';
  import { Fieldset, FieldsetErrorText, FieldsetLegend } from '@moduix/svelte/fieldset';
  import { Input } from '@moduix/svelte/input';
  import styles from '@/components/examples/fieldset/fieldset-invalid.module.css';
</script>

<Fieldset class={styles.root} invalid>
  <FieldsetLegend>Account information</FieldsetLegend>
  <FieldsetErrorText>Please fix the errors below to continue.</FieldsetErrorText>
  <Field invalid>
    <FieldLabel>Username</FieldLabel>
    <Input value="jo" />
    <FieldErrorText>Username must be at least 3 characters.</FieldErrorText>
  </Field>
  <Field invalid>
    <FieldLabel>Email</FieldLabel>
    <Input type="email" value="invalid-email" />
    <FieldErrorText>Enter a valid email address.</FieldErrorText>
  </Field>
</Fieldset>