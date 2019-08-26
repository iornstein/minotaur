package io.pivotal.minotaur.productionDeploys.web;

import io.pivotal.minotaur.utils.Randomly;
import org.junit.Before;
import org.junit.Test;

import java.time.LocalDateTime;

import static org.assertj.core.api.Assertions.assertThat;

public class LastProductionDeployServiceTest {

    private LastProductionDeployService subject;

    @Before
    public void setUp() {
        subject = new LastProductionDeployService();
    }

    @Test
    public void timeBetweenMostRecentProductionDeploy_returnsTheTimeDifferenceFromTheLastDeploy() {
        LocalDateTime someTime = Randomly.provideALocalDateTime();

        Long hoursBetween = Randomly.providerANumberBetween(1L, 23L);
        Long daysBetween = Randomly.providerANumberBetween(1L, 10L);
        LocalDateTime laterTime = someTime.plusDays(daysBetween).plusHours(hoursBetween);

        subject.reportADeployToProduction(someTime);
        TimeSinceMostRecentProductionDeploy actual = subject.timeBetweenMostRecentProductionDeployAnd(laterTime);

        assertThat(actual.getDays()).isEqualTo(daysBetween);
        assertThat(actual.getHours()).isEqualTo(hoursBetween);
    }

    @Test
    public void timeBetweenMostRecentProductionDeploy_returnsThereHasNeverBeenAProductionDeploy_whenThereHasNotBeenOneYet() {
        TimeSinceMostRecentProductionDeploy actual = subject.timeBetweenMostRecentProductionDeployAnd(Randomly.provideALocalDateTime());

        assertThat(actual.getDays()).isNull();
        assertThat(actual.getHours()).isNull();
    }
}