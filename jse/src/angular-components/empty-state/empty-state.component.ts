import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

@Component({
  selector: 'app-empty-state',
  templateUrl: './empty-state.component.html',
  styleUrl: './empty-state.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmptyStateComponent {
  readonly title = input<string>('No hay registros para mostrar');
  readonly description = input<string>('No se encontró información coincidente con los criterios de búsqueda ingresados.');
  readonly actionButtonLabel = input<string | undefined>(undefined);

  readonly action = output<void>();

  onAction(): void {
    this.action.emit();
  }
}
