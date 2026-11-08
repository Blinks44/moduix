<script lang="ts">
  import { StepsCompletedContent, StepsContent } from '@/components/steps';
  import { items } from './items';
</script>

{#each items as item, index (item.title)}
  <StepsContent {index}>{item.title} - {item.description}</StepsContent>
{/each}
<StepsCompletedContent>Steps complete. The workspace is ready.</StepsCompletedContent>