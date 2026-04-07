<script lang="ts">
  import FeatureTabShell from '$appui/FeatureTabShell.svelte';
  import { vehicleStore } from '$lib/stores/vehicle.svelte';
  import ReminderForm from './ReminderForm.svelte';
  import ReminderList from './ReminderList.svelte';
  import * as m from '$lib/paraglide/messages';
  import { configStore } from '$stores/config.svelte';
</script>

<FeatureTabShell
  title={configStore.configs.labelReminderTab || m.reminder_tab_title()}
  listComponent={ReminderList}
  addSheetTitle={m.reminder_add_action()}
  addSheetComponent={ReminderForm}
  addSheetData={() => ({ vehicleId: vehicleStore.selectedId })}
/>
