import { createListCollection, useListCollection } from '@ark-ui/react/collection';
import { useFilter } from '@ark-ui/react/locale';
import { Button, Card, Checkbox, Combobox, Field, Select } from '@moduix/react';
import { useForm as useTanStackForm } from '@tanstack/react-form';
import { useState } from 'react';
import { Controller, useForm as useReactHookForm } from 'react-hook-form';
import styles from './forms.module.css';

const teams = createListCollection({
  items: [
    { label: 'Platform', value: 'platform' },
    { label: 'Product', value: 'product' },
    { label: 'Design', value: 'design' },
  ],
});

const people = [
  { label: 'Ada Lovelace', value: 'ada' },
  { label: 'Grace Hopper', value: 'grace' },
  { label: 'Margaret Hamilton', value: 'margaret' },
  { label: 'Radia Perlman', value: 'radia' },
];

type NativeFormValues = {
  name: string;
  team: string;
  reviewer: string;
  summary: string;
  notifications: boolean;
};

type ManagedFormValues = {
  name: string;
  team: string;
  reviewer: string;
  summary: string;
  notifications: boolean;
};

const defaultValues: ManagedFormValues = {
  name: '',
  team: '',
  reviewer: '',
  summary: '',
  notifications: false,
};

function FormResult({ value }: { value: object | null }) {
  if (!value) return null;

  return (
    <pre className={styles.result}>
      <span className={styles.resultLabel}>Submitted values</span>
      {JSON.stringify(value, null, 2)}
    </pre>
  );
}

function TeamItems() {
  return teams.items.map((item) => (
    <Select.Item key={item.value} item={item}>
      <Select.ItemText>{item.label}</Select.ItemText>
      <Select.ItemIndicator />
    </Select.Item>
  ));
}

function SelectPopup() {
  return (
    <Select.Positioner>
      <Select.Content>
        <TeamItems />
      </Select.Content>
    </Select.Positioner>
  );
}

function ComboboxPopup({ items }: { items: typeof people }) {
  return (
    <Combobox.Positioner>
      <Combobox.Content>
        <Combobox.Empty>No reviewers found.</Combobox.Empty>
        <Combobox.List>
          {items.map((item) => (
            <Combobox.Item key={item.value} item={item}>
              <Combobox.ItemText>{item.label}</Combobox.ItemText>
              <Combobox.ItemIndicator />
            </Combobox.Item>
          ))}
        </Combobox.List>
      </Combobox.Content>
    </Combobox.Positioner>
  );
}

export function NativeFormExample() {
  const { contains } = useFilter({ sensitivity: 'base' });
  const { collection, filter } = useListCollection({ initialItems: people, filter: contains });
  const [submitted, setSubmitted] = useState<NativeFormValues | null>(null);

  return (
    <form
      className={styles.form}
      onSubmit={(event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        setSubmitted({
          name: String(data.get('name') ?? ''),
          team: String(data.get('team') ?? ''),
          reviewer: String(data.get('reviewer') ?? ''),
          summary: String(data.get('summary') ?? ''),
          notifications: data.has('notifications'),
        });
      }}
    >
      <Card>
        <Card.Header>
          <Card.Title>Create project</Card.Title>
          <Card.Description>Share the details your team needs to get started.</Card.Description>
        </Card.Header>

        <Card.Body className={styles.fields}>
          <Field required>
            <Field.Label>
              Project name
              <Field.RequiredIndicator />
            </Field.Label>
            <Field.Input name="name" />
          </Field>

          <Field required>
            <Field.Label>
              Team
              <Field.RequiredIndicator />
            </Field.Label>
            <Select collection={teams} name="team">
              <Select.Control>
                <Select.Trigger>
                  <Select.ValueText placeholder="Choose a team" />
                </Select.Trigger>
                <Select.Indicators>
                  <Select.Indicator />
                </Select.Indicators>
              </Select.Control>
              <SelectPopup />
              <Select.HiddenSelect />
            </Select>
          </Field>

          <Field required>
            <Field.Label>
              Reviewer
              <Field.RequiredIndicator />
            </Field.Label>
            <Combobox
              collection={collection}
              name="reviewer"
              onInputValueChange={(details) => filter(details.inputValue)}
            >
              <Combobox.Control>
                <Combobox.Input placeholder="Search people" />
                <Combobox.ClearTrigger aria-label="Clear reviewer" />
                <Combobox.Trigger aria-label="Open reviewers" />
              </Combobox.Control>
              <ComboboxPopup items={collection.items} />
            </Combobox>
          </Field>

          <Field>
            <Field.Label>Summary</Field.Label>
            <Field.Textarea name="summary" placeholder="What are you planning to build?" rows={3} />
          </Field>

          <Checkbox name="notifications">
            <Checkbox.Control />
            <Checkbox.Label>Send status notifications</Checkbox.Label>
            <Checkbox.HiddenInput />
          </Checkbox>
        </Card.Body>

        <Card.Footer>
          <Button className={styles.submit} type="submit">
            Create project
          </Button>
        </Card.Footer>
      </Card>

      <FormResult value={submitted} />
    </form>
  );
}

