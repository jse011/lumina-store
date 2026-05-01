import { useState, useEffect } from 'react';
import { ICodeRepository } from '../repositories/ICodeRepository';

export function useAccess(
  codeRepository: ICodeRepository,
  onAuthorized: () => void
) {
  const [code, setCode] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [lockoutTime, setLockoutTime] = useState(0);
  const [isValidating, setIsValidating] = useState(false);
  const [showErrorDialog, setShowErrorDialog] = useState(false);
  const [showValidated, setShowValidated] = useState(false);
  const [errorType, setErrorType] = useState<'empty' | 'invalid' | 'used' | 'not_registered' | 'none'>('none');

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (lockoutTime > 0) {
      timer = setInterval(() => {
        setLockoutTime((prev) => Math.max(0, prev - 1));
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [lockoutTime]);

  const handleValidate = async () => {
    if (lockoutTime > 0) return;

    if (!code.trim()) {
      setErrorType('empty');
      setShowErrorDialog(true);
      return;
    }

    setIsValidating(true);
    try {
      const isValid = await codeRepository.validateCode(code);
      const isAssigned = await codeRepository.isCodeAssigned(code);

      if (isValid && !isAssigned) {
        setShowValidated(true);
      } else {
        const nextAttempts = attempts + 1;
        setAttempts(nextAttempts);
        setLockoutTime(10 * nextAttempts);
        setErrorType('invalid');
        setShowErrorDialog(true);
      }
    } catch (error) {
      console.error("Error validating code:", error);
      setErrorType('invalid');
      setShowErrorDialog(true);
    } finally {
      setIsValidating(false);
    }
  };

  const handleLinkUser = async (userId: string, email: string, loginAction: () => Promise<any>) => {
    try {
      await loginAction();
      if (code && userId && email) {
        await codeRepository.assignCodeToUser(code, userId, email);
        onAuthorized();
        setCode("");
        setShowValidated(false);
      }
    } catch (error: any) {
      console.error("Error linking user:", error);
      if (error.message?.includes("utilizado")) {
        setErrorType('used');
      } else {
        setErrorType('invalid');
      }
      setShowErrorDialog(true);
      throw error;
    }
  };

  return {
    code,
    setCode,
    attempts,
    lockoutTime,
    isValidating,
    showErrorDialog,
    setShowErrorDialog,
    showValidated,
    setShowValidated,
    errorType,
    handleValidate,
    handleLinkUser,
    setErrorType
  };
}
