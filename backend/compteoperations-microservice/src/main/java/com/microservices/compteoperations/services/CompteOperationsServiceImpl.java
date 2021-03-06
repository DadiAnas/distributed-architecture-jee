package com.microservices.compteoperations.services;

import com.microservices.compteoperations.entities.*;
import com.microservices.compteoperations.feigns.ClientsRestClient;
import com.microservices.compteoperations.respositories.ComptesRepository;
import com.microservices.compteoperations.respositories.OperationsRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Collection;
import java.util.Optional;

@Service
@Transactional
@AllArgsConstructor
public class CompteOperationsServiceImpl implements CompteOperationsService {
    ComptesRepository comptesRepository;
    OperationsRepository operationsRepository;
    ClientsRestClient clientsRestClient;

    private Compte findCompteByIdOrFail(Long compteId) throws RuntimeException{
        Optional<Compte> optionalCompte = comptesRepository.findById(compteId);
        if(!optionalCompte.isPresent())
            throw new RuntimeException("Compte Pas Trouver");
        return optionalCompte.get();
    }

    @Override
    public Compte addCompte(Compte compte) {
        return comptesRepository.save(compte);
    }

    @Override
    public Compte verseMontantCompte(Long compteId, double montant) {
        Compte compte = findCompteByIdOrFail(compteId);
        compte.setSolde(compte.getSolde() + montant);

        Operation operation = new Operation();
        operation.setMontant(montant);
        operation.setType(TypeOperation.CREDIT);
        operation.setCompte(compte);

        compte.getOperations().add(operation);
        comptesRepository.save(compte);
        return compte;
    }

    @Override
    public Compte retraitMontantCompte(Long compteId, double montant){
        Compte compte = findCompteByIdOrFail(compteId);
        if(compte.getSolde() < montant )
            throw new RuntimeException("Solde Insuffisant !");
        compte.setSolde(compte.getSolde() - montant);
        Operation operation = new Operation();
        operation.setMontant(montant);
        operation.setType(TypeOperation.DEBIT);

        compte.getOperations().add(operation);
        comptesRepository.save(compte);
        return compte;
    }

    @Override
    public double virementCompte(Long compteDmetteurId, Long compteDestinataireId, double montant) {
        Compte compteEmetteur = findCompteByIdOrFail(compteDmetteurId);
        if(compteEmetteur.getSolde() < montant)
                    throw  new RuntimeException("Solde Insuffisant");

        retraitMontantCompte(compteDmetteurId, montant);
        verseMontantCompte(compteDestinataireId, montant);
        return montant;
    }

    @Override
    public Collection<Operation> listOperations(Long compteId) {
        Compte compte = findCompteByIdOrFail(compteId);
        return compte.getOperations();
    }

    @Override
    public Compte getCompteetClient(Long compteId) {
        Compte compte = findCompteByIdOrFail(compteId);
        if(compte.getClientId()!=null)
            compte.setClient(clientsRestClient.findClientById(compte.getClientId()));
        return compte;
    }

    @Override
    public Compte editCompteEtat(Long compteId, boolean actif) {
        Compte compte = findCompteByIdOrFail(compteId);
        if(actif){
            compte.setEtat(EtatCompte.ACTIVE);
        }
        else{
            compte.setEtat(EtatCompte.SUSPENDED);
        }
        return comptesRepository.save(compte);
    }
}
