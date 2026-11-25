<script lang="ts">
  import { Tooltip, TooltipPanel, TooltipTrigger } from '@moduix/svelte/tooltip';
  import styles from '@/components/examples/tooltip/component-within-fixed-containers.module.css';
</script>

<div class={styles.root}>
  <div class={styles.content}>
    <div class={styles.sticky}>
      <Tooltip closeOnScroll={false} positioning={{ strategy: 'fixed' }}>
        <TooltipTrigger>Focus, then scroll</TooltipTrigger>
        <TooltipPanel>Stays anchored while this panel scrolls.</TooltipPanel>
      </Tooltip>
    </div>
    <p class={styles.end}>End of scroll area</p>
  </div>
</div>