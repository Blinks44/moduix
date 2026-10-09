<script setup lang="ts">
import { Presence } from '@ark-ui/vue/presence';
import { Button } from '@moduix/vue/button';
import { Card, CardBody, CardDescription, CardHeader, CardTitle } from '@moduix/vue/card';
import { Stack } from '@moduix/vue/stack';
import { ref } from 'vue';
import styles from '@/components/examples/presence/presence-basic.module.css';

const present = ref(true);
</script>

<template>
  <Stack :class="styles.root" align="center" :gap="6">
    <Button size="sm" type="button" variant="outline" @click="() => (present = !present)">
      {{ present ? 'Hide activity' : 'Show activity' }}
    </Button>

    <Presence :class="styles.panel" :present="present" unmount-on-exit>
      <Card :class="styles.card">
        <CardHeader>
          <CardTitle>Import complete</CardTitle>
          <CardDescription>24 contacts are ready to review.</CardDescription>
        </CardHeader>
        <CardBody>
          Review their fields and invite them to the workspace when you are ready.
        </CardBody>
      </Card>
    </Presence>
  </Stack>
</template>