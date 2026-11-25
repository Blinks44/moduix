<script setup lang="ts">
import { Button } from '@moduix/vue/button';
import { Stack } from '@moduix/vue/stack';
import { ToastToaster, toast } from '@moduix/vue/toast';
</script>

<template>
  <Stack align="center" gap="3">
    <ToastToaster />
    <Button
      @click="
        toast('Scheduled for tomorrow', {
          description: 'Your meeting has been scheduled for tomorrow at 10am.',
        })
      "
    >
      Schedule meeting
    </Button>
  </Stack>
</template>