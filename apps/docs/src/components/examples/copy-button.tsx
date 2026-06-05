import type { ComponentProps } from 'react';
import { CopyButton, Field, FieldDescription, FieldLabel } from 'moduix';
import styles from './copy-button.module.css';

export function CopyButtonExample(props: ComponentProps<typeof CopyButton>) {
  return <CopyButton {...props} aria-label="Copy API token" value="maps-platform-token" />;
}

export function CopyButtonWithTextExample() {
  return (
    <CopyButton
      value="https://moduix.dev/invite/maps"
      copyLabels={{ copy: 'Copy invite link', copied: 'Invite link copied' }}
    >
      Copy invite link
    </CopyButton>
  );
}

export function CopyButtonFieldExample() {
  return (
    <Field className={styles.field}>
      <FieldLabel>API token</FieldLabel>
      <FieldDescription>Copy the token for local development.</FieldDescription>
      <div className={styles.row}>
        <span className={styles.value}>maps-platform-token</span>
        <CopyButton aria-label="Copy API token" value="maps-platform-token" />
      </div>
    </Field>
  );
}

export function CopyButtonCustomLabelsExample() {
  return (
    <CopyButton
      aria-label="Copy secret"
      value="workspace-secret"
      copyLabels={{ copy: 'Copy secret', copied: 'Secret copied' }}
    />
  );
}

export function CopyButtonCustomStylesExample() {
  return (
    <CopyButton
      aria-label="Copy workspace secret"
      className={styles.customButton}
      value="workspace-secret"
      variant="outline"
    />
  );
}