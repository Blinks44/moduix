<script lang="ts">
  import { Highlight } from '@/components/highlight';
  import { Input } from '@/components/input';
  import { Text } from '@/components/text';

  let query = $state('component');
</script>

<div class="grid w-[min(34rem,calc(100vw-2rem))] gap-4">
  <Input
    bind:value={query}
    aria-label="Search text"
    class="w-full max-w-[18rem]"
    placeholder="Search text..."
  />
  <Text>
    <Highlight
      {query}
      text="With Ark UI, you can build accessible, custom components. Each component is fully typed and works seamlessly with React, Solid, Svelte, and Vue."
    />
  </Text>
</div>