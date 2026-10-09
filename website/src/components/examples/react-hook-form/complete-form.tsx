import { createListCollection, useListCollection } from '@ark-ui/react/collection';
import { useFilter } from '@ark-ui/react/locale';
import { Button } from '@moduix/react/button';
import {
  Card,
  CardBody,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@moduix/react/card';
import {
  Checkbox,
  CheckboxControl,
  CheckboxHiddenInput,
  CheckboxLabel,
} from '@moduix/react/checkbox';
import {
  Combobox,
  ComboboxClearTrigger,
  ComboboxContent,
  ComboboxControl,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxList,
  ComboboxOption,
  ComboboxPositioner,
  ComboboxTrigger,
} from '@moduix/react/combobox';
import { Field, FieldErrorText, FieldLabel, FieldRequiredIndicator } from '@moduix/react/field';
import { Input } from '@moduix/react/input';
import {
  Select,
  SelectControl,
  SelectTrigger,
  SelectValueText,
  SelectIndicator,
  SelectPositioner,
  SelectContent,
  SelectItem,
  SelectItemText,
  SelectItemIndicator,
  SelectHiddenSelect,
} from '@moduix/react/select';
import { Textarea } from '@moduix/react/textarea';
import { Controller, useForm } from 'react-hook-form';
import styles from './react-hook-form-complete-form.module.css';

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

type FormValues = {
  name: string;
  team: string;
  reviewer: string;
  summary: string;
  notifications: boolean;
};

export default function ProjectForm() {
  const { contains } = useFilter({ sensitivity: 'base' });
  const { collection, filter } = useListCollection({
    initialItems: people,
    filter: contains,
  });
  const {
    control,
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    defaultValues: {
      name: '',
      team: '',
      reviewer: '',
      summary: '',
      notifications: false,
    },
  });

  return (
    <form
      className={styles.root}
      noValidate
      onSubmit={handleSubmit(async (values) => {
        await new Promise((resolve) => setTimeout(resolve, 600));
        console.log(values);
      })}
    >
      <Card>
        <CardHeader>
          <CardTitle>Create project</CardTitle>
          <CardDescription>Share the details your team needs to get started.</CardDescription>
        </CardHeader>

        <CardBody className={styles.stack}>
          <Field invalid={Boolean(errors.name)} required>
            <FieldLabel>
              Project name
              <FieldRequiredIndicator />
            </FieldLabel>
            <Input
              {...register('name', {
                required: 'Enter a project name.',
              })}
            />
            <FieldErrorText>{errors.name?.message}</FieldErrorText>
          </Field>

          <Controller
            name="team"
            control={control}
            rules={{ required: 'Choose a team.' }}
            render={({ field, fieldState }) => (
              <Field invalid={fieldState.invalid} required>
                <FieldLabel>
                  Team
                  <FieldRequiredIndicator />
                </FieldLabel>
                <Select
                  collection={teams}
                  name={field.name}
                  value={field.value ? [field.value] : []}
                  onValueChange={(details) => field.onChange(details.value[0] ?? '')}
                  onInteractOutside={field.onBlur}
                >
                  <SelectControl>
                    <SelectTrigger ref={field.ref}>
                      <SelectValueText placeholder="Choose a team" />
                    </SelectTrigger>
                    <SelectIndicator />
                  </SelectControl>
                  <SelectPositioner>
                    <SelectContent>
                      {teams.items.map((item) => (
                        <SelectItem key={item.value} item={item}>
                          <SelectItemText>{item.label}</SelectItemText>
                          <SelectItemIndicator />
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </SelectPositioner>
                  <SelectHiddenSelect />
                </Select>
                <FieldErrorText>{fieldState.error?.message}</FieldErrorText>
              </Field>
            )}
          />

          <Controller
            name="reviewer"
            control={control}
            rules={{ required: 'Choose a reviewer.' }}
            render={({ field, fieldState }) => (
              <Field invalid={fieldState.invalid} required>
                <FieldLabel>
                  Reviewer
                  <FieldRequiredIndicator />
                </FieldLabel>
                <Combobox
                  collection={collection}
                  name={field.name}
                  value={field.value ? [field.value] : []}
                  onValueChange={(details) => field.onChange(details.value[0] ?? '')}
                  onInputValueChange={(details) => filter(details.inputValue)}
                >
                  <ComboboxControl>
                    <ComboboxInput
                      ref={field.ref}
                      onBlur={field.onBlur}
                      placeholder="Search people"
                    />
                    <ComboboxClearTrigger aria-label="Clear reviewer" />
                    <ComboboxTrigger aria-label="Open reviewers" />
                  </ComboboxControl>
                  <ComboboxPositioner>
                    <ComboboxContent>
                      <ComboboxEmpty>No reviewers found.</ComboboxEmpty>
                      <ComboboxList>
                        {collection.items.map((item) => (
                          <ComboboxOption key={item.value} item={item}>
                            {item.label}
                          </ComboboxOption>
                        ))}
                      </ComboboxList>
                    </ComboboxContent>
                  </ComboboxPositioner>
                </Combobox>
                <FieldErrorText>{fieldState.error?.message}</FieldErrorText>
              </Field>
            )}
          />

          <Field>
            <FieldLabel>Summary</FieldLabel>
            <Textarea
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
                onBlur={field.onBlur}
              >
                <CheckboxControl />
                <CheckboxLabel>Send status notifications</CheckboxLabel>
                <CheckboxHiddenInput />
              </Checkbox>
            )}
          />
        </CardBody>

        <CardFooter>
          <Button className={styles.submit} type="submit" loading={isSubmitting}>
            {isSubmitting ? 'Creating…' : 'Create project'}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}