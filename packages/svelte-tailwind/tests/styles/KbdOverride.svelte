<script lang="ts">
  import { Kbd, KbdGroup } from '@/components/kbd';
</script>

<KbdGroup class="gap-3 bg-card p-2 text-foreground" data-testid="group" aria-label="Command K">
  <Kbd
    class="min-h-8 min-w-8 rounded-md bg-card px-3 text-card-foreground shadow-none"
    data-testid="key"
  >
    Cmd
  </Kbd>
</KbdGroup>