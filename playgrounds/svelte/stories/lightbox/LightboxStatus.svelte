<script lang="ts">
  import { useLightboxContext } from '@/components/lightbox';
  import storyStyles from './Lightbox.stories.module.css';

  const dialog = useLightboxContext();
</script>

<span class={storyStyles.status}>Preview is {dialog().open ? 'open' : 'closed'}</span>