package backend.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import backend.Entities.Mail;

@Service
public class MailService {
    
    @Autowired
    private JavaMailSender mailSender;

    @Value("${spring.mail.username}") // this can be a problem
    private String sender;

    public void sendMail(String sentTo, Mail mailStructure){

        SimpleMailMessage simpleMailMessage = new SimpleMailMessage();
        simpleMailMessage.setFrom(sender);
        simpleMailMessage.setSubject(mailStructure.getSubject());
        simpleMailMessage.setText(mailStructure.getMessage());
        simpleMailMessage.setTo(sentTo);

        mailSender.send(simpleMailMessage);

    }

}
