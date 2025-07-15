import nodemailer from 'nodemailer';
import { config } from './config';

export const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: config.smtp.user,
        pass: config.smtp.pass,
    },
});

transporter.verify(function (error, success) {
    if (error) {
        console.log('Erro ao conectar SMTP:', error);
    } else {
        console.log('Conexão SMTP OK! Pronto para enviar e-mails.');
    }
});
