import { ForgotPassword } from './forgot-password';

export function ForgotPasswordPreview() {
  return <ForgotPassword onSubmit={(event) => event.preventDefault()} />;
}