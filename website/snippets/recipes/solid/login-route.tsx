import { LoginSimple } from './login-simple';

export function SignInRoute() {
  async function handleSubmit(event: SubmitEvent) {
    event.preventDefault();
    const form = event.currentTarget as HTMLFormElement;

    const response = await fetch('/api/sign-in', {
      method: 'POST',
      body: new FormData(form),
    });

    if (!response.ok) return;

    window.location.assign('/dashboard');
  }

  return <LoginSimple onSubmit={handleSubmit} />;
}