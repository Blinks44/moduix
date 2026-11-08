<script lang="ts">
  import { insideScrollSections } from '../data/insideScrollSections';
</script>

<div class="grid gap-3 p-3 pr-6">
  {#each insideScrollSections as item (item.title)}
    <section>
      <h3>{item.title}</h3>
      <p class="text-sm text-foreground">{item.body}</p>
    </section>
  {/each}
</div>