export function ReactHookFormExample() {
  const { contains } = useFilter({ sensitivity: 'base' });
  const { collection, filter } = useListCollection({ initialItems: people, filter: contains });
  const [submitted, setSubmitted] = useState<ManagedFormValues | null>(null);
  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
  } = useReactHookForm<ManagedFormValues>({ defaultValues });

  return (
    <form className={styles.form} noValidate onSubmit={handleSubmit(setSubmitted)}>
      <Card>
        <Card.Header>
          <Card.Title>Create project</Card.Title>
          <Card.Description>Share the details your team needs to get started.</Card.Description>
        </Card.Header>

        <Card.Body className={styles.fields}>
          <Field invalid={Boolean(errors.name)} required>
            <Field.Label>
              Project name
              <Field.RequiredIndicator />
            </Field.Label>
            <Field.Input {...register('name', { required: 'Enter a project name.' })} />
            <Field.ErrorText>{errors.name?.message}</Field.ErrorText>
          </Field>

          <Controller
            name="team"
            control={control}
            rules={{ required: 'Choose a team.' }}
            render={({ field, fieldState }) => (
              <Field invalid={fieldState.invalid} required>
                <Field.Label>
                  Team
                  <Field.RequiredIndicator />
                </Field.Label>
                <Select
                  collection={teams}
                  name={field.name}
                  value={field.value ? [field.value] : []}
                  onValueChange={(details) => field.onChange(details.value[0] ?? '')}
                  onInteractOutside={field.onBlur}
                >
                  <Select.Control>
                    <Select.Trigger ref={field.ref}>
                      <Select.ValueText placeholder="Choose a team" />
                    </Select.Trigger>
                    <Select.Indicators>
                      <Select.Indicator />
                    </Select.Indicators>
                  </Select.Control>
                  <SelectPopup />
                  <Select.HiddenSelect />
                </Select>
                <Field.ErrorText>{fieldState.error?.message}</Field.ErrorText>
              </Field>
            )}
          />

          <Controller
            name="reviewer"
            control={control}
            rules={{ required: 'Choose a reviewer.' }}
            render={({ field, fieldState }) => (
              <Field invalid={fieldState.invalid} required>
                <Field.Label>
                  Reviewer
                  <Field.RequiredIndicator />
                </Field.Label>
                <Combobox
                  collection={collection}
                  name={field.name}
                  value={field.value ? [field.value] : []}
                  onValueChange={(details) => field.onChange(details.value[0] ?? '')}
                  onInputValueChange={(details) => filter(details.inputValue)}
                >
                  <Combobox.Control>
                    <Combobox.Input
                      ref={field.ref}
                      onBlur={field.onBlur}
                      placeholder="Search people"
                    />
                    <Combobox.ClearTrigger aria-label="Clear reviewer" />
                    <Combobox.Trigger aria-label="Open reviewers" />
                  </Combobox.Control>
                  <ComboboxPopup items={collection.items} />
                </Combobox>
                <Field.ErrorText>{fieldState.error?.message}</Field.ErrorText>
              </Field>
            )}
          />

          <Field>
            <Field.Label>Summary</Field.Label>
            <Field.Textarea
              {...register('summary')}
              placeholder="What are you planning to build?"
              rows={3}
            />
          </Field>

          <Controller
            name="notifications"
            control={control}
            render={({ field }) => (
              <Checkbox
                name={field.name}
                checked={field.value}
                onCheckedChange={(details) => field.onChange(details.checked === true)}
              >
                <Checkbox.Control />
                <Checkbox.Label>Send status notifications</Checkbox.Label>
                <Checkbox.HiddenInput ref={field.ref} onBlur={field.onBlur} />
              </Checkbox>
            )}
          />
        </Card.Body>

        <Card.Footer>
          <Button className={styles.submit} type="submit">
            Create project
          </Button>
        </Card.Footer>
      </Card>

      <FormResult value={submitted} />
    </form>
  );
}

