import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { AlertNoticeComponent } from '../alert-notice/alert-notice.component';
import { EmptyStateComponent } from '../empty-state/empty-state.component';

@Component({
  selector: 'app-alert-examples',
  imports: [AlertNoticeComponent, EmptyStateComponent],
  templateUrl: './alert-examples.component.html',
  styleUrl: './alert-examples.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AlertExamplesComponent {
  // Simulador de estados de Formulario
  protected readonly dniValue = signal<string>('');
  protected readonly formSubmitted = signal<boolean>(false);
  protected readonly formHasError = signal<boolean>(false);

  // Simulador de Búsqueda
  protected readonly searchQuery = signal<string>('Carlos Ruiz Albán');
  protected readonly filterCleared = signal<boolean>(false);

  onSubmitForm(): void {
    this.formSubmitted.set(true);
    if (!this.dniValue() || this.dniValue().trim() === '') {
      this.formHasError.set(true);
    } else {
      this.formHasError.set(false);
      alert(`DNI ${this.dniValue()} procesado correctamente.`);
    }
  }

  onDniChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.dniValue.set(input.value);
    if (this.formSubmitted() && input.value.trim() !== '') {
      this.formHasError.set(false);
    }
  }

  onSearch(): void {
    this.filterCleared.set(false);
  }

  onClearFilter(): void {
    this.searchQuery.set('');
    this.filterCleared.set(true);
  }

  onResetSearch(): void {
    this.searchQuery.set('Nuevo filtro');
    this.filterCleared.set(false);
    alert('Filtros reiniciados. Puede realizar una nueva búsqueda.');
  }

  onActionExample(message: string): void {
    alert(`Acción ejecutada: ${message}`);
  }
}
