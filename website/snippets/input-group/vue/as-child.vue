<script setup lang="ts">
import { Field, FieldLabel } from '@moduix/vue/field';
import { InputGroup, InputGroupAddon, InputGroupInput } from '@moduix/vue/input-group';
import styles from '@/components/examples/input-group/input-group-as-child.module.css';

const repositoryOwner = 'moduix/';
</script>

<template>
  <Field :class="styles.root">
    <FieldLabel>Repository</FieldLabel>
    <InputGroup as-child>
      <div>
        <InputGroupAddon>{{ repositoryOwner }}</InputGroupAddon>
        <InputGroupInput placeholder="components" />
      </div>
    </InputGroup>
  </Field>
</template>