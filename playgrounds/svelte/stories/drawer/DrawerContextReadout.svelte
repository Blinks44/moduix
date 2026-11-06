<script lang="ts">
  import { DrawerBody, useDrawerContext } from '@/components/drawer';

  const drawer = useDrawerContext();
</script>

<DrawerBody>Direction: {drawer().swipeDirection}; open: {String(drawer().open)}</DrawerBody>