import type { FormEvent } from 'react';
import { ForgotPassword } from './forgot-password';

export function ForgotPasswordRoute() {
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    await fetch('/api/forgot-password', {
      method: 'POST',
      body: new FormData(event.currentTarget),
    });
  }

  return <ForgotPassword onSubmit={handleSubmit} />;
}