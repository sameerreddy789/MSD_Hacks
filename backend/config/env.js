const required = [
  'NODE_ENV',
  'PORT',
  'MONGODB_URI',
  'JWT_SECRET',
  'CLIENT_URL',
];

const optional = [
  'RAZORPAY_KEY_ID',
  'STRIPE_SECRET_KEY',
];

export function validateEnv() {
  const missing = required.filter(key => !process.env[key]);
  
  if (missing.length > 0) {
    console.error('❌ Missing required environment variables:');
    missing.forEach(key => console.error(`   - ${key}`));
    process.exit(1);
  }
  
  optional.forEach(key => {
    if (!process.env[key]) {
      console.warn(`⚠️  Optional env var not set: ${key}`);
    }
  });
  
  console.log('✅ Environment variables validated');
}
