import { VerificationCode } from './verification-code';

export function VerificationCodePreview() {
  return <VerificationCode onSubmit={(event) => event.preventDefault()} />;
}