export interface ICodeRepository {
  validateCode(code: string): Promise<boolean>;
  assignCodeToUser(code: string, userId: string, email: string, displayName: string | null): Promise<void>;
  isCodeAssigned(code: string): Promise<boolean>;
  isUserRegistered(userId: string): Promise<boolean>;
}
