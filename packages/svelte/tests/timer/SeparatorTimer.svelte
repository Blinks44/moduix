<script lang="ts">
  import { Timer, TimerSegments } from '@/components/timer';

  let dot = $state(true);

  export const toggle = () => {
    dot = !dot;
  };
</script>

{#snippet dotSeparator()}
  <span data-testid="separator-content">·</span>
{/snippet}

{#snippet slashSeparator()}
  <strong data-testid="separator-content">/</strong>
{/snippet}

<Timer targetMs={60000}>
  <TimerSegments
    types={['minutes', 'seconds']}
    separator={dot ? dotSeparator : slashSeparator}
    class="custom-area"
  />
</Timer>