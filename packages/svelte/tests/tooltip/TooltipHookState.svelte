<script lang="ts">
  import { useTooltipContext } from '@/components/tooltip';

  const tooltip = useTooltipContext();
</script>

<output>{tooltip().open ? 'open' : 'closed'}</output>