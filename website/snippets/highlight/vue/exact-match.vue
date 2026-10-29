<script setup lang="ts">
import { Highlight } from '@moduix/vue/highlight';
import { Stack } from '@moduix/vue/stack';
import { Text } from '@moduix/vue/text';
import styles from '@/components/examples/highlight/highlight-exact-match.module.css';
</script>

<template>
  <Stack gap="4">
    <div>
      <div :class="styles.label">Partial match</div>
      <Text>
        <Highlight
          match-all
          query="box"
          text="The checkbox component renders a box element. Use combobox for autocomplete."
        />
      </Text>
    </div>
    <div>
      <div :class="styles.label">Exact match</div>
      <Text>
        <Highlight
          exact-match
          match-all
          query="box"
          text="The checkbox component renders a box element. Use combobox for autocomplete."
        />
      </Text>
    </div>
  </Stack>
</template>