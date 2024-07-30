import { useToggle } from '@mantine/hooks';
import { useEffect } from 'react';
import { LoginForm } from './LoginForm';
import { SignUpForm } from './SignUpForm';

export function MainAuthForm({ initialFormType = 'login' }) {
  const [type, toggle] = useToggle(['login', 'register']);

  useEffect(() => {
    if (initialFormType === 'register') {
      toggle();
    }
  }, [initialFormType, toggle]);

  return (
    <>
      {type === 'login' && <LoginForm toggle={toggle} />}
      {type === 'register' && <SignUpForm toggle={toggle} />}
    </>
  );
}
