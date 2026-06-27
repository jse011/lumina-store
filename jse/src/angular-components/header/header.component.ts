import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  @Input() systemTitle: string = 'SISTEMA DE EVALUACION DE RIESGOS';
  @Input() userInfo: string = 'Usuario: Usuario ADQ : Vulcano';

  onLogout(event: Event): void {
    event.preventDefault();
    console.log('Cerrando sesión...');
  }
}
