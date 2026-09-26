<script setup lang="ts">
import { ref } from 'vue';
import {
  Collapsible,
  CollapsibleBody,
  CollapsibleContent,
  CollapsibleIndicator,
  CollapsibleTrigger,
} from '../src/components/collapsible';

const open = ref(false);
</script>

<template>
  <Collapsible v-model:open="open">
    <CollapsibleTrigger>
      Recovery details
      <CollapsibleIndicator />
    </CollapsibleTrigger>
    <CollapsibleContent>
      <CollapsibleBody>Keep these details safe.</CollapsibleBody>
    </CollapsibleContent>
  </Collapsible>
</template>