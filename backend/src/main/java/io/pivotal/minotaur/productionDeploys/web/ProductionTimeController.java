package io.pivotal.minotaur.productionDeploys.web;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.Clock;
import java.time.Duration;
import java.time.LocalDateTime;
import java.time.ZoneOffset;

@RestController
public class ProductionTimeController {

    private final Clock clock;
    private LastProductionDeployService lastProductionDeployService;

    public ProductionTimeController(Clock clock, LastProductionDeployService lastProductionDeployService) {
        this.clock = clock;
        this.lastProductionDeployService = lastProductionDeployService;
    }

    @CrossOrigin
    @GetMapping("/timeSinceLastProductionDeploy")
    public TimeSinceMostRecentProductionDeploy getTimeSinceProductionDeploy() {

        LocalDateTime lastDeploy = lastProductionDeployService.timeOfLastProductionDeploy();
        if (lastDeploy == null) {
            return new TimeSinceMostRecentProductionDeploy(null, null);
        }

        long daysBetween = Duration.between(lastDeploy, now()).toDays();
        return new TimeSinceMostRecentProductionDeploy(daysBetween, 0L);
    }

    @CrossOrigin
    @PutMapping("/reportAProductionDeploy")
    public void updateLastProductionDeployTime() {
        lastProductionDeployService.reportADeployToProduction(now());
    }

    private LocalDateTime now() {
        return LocalDateTime.ofInstant(clock.instant(), ZoneOffset.UTC);
    }
}