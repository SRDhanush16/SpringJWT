package com.example.jwtdemo.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class DemoController {

    @GetMapping("/demo")
    public ResponseEntity<String> demo() {
        return ResponseEntity.ok("Hello from secured url");
    }

    @GetMapping("/adminonly")
    public ResponseEntity<String> adminOnly() {
        return ResponseEntity.ok("Hello from admin only url");
    }

    @GetMapping("/bctlogin")
    public boolean bctLogin(){
        return true;
    }

}