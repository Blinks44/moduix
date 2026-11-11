<script lang="ts">
  import {
    ProgressLinear,
    ProgressLinearRange,
    ProgressLinearTrack,
  } from '@/components/progress-linear';
</script>

<ProgressLinear defaultValue={70}>
  <ProgressLinearTrack aria-label="Export status">
    {#snippet asChild(trackProps)}
      <output {...trackProps()}>
        <ProgressLinearRange>
          {#snippet asChild(rangeProps)}
            <span {...rangeProps()}></span>
          {/snippet}
        </ProgressLinearRange>
      </output>
    {/snippet}
  </ProgressLinearTrack>
</ProgressLinear>