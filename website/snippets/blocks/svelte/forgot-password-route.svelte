<script lang="ts">
  import ForgotPassword from './forgot-password.svelte';

  const handleSubmit = async (event: SubmitEvent) => {
    event.preventDefault();
    if (!(event.currentTarget instanceof HTMLFormElement)) return;
    await fetch('/api/forgot-password', {
      method: 'POST',
      body: new FormData(event.currentTarget),
    });
  };
</script>

<ForgotPassword onsubmit={handleSubmit} />