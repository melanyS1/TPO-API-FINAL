package com.api.e_commerce.config;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Object> handleValidationExceptions(MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getFieldErrors().forEach(error ->
            errors.put(error.getField(), error.getDefaultMessage())
        );
        return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<Object> handleAllExceptions(Exception ex, WebRequest request) {
        Map<String, String> body = new HashMap<>();
        body.put("error", ex.getMessage());
        return new ResponseEntity<>(body, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    // Manejo específico para errores comunes del carrito
    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<Object> handleCarritoRuntimeException(RuntimeException ex, WebRequest request) {
        String msg = ex.getMessage();
        Map<String, String> body = new HashMap<>();
        body.put("error", msg);
        if (msg != null) {
            if (msg.contains("Stock insuficiente")) {
                return new ResponseEntity<>(body, HttpStatus.CONFLICT); // 409
            } else if (msg.contains("Usuario no encontrado") || msg.contains("Producto no encontrado")) {
                return new ResponseEntity<>(body, HttpStatus.NOT_FOUND); // 404
            } else if (msg.contains("SessionId es requerido") || msg.contains("Debe proporcionar usuarioId o sessionId")) {
                return new ResponseEntity<>(body, HttpStatus.BAD_REQUEST); // 400
            }
        }
        // Por defecto, 400 para otros RuntimeException
        return new ResponseEntity<>(body, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(UsernameNotFoundException.class)
    public ResponseEntity<Object> handleUsernameNotFoundException(UsernameNotFoundException ex, WebRequest request) {
        Map<String, String> body = new HashMap<>();
        body.put("error", ex.getMessage());
        return new ResponseEntity<>(body, HttpStatus.UNAUTHORIZED);
    }
}
