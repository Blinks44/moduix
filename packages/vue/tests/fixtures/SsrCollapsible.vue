<script setup lang="ts">
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
  CollapsibleBody,
} from '@/components/collapsible';
</script>

<template>
  <Collapsible :default-open="true">
    <CollapsibleTrigger>Server details</CollapsibleTrigger>
    <CollapsibleContent><CollapsibleBody>Server content.</CollapsibleBody></CollapsibleContent>
  </Collapsible>
</template>