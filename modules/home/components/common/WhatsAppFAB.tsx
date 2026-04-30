import { FirebaseSettingsRepository } from '../../data/firebase';

export default async function WhatsAppFAB() {
  const settingsRepo = new FirebaseSettingsRepository();
  const settings = await settingsRepo.getSettings();
  
  const whatsappNumber = settings.whatsappNumber;
  const whatsappMessage = settings.whatsappFABMessage;

  return (
    <a 
      className="fixed bottom-8 right-8 w-16 h-16 bg-[#25D366] rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(37,211,102,0.4)] hover:scale-110 transition-all z-40 group" 
      href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      <span className="material-symbols-outlined text-white text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>chat</span>
      <span className="absolute right-20 bg-white text-[#050B18] px-4 py-2 rounded-lg text-xs font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-xl">
        ¡Habla con nosotros!
      </span>
    </a>
  );
}
