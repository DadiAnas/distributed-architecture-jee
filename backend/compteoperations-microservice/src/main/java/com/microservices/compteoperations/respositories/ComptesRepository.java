package com.microservices.compteoperations.respositories;

import com.microservices.compteoperations.entities.Compte;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

@RepositoryRestResource
@CrossOrigin
public interface ComptesRepository extends JpaRepository<Compte, Long> {
}
