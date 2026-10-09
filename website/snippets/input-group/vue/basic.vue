<script setup lang="ts">
import { Field, FieldLabel } from '@moduix/vue/field';
import { InputGroup, InputGroupAddon, InputGroupInput } from '@moduix/vue/input-group';
import styles from '@/components/examples/input-group/input-group-basic.module.css';

const workspacePrefix = '@';
</script>

<template>
  <Field :class="styles.root">
    <FieldLabel>Workspace</FieldLabel>
    <InputGroup>
      <InputGroupAddon>{{ workspacePrefix }}</InputGroupAddon>
      <InputGroupInput name="workspace" placeholder="maps" />
    </InputGroup>
  </Field>
</template>