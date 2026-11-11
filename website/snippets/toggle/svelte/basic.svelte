<script lang="ts">
  import { Star as StarIcon } from '@lucide/svelte';
  import { Toggle } from '@moduix/svelte/toggle';
</script>

<Toggle defaultPressed>
  <StarIcon aria-hidden="true" focusable="false" />
  Favorite
</Toggle>