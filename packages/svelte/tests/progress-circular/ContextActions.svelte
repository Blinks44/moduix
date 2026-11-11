<script lang="ts">
  import { useProgressContext } from '@/components/progress-circular';

  const progress = useProgressContext();
</script>

<button type="button" onclick={() => progress().setValue(75)}>Set progress</button>