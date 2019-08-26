package io.pivotal.minotaur.productionDeploys.web;

class ThereHasNeverBeenAProductionDeploy extends TimeSinceMostRecentProductionDeploy {
    private static final ThereHasNeverBeenAProductionDeploy INSTANCE = new ThereHasNeverBeenAProductionDeploy();

    static ThereHasNeverBeenAProductionDeploy instance() {
        return INSTANCE;
    }

    private ThereHasNeverBeenAProductionDeploy() {
        super(null, null);
    }
}