<script setup lang="ts">
import { Fieldset, FieldsetLegend, FieldsetHelperText, FieldsetErrorText } from '@/index';
</script>

<template>
  <Fieldset invalid>
    <FieldsetLegend>Hydrated fieldset</FieldsetLegend>
    <FieldsetHelperText>Helper text</FieldsetHelperText>
    <FieldsetErrorText>Error text</FieldsetErrorText>
  </Fieldset>
</template>