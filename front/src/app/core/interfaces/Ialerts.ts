export interface Alert {
  type: typeEnum;
  message: string;
  isActivated: boolean;
}

export enum typeEnum {
  'success',
  'info',
  'warning',
  'danger',
  'primary',
  'secondary',
  'light',
  'dark',
}
