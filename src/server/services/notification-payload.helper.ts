import type { Notification } from '$lib/domain/notification';
import { db } from '$server/db/index';
import * as schema from '$server/db/schema';
import { inArray } from 'drizzle-orm';

export type DispatchNotification = {
  id: string;
  vehicleName: string;
  type: string;
  channel: string;
  message: string;
  dueDate: string;
};

export async function toDispatchNotifications(
  notifications: Notification[]
): Promise<DispatchNotification[]> {
  if (notifications.length === 0) {
    return [];
  }

  const vehicleIds = [...new Set(notifications.map((n) => n.vehicleId))];

  const vehicles = await db
    .select({
      id: schema.vehicleTable.id,
      make: schema.vehicleTable.make,
      model: schema.vehicleTable.model
    })
    .from(schema.vehicleTable)
    .where(inArray(schema.vehicleTable.id, vehicleIds));

  const vehicleNameMap = new Map(vehicles.map((v) => [v.id, `${v.make} ${v.model}`]));

  return notifications.map((n) => ({
    id: n.id,
    vehicleName: vehicleNameMap.get(n.vehicleId) ?? 'Unknown Vehicle',
    type: n.type,
    channel: n.channel,
    message: n.message,
    dueDate: typeof n.dueDate === 'string' ? n.dueDate : (n.dueDate as Date).toISOString()
  }));
}
