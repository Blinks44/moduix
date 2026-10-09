import type { FormEvent } from 'react';
import { LoginSimple } from './login-simple';

export function SignInRoute() {
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const response = await fetch('/api/sign-in', {
      method: 'POST',
      body: new FormData(event.currentTarget),
    });

    if (!response.ok) return;

    window.location.assign('/dashboard');
  }

  return <LoginSimple onSubmit={handleSubmit} />;
}