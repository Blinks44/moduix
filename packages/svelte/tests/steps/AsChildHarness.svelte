<script lang="ts">
  import {
    Steps,
    StepsContent,
    StepsIndicator,
    StepsItem,
    StepsList,
    StepsSeparator,
    StepsTrigger,
  } from '@/components/steps';

  let rootRef: Element | null = $state(null);
  let triggerRef: Element | null = $state(null);

  export const getRefs = () => ({ rootRef, triggerRef });
</script>

<Steps bind:ref={rootRef} count={2}>
  {#snippet asChild(rootProps)}
    <section {...rootProps()} aria-label="Setup steps">
      <StepsList>
        <StepsItem index={0}>
          <StepsTrigger bind:ref={triggerRef}>
            {#snippet asChild(props)}
              <a {...props()} href="#account"><StepsIndicator>Start</StepsIndicator>Account</a>
            {/snippet}
          </StepsTrigger>
          <StepsSeparator />
        </StepsItem>
        <StepsItem index={1}><StepsTrigger><StepsIndicator />Profile</StepsTrigger></StepsItem>
      </StepsList>
      <StepsContent index={0}>Account content</StepsContent>
      <StepsContent index={1}>Profile content</StepsContent>
    </section>
  {/snippet}
</Steps>