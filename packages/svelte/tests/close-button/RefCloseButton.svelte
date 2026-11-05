<script lang="ts">
  import { CloseButton } from '@/components/close-button';

  let ref: Element | null = $state(null);

  export const getRef = () => ref;
</script>

<CloseButton bind:ref data-testid="close-button" />