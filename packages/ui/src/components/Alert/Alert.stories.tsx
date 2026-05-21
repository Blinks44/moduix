import type { Meta, StoryObj } from '@storybook/react-vite';
import * as React from 'react';
import { CheckFilledIcon, InfoIcon } from '@/primitives';
import { Alert, AlertContent, AlertDescription, AlertIcon, AlertTitle } from './Alert';
import styles from './Alert.stories.module.css';

const meta = {
  title: 'Components/Alert',
  component: Alert,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Alert>;

export default meta;

type Story = StoryObj<typeof meta>;

const variants = ['default', 'info', 'success', 'warning', 'destructive'] as const;

export const Basic: Story = {
  render: () => (
    <Alert>
      <AlertContent>
        <AlertTitle>Update available</AlertTitle>
        <AlertDescription>
          Install the latest version when your workflow allows it.
        </AlertDescription>
      </AlertContent>
    </Alert>
  ),
};

export const WithIcon: Story = {
  render: () => (
    <Alert variant="info">
      <AlertIcon>
        <InfoIcon />
      </AlertIcon>
      <AlertContent>
        <AlertTitle>Workspace sync is active</AlertTitle>
        <AlertDescription>Changes are being synced across all connected devices.</AlertDescription>
      </AlertContent>
    </Alert>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className={styles.stack}>
      {variants.map((variant) => (
        <Alert key={variant} variant={variant}>
          <AlertIcon>
            <InfoIcon />
          </AlertIcon>
          <AlertContent>
            <AlertTitle>{variant}</AlertTitle>
            <AlertDescription>Use this alert for {variant} feedback.</AlertDescription>
          </AlertContent>
        </Alert>
      ))}
    </div>
  ),
};

export const Dismissible: Story = {
  render: () => {
    const [open, setOpen] = React.useState(true);

    return (
      <div className={styles.stack}>
        <Alert variant="success" open={open} onOpenChange={setOpen} withCloseButton>
          <AlertIcon>
            <CheckFilledIcon />
          </AlertIcon>
          <AlertContent>
            <AlertTitle>Saved</AlertTitle>
            <AlertDescription>The alert closes with the default exit animation.</AlertDescription>
          </AlertContent>
        </Alert>
      </div>
    );
  },
};

export const WithoutDismissAnimation: Story = {
  render: () => (
    <Alert variant="warning" withCloseButton withDismissAnimation={false}>
      <AlertIcon>
        <InfoIcon />
      </AlertIcon>
      <AlertContent>
        <AlertTitle>Closing is instant</AlertTitle>
        <AlertDescription>
          Use this mode when animation would conflict with layout changes.
        </AlertDescription>
      </AlertContent>
    </Alert>
  ),
};

export const CustomStyles: Story = {
  render: () => (
    <Alert className={styles.customAlert} withCloseButton>
      <AlertIcon>
        <InfoIcon />
      </AlertIcon>
      <AlertContent>
        <AlertTitle>Custom alert</AlertTitle>
        <AlertDescription>Override CSS variables from the root alert slot.</AlertDescription>
      </AlertContent>
    </Alert>
  ),
};