package io.pivotal.minotaur.productionDeploys.web;

import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class LastProductionDeployService {
    private LocalDateTime lastProductionDeploy = null;

    public LocalDateTime timeOfLastProductionDeploy() {
        return lastProductionDeploy;
    }

    public void reportADeployToProduction(LocalDateTime now) {
        lastProductionDeploy = now;
    }
}
