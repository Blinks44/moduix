<script lang="ts">
  import { ChevronDown as ChevronDownIcon } from '@lucide/svelte';
  import {
    Collapsible,
    CollapsibleBody,
    CollapsibleContent,
    CollapsibleIndicator,
    CollapsibleTrigger,
  } from '@moduix/svelte/collapsible';
  import styles from '@/components/examples/collapsible/collapsible-custom-trigger.module.css';

  const recoveryKeys = ['alien-bean-pasta', 'wild-irish-burrito', 'horse-battery-staple'];
</script>

<Collapsible class={styles.root}>
  <CollapsibleTrigger>
    {#snippet asChild(props)}
      <button {...props()} type="button" class={styles.customTrigger}>
        Styled recovery keys
        <CollapsibleIndicator class={styles.customIndicator}>
          <ChevronDownIcon />
        </CollapsibleIndicator>
      </button>
    {/snippet}
  </CollapsibleTrigger>
  <CollapsibleContent>
    <CollapsibleBody class={styles.customContentBody}>
      <ul class={styles.keysList}>
        {#each recoveryKeys as key (key)}
          <li>{key}</li>
        {/each}
      </ul>
    </CollapsibleBody>
  </CollapsibleContent>
</Collapsible>