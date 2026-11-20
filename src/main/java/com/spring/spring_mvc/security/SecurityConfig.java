package com.spring.spring_mvc.security;

import com.spring.spring_mvc.service.CustomUserDetailsService;
import java.util.Arrays;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

/**
 * SecurityConfig
 * <p>
 * Spring Security configuration class defining HTTP endpoint access rules,
 * password encoding mechanisms, and authentication management beans.
 * </p>
 * 
 * @author Felisa Bascug
 */
@EnableWebSecurity 
@Configuration 
public class SecurityConfig {

    private CustomUserDetailsService userDetailsService;    

    public SecurityConfig(CustomUserDetailsService userDetailsService) {
        this.userDetailsService = userDetailsService;
    }

    public CustomUserDetailsService getUserDetailsService() {
        return userDetailsService;
    }

    public void setUserDetailsService(
            CustomUserDetailsService userDetailsService) {
        this.userDetailsService = userDetailsService;
    }    

    /**
     * Configures the security filter chain for incoming HTTP requests.
     * Disables CSRF protection, permits unauthenticated access to 
     * {@code /api/auth/**} endpoints, requires authentication for all other 
     * requests, and enables HTTP Basic authentication.
     *
     * @param security the {@link HttpSecurity} builder used to configure 
     *          web-based security
     * @return the configured {@link SecurityFilterChain}
     * @throws Exception if an error occurs while building the security filter
     *          chain
     */
    @Bean 
    SecurityFilterChain filterChain(HttpSecurity security) throws Exception {

        return security
            .cors(cors -> cors.configure(security))
            .csrf(AbstractHttpConfigurer::disable) 
            .sessionManagement(session -> session.
                    sessionCreationPolicy(SessionCreationPolicy.IF_REQUIRED))
            .authorizeHttpRequests(
                auth -> auth.requestMatchers("/api/auth/**").permitAll()
                            .requestMatchers(HttpMethod.OPTIONS, "/**")
                                .permitAll()
                            .requestMatchers("/api/students/**")
                                .hasAnyAuthority("USER", "ADMIN")
                            .anyRequest().authenticated())
            .httpBasic(Customizer.withDefaults())
            .build();

    }

    /**
     * Provides a {@link BCryptPasswordEncoder} bean for hashing and verifying 
     * user passwords.
     *
     * @return a new {@link BCryptPasswordEncoder} instance
     */
    @Bean 
    BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    /**
     * Exposes the Spring Security {@link AuthenticationManager} bean from the
     * provided authentication configuration.
     *
     * @param authentication the {@link AuthenticationConfiguration} containing
     *      the authentication manager
     * @return the configured {@link AuthenticationManager}
     * @throws Exception if an error occurs while retrieving the authentication
     *          manager
     */
    @Bean 
    AuthenticationManager authenticationManager(
            AuthenticationConfiguration authentication) throws Exception {

        return authentication.getAuthenticationManager();
    }
    
    /**
     * TODO jdocs
     * @return
     */
    @Bean 
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();

        configuration.setAllowedOrigins(Arrays.asList(
            "http://localhost:3000", "http://192.168.137.108:3000"));
        configuration.setAllowedMethods(Arrays.asList(
            "GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(Arrays.asList(
            "Authorization", "Cache-Control", "Content-Type"));

        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = 
            new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);

        return source;
    }

}
