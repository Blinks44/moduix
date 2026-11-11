<script lang="ts">
  import { useToggleContext } from '@/components/toggle';

  const toggle = useToggleContext();
</script>

<span>{toggle().pressed ? 'Notifications on' : 'Notifications off'}</span>