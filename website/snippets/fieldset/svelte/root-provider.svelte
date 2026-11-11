<script lang="ts">
  import { FieldLabel, FieldRoot as Field } from '@ark-ui/svelte/field';
  import {
    FieldsetErrorText,
    FieldsetLegend,
    FieldsetRootProvider,
    useFieldset,
  } from '@moduix/svelte/fieldset';
  import { Input } from '@moduix/svelte/input';
  import styles from '@/components/examples/fieldset/fieldset-root-provider.module.css';

  const id = $props.id();
  const fieldset = useFieldset({ id, invalid: true });
</script>

<FieldsetRootProvider value={fieldset} class={styles.root}>
  <FieldsetLegend>Contact details</FieldsetLegend>
  <Field invalid>
    <FieldLabel>Email</FieldLabel>
    <Input type="email" value="invalid-address" />
  </Field>
  <FieldsetErrorText>Enter a valid email address.</FieldsetErrorText>
</FieldsetRootProvider>