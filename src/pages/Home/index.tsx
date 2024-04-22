import Guide from '@/components/Guide';
import { trim } from '@/utils/format';
import { useModel, Access, useAccess } from '@umijs/max';
import { PageContainer } from '@ant-design/pro-components';
import { Role } from '@/access';
import { Button } from 'antd'

const HomePage: React.FC = () => {
  const { name } = useModel('global');
  const access = useAccess()

  return (
    <PageContainer ghost>
      <Guide name={trim(name)} />
      <Access accessible={access.role === Role.ADMIN} fallback={<Button type='primary'>只有 primary user 可以看到这个按钮</Button>}>
        <Button>只有 Admin 可以看到这个按钮</Button>
      </Access>
    </PageContainer>
  );
};

export default HomePage;
