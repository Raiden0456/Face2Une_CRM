import { observable } from 'mobx';

export type AuthStatus = 'auth' | 'not_auth' | 'check_auth' | null;

export type RestorePasswordStatus = 'init' | 'check' | 'confirm';

export interface IAuthStore {
  email: string;
  authorized: AuthStatus | null;
  restorePassword: RestorePasswordStatus | null;

  setupAuthData: (authData: any) => void;
}

export const AuthStore = observable<IAuthStore>({
  email: '',
  authorized: null, // null for prod
  restorePassword: 'init',

  setupAuthData(authInfo: any) {
    this.email = authInfo.email;
    this.authorized = authInfo.authorized;
  },
});
