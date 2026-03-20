package com.gluonmind.backend.config;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import io.swagger.v3.oas.models.servers.Server;


@Configuration
public class OpenApiConfig {
        @Bean
    public OpenAPI customOpenAPI() {
        // Define JWT security scheme
        SecurityScheme securityScheme = new SecurityScheme().type(SecurityScheme.Type.HTTP).scheme("bearer")
                .bearerFormat("JWT").description("Enter JWT Bearer token **_only_**");

        // Define security requirement
        SecurityRequirement securityRequirement = new SecurityRequirement().addList("Bearer Authentication");

        return new OpenAPI().info(apiInfo()).addServersItem(getServer())
                .components(new Components().addSecuritySchemes("Bearer Authentication", securityScheme))
                .addSecurityItem(securityRequirement);
    }

    private Info apiInfo() {
        return new Info().title("Gluon mind API")
                .description("Gluon mind  - JWT Secured").version("1.0.0")
                .contact(new Contact().name("Gluon Mind Team").email("support@gluonmind.rw").url("https://fluonmind.com"))
                .license(new License().name("Apache 2.0").url("http://www.apache.org/licenses/LICENSE-2.0.html"));
    }

    private Server getServer()
         {
            return new Server().url("http://localhost:8000/")
                    .description("Gluon mind server");
    }
}
