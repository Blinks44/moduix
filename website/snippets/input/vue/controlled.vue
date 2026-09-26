<script setup lang="ts">
import { FieldLabel, FieldRoot } from '@ark-ui/vue/field';
import { Input } from '@moduix/vue/input';
import { ref } from 'vue';
import styles from '@/components/examples/input/input-controlled.module.css';

const value = ref('');
</script>

<template>
  <FieldRoot :class="styles.root">
    <FieldLabel>Username</FieldLabel>
    <Input v-model="value" placeholder="Type to control value" />
  </FieldRoot>
</template>