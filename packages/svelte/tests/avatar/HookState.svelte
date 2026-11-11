<script lang="ts">
  import { useAvatarContext } from '@/components/avatar';

  const avatar = useAvatarContext();
</script>

<output>Hook: {avatar().loaded ? 'loaded' : 'loading'}</output>