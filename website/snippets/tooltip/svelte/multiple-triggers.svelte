<script lang="ts">
  import { Info as InfoIcon, Plus as PlusIcon, Share as ShareIcon } from '@lucide/svelte';
  import { Button } from '@moduix/svelte/button';
  import { Tooltip, TooltipBody, TooltipTrigger } from '@moduix/svelte/tooltip';
  import styles from '@/components/examples/tooltip/component-multiple-triggers.module.css';

  const tooltipTools = [
    { id: 'create', label: 'Create', shortcut: 'Ctrl+N', icon: PlusIcon },
    { id: 'share', label: 'Share', shortcut: 'Ctrl+S', icon: ShareIcon },
    { id: 'details', label: 'Details', shortcut: 'Ctrl+I', icon: InfoIcon },
  ] as const;

  let activeTool = $state.raw<(typeof tooltipTools)[number] | null>(null);

  const handleTriggerValueChange = ({ value }: { value?: string | null }) => {
    activeTool = tooltipTools.find((tool) => tool.id === value) ?? null;
  };
</script>

<Tooltip onTriggerValueChange={handleTriggerValueChange}>
  <div class={styles.tools}>
    {#each tooltipTools as tool (tool.id)}
      <TooltipTrigger value={tool.id} aria-label={tool.label}>
        {#snippet asChild(props)}
          <Button {...props()} variant="ghost" size="icon-md">
            <tool.icon aria-hidden="true" />
          </Button>
        {/snippet}
      </TooltipTrigger>
    {/each}
  </div>
  <TooltipBody>
    {#if activeTool}{activeTool.label} ({activeTool.shortcut}){/if}
  </TooltipBody>
</Tooltip>