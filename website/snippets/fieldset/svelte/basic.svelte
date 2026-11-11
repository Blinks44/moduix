<script lang="ts">
  import { FieldLabel, FieldRoot as Field } from '@ark-ui/svelte/field';
  import { Fieldset, FieldsetHelperText, FieldsetLegend } from '@moduix/svelte/fieldset';
  import { Input } from '@moduix/svelte/input';
  import styles from '@/components/examples/fieldset/fieldset-basic.module.css';
</script>

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