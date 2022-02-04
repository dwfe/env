export function runModeInfo() {
  const NODE_ENV = process.env.NODE_ENV;
  return {
    NODE_ENV,
    isDevelopment: NODE_ENV === 'development',
    isProduction: NODE_ENV === 'production',
    isTest: NODE_ENV === 'test',
  };
}
