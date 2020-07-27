export interface IResponeListTasks {
  total_count: number;
  user_detail: IUserDetail;
  cs_tasks: Icstasks[];
}

export interface IBankInfomation {
  account_name: string;
  account_number: string;
  bank_name: string;
  branch_name: string;
}

export interface Icstasks {
  id: number;
  so_id: number;
  order_id: number;
  order_status: string;
  status: string;
  code: string;
  return_id: number;
  quantity_counter: number;
  total: number;
  failure_types: string[];
  refund_cash: number;
  failure_type_names: string[];
  transferred_cash: number;
  additional_cash: number;
  cs_note: string;
  user_phone: string;
  business_name: string;
  bought_at: Date;
  created_at: Date;
  updated_at: Date;
  assign_group: string;
  assigned_member_name: string;
  created_by: string;
  last_updated_by: string;
  feedback_user_name: string;
  feedback_user_phone: string;
  feedback_user_note: string;
  feedback_image_urls: string[];
  bank_information: IBankInfomation;
  user_name: string;
  assigned_member_id: number;
  following_cs_name: string;
  following_cs_id: number;
  qc_by: string;
}

export interface IUserDetail {
  id: number;
  phone: string;
  email: string;
  name: string;
  user_address: string;
  business_name: string;
  orders_count: number;
  location_type: string;
  satisfaction_level: string;
  created_at: Date;
  activated_at: Date;
}
