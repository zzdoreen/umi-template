import { IRoute } from "@umijs/max";

export enum Role {
  PRIMARY = 1,
  ADMIN = 2,
}
export default (initialState: API.UserInfo) => {
  // 在这里按照初始化数据定义项目中的权限，统一管理
  // 参考文档 https://umijs.org/docs/max/access
  const canSeeAdmin = !!(
    initialState && initialState.name !== 'dontHaveAccess'
  );
  const { role = Role.PRIMARY, path } = initialState || {}
  return {
    canSeeAdmin,
    role,
    // 配合路由 
    dynamicRoute: (r: IRoute) => {
      const { path: itemPath } = r
      return path?.includes(itemPath)
    }
  };
};
