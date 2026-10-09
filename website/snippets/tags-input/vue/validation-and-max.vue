<script setup lang="ts">
import {
  TagsInput,
  TagsInputClearTrigger,
  TagsInputControl,
  TagsInputInput,
  TagsInputItems,
  TagsInputLabel,
} from '@moduix/vue/tags-input';
import { ref } from 'vue';
import styles from '@/components/examples/tags-input/tags-input-validation-and-max.module.css';

const invalidReason = ref('none');
const validate = (details: { inputValue: string; value: string[] }) =>
  details.inputValue.length >= 3 && !details.value.includes(details.inputValue);
</script>

<template>
  <div :class="styles.root">
    <TagsInput
      :max="3"
      :max-length="12"
      :default-value="['alpha', 'beta', 'gamma']"
      :validate="validate"
      @value-invalid="invalidReason = $event.reason"
    >
      <TagsInputLabel>Labels</TagsInputLabel>
      <TagsInputControl>
        <TagsInputItems />
        <TagsInputInput placeholder="Add unique label" />
        <TagsInputClearTrigger aria-label="Clear labels" />
      </TagsInputControl>
    </TagsInput>
    <output>Last invalid reason: {{ invalidReason }}</output>
  </div>
</template>