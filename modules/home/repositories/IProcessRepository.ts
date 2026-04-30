import { ProcessStep } from '../types';

export interface IProcessRepository {
  getProcessSteps(): Promise<ProcessStep[]>;
  saveProcessStep(step: ProcessStep): Promise<void>;
}
