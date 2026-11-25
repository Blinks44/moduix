<script setup lang="ts">
import { Bell as BellIcon } from '@lucide/vue';
import { Button } from '@moduix/vue/button';
import { Tooltip, TooltipPanel, TooltipTrigger } from '@moduix/vue/tooltip';
</script>

<template>
  <Tooltip>
    <TooltipTrigger as-child aria-label="Notifications">
      <Button><BellIcon aria-hidden="true" />Notifications</Button>
    </TooltipTrigger>
    <TooltipPanel>Notifications</TooltipPanel>
  </Tooltip>
</template>