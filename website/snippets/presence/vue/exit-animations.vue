<script setup lang="ts">
import { Presence } from '@ark-ui/vue/presence';
import { Button } from '@moduix/vue/button';
import { Card } from '@moduix/vue/card';
import { Stack } from '@moduix/vue/stack';
import { ref } from 'vue';
import styles from '@/components/examples/presence/presence-exit-animations.module.css';

const present = ref(true);
const status = ref('Visible');
</script>

<template>
  <Stack :gap="4">
    <Button size="sm" type="button" variant="outline" @click="() => (present = !present)">
      {{ present ? 'Hide saved filters' : 'Show saved filters' }}
    </Button>

    <Presence
      :class="styles.panel"
      :present="present"
      unmount-on-exit
      @enter-complete="() => (status = 'Visible')"
      @exit-complete="() => (status = 'Hidden')"
    >
      <Card>Saved filters will apply to the next refresh.</Card>
    </Presence>

    <p aria-live="polite">Status: {{ status }}</p>
  </Stack>
</template>