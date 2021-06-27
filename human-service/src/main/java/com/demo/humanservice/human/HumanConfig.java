package com.demo.humanservice.human;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class HumanConfig {

    @Bean
    CommandLineRunner commandLineRunner(HumanRepository humanRepository) {
        return args -> {
            Human john = new Human(
                    "John",
                    "Doe"
            );

            Human bob = new Human(
                    "Bob",
                    "Doe"
            );

            humanRepository.saveAll(
                    List.of(john, bob)
            );
        };
    }
}
