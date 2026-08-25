
// 'use server';

export async function verifyCaptcha(token: string) {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;

  if (!secretKey) {
    throw new Error('Missing RECAPTCHA_SECRET_KEY in environment variables.');
  }

  try {
  
    const response = await fetch(
      `https://google.com{secretKey}&response=${token}`,
      { method: 'POST' }
    );

    const data = await response.json();

    if (data.success) {
      // You can safely process your database entry or email sending here
      return { success: true };
    }

    return { success: false, errors: data['error-codes'] };
  } catch (error) {
    console.error('reCAPTCHA error:', error);
    return { success: false };
  }
}
