<script lang="ts">
  import FeatureTabShell from '$appui/FeatureTabShell.svelte';
  import InsuranceForm from './InsuranceForm.svelte';
  import InsuranceDetailsList from './InsuranceList.svelte';
  import * as m from '$lib/paraglide/messages';
  import { configStore } from '$stores/config.svelte';
</script>

<FeatureTabShell
  title={configStore.configs.labelInsuranceTab || m.insurance_tab_title()}
  listComponent={InsuranceDetailsList}
  addSheetTitle={m.insurance_add_action()}
  addSheetComponent={InsuranceForm}
/>
