import { ChangeDetectionStrategy, Component, computed, input, output, signal } from '@angular/core';

export type AlertType = 'info' | 'success' | 'warning' | 'error';
export type AlertMode = 'expanded' | 'inline';

@Component({
  selector: 'app-alert-notice',
  templateUrl: './alert-notice.component.html',
  styleUrl: './alert-notice.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AlertNoticeComponent {
  readonly type = input<AlertType>('info');
  readonly mode = input<AlertMode>('expanded');
  readonly title = input<string>('');
  readonly message = input<string>('');
  readonly primaryButtonLabel = input<string | undefined>(undefined);
  readonly secondaryButtonLabel = input<string | undefined>(undefined);
  readonly showCloseButton = input<boolean>(true);
  readonly customStyle = input<{ [key: string]: string | undefined } | undefined>(undefined);

  readonly primaryAction = output<void>();
  readonly secondaryAction = output<void>();
  readonly closeAlert = output<void>();

  protected readonly visible = signal(true);

  protected readonly icon = computed(() => {
    switch (this.type()) {
      case 'info': return 'i';
      case 'success': return '✓';
      case 'warning': return '!';
      case 'error': return '!';
      default: return 'i';
    }
  });

  onPrimaryAction(): void {
    this.primaryAction.emit();
  }

  onSecondaryAction(): void {
    this.secondaryAction.emit();
  }

  onClose(): void {
    this.visible.set(false);
    this.closeAlert.emit();
  }
}
