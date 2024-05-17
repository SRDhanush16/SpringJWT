package com.example.jwtdemo.model;

public class Userwithotp {
    private String username,password,email,otp ;
    private Role role;

    //----------------------getters n setters---------------------------------

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }
    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }

    public Role getRole() {
        return role;
    }
    public void setRole(Role role) {
        this.role = role;
    }

    public String getOtp() {
        return otp;
    }
    public void setOtp(String otp) {
        this.otp = otp;
    }
}
