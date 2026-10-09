<script setup lang="ts">
import { Bell as BellIcon } from '@lucide/vue';
import { Button } from '@moduix/vue/button';
import { Tooltip, TooltipBody, TooltipTrigger } from '@moduix/vue/tooltip';
</script>

<template>
  <Tooltip>
    <TooltipTrigger as-child aria-label="Notifications">
      <Button><BellIcon aria-hidden="true" />Notifications</Button>
    </TooltipTrigger>
    <TooltipBody>Notifications</TooltipBody>
  </Tooltip>
</template>