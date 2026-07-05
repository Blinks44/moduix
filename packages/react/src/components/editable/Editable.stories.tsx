import type { Meta, StoryObj } from '@storybook/react-vite';
import { Editable as EditablePrimitive, useEditable } from '@ark-ui/react/editable';
import { useState } from 'react';
import { Field } from '../field';
import { Editable } from './Editable';
import storyStyles from './Editable.stories.module.css';

const meta = {
  title: 'Components/Editable',
  component: Editable,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Editable>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => (
    <Editable defaultValue="Layer name">
      <Editable.Label>Name</Editable.Label>
      <Editable.Area>
        <Editable.Input />
        <Editable.Preview />
      </Editable.Area>
      <Editable.Control>
        <EditablePrimitive.Context>
          {(editable) =>
            editable.editing ? (
              <>
                <Editable.SubmitTrigger />
                <Editable.CancelTrigger />
              </>
            ) : (
              <Editable.EditTrigger />
            )
          }
        </EditablePrimitive.Context>
      </Editable.Control>
    </Editable>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState('Downtown route');

    return (
      <div className={storyStyles.stack}>
        <Editable value={value} onValueChange={(details) => setValue(details.value)}>
          <Editable.Label>Controlled value</Editable.Label>
          <Editable.Area>
            <Editable.Input />
            <Editable.Preview />
          </Editable.Area>
          <Editable.Control>
            <Editable.EditTrigger />
          </Editable.Control>
        </Editable>
        <p className={storyStyles.hint}>Current value: {value || 'empty'}</p>
      </div>
    );
  },
};

export const Context: Story = {
  render: () => (
    <Editable defaultValue="Service area">
      <Editable.Label>Name</Editable.Label>
      <Editable.Area>
        <Editable.Input />
        <Editable.Preview />
      </Editable.Area>
      <EditablePrimitive.Context>
        {(editable) =>
          editable.editing ? (
            <p className={storyStyles.hint}>Enter to save, Esc to cancel.</p>
          ) : (
            <Editable.Control>
              <Editable.EditTrigger />
            </Editable.Control>
          )
        }
      </EditablePrimitive.Context>
    </Editable>
  ),
};

export const Controls: Story = {
  render: () => (
    <Editable defaultValue="Transit corridor" submitMode="none">
      <Editable.Label>Project title</Editable.Label>
      <Editable.Area>
        <Editable.Input />
        <Editable.Preview />
      </Editable.Area>
      <Editable.Control>
        <EditablePrimitive.Context>
          {(editable) =>
            editable.editing ? (
              <>
                <Editable.SubmitTrigger />
                <Editable.CancelTrigger />
              </>
            ) : (
              <Editable.EditTrigger />
            )
          }
        </EditablePrimitive.Context>
      </Editable.Control>
    </Editable>
  ),
};

export const Textarea: Story = {
  render: () => (
    <Editable
      className={storyStyles.textareaRoot}
      defaultValue="Ark UI keeps the editable state, keyboard handling, and focus lifecycle."
      submitMode="none"
      placeholder="Enter a description"
    >
      <Editable.Label>Description</Editable.Label>
      <Editable.Area className={storyStyles.textareaArea}>
        <Editable.Input asChild className={storyStyles.textareaInput}>
          <textarea />
        </Editable.Input>
        <Editable.Preview className={storyStyles.textareaPreview} />
      </Editable.Area>
      <Editable.Control>
        <EditablePrimitive.Context>
          {(editable) =>
            editable.editing ? (
              <>
                <Editable.SubmitTrigger />
                <Editable.CancelTrigger />
              </>
            ) : (
              <Editable.EditTrigger />
            )
          }
        </EditablePrimitive.Context>
      </Editable.Control>
      <p className={storyStyles.hint}>Double-click to edit. Press Cmd/Ctrl + Enter to save.</p>
    </Editable>
  ),
};

export const WithField: Story = {
  render: () => (
    <Field invalid>
      <Editable defaultValue="" placeholder="Click to edit your bio" required>
        <Editable.Label>Bio</Editable.Label>
        <Editable.Area>
          <Editable.Input />
          <Editable.Preview />
        </Editable.Area>
        <Editable.Control>
          <Editable.EditTrigger />
        </Editable.Control>
      </Editable>
      <Field.ErrorText>Bio is required.</Field.ErrorText>
    </Field>
  ),
};

export const RootProvider: Story = {
  render: () => {
    const editable = useEditable({
      activationMode: 'dblclick',
      defaultValue: 'Root provider value',
    });

    return (
      <div className={storyStyles.stack}>
        <Editable.RootProvider value={editable}>
          <Editable.Label>External state</Editable.Label>
          <Editable.Area>
            <Editable.Input />
            <Editable.Preview />
          </Editable.Area>
          <Editable.Control>
            <EditablePrimitive.Context>
              {(editable) =>
                editable.editing ? (
                  <>
                    <Editable.SubmitTrigger />
                    <Editable.CancelTrigger />
                  </>
                ) : (
                  <Editable.EditTrigger />
                )
              }
            </EditablePrimitive.Context>
          </Editable.Control>
        </Editable.RootProvider>
        <div className={storyStyles.actions}>
          <button type="button" onClick={() => editable.edit()}>
            Edit
          </button>
          <button type="button" onClick={() => editable.setValue('Updated externally')}>
            Update
          </button>
        </div>
      </div>
    );
  },
};

export const CustomStyling: Story = {
  render: () => (
    <Editable defaultValue="Custom area">
      <Editable.Label>Styled editable</Editable.Label>
      <Editable.Area className={storyStyles.customArea}>
        <Editable.Input />
        <Editable.Preview />
      </Editable.Area>
      <Editable.Control>
        <Editable.EditTrigger />
      </Editable.Control>
    </Editable>
  ),
};