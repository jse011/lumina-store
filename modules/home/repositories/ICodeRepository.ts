export interface ICodeRepository {
  validateCode(code: string): Promise<boolean>;
  assignCodeToUser(code: string, userId: string, email: string): Promise<void>;
  isCodeAssigned(code: string): Promise<boolean>;
}
