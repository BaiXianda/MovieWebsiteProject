package com.xiandabai.moviewebsite.controllers;


import com.xiandabai.moviewebsite.domain.Invitation;
import com.xiandabai.moviewebsite.domain.User;
import com.xiandabai.moviewebsite.payload.JWTLoginSuccessResponse;
import com.xiandabai.moviewebsite.payload.LoginRequest;
import com.xiandabai.moviewebsite.repositories.UserRepository;
import com.xiandabai.moviewebsite.security.JwtTokenProvider;
import com.xiandabai.moviewebsite.services.UserService;
import com.xiandabai.moviewebsite.services.ValidationErrorService;
import com.xiandabai.moviewebsite.valiator.UserValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

import java.security.Principal;

import static com.xiandabai.moviewebsite.security.SecurityConstants.*;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class UserController {

    @Autowired
    ValidationErrorService validationErrorService;

    @Autowired
    private UserService userService;

    @Autowired
    private UserValidator userValidator;

    @Autowired
    private JwtTokenProvider tokenProvider;

    @Autowired
    private AuthenticationManager authenticationManager;

    // test
    @Autowired
    UserRepository userRepository;


    @PostMapping("/users/login")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest, BindingResult result) {
        ResponseEntity<?> errorMap = validationErrorService.MapValidationService(result);
        if(errorMap!=null) return errorMap;

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getUsername(),
                        loginRequest.getPassword()
                )
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = TOKEN_PREFIX + tokenProvider.generateToken(authentication);

        return ResponseEntity.ok(new JWTLoginSuccessResponse(true, jwt));
    }

    @PostMapping("/users/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody User user, BindingResult result) {

        userValidator.validate(user, result);

        ResponseEntity<?> errorMap = validationErrorService.MapValidationService(result);
        if(errorMap!=null) return errorMap;

        User newUser = userService.saveUser(user);

        return new ResponseEntity<User>(newUser, HttpStatus.CREATED);
    }

    @GetMapping("/users/{username}")
    public User getUsers(@PathVariable String username) {

        return userRepository.findByUsername(username);
    }

    @GetMapping("/user/invitations")
    public Iterable<Invitation> getUsers(Principal principal) {

        return userRepository.findByUsername(principal.getName()).getInvitations();
    }

    @DeleteMapping("/user/invitation/{id}")
    public ResponseEntity<?> deleteInvitation(@PathVariable Long id) {
        userService.deleteInvitation(id);
        return new ResponseEntity<String>("Invitation with ID: " + id + " is deleted", HttpStatus.OK);
    }

}
