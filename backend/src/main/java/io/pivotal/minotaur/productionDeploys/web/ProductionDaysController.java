package io.pivotal.minotaur.productionDeploys.web;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.*;
import java.util.HashMap;
import java.util.Map;

@RestController
public class ProductionDaysController {

    private final Clock clock;
    private LastProductionDeployService lastProductionDeployService;

    public ProductionDaysController(Clock clock, LastProductionDeployService lastProductionDeployService) {
        this.clock = clock;
        this.lastProductionDeployService = lastProductionDeployService;
    }

    @CrossOrigin
    @GetMapping("/daysSinceLastProductionDeploy")
    public Map<String, Long> getDaysSinceLastProductionDeploy() {
        HashMap<String, Long> responseBody = new HashMap<>();

        LocalDateTime lastDeploy = lastProductionDeployService.timeOfLastProductionDeploy();
        if (lastDeploy == null) {
            responseBody.put("days", null);
            return responseBody;
        }

        long daysBetween = Duration.between(lastDeploy, now()).toDays();
        responseBody.put("days", daysBetween);
        return responseBody;
    }

    @CrossOrigin
    @PutMapping("/daysSinceLastProductionDeploy")
    public void updateLastProductionDeployTime() {
        lastProductionDeployService.reportADeployToProduction(now());
    }

    private LocalDateTime now() {
        return LocalDateTime.ofInstant(clock.instant(), ZoneOffset.UTC);
    }
}