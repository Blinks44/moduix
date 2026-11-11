<script lang="ts">
  import { useProgressContext } from '@/components/progress-linear';

  const progress = useProgressContext();
</script>

<output>{progress().value}</output>