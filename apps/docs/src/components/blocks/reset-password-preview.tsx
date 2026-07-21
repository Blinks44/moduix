import { ResetPassword } from './reset-password';

export function ResetPasswordPreview() {
  return <ResetPassword onSubmit={(event) => event.preventDefault()} />;
}