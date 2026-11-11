<script lang="ts">
  import {
    Collapsible,
    CollapsibleBody,
    CollapsibleContent,
    CollapsibleIndicator,
    CollapsibleTrigger,
  } from '@moduix/svelte/collapsible';
  import styles from '@/components/examples/collapsible/collapsible-basic.module.css';

  const recoveryKeys = ['alien-bean-pasta', 'wild-irish-burrito', 'horse-battery-staple'];
</script>

<Collapsible class={styles.root}>
  <CollapsibleTrigger>
    Recovery keys
    <CollapsibleIndicator />
  </CollapsibleTrigger>
  <CollapsibleContent>
    <CollapsibleBody>
      <ul class={styles.keysList}>
        {#each recoveryKeys as key (key)}
          <li>{key}</li>
        {/each}
      </ul>
    </CollapsibleBody>
  </CollapsibleContent>
</Collapsible>