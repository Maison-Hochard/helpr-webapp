import baseEmailTemplate, {
  EmailTemplate,
} from "~/server/api/mailer/templates/baseEmail";
import { useMailer } from "#mailer";
import { H3Event } from "h3";

type SendMailToSupportPost = {
  template: EmailTemplate;
  to: string;
  from: string;
  subject: string;
};

async function sendGmail(request: SendMailToSupportPost) {
  const mailService = useMailer();
  const gmailTransporter = mailService.gmailTransporter();
  return await mailService.sendMail({
    requestId: "test-key",
    options: {
      to: request.to,
      subject: "New message from " + request.from,
      text: request.template.text,
      html: request.template.html,
    },
    transporter: gmailTransporter,
  });
}

export default eventHandler(async (event: H3Event) => {
  const body = await readBody(event);
  const { email, subject, message, phone, fullname } = body;
  const template = baseEmailTemplate(subject, email, message, fullname, phone);
  await sendGmail({
    template,
    to: "hrichard206@gmail.com",
    from: email,
    subject,
  });
  return { statusCode: 200, body: { message: "Email sent" } };
});
