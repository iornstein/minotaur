package io.pivotal.minotaur.productionDeploys.web;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.*;
import java.util.HashMap;
import java.util.Map;

@RestController
public class ProductionDaysController {

    private final Clock clock;

    public ProductionDaysController(Clock clock) {
        this.clock = clock;
    }

    @CrossOrigin
    @GetMapping("/daysSinceLastProductionDeploy")
    public Map<String, Long> getDaysSinceLastProductionDeploy() {
//        LocalDateTime lastDeploy = LocalDateTime.ofInstant(Instant.ofEpochMilli(0), ZoneOffset.UTC);
        LocalDateTime lastDeploy = LocalDateTime.ofInstant(clock.instant(), ZoneOffset.UTC);

        LocalDateTime now = LocalDateTime.ofInstant(clock.instant(), ZoneOffset.UTC);
        long daysBetween = Duration.between(lastDeploy, now).toDays();
        HashMap<String, Long> map = new HashMap<>();
        map.put("days", daysBetween);
        return map;
    }
}