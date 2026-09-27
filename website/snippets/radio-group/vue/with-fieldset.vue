<script setup lang="ts">
import { Fieldset, FieldsetLegend } from '@moduix/vue/fieldset';
import { RadioGroup, RadioGroupOption } from '@moduix/vue/radio-group';
import styles from '@/components/examples/radio-group/radio-group-with-fieldset.module.css';

const frameworks = ['React', 'Solid', 'Vue'];
</script>

<template>
  <Fieldset :class="styles.root">
    <FieldsetLegend>Select a framework</FieldsetLegend>
    <RadioGroup default-value="React">
      <RadioGroupOption v-for="framework in frameworks" :key="framework" :value="framework">
        {{ framework }}
      </RadioGroupOption>
    </RadioGroup>
  </Fieldset>
</template>