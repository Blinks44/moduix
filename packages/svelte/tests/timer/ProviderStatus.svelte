<script lang="ts">
  import { useTimerContext } from '@/components/timer';

  const timer = useTimerContext();
</script>

<output>{timer().running ? 'Running' : 'Idle'}</output>