package com.api.e_commerce.service;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.api.e_commerce.dto.LoginRequest;
import com.api.e_commerce.dto.RegisterRequest;
import com.api.e_commerce.dto.UserResponse;
import com.api.e_commerce.model.Role;
import com.api.e_commerce.model.Usuario;
import com.api.e_commerce.repository.UsuarioRepository;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class AuthenticationService {

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;

    public String register(RegisterRequest request) {

        if (usuarioRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already exists");
        }

        // Crear un nuevo usuario con los datos del request
        //builder ayuda con esto, que es boiler plate código repeptitivo
        // Usuario usuario = new Usuario();
        // usuario.setNombre(request.getNombre());
        // usuario.setApellido(request.getApellido());
        // usuario.setEmail(request.getEmail());
        // usuario.setPassword(passwordEncoder.encode(request.getPassword()));
        // usuario.setRole(Role.USER);


    // crear el usuario manualmente usando setters en lugar del builder (evita llamadas a métodos del builder que no existen)
    Usuario usuario = new Usuario();
    usuario.setUsername(request.getUsername());
    usuario.setEmail(request.getEmail());
    // encriptado la pass que envío el usuario
    usuario.setPassword(passwordEncoder.encode(request.getPassword()));
    usuario.setRole(Role.USER); // Por defecto, todos los usuarios nuevos son USER

    usuarioRepository.save(usuario);
    return "User registered successfully";
    }

    /**
     * AuthenticationManager:
     * - Se configura en SecurityConfig usando AuthenticationConfiguration
     * - Spring Boot autoconfigura el AuthenticationManager con UserDetailsService y PasswordEncoder
     * - Gestiona el proceso de autenticación completo
     * 
     * UsernamePasswordAuthenticationToken:
     * - representa las credenciales del usuario
     * - Se usa para el proceso de autenticación básica username/password
     * 
     *  Este token no autenticado se pasa al authenticationManager, que:
     * - Valida las credenciales contra la base de datos
     * - Verifica la contraseña usando el PasswordEncoder
     * - Si todo es correcto, crea un nuevo token autenticado con los roles/authorities del usuario
     *  
     *
     */
    public String authenticate(LoginRequest request) {
        // Generate a known password hash that we can use
        String knownHash = passwordEncoder.encode("123");
        System.out.println("\nNew known hash for password '123': " + knownHash);
        
        System.out.println("\nAttempting authentication for email: " + request.getEmail());
        
        // First check if user exists
        var user = usuarioRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        System.out.println("Found user with email: " + user.getEmail());
        System.out.println("User ID: " + user.getId());
        System.out.println("User role: " + user.getRole());
        System.out.println("Stored hashed password: " + user.getPassword());
        
        // Try to verify the actual stored password
        boolean actualMatches = passwordEncoder.matches(request.getPassword(), user.getPassword());
        System.out.println("\nVerification against stored hash: " + actualMatches);
        
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            request.getEmail(),
                            request.getPassword()));
            System.out.println("Authentication manager verification successful");
        } catch (Exception e) {
            System.out.println("Authentication manager verification failed: " + e.getMessage());
            System.out.println("Exception type: " + e.getClass().getName());
            
            System.out.println("\nIMPORTANT: You need to update the password hash in the database to: " + knownHash);
            
            throw e;
        }
        
        // Generate JWT token
        return jwtService.generateToken(user);
    }

    public UserResponse getCurrentUser(String email) {
        Usuario usuario = usuarioRepository.findByEmail(email)
            .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        
        return new UserResponse(
            usuario.getId(),
            usuario.getUsername(),
            usuario.getEmail(),
            usuario.getRole()
        );
    }
}
