import { getAppConfig } from '../../utils/config';

export const hasPageConfig = () => {
  const config = getAppConfig();
  return config['page_id'] && config['page_id'] !== null && config['page_id'].length > 0
  && config['page_access_token'] && config['page_access_token'] !== null && config['page_access_token'].length > 0;
}

export const hasIGConfig = () => {
  const config = getAppConfig();
  return config['ig_user_id'] && config['ig_user_id'] !== null && config['ig_user_id'].length > 0
  && config['ig_access_token'] && config['ig_access_token'] !== null && config['ig_access_token'].length > 0
}
