<script lang="ts">
  import { Badge } from '@moduix/svelte/badge';

  const link = {
    href: '#styling',
    label: 'Badge styling guidance',
  };
</script>

<Badge variant="link">
  {#snippet asChild(props)}
    <a {...props()} href={link.href}>{link.label}</a>
  {/snippet}
</Badge>