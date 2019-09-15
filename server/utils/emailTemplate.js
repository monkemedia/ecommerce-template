require('dotenv').config()
const postmark = require('postmark')
const postmarkClient = new postmark.ServerClient(process.env.POSTMARK_ID)

module.exports = {
  forgottenPasswordEmail: async (data) => {
    const textBodyUrl = process.env.NODE_ENV === 'dev' ? `http://localhost:'${process.env.PORT}/forgotten-password/${data.token}` : `http://${process.env.WEB_ADDRESS}/forgotten-password/${data.token}`
    await postmarkClient.sendEmail({
      'From': process.env.EMAIL_ADDRESS,
      'To': data.email,
      'Subject': 'Test',
      'TextBody': `Visit ${textBodyUrl}`
    })
  },

  confirmAccount: async (data) => {
    const textBodyUrl = process.env.NODE_ENV === 'dev' ? `http://localhost:'${process.env.PORT}/confirm-account/${data.token}` : `http://${process.env.WEB_ADDRESS}/confirm-account/${data.token}`
    await postmarkClient.sendEmail({
      'From': process.env.EMAIL_ADDRESS,
      'To': data.email,
      'Subject': 'Confirm email address',
      'TextBody': `Richard Roberts, You must confirm your ${data.email} email before you can sign in (link is only valid once): ${textBodyUrl}`
    })
  }
}
