<script lang="ts">
  import { Format } from '@ark-ui/svelte/format';
</script>

<p>
  Available balance:
  <strong>
    <Format.Number value={12_345.67} />
  </strong>
</p>