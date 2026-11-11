<script lang="ts">
  import { Field, FieldErrorText, FieldHelperText, FieldLabel } from '@moduix/svelte/field';
  import { RadioGroup, RadioGroupOption } from '@moduix/svelte/radio-group';
  import styles from '@/components/examples/radio-group/radio-group-with-field.module.css';
</script>

<Field class={styles.field} invalid>
  <FieldLabel>Account type</FieldLabel>
  <RadioGroup invalid required name="account-type">
    <RadioGroupOption value="personal">Personal account</RadioGroupOption>
    <RadioGroupOption value="team">Team account</RadioGroupOption>
  </RadioGroup>
  <FieldHelperText>Choose the default account context for new projects.</FieldHelperText>
  <FieldErrorText>Choose an account type.</FieldErrorText>
</Field>