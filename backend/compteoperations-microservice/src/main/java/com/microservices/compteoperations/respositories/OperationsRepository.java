package com.microservices.compteoperations.respositories;

import com.microservices.compteoperations.entities.Operation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

@RepositoryRestResource
@CrossOrigin
public interface OperationsRepository extends JpaRepository<Operation, Long> {
}
