const nodemailer = require('nodemailer');
require('dotenv').config();

function generateRandomNumber(n) {
  let str = '';
  for (let i = 0; i < n; i++) {
    str += Math.floor(Math.random() * 10);
  }
  return str;
}

module.exports = async (req, res) => {
  const { email } = req.body;
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      port: 587,
      auth: {
        user: process.env.MAIL_ID,
        pass: process.env.MAIL_PASSWORD,
      },
    });
    const randomNumber = generateRandomNumber(6);
    const mailOptions = {
      from: process.env.MAIL_ID,
      to: email,
      subject: '[Tip Talk] 인증번호를 알려드립니다.',
      html: `<div
      style="
        position: absolute;
        width: 400px;
        height: 500px;
        margin: 70px 250px;
        transform: translate(-50%, -50%);
        text-align: center;
      "
    >
      <div style="border-bottom: 2px solid #00b667">
        <img
          style="padding: 14px"
          src="https://drawit.s3.ap-northeast-2.amazonaws.com/tiptalk/logo.png"
          width="140px"
          alt="TipTalk Logo"
        />
      </div>
      <div style="margin: 20px 50px">
        <h1
          style="
            color: rgb(46, 42, 42);
            font-size: 20px;
            font-family: arial;
            text-align: left;
          "
        >
          TIP TALK에서 요청하신 인증번호를 발송해 드립니다.
        </h1>
      </div>
      <div style="border: 1px solid rgb(46, 42, 42); margin: 20px 50px">
        <h2
          style="
            color: black;
            text-align: center;
            font-size: 17px;
            padding: 15px;
          "
        >
          아래 인증번호 6자리를 인증번호 입력창에 입력해주세요
        </h2>
        <h3 style="text-align: center; font-size: 17px; color: #00b667">
          ${randomNumber}
        </h3>
      </div>
    </div>`,
    };
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.log(err);
      }
      res.send({ data: info });
    });
    return res.status(200).json({ data: { number: randomNumber } });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ status: false, message: 'server errrrr' });
  }
};
