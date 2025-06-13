import { auth } from '@/lib/auth';
import { getUser } from '@/lib/db/queries';

import EditProfileForm from './EditProfileForm';

export default async function ProfileEditPage() {
  const session = await auth();
  if (!session || !session.user?.email) {
    return <div className="p-8 text-center text-red-500">未登录或未找到用户信息</div>;
  }
  const users = await getUser(session.user.email);
  if (!users.length) {
    return <div className="p-8 text-center text-red-500">未找到用户信息</div>;
  }
  const userInfo = users[0];
  return <EditProfileForm userInfo={userInfo} />;
}
