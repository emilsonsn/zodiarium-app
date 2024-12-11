declare const require: any;

export const environment = {
  production: false,
  appName: 'Zodarium App',
  public: "/",
  private: "/painel",
  // api: 'https://zodiarium.com:3000/api',
  api: 'http://127.0.0.1:8000/api',
  version: require('../../package.json').version
};

