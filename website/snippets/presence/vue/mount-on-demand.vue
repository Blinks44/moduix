<script setup lang="ts">
import { Presence } from '@ark-ui/vue/presence';
import { Button } from '@moduix/vue/button';
import { Card, CardBody, CardDescription, CardHeader, CardTitle } from '@moduix/vue/card';
import { Stack } from '@moduix/vue/stack';
import { ref } from 'vue';
import styles from '@/components/examples/presence/presence-mount-on-demand.module.css';

const present = ref(false);
</script>

<template>
  <Stack :class="styles.root" align="center" :gap="6">
    <Button size="sm" type="button" variant="outline" @click="() => (present = !present)">
      {{ present ? 'Close update' : 'Open update' }}
    </Button>

    <Presence :class="styles.panel" lazy-mount :present="present" unmount-on-exit>
      <Card :class="styles.card">
        <CardHeader>
          <CardTitle>New workspace update</CardTitle>
          <CardDescription>The panel mounts only while it is needed.</CardDescription>
        </CardHeader>
        <CardBody>Publish the update when the release notes are ready for your team.</CardBody>
      </Card>
    </Presence>
  </Stack>
</template>