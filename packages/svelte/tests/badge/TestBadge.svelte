<script lang="ts">
  import { Badge, type BadgeRootProps } from '@/components/badge';

  let { ...props }: BadgeRootProps = $props();
</script>

<Badge {...props}>Ready for stakeholder review</Badge>