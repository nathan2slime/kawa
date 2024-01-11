export type ToastStatus = 'success' | 'warning' | 'danger';
export type ToastState = {
  status: ToastStatus;
  title: string;
  open: boolean;
};
