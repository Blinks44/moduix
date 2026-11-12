<script lang="ts">
  import { CloseButton } from '@moduix/svelte/close-button';
  import styles from '@/components/examples/close-button/close-button-basic.module.css';

  let isVisible = $state(true);

  const handleDismiss = () => {
    isVisible = false;
  };
</script>

{#if isVisible}
  <div class={styles.root}>
    <CloseButton
      aria-label="Dismiss notification"
      class={styles.closeButton}
      onclick={handleDismiss}
    />
    <p class={styles.title}>Draft saved</p>
    <p class={styles.description}>The notification can be dismissed.</p>
  </div>
{:else}
  <div data-preview-meta>
    <output>Notification dismissed</output>
  </div>
{/if}