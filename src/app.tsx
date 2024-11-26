import { AxiosResponse, RequestConfig, RequestInterceptor, ResponseInterceptor } from "@umijs/max";
import { message, notification } from "antd";
import { getLocalStorage, setLocalStorage } from "./utils/tools";
import { history } from "@umijs/max";
import queryString from "query-string";

// 运行时配置

// 全局初始化数据配置，用于 Layout 用户信息和权限初始化
// 更多信息见文档：https://umijs.org/docs/api/runtime-config#getinitialstate
export async function getInitialState() {
  setLocalStorage('token', '-')

  const data = await fetch(`./datas/account-data.json`).then(res => res.json()).then(a => a)
  const travelData = await fetch('./datas/travel-data.json').then(res => res.json()).then(a => a)

  return { data, travelData }
}

// 优先级高于 config.ts 的layout
// 文档：https://umijs.org/docs/max/layout-menu
// 完整配置项：https://procomponents.ant.design/components/layout
export const layout = () => {
  return {
    title: 'Header title',
    logo: 'https://img.alicdn.com/tfs/TB1YHEpwUT1gK0jSZFhXXaAtVXa-28-27.svg',
    menu: {
      locale: false,
    },
    headerRender: () => <>📕🏔</>,
    menuHeaderRender: () => <>😁😁😁😁😁😁😁😁😁😁😁😁😁</>, // 左侧导航的header
    footerRender: () => null,//<Footer />,
    contentStyle: {
      padding: 0,
      height: 'calc(100vh - 56px)'
    },
    breadcrumbProps: {
      separator: ' > ',
    },
    layout: 'mix', // side：左侧导航，top：顶部导航 mix: 混合
    // menuHeaderRender: false
    fixedHeader: false,
    fixSiderbar: true,
    siderWidth: 300,
    // collapsed: true,
    waterMarkProps: { content: 'waterMarkProps' }
  };
};




/** 异常处理程序
 * @see https://beta-pro.ant.design/docs/request-cn
 */
const errorHandler = (error: any) => {
  const { response } = error;
  if (!response) {
    notification.error({
      description: '您的网络发生异常，无法连接服务器',
      message: '网络异常',
    });
  }
  return response
};

const getAuth = () => {
  const token = getLocalStorage('token');
  return token ? `Bearer ${token}` : undefined;
};

const requestInterceptor: RequestInterceptor = (url, options) => {
  if (url.endsWith('/token')) return { url, options };
  const headers = { ...options.headers, Authorization: getAuth()! };
  return { url, options: { ...options, headers } };
}

const responseInterceptor: ResponseInterceptor = (response) => {
  if (response.status === 401) {
    message.error('登录已失效，请重新登录！', 2)
    setLocalStorage('token', '');
    history.push('/login')
  }
  if (response.headers['content-Type'] === 'application/octet-stream') {
    if (response.status === 200)
      // 文件下载保存
      saveFile(response)
    else if (response.status === 400)
      response.text().then(msg => message.error(msg))
    else message.error('下载文件失败！')
  }
  return response;
}

/** 从请求中，保存文件 */
function saveFile(response: AxiosResponse<any, any>) {
  response.clone().blob().then((blob: Blob | MediaSource) => {
    const a = window.document.createElement('a');
    const downUrl = window.URL.createObjectURL(blob);// 获取 blob 本地文件连接 (blob 为纯二进制对象，不能够直接保存到磁盘上)
    const filename = response.headers['content-disposition']!.split('filename=')[1];
    a.href = downUrl;
    a.download = `${decodeURI(filename)}`;
    a.click();
    window.URL.revokeObjectURL(downUrl);
  });
}

// https://umijs.org/docs/max/request
export const request: RequestConfig = {
  timeout: 10000,
  errorConfig: {
    errorHandler,
    errorThrower() { }
  },
  // 解决umi4和umi3在数组序列化方式差异
  // https://umijs.org/docs/max/request#get-%E8%AF%B7%E6%B1%82%E5%8F%82%E6%95%B0%E5%BA%8F%E5%88%97%E5%8C%96
  // Umi@3
  // a: [1,2,3] => a=1&a=2&a=3
  // Umi@4
  // a: [1,2,3] => a[]=1&a[]=2&a[]=3
  paramsSerializer(params) { return queryString.stringify(params) },

  requestInterceptors: [requestInterceptor],
  responseInterceptors: [responseInterceptor]
};