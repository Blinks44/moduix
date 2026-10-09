<script setup lang="ts">
import { useFormatHotkey, useHotkeys } from '@ark-ui/vue';
import {
  Card,
  CardBody,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@moduix/vue/card';
import { Kbd } from '@moduix/vue/kbd';
import { Stack } from '@moduix/vue/stack';
import { ref } from 'vue';

const destination = ref('Home');
const formatHotkey = useFormatHotkey();

useHotkeys({
  commands: [
    {
      action: () => (destination.value = 'Inbox'),
      hotkey: 'g > i',
      id: 'go-to-inbox',
      label: 'Go to inbox',
    },
    {
      action: () => (destination.value = 'Drafts'),
      hotkey: 'g > d',
      id: 'go-to-drafts',
      label: 'Go to drafts',
    },
  ],
});
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>Workspace navigation</CardTitle>
      <CardDescription>Press G, then I or D before the sequence times out.</CardDescription>
    </CardHeader>
    <CardBody>
      <Stack gap="3">
        <Stack align="center" direction="row" justify="space-between">
          <span>Open inbox</span>
          <Kbd>{{ formatHotkey('g > i') }}</Kbd>
        </Stack>
        <Stack align="center" direction="row" justify="space-between">
          <span>Open drafts</span>
          <Kbd>{{ formatHotkey('g > d') }}</Kbd>
        </Stack>
      </Stack>
    </CardBody>
    <CardFooter>
      <output aria-live="polite">Current view: {{ destination }}</output>
    </CardFooter>
  </Card>
</template>