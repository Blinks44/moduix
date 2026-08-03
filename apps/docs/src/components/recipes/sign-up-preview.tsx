import { SignUp } from './sign-up';

export function SignUpPreview() {
  return <SignUp onSubmit={(event) => event.preventDefault()} />;
}