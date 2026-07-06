import { settingsApi } from '../api/settingsApi';
import type { SettingsData, UserRecord } from '../types';

export const settingsService = {
  fetchSettings: async (): Promise<SettingsData> => {
    return await settingsApi.getSettings();
  },
  createUser: async (user: Partial<UserRecord>): Promise<SettingsData> => {
    return await settingsApi.addUser(user);
  },
  removeUser: async (id: string): Promise<SettingsData> => {
    return await settingsApi.deleteUser(id);
  },
};
