import { useAuthContext } from '@/common/contexts/authProvider/useAuthContext';

const ProfilePage = () => {
  const { state } = useAuthContext();
  console.log(state.authUser);
  return <div>{JSON.stringify(state.authUser)}</div>;
};

export default ProfilePage;
