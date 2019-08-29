package io.pivotal.minotaur.productionDeploys.services;

import io.pivotal.minotaur.productionDeploys.domainObjects.ThereHasNeverBeenAProductionDeploy;
import io.pivotal.minotaur.productionDeploys.domainObjects.TimeSinceMostRecentProductionDeploy;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.LocalDateTime;

@Service
public class LastProductionDeployService {
    private LocalDateTime lastProductionDeploy = null;

    public void reportADeployToProduction(LocalDateTime now) {
        lastProductionDeploy = now;
    }

    public TimeSinceMostRecentProductionDeploy timeBetweenMostRecentProductionDeployAnd(LocalDateTime now) {
        if (lastProductionDeploy == null) {
            return ThereHasNeverBeenAProductionDeploy.instance();
        }
        Duration duration = Duration.between(lastProductionDeploy, now);
        long days = duration.toDays();
        long hours = duration.minusDays(days).toHours();
        return new TimeSinceMostRecentProductionDeploy(days, hours);
    }
}
