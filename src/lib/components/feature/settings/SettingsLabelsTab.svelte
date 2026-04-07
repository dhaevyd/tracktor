<script lang="ts">
  import * as Form from '$ui/form/index.js';
  import FormLabel from '$appui/FormLabel.svelte';
  import Input from '$appui/input.svelte';

  interface Props {
    form: any;
    formData: any;
    processing: boolean;
  }

  let { form, formData, processing }: Props = $props();
</script>

<fieldset class="grid gap-4 lg:grid-cols-2" disabled={processing}>
  <Form.Field {form} name="labelFuelTab" class="w-full">
    <Form.Control>
      {#snippet children({ props })}
        <FormLabel description="Leave blank to use the default label">Fuel Log Tab Title</FormLabel>
        <Input {...props} bind:value={$formData.labelFuelTab} placeholder="Fuel Logs" />
      {/snippet}
    </Form.Control>
    <Form.FieldErrors />
  </Form.Field>

  <Form.Field {form} name="labelMaintenanceTab" class="w-full">
    <Form.Control>
      {#snippet children({ props })}
        <FormLabel description="Leave blank to use the default label"
          >Maintenance Tab Title</FormLabel
        >
        <Input
          {...props}
          bind:value={$formData.labelMaintenanceTab}
          placeholder="Maintenance History"
        />
      {/snippet}
    </Form.Control>
    <Form.FieldErrors />
  </Form.Field>

  <Form.Field {form} name="labelInsuranceTab" class="w-full">
    <Form.Control>
      {#snippet children({ props })}
        <FormLabel description="Leave blank to use the default label">Insurance Tab Title</FormLabel
        >
        <Input
          {...props}
          bind:value={$formData.labelInsuranceTab}
          placeholder="Insurance Details"
        />
      {/snippet}
    </Form.Control>
    <Form.FieldErrors />
  </Form.Field>

  <Form.Field {form} name="labelPollutionTab" class="w-full">
    <Form.Control>
      {#snippet children({ props })}
        <FormLabel description="Leave blank to use the default label"
          >Pollution Certificate Tab Title</FormLabel
        >
        <Input
          {...props}
          bind:value={$formData.labelPollutionTab}
          placeholder="Pollution Certificate Details"
        />
      {/snippet}
    </Form.Control>
    <Form.FieldErrors />
  </Form.Field>

  <Form.Field {form} name="labelReminderTab" class="w-full">
    <Form.Control>
      {#snippet children({ props })}
        <FormLabel description="Leave blank to use the default label">Reminders Tab Title</FormLabel
        >
        <Input {...props} bind:value={$formData.labelReminderTab} placeholder="Reminders" />
      {/snippet}
    </Form.Control>
    <Form.FieldErrors />
  </Form.Field>

  <Form.Field {form} name="labelOverviewTab" class="w-full">
    <Form.Control>
      {#snippet children({ props })}
        <FormLabel description="Leave blank to use the default label">Overview Tab Title</FormLabel>
        <Input {...props} bind:value={$formData.labelOverviewTab} placeholder="Overview" />
      {/snippet}
    </Form.Control>
    <Form.FieldErrors />
  </Form.Field>
</fieldset>
