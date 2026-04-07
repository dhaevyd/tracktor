export interface SettingsFormShape extends Record<string, unknown> {
  dateFormat: string;
  locale: string;
  timezone: string;
  currency: string;
  unitOfDistance: 'kilometer' | 'mile';
  unitOfVolume: 'liter' | 'gallon';
  unitOfLpg: 'liter' | 'gallon' | 'kilogram' | 'pound';
  unitOfCng: 'liter' | 'gallon' | 'kilogram' | 'pound';
  mileageUnitFormat: 'distance-per-fuel' | 'fuel-per-distance' | 'uk-mpg';
  theme: string;
  customCss?: string;
  featureFuelLog: boolean;
  featureMaintenance: boolean;
  featurePucc: boolean;
  featureReminders: boolean;
  featureInsurance: boolean;
  featureOverview: boolean;
  notificationProcessingEnabled?: boolean;
  notificationProcessingSchedule?: string;
  labelFuelTab?: string;
  labelMaintenanceTab?: string;
  labelInsuranceTab?: string;
  labelPollutionTab?: string;
  labelReminderTab?: string;
  labelOverviewTab?: string;
  colorReminder?: string;
  colorAlert?: string;
  colorInformation?: string;
}

export interface SettingsOption {
  value: string;
  label: string;
  colorPreview?: string;
}
