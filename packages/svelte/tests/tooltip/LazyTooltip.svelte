<script lang="ts">
  import { Tooltip, TooltipBody, TooltipTrigger } from '@/components/tooltip';

  let open = $state(false);
  let retain = $state(false);
</script>

<button onclick={() => (open = true)}>Open hint</button>
<button onclick={() => (open = false)}>Close hint</button>
<button onclick={() => (retain = true)}>Retain content</button>
<Tooltip bind:open unmountOnExit={!retain} portalled={false}>
  <TooltipTrigger>Save</TooltipTrigger>
  <TooltipBody data-testid="content">Save changes</TooltipBody>
</Tooltip>
<Tooltip lazyMount={false} unmountOnExit={false} portalled={false}>
  <TooltipTrigger>Eager</TooltipTrigger>
  <TooltipBody data-testid="eager">Eager content</TooltipBody>
</Tooltip>