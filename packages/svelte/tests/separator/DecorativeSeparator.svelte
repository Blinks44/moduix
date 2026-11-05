<script lang="ts">
  import { Separator } from '@/components/separator';

  let ref: Element | null = $state(null);

  export const getRef = () => ref;
</script>

<Separator data-testid="decorative" role="presentation" aria-orientation="vertical" />
<Separator bind:ref>
  {#snippet asChild(props)}
    <hr {...props()} data-testid="native-rule" />
  {/snippet}
</Separator>