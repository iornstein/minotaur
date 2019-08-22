package io.pivotal.minotaur.productionDeploys.web;

import io.pivotal.minotaur.utils.Randomly;
import org.junit.Test;

import java.time.LocalDateTime;

import static org.assertj.core.api.Assertions.assertThat;

public class LastProductionDeployServiceTest {

    private LastProductionDeployService subject = new LastProductionDeployService();

    @Test
    public void timeOfLastProductionDeploy_returnsNull_whenThereHasNotYetBeenADeployToProduction() {
        assertThat(subject.timeOfLastProductionDeploy()).isNull();
    }

    @Test
    public void serviceReportsTheLastReportedDeployToProduction() {
        LocalDateTime someTime = Randomly.provideALocalDateTime();
        subject.reportADeployToProduction(someTime);

        assertThat(subject.timeOfLastProductionDeploy()).isEqualTo(someTime);

        LocalDateTime someOtherTime = Randomly.provideALocalDateTime();
        subject.reportADeployToProduction(someOtherTime);

        assertThat(subject.timeOfLastProductionDeploy()).isEqualTo(someOtherTime);
    }
}