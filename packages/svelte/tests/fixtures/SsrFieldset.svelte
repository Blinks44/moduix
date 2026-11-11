<script lang="ts">
  import {
    Fieldset,
    FieldsetErrorText,
    FieldsetHelperText,
    FieldsetLegend,
  } from '@/components/fieldset';
</script>

<Fieldset invalid>
  <FieldsetLegend>Hydrated fieldset</FieldsetLegend>
  <FieldsetHelperText>Helper text</FieldsetHelperText>
  <FieldsetErrorText>Error text</FieldsetErrorText>
</Fieldset>