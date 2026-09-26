<script setup lang="ts">
import { Button } from '@moduix/vue/button';
import {
  Collapsible,
  CollapsibleBody,
  CollapsibleContent,
  CollapsibleContext,
  CollapsibleIndicator,
  CollapsibleTrigger,
} from '@moduix/vue/collapsible';
import styles from '@/components/examples/collapsible/collapsible-context.module.css';
</script>

<template>
  <Collapsible :class="styles.root" :default-open="true">
    <CollapsibleTrigger>
      Account details
      <CollapsibleIndicator />
    </CollapsibleTrigger>
    <CollapsibleContent>
      <CollapsibleBody>
        Use the context from a descendant when that descendant needs to close the disclosure.
        <CollapsibleContext v-slot="context">
          <Button size="sm" type="button" @click="context.setOpen(false)">Close details</Button>
        </CollapsibleContext>
      </CollapsibleBody>
    </CollapsibleContent>
  </Collapsible>
</template>