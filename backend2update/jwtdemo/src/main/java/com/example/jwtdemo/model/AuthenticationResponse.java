package com.example.jwtdemo.model;

public class AuthenticationResponse {
    private String token;
    private String message;


    // a setter using constructor
    public AuthenticationResponse(String token, String message) {
        this.token = token;
        this.message = message;
    }

    public String getToken() {
        return token;
    }

    public String getMessage() {
        return message;
    }


}