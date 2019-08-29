package io.pivotal.minotaur.productionDeploys.domainObjects;

public class ThereHasNeverBeenAProductionDeploy extends TimeSinceMostRecentProductionDeploy {
    private static final ThereHasNeverBeenAProductionDeploy INSTANCE = new ThereHasNeverBeenAProductionDeploy();

    public static ThereHasNeverBeenAProductionDeploy instance() {
        return INSTANCE;
    }

    private ThereHasNeverBeenAProductionDeploy() {
        super(null, null);
    }
}