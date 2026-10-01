<script setup lang="ts">
import { Button } from '@moduix/vue/button';
import { Tooltip, TooltipBody, TooltipDisabledTrigger } from '@moduix/vue/tooltip';
</script>

<template>
  <Tooltip>
    <TooltipDisabledTrigger aria-label="Create project is unavailable">
      <Button disabled>Create project</Button>
    </TooltipDisabledTrigger>
    <TooltipBody>Projects are unavailable while offline.</TooltipBody>
  </Tooltip>
</template>