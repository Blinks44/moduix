<script lang="ts">
  import { Button } from '@moduix/svelte/button';
  import {
    Collapsible,
    CollapsibleBody,
    CollapsibleContent,
    CollapsibleContext,
    CollapsibleIndicator,
    CollapsibleTrigger,
  } from '@moduix/svelte/collapsible';
  import styles from '@/components/examples/collapsible/collapsible-context.module.css';
</script>

<Collapsible class={styles.root} defaultOpen>
  <CollapsibleTrigger>
    Account details
    <CollapsibleIndicator />
  </CollapsibleTrigger>
  <CollapsibleContent>
    <CollapsibleBody>
      Use the context from a descendant when that descendant needs to close the disclosure.
      <CollapsibleContext>
        {#snippet render(context)}
          <Button size="sm" type="button" onclick={() => context().setOpen(false)}>
            Close details
          </Button>
        {/snippet}
      </CollapsibleContext>
    </CollapsibleBody>
  </CollapsibleContent>
</Collapsible>