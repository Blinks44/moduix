<script lang="ts">
  import { FieldHelperText, FieldLabel, FieldRoot as Field } from '@ark-ui/svelte/field';
  import { Fieldset, FieldsetLegend } from '@moduix/svelte/fieldset';
  import { Input } from '@moduix/svelte/input';
  import styles from '@/components/examples/fieldset/fieldset-field.module.css';
</script>

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