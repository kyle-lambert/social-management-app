declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DATABASE_URL: string;
      SESSION_SECRET: string;
      STRIPE_SECRET_KEY: string;
      RESEND_TOKEN: string;
      JWT_SECRET: string;
    }
  }
}

export {};
