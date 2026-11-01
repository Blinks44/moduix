<script setup lang="ts">
import { Bell as BellIcon } from '@lucide/vue';
import { Button } from '@moduix/vue/button';
import { Tooltip, TooltipContent, TooltipPositioner, TooltipTrigger } from '@moduix/vue/tooltip';
</script>

<template>
  <Tooltip>
    <TooltipTrigger as-child aria-label="Notifications">
      <Button><BellIcon aria-hidden="true" />Notifications</Button>
    </TooltipTrigger>
    <TooltipPositioner>
      <TooltipContent>Notifications</TooltipContent>
    </TooltipPositioner>
  </Tooltip>
</template>