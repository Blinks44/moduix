<script setup lang="ts">
import {
  Collapsible,
  CollapsibleBody,
  CollapsibleContent,
  CollapsibleIndicator,
  CollapsibleTrigger,
} from '@moduix/vue/collapsible';
import styles from '@/components/examples/collapsible/collapsible-partial-collapse-width.module.css';
</script>

<template>
  <Collapsible collapsed-width="8rem" :class="styles.root">
    <CollapsibleTrigger>
      Read details
      <CollapsibleIndicator />
    </CollapsibleTrigger>
    <CollapsibleContent>
      <CollapsibleBody>
        Additional account-recovery details stay partly visible while this disclosure is closed.
      </CollapsibleBody>
    </CollapsibleContent>
  </Collapsible>
</template>