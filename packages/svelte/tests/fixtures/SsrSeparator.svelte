<script lang="ts">
  import { Separator } from '@/components/separator';
</script>

<Separator size="lg">
  {#snippet asChild(props)}
    <hr {...props()} />
  {/snippet}
</Separator>