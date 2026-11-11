<script lang="ts">
  import { useStepsItemContext } from '@/components/steps';

  const item = useStepsItemContext();
</script>

<span>First item is {item().current ? 'current' : 'not current'}</span>