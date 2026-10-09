<script setup lang="ts">
import {
  Collapsible,
  CollapsibleBody,
  CollapsibleContent,
  CollapsibleIndicator,
  CollapsibleTrigger,
} from '@moduix/vue/collapsible';
import styles from '@/components/examples/collapsible/collapsible-nested.module.css';

const recoveryKeys = ['alien-bean-pasta', 'wild-irish-burrito', 'horse-battery-staple'];
</script>

<template>
  <Collapsible :class="styles.root">
    <CollapsibleTrigger>
      Account security
      <CollapsibleIndicator />
    </CollapsibleTrigger>
    <CollapsibleContent>
      <CollapsibleBody :class="styles.nestedContent">
        <p>Security options for this account.</p>
        <Collapsible :class="styles.nestedRoot">
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
      </CollapsibleBody>
    </CollapsibleContent>
  </Collapsible>
</template>