<script lang="ts">
  import { Toggle, ToggleIndicator } from '@/components/toggle';
</script>

<Toggle defaultPressed>
  <svg aria-hidden="true" class="size-5" data-testid="root-icon"></svg>
  <ToggleIndicator>
    <svg aria-hidden="true" class="size-6" data-testid="indicator-icon"></svg>
  </ToggleIndicator>
</Toggle>