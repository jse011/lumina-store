import { FirebaseNavRepository, FirebaseSettingsRepository } from '../../data/firebase';
import NavbarClient from './NavbarClient';

export default async function Navbar() {
  const navRepo = new FirebaseNavRepository();
  const settingsRepo = new FirebaseSettingsRepository();
  
  const [navItems, settings] = await Promise.all([
    navRepo.getNavItems(),
    settingsRepo.getSettings()
  ]);

  return <NavbarClient navItems={navItems} settings={settings} />;
}
