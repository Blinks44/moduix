<script lang="ts">
  import { Button } from '@moduix/svelte/button';

  const link = {
    href: '#button',
    label: 'Open Button Docs',
  };
</script>

<Button variant="outline">
  {#snippet asChild(props)}
    <a {...props()} href={link.href}>{link.label}</a>
  {/snippet}
</Button>