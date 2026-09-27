<script setup lang="ts">
import { Button } from '@moduix/vue/button';
import {
  RadioGroupLabel,
  RadioGroupOption,
  RadioGroupRootProvider,
  useRadioGroup,
} from '@moduix/vue/radio-group';
import styles from '@/components/examples/radio-group/radio-group-root-provider.module.css';

const frameworks = ['React', 'Solid', 'Vue'];
const radioGroup = useRadioGroup({ defaultValue: 'React' });
</script>

<template>
  <div :class="styles.stack">
    <RadioGroupRootProvider :class="styles.root" :value="radioGroup">
      <RadioGroupLabel>Framework</RadioGroupLabel>
      <RadioGroupOption v-for="framework in frameworks" :key="framework" :value="framework">
        {{ framework }}
      </RadioGroupOption>
    </RadioGroupRootProvider>
    <output>Selected: {{ radioGroup.value ?? 'none' }}</output>
    <Button type="button" size="sm" @click="radioGroup.setValue('Solid')">Set to Solid</Button>
  </div>
</template>