<script setup lang="ts">
import { useFormatHotkey, useHotkey } from '@ark-ui/vue';
import { Button } from '@moduix/vue/button';
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

const status = ref('Not saved');
const formatHotkey = useFormatHotkey();

const saveDraft = () => {
  status.value = 'Saved just now';
};

useHotkey({
  action: saveDraft,
  hotkey: 'mod+S',
  label: 'Save draft',
  options: { preventDefault: true },
});
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>Draft</CardTitle>
      <CardDescription>Save your changes without leaving the keyboard.</CardDescription>
    </CardHeader>
    <CardBody>
      <Stack align="center" direction="row" justify="space-between">
        <span>Save draft</span>
        <Kbd>{{ formatHotkey('mod+S') }}</Kbd>
      </Stack>
    </CardBody>
    <CardFooter>
      <Stack align="center" direction="row" justify="space-between">
        <output aria-live="polite">{{ status }}</output>
        <Button @click="saveDraft" type="button"> Save draft </Button>
      </Stack>
    </CardFooter>
  </Card>
</template>