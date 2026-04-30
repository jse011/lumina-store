export interface ProcessStep {
  id: number;
  title: string;
  description: string;
  color: 'tertiary' | 'secondary';
  href?: string;
}
