<script lang="ts">
  import {
    CollapsibleBody,
    CollapsibleContent,
    CollapsibleIndicator,
    CollapsibleRootProvider,
    CollapsibleTrigger,
    useCollapsible,
  } from '@moduix/svelte/collapsible';
  import styles from '@/components/examples/collapsible/collapsible-root-provider.module.css';

  const recoveryKeys = ['alien-bean-pasta', 'wild-irish-burrito', 'horse-battery-staple'];
  const collapsible = useCollapsible();
</script>

<div class={styles.layout}>
  <CollapsibleRootProvider class={styles.root} value={collapsible}>
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
  </CollapsibleRootProvider>
  <output>
    State: open {String(collapsible().open)}, visible {String(collapsible().visible)}
  </output>
</div>