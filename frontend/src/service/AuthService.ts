import { JSONFetch, JSONFetchGet } from '../api/fetchMethod';
import { AuthStore } from '../store/Auth.store';

/* interface AuthInfo {
  email: string;
  password: string;
} */

/* interface NewUser {
  email: string;
  password: string;
} */

export class AuthService {
  async getUser() {
    AuthStore.setupAuthData({ authorized: 'check_auth' });

    const r = AuthStore.authorized;
    if (!r) {
      AuthStore.setupAuthData({ authorized: 'auth', email: 'test@dd.dd' });
    } else {
      AuthStore.setupAuthData({ authorized: 'not_auth' });
    }
  }

  async signIn({ email, password }: { email: string; password: string }) {
    const r = await JSONFetch('sign_in', {
      email,
      password,
    });

    if (r.success) {
      AuthStore.setupAuthData({
        email: r.data.email,
        authorized: 'auth',
      });
    } else {
      return r;
    }
  }

  /* async signUp(authInfo: NewUser) {
    const r = await JSONFetch('auth/sign_up', {
      password_ciphertext: naclCrypt(authInfo.password),
      email: authInfo.email,
      personalDataProcessingConsent: true,
      userAgreement: true,
    });
    if (!r.error) {
      window.location.href = `${window.location.origin}/auth/signUp/confirm`;
    } else {
      return r
    }
  } */

  signOut = async () => AuthStore.setupAuthData({ authorized: 'not_auth' });
}
