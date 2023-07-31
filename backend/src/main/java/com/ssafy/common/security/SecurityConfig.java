package com.ssafy.common.security;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

@EnableWebSecurity
@EnableMethodSecurity
@RequiredArgsConstructor
@Configuration
public class SecurityConfig {
    private final JwtAuthenticationFilter jwtAuthenticationFilter;
    private final String[] allowedUrls = {"/", "/manager/login", "/manager/regist", "/**"}; //인증 없이 접근 허용된 url. api 테스트를 위해 일단 모든 접근 허용
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        return http
                .csrf().disable()
                .headers(headers -> headers.frameOptions().sameOrigin())
                .authorizeHttpRequests(requests ->
                        requests.requestMatchers(allowedUrls).permitAll()
                                .anyRequest().authenticated() //허용된 Url 외의 모든 요청은 인증 필요
                )
                .sessionManagement(sessionManagement ->
                        //세션 사용하지 않기 때문에 STATELESS로 설정(token 이용)
                        sessionManagement.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                )
                .addFilterBefore(jwtAuthenticationFilter, BasicAuthenticationFilter.class)
                .build();
    }
}
