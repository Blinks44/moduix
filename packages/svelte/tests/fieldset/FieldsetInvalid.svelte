<script lang="ts">
  import {
    Fieldset,
    FieldsetErrorText,
    FieldsetHelperText,
    FieldsetLegend,
  } from '@/components/fieldset';

  let { invalid = false }: { invalid?: boolean } = $props();
</script>

<Fieldset {invalid}>
  <FieldsetLegend>Contact details</FieldsetLegend>
  <FieldsetHelperText>We only use these details to contact you.</FieldsetHelperText>
  <FieldsetErrorText>Enter a valid email address.</FieldsetErrorText>
</Fieldset>