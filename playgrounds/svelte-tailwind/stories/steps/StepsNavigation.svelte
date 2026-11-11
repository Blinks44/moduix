<script lang="ts">
  import {
    StepsIndicator,
    StepsItem,
    StepsList,
    StepsSeparator,
    StepsTrigger,
  } from '@/components/steps';
  import { items } from './items';
</script>

<StepsList>
  {#each items as item, index (item.title)}
    <StepsItem {index}>
      <StepsTrigger>
        <StepsIndicator />
        <span>{item.title}</span>
      </StepsTrigger>
      <StepsSeparator />
    </StepsItem>
  {/each}
</StepsList>