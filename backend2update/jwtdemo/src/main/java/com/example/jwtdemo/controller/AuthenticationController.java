package com.example.jwtdemo.controller;

import com.example.jwtdemo.model.AuthenticationResponse;
import com.example.jwtdemo.model.EmailId;
import com.example.jwtdemo.model.User;
import com.example.jwtdemo.model.Userwithotp;
import com.example.jwtdemo.repository.UserRepository;
import com.example.jwtdemo.service.AuthenticationService;
import com.example.jwtdemo.service.EmailService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class AuthenticationController {

    @Autowired
    EmailService emS;
    private final AuthenticationService authService;
    private final UserRepository repository;
    public AuthenticationController(AuthenticationService authService,UserRepository repository) {
        this.authService = authService;
        this.repository = repository;
    }

    /* this method will send otp to emailID and
    as well as the to the frontend for verfiying purposes
    SAME FUNCTION FOR DIFFERENT ENDPOINTS

    for registering = first use your email id and verify your email Id
    for logging = use username n password , from username fetch emailId and send otp to email id

    */
//    @PostMapping("/verifyuser")
//    public String send_otp_to_user(@RequestBody Userwithotp uwo){
//        //System.out.println(emailId.getEmailId());
//        String emailId = "helpmyself1204@gmail.com"; // get the email id from the users table using username
//        String otp = emS.generateRandomString();
//        String msg = emS.sendEmail(emailId,otp); // send otp to emailId , return the otp sent
//        return msg; // returns to the frontend  , where checking will happen
//    }

    @PostMapping("/verifyuser")
    public String send_otp_to_user(@RequestBody Userwithotp lgr){
        Optional<User> userOptional = repository.findByUsername(lgr.getUsername());
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            String emailId = user.getEmail(); // Assuming the email field in your User entity is named 'email'
            System.out.println("\n\n"+emailId+"\n\n");
            String otp = emS.generateRandomString();
            String msg = emS.sendEmail(emailId, otp); // send otp to emailId, return the otp sent
            return msg; // returns to the frontend, where checking will happen
        } else {
            return "-1"; // Handle the case where the username is not found in the database
        }
    }

    /*
    *
    * After the verifying the OTP , the frontend will change the view to registration form
    * where newuser will enter username , password , ROLE
    *
    * For registering , no need to create any JWT token
    *
    * Userwithotp.otp can be null , since we are just registering the newUser , only for logging in we need OTP
    * */
    @PostMapping("/register")
    public int register(
            @RequestBody Userwithotp request
    ) {
        return authService.register(request); // will send the new user data to database
    }

    /*
    * You need to send the token to the frontend , so u need AuthenticationResponse datatype to do it along with msg
    *
    * NOTE : STILL ISSUE WITH /login left : we need to enter the username and role pola
    * */
    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponse> login(
            @RequestBody Userwithotp request
    ) {
        //User user = repository.findUserDetailsByEmail(request.getEmail()).orElseThrow(() -> new RuntimeException("User not found"));
        return ResponseEntity.ok(authService.authenticate(request));
    }

//============================
    @PostMapping("/logout")
    public String logout(HttpServletRequest request) {
        String authHeader = request.getHeader("Authorization");
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String token = authHeader.substring(7);
            authService.logout(token);
            return "Logout Success";
        } else {
            return "Authorization header missing or invalid";
        }
    }

}