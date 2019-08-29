package io.pivotal.minotaur.productionDeploys.web;

import io.pivotal.minotaur.productionDeploys.domainObjects.TimeSinceMostRecentProductionDeploy;
import io.pivotal.minotaur.productionDeploys.services.LastProductionDeployService;
import io.pivotal.minotaur.utils.Randomly;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import java.time.Clock;
import java.time.LocalDateTime;
import java.time.ZoneOffset;

import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


@RunWith(SpringRunner.class)
@WebMvcTest
public class ProductionTimeControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private Clock clock;

    @MockBean
    private LastProductionDeployService lastProductionDeployService;

    @Test
    public void getTimeSinceLastProductionDeploy_returnsTheTimeSinceLastProductionDeploy() throws Exception {
        LocalDateTime someTime = Randomly.provideALocalDateTime();
        when(lastProductionDeployService.timeBetweenMostRecentProductionDeployAnd(someTime)).thenReturn(new TimeSinceMostRecentProductionDeploy(2L, 3L));
        when(clock.instant()).thenReturn(someTime.toInstant(ZoneOffset.UTC));
        mockMvc.perform(get("/timeSinceLastProductionDeploy")).andExpect(status().isOk())
                .andExpect(content().json("{\"days\":  2, \"hours\": 3}"));
    }

    @Test
    public void reportAProductionDeploy_updatesTheTimeSinceLastProductionDeploy() throws Exception {
        LocalDateTime now = Randomly.provideALocalDateTime();
        when(clock.instant()).thenReturn(now.toInstant(ZoneOffset.UTC));

        mockMvc.perform(put("/reportAProductionDeploy")).andExpect(status().isOk());

        verify(lastProductionDeployService).reportADeployToProduction(now);
    }
}