<script lang="ts">
  import { ChevronDown as ChevronDownIcon } from '@lucide/svelte';
  import {
    Collapsible,
    CollapsibleContent,
    CollapsibleIndicator,
    CollapsibleTrigger,
  } from '@moduix/svelte/collapsible';
  import styles from '@/components/examples/collapsible/collapsible-build-from-parts.module.css';

  const recoveryKeys = ['alien-bean-pasta', 'wild-irish-burrito', 'horse-battery-staple'];
</script>

<Collapsible class={styles.root}>
  <CollapsibleTrigger>
    Recovery keys
    <CollapsibleIndicator>
      <ChevronDownIcon strokeWidth={3} />
    </CollapsibleIndicator>
  </CollapsibleTrigger>
  <CollapsibleContent>
    <div class={styles.body}>
      <ul class={styles.keysList}>
        {#each recoveryKeys as key (key)}
          <li>{key}</li>
        {/each}
      </ul>
    </div>
  </CollapsibleContent>
</Collapsible>