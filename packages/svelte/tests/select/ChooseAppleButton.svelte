<script lang="ts">
  import { useSelectContext } from '@/components/select';

  const select = useSelectContext();
</script>

<button type="button" onclick={() => select().setValue(['apple'])}>Choose apple</button>
<output>{select().value.join(', ')}</output>