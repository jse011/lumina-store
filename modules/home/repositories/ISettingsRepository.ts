import { AppSettings } from '../models';

export interface ISettingsRepository {
  getSettings(): Promise<AppSettings>;
  updateSettings(settings: AppSettings): Promise<void>;
}
