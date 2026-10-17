<script setup lang="ts">
import { Button } from '@moduix/vue/button';
import { Field, FieldLabel } from '@moduix/vue/field';
import { InputGroup, InputGroupAddon, InputGroupTextarea } from '@moduix/vue/input-group';
import { ref } from 'vue';
import styles from '@/components/examples/input-group/input-group-textarea.module.css';

const maxLength = 280;
const value = ref('');
</script>

<template>
  <Field :class="styles.root">
    <FieldLabel>Message</FieldLabel>
    <InputGroup>
      <InputGroupTextarea
        v-model="value"
        autoresize
        :maxlength="maxLength"
        placeholder="Write a reply"
      />
      <InputGroupAddon align="block">
        {{ value.length }}/{{ maxLength }}
        <Button :class="styles.send" size="sm" :disabled="!value.trim()">Send</Button>
      </InputGroupAddon>
    </InputGroup>
  </Field>
</template>