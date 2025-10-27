package com.api.e_commerce.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.api.e_commerce.repository.UsuarioRepository;
import com.api.e_commerce.service.JwtService;

import lombok.RequiredArgsConstructor;

// Indica que esta clase contiene configuraciones de Spring
@Configuration
// Habilita la seguridad web de Spring Security
@EnableWebSecurity
// Genera un constructor con los campos final requeridos lombok 
@RequiredArgsConstructor
public class SecurityConfig {

    private final UsuarioRepository usuarioRepository;
    private final JwtService jwtService;

    @Bean
    public JwtAuthenticationFilter jwtAuthenticationFilter(UserDetailsService userDetailsService) {
        return new JwtAuthenticationFilter(jwtService, userDetailsService);
    }

    // Cargar los datos del usuario desde tu sistema a través de UsuarioRepository
    @Bean
    public UserDetailsService userDetailsService() {
        return username -> usuarioRepository.findByEmail(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
    }

    /**
     * AuthenticationManager es el componente central de autenticación en Spring Security.
     * 
     * Funcionamiento:
     * 1. Recibe un objeto Authentication (UsernamePasswordAuthenticationToken en nuestro caso)
     * 2. Delega la autenticación a una cadena de AuthenticationProvider configurados
     * 3. Por defecto, usa DaoAuthenticationProvider que:
     *    - Utiliza UserDetailsService para cargar el usuario de la base de datos
     *    - Emplea PasswordEncoder para verificar la contraseña
     *    - Compara las credenciales proporcionadas con las almacenadas
     * 
     * Proceso de autenticación:
     * - Entrada: Credenciales sin verificar (username/password)
     * - Proceso: Validación de credenciales
     * - Salida: Authentication completamente autenticado con authorities
     * 
     * Si la autenticación falla, lanza AuthenticationException
     */
    
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }

    // Define el codificador de contraseñas que se usará para encriptar y verificar passwords
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    // Configura las reglas de seguridad para las diferentes rutas de la API
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http, JwtAuthenticationFilter jwtAuthFilter) throws Exception {
        http
                .csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(auth -> auth
                        // Rutas públicas que no requieren autenticación
                        .requestMatchers("/api/auth/register", "/api/auth/login").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/products/**").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/categories/**").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/publicaciones/**").permitAll()
                        
                        
                        // Rutas del carrito - permitir sin autenticación para carritos temporales
                        .requestMatchers("/api/carrito/**").permitAll()

                        // Rutas que requieren autenticación
                        .requestMatchers("/api/auth/me").authenticated()
                        .requestMatchers(HttpMethod.POST, "/api/publicaciones/**").authenticated()
                        .requestMatchers(HttpMethod.PUT, "/api/publicaciones/**").authenticated()
                        .requestMatchers(HttpMethod.PATCH, "/api/publicaciones/**").authenticated()
                        .requestMatchers(HttpMethod.DELETE, "/api/publicaciones/**").authenticated()

                        // Rutas exclusivas para administradores
                        .requestMatchers("/api/admin/**").hasRole("ADMIN")

                        // Rutas de pedidos solo para usuarios autenticados
                        .requestMatchers("/api/pedidos/**").authenticated()

                        // Cualquier otra ruta requiere autenticación
                        .anyRequest().authenticated())
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}
