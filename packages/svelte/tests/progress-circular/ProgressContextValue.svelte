<script lang="ts">
  import { useProgressContext } from '@/components/progress-circular';

  const progress = useProgressContext();
</script>

<output>{progress().value}</output>