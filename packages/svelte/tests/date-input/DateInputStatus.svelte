<script lang="ts">
  import { useDateInputContext } from '@/components/date-input';

  const dateInput = useDateInputContext();
</script>

<output>{dateInput().valueAsString[0]}</output>