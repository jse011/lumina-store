import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
  systemTitle = input('SISTEMA DE EVALUACION DE RIESGOS');
  userInfo = input('Usuario: Usuario ADQ : Vulcano');

  onLogout(event: Event): void {
    event.preventDefault();
    console.log('Cerrando sesión...');
  }
}
