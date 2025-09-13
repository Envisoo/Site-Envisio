export const config = {
  postmark: {
    token: process.env.REACT_APP_POSTMARK_TOKEN || '',
    emailFrom: process.env.REACT_APP_EMAIL_FROM || '',
    emailTo: process.env.REACT_APP_EMAIL_TO || ''
  }
};