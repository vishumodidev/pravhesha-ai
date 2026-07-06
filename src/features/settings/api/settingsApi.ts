import api from '../../../api/axios';
import type { SettingsData, UserRecord } from '../types';

export const settingsApi = {
  getSettings: async (): Promise<SettingsData> => {
    const response = await api.get<SettingsData>('/settings');
    return response.data;
  },
  addUser: async (user: Partial<UserRecord>): Promise<SettingsData> => {
    const response = await api.post<SettingsData>('/settings/user', user);
    return response.data;
  },
  deleteUser: async (id: string): Promise<SettingsData> => {
    const response = await api.delete<SettingsData>(`/settings/user/${id}`);
    return response.data;
  },
};
