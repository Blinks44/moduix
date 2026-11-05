<script lang="ts">
  import { useNumberInputContext } from '@/components/number-input';

  const numberInput = useNumberInputContext();
</script>

<button type="button" onclick={() => numberInput().setToMax()}>Set maximum</button>
<output>{numberInput().valueAsNumber}</output>