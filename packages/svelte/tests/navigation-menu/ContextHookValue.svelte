<script lang="ts">
  import { useNavigationMenuContext } from '@/components/navigation-menu';

  const navigationMenu = useNavigationMenuContext();
</script>

<output data-testid="hook-value">{navigationMenu().value || 'none'}</output>