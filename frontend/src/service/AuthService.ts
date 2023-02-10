import { JSONFetch, JSONFetchGet } from '../api/fetchMethod';
import { AuthStore } from '../store/Auth.store';

interface AuthInfo {
  email: string;
  password: string;
}

interface NewUser {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  password: string;
}

export class AuthService {
  async getUser() {
    AuthStore.setupAuthData({ authorized: 'check_auth' });

    const r = await JSONFetchGet('session_user');
    console.log(r);

    if (r.success) {
      AuthStore.setupAuthData({ authorized: 'auth', email: r.data[0].email });
    } else {
      AuthStore.setupAuthData({ authorized: 'not_auth' });
    }
  }

  async signIn({ email, password }: AuthInfo) {
    const r = await JSONFetch('sign_in', {
      email,
      password,
    });

    if (r.success) {
      AuthStore.setupAuthData({
        email: r.data.email,
        authorized: 'auth',
      });
      return r;
    } else {
      return r;
    }
  }

  async signUp({ firstName, lastName, phone, email, password }: NewUser) {
    const r = await JSONFetch('sign_up', {
      first_name: firstName,
      last_name: lastName,
      phone,
      email,
      password,
      rights: 'client',
    });

    return r;
  }

  async signOut() {
    const r = await JSONFetchGet('sign_out');

    if (r) {
      window.location.reload();
    }
  }
}
