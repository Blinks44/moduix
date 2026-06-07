import type { Meta, StoryObj } from '@storybook/react-vite';
import { Field, FieldDescription, FieldLabel } from '../field';
import { CopyButton } from './CopyButton';
import styles from './CopyButton.stories.module.css';

const meta = {
  title: 'Components/CopyButton',
  component: CopyButton,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  args: {
    value: 'maps-platform-token',
  },
} satisfies Meta<typeof CopyButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const IconOnly: Story = {
  args: {
    'aria-label': 'Copy token',
  },
};

export const WithTextLabel: Story = {
  args: {
    children: 'Copy invite link',
    copyLabels: {
      copy: 'Copy invite link',
      copied: 'Invite link copied',
    },
    value: 'https://moduix.dev/invite/maps',
  },
};

export const InField: Story = {
  render: () => {
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
  },
};

export const CustomLabels: Story = {
  args: {
    value: 'workspace-secret',
    copyLabels: {
      copy: 'Copy secret',
      copied: 'Secret copied',
    },
    'aria-label': 'Copy secret',
  },
};

export const CustomStyles: Story = {
  args: {
    value: 'workspace-secret',
    variant: 'outline',
    className: styles.customButton,
    'aria-label': 'Copy workspace secret',
  },
};