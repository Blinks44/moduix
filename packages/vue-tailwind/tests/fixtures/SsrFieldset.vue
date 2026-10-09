<script setup lang="ts">
import { Fieldset, FieldsetLegend, FieldsetHelperText, FieldsetErrorText } from '../../src';
</script>

<template>
  <Fieldset invalid>
    <FieldsetLegend>Hydrated fieldset</FieldsetLegend>
    <FieldsetHelperText>Helper text</FieldsetHelperText>
    <FieldsetErrorText>Error text</FieldsetErrorText>
  </Fieldset>
</template>