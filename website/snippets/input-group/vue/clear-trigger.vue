<script setup lang="ts">
import { Field, FieldLabel } from '@moduix/vue/field';
import { InputGroup, InputGroupClearTrigger, InputGroupInput } from '@moduix/vue/input-group';
import { ref } from 'vue';
import type { ComponentPublicInstance } from 'vue';
import styles from '@/components/examples/input-group/input-group-clear-trigger.module.css';

const query = ref('moduix');
const inputRef = ref<ComponentPublicInstance>();
const handleClear = () => {
  query.value = '';
  inputRef.value?.$el.focus();
};
</script>

<template>
  <Field :class="styles.root">
    <FieldLabel>Search</FieldLabel>
    <InputGroup>
      <InputGroupInput ref="inputRef" v-model="query" placeholder="Search…" />
      <InputGroupClearTrigger v-if="query" aria-label="Clear search" @click="handleClear" />
    </InputGroup>
  </Field>
</template>