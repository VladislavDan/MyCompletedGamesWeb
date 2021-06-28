import {GoogleLoginProvider} from 'angularx-social-login';

const googleLoginOptions = {
  scope: 'profile email https://www.googleapis.com/auth/drive'
};

export const SocialAuthServiceConfig = {
  provide: 'SocialAuthServiceConfig',
  useValue: {
    autoLogin: false,
    providers: [
      {
        id: GoogleLoginProvider.PROVIDER_ID,
        provider: new GoogleLoginProvider('627973926597-tj2la0mnorvm04cqmcosu2nj3b02g6k2.apps.googleusercontent.com', googleLoginOptions)
      }
    ]
  }
};
