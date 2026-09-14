import { ForgotPassword } from './forgot-password';

export function ForgotPasswordRoute() {
  async function handleSubmit(event: SubmitEvent) {
    event.preventDefault();
    const form = event.currentTarget as HTMLFormElement;

    await fetch('/api/forgot-password', {
      method: 'POST',
      body: new FormData(form),
    });
  }

  return <ForgotPassword onSubmit={handleSubmit} />;
}