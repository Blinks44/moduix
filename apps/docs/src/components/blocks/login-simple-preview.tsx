import { LoginSimple } from './login-simple';

export function LoginSimplePreview() {
  return <LoginSimple onSubmit={(event) => event.preventDefault()} />;
}