<script setup lang="ts">
import { Button } from '@moduix/vue/button';
import { Stack } from '@moduix/vue/stack';
import { ToastToaster, createToaster } from '@moduix/vue/toast';

const toaster = createToaster({ placement: 'bottom-end', overlap: false, gap: 16 });
</script>

<template>
  <Stack align="center" gap="3">
    <ToastToaster :toaster="toaster" />
    <Button
      @click="
        toaster.info({
          title: 'Expanded toast',
          description: 'Each notification remains fully visible in the stack.',
        })
      "
    >
      Create expanded toast
    </Button>
  </Stack>
</template>