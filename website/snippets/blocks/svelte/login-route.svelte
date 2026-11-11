<script lang="ts">
  import LoginSimple from './login-simple.svelte';

  const handleSubmit = async (event: SubmitEvent) => {
    event.preventDefault();
    if (!(event.currentTarget instanceof HTMLFormElement)) return;
    const response = await fetch('/api/sign-in', {
      method: 'POST',
      body: new FormData(event.currentTarget),
    });
    if (!response.ok) return;
    window.location.assign('/dashboard');
  };
</script>

<LoginSimple onsubmit={handleSubmit} />