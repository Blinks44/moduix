<script lang="ts">
  import { FieldLabel, FieldRoot as Field } from '@ark-ui/svelte/field';
  import { Fieldset, FieldsetHelperText, FieldsetLegend } from '@moduix/svelte/fieldset';
  import { Input } from '@moduix/svelte/input';
  import styles from '@/components/examples/fieldset/fieldset-disabled.module.css';
</script>

<Fieldset class={styles.root} disabled>
  <FieldsetLegend>Shipping address</FieldsetLegend>
  <FieldsetHelperText>Your address cannot be changed after order confirmation.</FieldsetHelperText>
  <Field>
    <FieldLabel>Street</FieldLabel>
    <Input value="123 Main St" />
  </Field>
  <Field>
    <FieldLabel>City</FieldLabel>
    <Input value="San Francisco" />
  </Field>
</Fieldset>