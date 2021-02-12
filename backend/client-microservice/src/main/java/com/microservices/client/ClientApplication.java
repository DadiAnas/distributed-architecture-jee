package com.microservices.client;

import com.microservices.client.entities.Client;
import com.microservices.client.repositories.ClientRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;

@SpringBootApplication
public class ClientApplication {

    public static void main(String[] args) {
        SpringApplication.run(ClientApplication.class, args);
    }
    @Bean
    CommandLineRunner start(ClientRepository clientRepository, RepositoryRestConfiguration restConfigration){
        return args->{
            restConfigration.exposeIdsFor(Client.class);
            clientRepository.save(new Client(null , "Anas","anas@hotmail.com"));
            clientRepository.save(new Client(null , "dadi","dadi@gmail.com"));


            clientRepository.findAll().forEach(c->{
                System.out.println(c.getName()+" "+c.getEmail());
            });
        };
    }
}
