<script setup lang="ts">
import {
  Collapsible,
  CollapsibleBody,
  CollapsibleContent,
  CollapsibleIndicator,
  CollapsibleTrigger,
} from '@moduix/vue/collapsible';
import styles from '@/components/examples/collapsible/collapsible-basic.module.css';

const recoveryKeys = ['alien-bean-pasta', 'wild-irish-burrito', 'horse-battery-staple'];
</script>

<template>
  <Collapsible :class="styles.root">
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
</template>