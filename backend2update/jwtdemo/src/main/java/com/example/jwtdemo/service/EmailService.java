package com.example.jwtdemo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {
    @Value("${spring.mail.username}")
    private String sender;

    @Autowired
    private JavaMailSender javaMailSender;
    //    public EmailService(JavaMailSender javaMailSender) {
    //        this.javaMailSender = javaMailSender;
    //    }

    public String generateRandomString() {
        String characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        StringBuilder stringBuilder = new StringBuilder();
        for (int i = 0; i < 6; i++) {
            int index = (int) (Math.random() * 62);
            stringBuilder.append(characters.charAt(index));
        }
        return stringBuilder.toString();
    }

    public String sendEmail(String emailId,String otp){
        try{
            SimpleMailMessage mailMessage = new SimpleMailMessage();
            mailMessage.setFrom("Dhanush SR<"+sender+">");
            mailMessage.setTo(emailId); // here we use email as username
            mailMessage.setSubject("OTP for login ");
            mailMessage.setText("Your OTP for login is: " + otp);
            javaMailSender.send(mailMessage);
            System.out.println(" OTP sent to "+ emailId + " successfully");
            return otp;
        } catch(Exception e){
            System.out.println("error in sending email to " + emailId);
            e.printStackTrace();
            return "-1"; // used by the frontend to tell the user that there is some issue with sending otp
        }
    }
}

