<script setup lang="ts">
import { Button } from '@moduix/vue/button';
import { useListboxContext } from '@moduix/vue/listbox';
import { computed } from 'vue';
const props = defineProps<{ allValues: string[] }>();
const listbox = useListboxContext();
const allSelected = computed(() => listbox.value.value.length === props.allValues.length);
</script>

<template>
  <div>
    <output>Selected: {{ listbox.value.length }}</output>
    <Button type="button" @click="listbox.setValue(allSelected ? [] : allValues)">{{
      allSelected ? 'Clear all' : 'Select all'
    }}</Button>
  </div>
</template>