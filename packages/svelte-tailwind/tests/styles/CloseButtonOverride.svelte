<script lang="ts">
  import { CloseButton } from '@/components/close-button';
</script>

<CloseButton
  aria-label="Close panel"
  data-scope="accordion"
  data-part="trigger"
  data-slot="accordion-trigger"
  data-disabled=""
  class="size-10"
>
  {#snippet asChild(props)}
    <button {...props({ type: 'button' })}><svg aria-hidden="true"></svg></button>
  {/snippet}
</CloseButton>