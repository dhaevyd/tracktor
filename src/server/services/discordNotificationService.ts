import type { NotificationProviderWithParsedConfig } from '$lib/domain/notification-provider';
import type { DispatchNotification } from './notification-payload.helper';

type DispatchResult = {
  providerId: string;
  providerName: string;
  providerType: string;
  success: boolean;
  error?: string;
  notificationCount: number;
};

type TestResult = {
  success: boolean;
  error?: string;
};

export type NotificationColors = {
  reminder: number;
  alert: number;
  information: number;
};

const DEFAULT_COLORS: NotificationColors = {
  reminder: 3447003, // blue
  alert: 15158332, // red
  information: 3066993 // green
};

function hexToInt(hex: string): number {
  return parseInt(hex.replace('#', ''), 16);
}

function getEmbedColor(notifications: DispatchNotification[], colors: NotificationColors): number {
  if (notifications.some((n) => n.channel === 'alert')) return colors.alert;
  if (notifications.some((n) => n.channel === 'reminder')) return colors.reminder;
  return colors.information;
}

function buildDiscordPayload(
  notifications: DispatchNotification[],
  colors: NotificationColors
): object {
  const fields = notifications.map((n) => ({
    name: `${n.vehicleName} — ${n.type.charAt(0).toUpperCase() + n.type.slice(1)}`,
    value: n.message || '\u200b',
    inline: false
  }));

  return {
    username: 'Tracktor',
    embeds: [
      {
        title: 'Tracktor Notification Summary',
        color: getEmbedColor(notifications, colors),
        description: `You have ${notifications.length} pending notification${notifications.length === 1 ? '' : 's'}`,
        fields,
        footer: {
          text: `Tracktor • ${new Date().toISOString()}`
        }
      }
    ]
  };
}

export async function sendDiscordNotification(
  provider: NotificationProviderWithParsedConfig,
  notifications: DispatchNotification[],
  webhookUrl: string,
  colors?: Partial<NotificationColors>
): Promise<DispatchResult> {
  if (!webhookUrl) {
    return {
      providerId: provider.id,
      providerName: provider.name,
      providerType: provider.type,
      success: false,
      error: 'DISCORD_WEBHOOK_URL is not configured',
      notificationCount: notifications.length
    };
  }

  const resolvedColors: NotificationColors = {
    reminder: colors?.reminder ?? DEFAULT_COLORS.reminder,
    alert: colors?.alert ?? DEFAULT_COLORS.alert,
    information: colors?.information ?? DEFAULT_COLORS.information
  };

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(buildDiscordPayload(notifications, resolvedColors))
    });

    if (!response.ok) {
      return {
        providerId: provider.id,
        providerName: provider.name,
        providerType: provider.type,
        success: false,
        error: `HTTP ${response.status}: ${response.statusText}`,
        notificationCount: notifications.length
      };
    }

    return {
      providerId: provider.id,
      providerName: provider.name,
      providerType: provider.type,
      success: true,
      notificationCount: notifications.length
    };
  } catch (error) {
    const err = error as Error;
    return {
      providerId: provider.id,
      providerName: provider.name,
      providerType: provider.type,
      success: false,
      error: err.message,
      notificationCount: notifications.length
    };
  }
}

export async function testDiscordNotification(
  webhookUrl: string,
  testMessage: string
): Promise<TestResult> {
  if (!webhookUrl) {
    return { success: false, error: 'DISCORD_WEBHOOK_URL is not configured' };
  }

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: 'Tracktor',
        embeds: [
          {
            title: 'Tracktor Test Notification',
            color: DEFAULT_COLORS.information,
            description: testMessage || 'This is a test notification from Tracktor',
            footer: { text: `Tracktor • ${new Date().toISOString()}` }
          }
        ]
      })
    });

    if (!response.ok) {
      return {
        success: false,
        error: `HTTP ${response.status}: ${response.statusText}`
      };
    }

    return { success: true };
  } catch (error) {
    const err = error as Error;
    return { success: false, error: err.message || 'Failed to send Discord notification' };
  }
}

export function parseNotificationColors(
  reminder?: string,
  alert?: string,
  information?: string
): Partial<NotificationColors> {
  const colors: Partial<NotificationColors> = {};
  if (reminder) colors.reminder = hexToInt(reminder);
  if (alert) colors.alert = hexToInt(alert);
  if (information) colors.information = hexToInt(information);
  return colors;
}
