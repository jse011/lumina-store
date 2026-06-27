import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface MenuItem {
  label: string;
  subitems: { label: string; url: string }[];
}

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  menuItems: MenuItem[] = [
    {
      label: 'Consulta',
      subitems: [
        { label: 'Consulta Reniec', url: '#' }
      ]
    },
    {
      label: 'Reportes',
      subitems: [
        { label: 'Transacciones', url: '#' },
        { label: 'Usuarios', url: '#' },
        { label: 'Diario', url: '#' },
        { label: 'Mensual', url: '#' }
      ]
    },
    {
      label: 'Mantenimiento',
      subitems: [
        { label: 'Usuario', url: '#' },
        { label: 'Unidad de Negocio', url: '#' },
        { label: 'Categoría de Tienda', url: '#' },
        { label: 'Centro de Costo', url: '#' },
        { label: 'Parametro', url: '#' }
      ]
    }
  ];

  onMenuSelect(event: Event, item: { label: string; url: string }): void {
    event.preventDefault();
    console.log('Seleccionado:', item.label);
  }
}
