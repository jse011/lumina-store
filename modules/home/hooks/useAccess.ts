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
        setShowErrorDialog(true);
      }
    } catch (error) {
      console.error("Error validating code:", error);
      setShowErrorDialog(true);
    } finally {
      setIsValidating(false);
    }
  };

  const handleLinkUser = async (email: string, loginAction: () => Promise<any>) => {
    try {
      await loginAction();
      if (code && email) {
        await codeRepository.assignCodeToUser(code, email);
        onAuthorized();
      }
    } catch (error) {
      console.error("Error linking user:", error);
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
    handleValidate,
    handleLinkUser
  };
}
