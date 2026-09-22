import { Input } from '@moduix/react/input';
import {
  Steps,
  StepsCompletedContent,
  StepsContent,
  StepsIndicator,
  StepsItem,
  StepsList,
  StepsNextTrigger,
  StepsPrevTrigger,
  StepsSeparator,
  StepsTrigger,
} from '@moduix/react/steps';
import { useState } from 'react';
import { PreviewMeta } from '@/components/mdx/Components';
import styles from '@/components/examples/steps/steps-validation.module.css';

export default function StepsValidationDemo() {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('Enter a name to continue.');

  return (
    <div className={styles.container}>
      <Steps
        count={2}
        linear
        isStepValid={(index) => index !== 0 || name.trim().length > 0}
        onStepInvalid={() => setMessage('Enter a name before moving to the next step.')}
        onStepChange={() => setMessage('Step changed.')}
      >
        <StepsList>
          <StepsItem index={0}>
            <StepsTrigger>
              <StepsIndicator />
              Account
            </StepsTrigger>
            <StepsSeparator />
          </StepsItem>
          <StepsItem index={1}>
            <StepsTrigger>
              <StepsIndicator />
              Profile
            </StepsTrigger>
          </StepsItem>
        </StepsList>

        <StepsContent index={0}>
          <label>
            Name
            <Input value={name} onChange={(event) => setName(event.target.value)} />
          </label>
        </StepsContent>
        <StepsContent index={1}>Your profile can now be completed.</StepsContent>
        <StepsCompletedContent>Steps complete.</StepsCompletedContent>

        <div className={styles.actions}>
          <StepsPrevTrigger>Back</StepsPrevTrigger>
          <StepsNextTrigger>Next</StepsNextTrigger>
        </div>
      </Steps>
      <PreviewMeta>
        <output>{message}</output>
      </PreviewMeta>
    </div>
  );
}
