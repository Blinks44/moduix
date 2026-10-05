<script setup lang="ts">
import { InputGroup, InputGroupInput } from '../../src';
</script>

<template>
  <InputGroup as-child class="hydrated-group">
    <section aria-label="Server group">
      <InputGroupInput aria-label="Server input" />
    </section>
  </InputGroup>
</template>