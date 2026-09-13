import type { FormEvent } from 'react';
import { SignUp } from './sign-up';

export function SignUpRoute() {
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const password = formData.get('password');
    const confirmation = formData.get('confirm-password');

    if (password !== confirmation) {
      const confirmationInput = form.elements.namedItem('confirm-password');

      if (confirmationInput instanceof HTMLInputElement) {
        confirmationInput.setCustomValidity('Passwords do not match.');
        confirmationInput.reportValidity();
        confirmationInput.setCustomValidity('');
      }

      return;
    }

    await fetch('/api/sign-up', { method: 'POST', body: formData });
  }

  return <SignUp onSubmit={handleSubmit} />;
}