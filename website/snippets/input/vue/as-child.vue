<script setup lang="ts">
import { FieldLabel, FieldRoot } from '@ark-ui/vue/field';
import { Input } from '@moduix/vue/input';
import styles from '@/components/examples/input/input-as-child.module.css';
</script>

<template>
  <FieldRoot :class="styles.root">
    <FieldLabel>Repository</FieldLabel>
    <Input as-child>
      <input name="repository" placeholder="owner/project" />
    </Input>
  </FieldRoot>
</template>