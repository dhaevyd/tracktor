<script lang="ts">
  import FeatureTabShell from '$appui/FeatureTabShell.svelte';
  import MaintenanceForm from './MaintenanceForm.svelte';
  import MaintenanceLogList from './MaintenanceLogList.svelte';
  import * as m from '$lib/paraglide/messages';
  import { configStore } from '$stores/config.svelte';
</script>

<FeatureTabShell
  title={configStore.configs.labelMaintenanceTab || m.maintenance_tab_title()}
  listComponent={MaintenanceLogList}
  addSheetTitle={m.maintenance_add_action()}
  addSheetComponent={MaintenanceForm}
/>
