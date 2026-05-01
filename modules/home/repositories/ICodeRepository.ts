export interface ICodeRepository {
  validateCode(code: string): Promise<boolean>;
  assignCodeToUser(code: string, email: string): Promise<void>;
  isCodeAssigned(code: string): Promise<boolean>;
}
