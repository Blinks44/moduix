<script setup lang="ts">
import {
  Collapsible,
  CollapsibleBody,
  CollapsibleContent,
  CollapsibleIndicator,
  CollapsibleTrigger,
} from '@moduix/vue/collapsible';
import { ref } from 'vue';
import styles from '@/components/examples/collapsible/collapsible-controlled.module.css';

const recoveryKeys = ['alien-bean-pasta', 'wild-irish-burrito', 'horse-battery-staple'];
const open = ref(false);
</script>

<template>
  <div :class="[styles.layout, styles.controlledLayout]">
    <Collapsible v-model:open="open" :class="styles.root">
      <CollapsibleTrigger>
        Recovery keys
        <CollapsibleIndicator />
      </CollapsibleTrigger>
      <CollapsibleContent>
        <CollapsibleBody>
          <ul :class="styles.keysList">
            <li v-for="key in recoveryKeys" :key="key">{{ key }}</li>
          </ul>
        </CollapsibleBody>
      </CollapsibleContent>
    </Collapsible>
    <output>State: {{ open ? 'open' : 'closed' }}</output>
  </div>
</template>