import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

export type Options = {
  baseURL: string;
  accessID: string;
  secretKey: string;
  requestConfig?: Omit<AxiosRequestConfig, 'baseURL'>;
}

export type AudienceType = 'all' | 'tag' | 'token' | 'token_list' | 'account' | 'account_list' | 'package_account_push';

export type MessageType = 'notify' | 'message';

export type IOSEnvironment = 'product' | 'dev';

export type Operator = 'OR' | 'AND';
export type TagsOperator = Operator;
export type ItemsOperator = Operator;

export type TagItem = {
  tags: string[];
  is_not: boolean;
  tags_operator: TagsOperator;
  items_operator: ItemsOperator;
  // TODO
  tag_type: string;
}
export type TagRule = {
  tag_items: TagItem[];
  operator: Operator;
  is_not: boolean;
}

export type StartTime = {
  hour: string;
  min: string;
}

export type EndTime = StartTime;

export type AcceptTime = {
  start: StartTime;
  end: EndTime;
}

export type AndroidMessage = {
  title: string;
  content: string;
  accept_time?: AcceptTime[];
  thread_id?: string;
  thread_sumtext?: string;
  xg_media_resources?: string;
  xg_media_audio_resources?: string;
  android?: object; // https://cloud.tencent.com/document/product/548/39064#intent1
}

export type ShowType = 1 | 2;
export type IOSMessage = {
  title: string;
  content: string;
  thread_id?: string;
  ios?: object; // https://cloud.tencent.com/document/product/548/39064#iOS
  show_type?: ShowType;
  xg_media_resources?: string;
}

// https://cloud.tencent.com/document/product/548/39064
export type PushParams = {
  audience_type: AudienceType;
  message: AndroidMessage | IOSMessage;
  message_type: MessageType;
  environment?: IOSEnvironment;
  upload_id?: number;
  tag_rules?: TagRule[];// TODO
  token_list?: string[];// TODO
  account_list?: string[];// TODO
}

export type PushResponse = {
  seq?: number;
  push_id?: number;
  invalid_targe_list?: any[];
  ret_code: number;
  environment?: IOSEnvironment;
  err_msg?: string;
  result?: string;
}

export class Tpns {
  axiosInstance: AxiosInstance;
  username = '';
  password = ''
  constructor(options: Options) {
    const { baseURL, accessID: username, secretKey: password, requestConfig } = options;
    this.username = username;
    this.password = password;
    this.axiosInstance = axios.create({
      baseURL,
      ...requestConfig
    });
  }

  push(data: PushParams) {
    return this.axiosInstance.post<PushResponse>('/v3/push/app', data, {
      auth: {
        username: this.username,
        password: this.password
      }
    });
  }
}
