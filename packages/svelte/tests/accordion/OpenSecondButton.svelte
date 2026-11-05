<script lang="ts">
  import { useAccordionContext } from '@/components/accordion';

  const accordion = useAccordionContext();
</script>

<button type="button" onclick={() => accordion().setValue(['second'])}>
  Open second from context
</button>