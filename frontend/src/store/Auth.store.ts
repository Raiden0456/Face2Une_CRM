import { observable } from 'mobx';

export type AuthStatus = 'auth' | 'not_auth' | 'check_auth' | null;

export type RestorePasswordStatus = 'init' | 'check' | 'confirm';

export interface IAuthStore {
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  authorized: AuthStatus | null;
  rights: string;

  setupAuthData: (authData: any) => void;
}

export const AuthStore = observable<IAuthStore>({
  email: '',
  firstName: '',
  lastName: '',
  phone: '',
  authorized: 'auth', // null for prod
  rights: 'admin',

  setupAuthData(authInfo: any) {
    this.email = authInfo.email;
    this.firstName = authInfo.firstName;
    this.lastName = authInfo.lastName;
    this.phone = authInfo.phone;
    this.authorized = authInfo.authorized;
    this.rights = authInfo.rights;
  },
});