export function TanStackFormExample() {
  const { contains } = useFilter({ sensitivity: 'base' });
  const { collection, filter } = useListCollection({ initialItems: people, filter: contains });
  const [submitted, setSubmitted] = useState<ManagedFormValues | null>(null);
  const form = useTanStackForm({
    defaultValues,
    onSubmit: ({ value }) => setSubmitted(value),
  });

  return (
    <form
      className={styles.form}
      noValidate
      onSubmit={(event) => {
        event.preventDefault();
        event.stopPropagation();
        void form.handleSubmit();
      }}
    >
      <Card>
        <Card.Header>
          <Card.Title>Create project</Card.Title>
          <Card.Description>Share the details your team needs to get started.</Card.Description>
        </Card.Header>

        <Card.Body className={styles.fields}>
          <form.Field
            name="name"
            validators={{
              onSubmit: ({ value }) => (!value ? 'Enter a project name.' : undefined),
            }}
          >
            {(field) => (
              <Field invalid={!field.state.meta.isValid} required>
                <Field.Label>
                  Project name
                  <Field.RequiredIndicator />
                </Field.Label>
                <Field.Input
                  name={field.name}
                  value={field.state.value}
                  onChange={(event) => field.handleChange(event.currentTarget.value)}
                  onBlur={field.handleBlur}
                />
                <Field.ErrorText>{field.state.meta.errors.join(', ')}</Field.ErrorText>
              </Field>
            )}
          </form.Field>

          <form.Field
            name="team"
            validators={{
              onSubmit: ({ value }) => (!value ? 'Choose a team.' : undefined),
            }}
          >
            {(field) => (
              <Field invalid={!field.state.meta.isValid} required>
                <Field.Label>
                  Team
                  <Field.RequiredIndicator />
                </Field.Label>
                <Select
                  collection={teams}
                  name={field.name}
                  value={field.state.value ? [field.state.value] : []}
                  onValueChange={(details) => field.handleChange(details.value[0] ?? '')}
                  onInteractOutside={field.handleBlur}
                >
                  <Select.Control>
                    <Select.Trigger>
                      <Select.ValueText placeholder="Choose a team" />
                    </Select.Trigger>
                    <Select.Indicators>
                      <Select.Indicator />
                    </Select.Indicators>
                  </Select.Control>
                  <SelectPopup />
                  <Select.HiddenSelect />
                </Select>
                <Field.ErrorText>{field.state.meta.errors.join(', ')}</Field.ErrorText>
              </Field>
            )}
          </form.Field>

          <form.Field
            name="reviewer"
            validators={{
              onSubmit: ({ value }) => (!value ? 'Choose a reviewer.' : undefined),
            }}
          >
            {(field) => (
              <Field invalid={!field.state.meta.isValid} required>
                <Field.Label>
                  Reviewer
                  <Field.RequiredIndicator />
                </Field.Label>
                <Combobox
                  collection={collection}
                  name={field.name}
                  value={field.state.value ? [field.state.value] : []}
                  onValueChange={(details) => field.handleChange(details.value[0] ?? '')}
                  onInputValueChange={(details) => filter(details.inputValue)}
                >
                  <Combobox.Control>
                    <Combobox.Input onBlur={field.handleBlur} placeholder="Search people" />
                    <Combobox.ClearTrigger aria-label="Clear reviewer" />
                    <Combobox.Trigger aria-label="Open reviewers" />
                  </Combobox.Control>
                  <ComboboxPopup items={collection.items} />
                </Combobox>
                <Field.ErrorText>{field.state.meta.errors.join(', ')}</Field.ErrorText>
              </Field>
            )}
          </form.Field>

          <form.Field name="summary">
            {(field) => (
              <Field>
                <Field.Label>Summary</Field.Label>
                <Field.Textarea
                  name={field.name}
                  value={field.state.value}
                  onChange={(event) => field.handleChange(event.currentTarget.value)}
                  onBlur={field.handleBlur}
                  placeholder="What are you planning to build?"
                  rows={3}
                />
              </Field>
            )}
          </form.Field>

          <form.Field name="notifications">
            {(field) => (
              <Checkbox
                name={field.name}
                checked={field.state.value}
                onCheckedChange={(details) => field.handleChange(details.checked === true)}
              >
                <Checkbox.Control />
                <Checkbox.Label>Send status notifications</Checkbox.Label>
                <Checkbox.HiddenInput onBlur={field.handleBlur} />
              </Checkbox>
            )}
          </form.Field>
        </Card.Body>

        <Card.Footer>
          <form.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting] as const}
            children={([canSubmit, isSubmitting]) => (
              <Button className={styles.submit} type="submit" disabled={!canSubmit}>
                {isSubmitting ? 'Creating…' : 'Create project'}
              </Button>
            )}
          />
        </Card.Footer>
      </Card>

      <FormResult value={submitted} />
    </form>
  );
}