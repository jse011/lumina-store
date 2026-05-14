import { HologramAction } from "../models/HologramAction";

export const HOLOGRAM_ACTIONS: { [key: string]: HologramAction[] } = {
  mascota: [
    { id: 'mueve-cola', label: 'Mueve la cola' },
    { id: 'respira', label: 'Respira' },
    { id: 'come', label: 'Le das comida' },
    { id: 'salta', label: 'Salta' },
    { id: 'jadea', label: 'Jadea' },
    { id: 'acuesta', label: 'Se acuesta' }
  ],
  persona: [
    { id: 'sonrie', label: 'Sonríe' },
    { id: 'saluda', label: 'Saluda' },
    { id: 'habla', label: 'Habla' },
    { id: 'guina', label: 'Guiña el ojo' },
    { id: 'respira', label: 'Respira' }
  ]
};
