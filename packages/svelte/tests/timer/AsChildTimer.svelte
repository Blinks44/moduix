<script lang="ts">
  import {
    Timer,
    TimerActionTrigger,
    TimerArea,
    TimerControl,
    TimerItem,
  } from '@/components/timer';

  let rootRef = $state<HTMLElement | null>(null);
  let areaRef = $state<HTMLElement | null>(null);
  let actionRef = $state<HTMLElement | null>(null);

  export const getRefs = () => ({ actionRef, areaRef, rootRef });
</script>

<Timer bind:ref={rootRef} targetMs={60000}>
  {#snippet asChild(rootProps)}
    <section {...rootProps()} data-testid="timer-section">
      <TimerArea bind:ref={areaRef}>
        {#snippet asChild(areaProps)}
          <article {...areaProps()} data-testid="timer-area-host">
            <TimerItem type="seconds" />
          </article>
        {/snippet}
      </TimerArea>
      <TimerControl>
        <TimerActionTrigger bind:ref={actionRef} action="start">
          {#snippet asChild(actionProps)}
            <a {...actionProps()} href="/start" data-testid="start-link">Start</a>
          {/snippet}
        </TimerActionTrigger>
      </TimerControl>
    </section>
  {/snippet}
</Timer>