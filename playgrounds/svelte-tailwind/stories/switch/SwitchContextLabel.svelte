<script lang="ts">
  import { SwitchLabel, useSwitchContext } from '@/components/switch';

  const switchApi = useSwitchContext();
</script>

<SwitchLabel>Feature is {switchApi().checked ? 'enabled' : 'disabled'}</SwitchLabel>