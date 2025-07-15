import { transporter } from '../config/email';

export class EmailService {
    async send(to: string, subject: string, text: string, html?: string) {
        await transporter.sendMail({
            from: 'XANDAO THE BIG COMPANY',
            to,
            subject,
            text,
            html,
        });
    }
}
