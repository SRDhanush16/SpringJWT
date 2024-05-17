package com.example.jwtdemo.service;

import com.example.jwtdemo.model.*;
import com.example.jwtdemo.repository.TokenRepository;
import com.example.jwtdemo.repository.UserRepository;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class AuthenticationService {

    private final UserRepository repository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    private final TokenRepository tokenRepository;

    private final AuthenticationManager authenticationManager;

    public AuthenticationService(UserRepository repository,
                                 PasswordEncoder passwordEncoder,
                                 JwtService jwtService,
                                 TokenRepository tokenRepository,
                                 AuthenticationManager authenticationManager) {
        this.repository = repository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.tokenRepository = tokenRepository;
        this.authenticationManager = authenticationManager;
    }

    /*
    * here otp field in Userwithotp can be null , since we are only registering the newuser
    * */
    public int register(Userwithotp request) {
        // check if user already exist. if exist than authenticate the user
        if(repository.findByUsername(request.getUsername()).isPresent()) {
            System.out.println("User Already Exist");
            return -1;
        }
        User user = new User();
        user.setUsername(request.getUsername());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setEmail(request.getEmail());
        user.setRole(request.getRole());
        user = repository.save(user);
        System.out.println("\nNew User(" + request.getEmail() +" "+request.getUsername() + ") registered\n");
        return 1;
    }

    // for logging in
    public AuthenticationResponse authenticate(Userwithotp request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getUsername(),
                        request.getPassword()
                )
        );

        User user = repository.findByUsername(request.getUsername()).orElseThrow();
        String jwt = jwtService.generateToken(user, request.getOtp());

        revokeAllTokenByUser(user);
        saveUserToken(jwt, user);

        return new AuthenticationResponse(jwt, "User login was successful");

    }


    // no need to touch
    private void revokeAllTokenByUser(User user) {
        List<Token> validTokens = tokenRepository.findAllTokensByUser(user.getId());
        if(validTokens.isEmpty()) {
            return;
        }

        validTokens.forEach(t-> {
            t.setLoggedOut(true);
        });

        tokenRepository.saveAll(validTokens);
    }
    private void saveUserToken(String jwt, User user) {
        Token token = new Token();
        token.setToken(jwt);
        token.setLoggedOut(false);
        token.setUser(user);
        tokenRepository.save(token);
    }


//==============================

    // Add this method to your AuthenticationService class
    public void logout(String token) {
        // Find the token in the database
        Token storedToken = tokenRepository.findByToken(token).orElse(null);

        // If the token exists, mark it as logged out
        if (storedToken != null) {
            storedToken.setLoggedOut(true);
            tokenRepository.save(storedToken);
        }
    }
}