import { useState, useCallback } from 'react';
import { validatePassword } from '../../utils/validation';

const usePasswordValidation = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordErrors, setPasswordErrors] = useState([]);
    const [passwordShown, setPasswordShown] = useState(false);
    const [passwordPopoverVisible, setPasswordPopoverVisible] = useState(false);

    const handlePasswordChange = useCallback((e) => {
        const newPassword = e.target.value;
        setPassword(newPassword);
        setPasswordErrors(validatePassword(newPassword));
    }, []);

    const handleConfirmPasswordChange = useCallback((e) => {
        setConfirmPassword(e.target.value);
    }, []);

    const togglePasswordVisibility = useCallback(() => {
        setPasswordShown((prev) => !prev);
        const timer = setTimeout(() => setPasswordShown(false), 1000);
        return () => clearTimeout(timer);
    }, []);

    const handlePasswordInputFocus = useCallback(() => {
        setPasswordPopoverVisible(passwordErrors.length > 0);
    }, [passwordErrors]);

    const handlePasswordInputBlur = useCallback(() => {
        setPasswordPopoverVisible(false);
    }, []);

    const arePasswordsMatching = useCallback(() => {
        return password === confirmPassword;
    }, [password, confirmPassword]);


    return {
        password,
        confirmPassword,
        passwordErrors,
        passwordShown,
        passwordPopoverVisible,
        handlePasswordChange,
        handleConfirmPasswordChange,
        togglePasswordVisibility,
        handlePasswordInputFocus,
        handlePasswordInputBlur,
        arePasswordsMatching
    };
};

export default usePasswordValidation;