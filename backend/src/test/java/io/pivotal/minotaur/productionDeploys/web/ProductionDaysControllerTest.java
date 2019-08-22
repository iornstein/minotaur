package io.pivotal.minotaur.productionDeploys.web;

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
public class ProductionDaysControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private Clock clock;

    @MockBean
    private LastProductionDeployService lastProductionDeployService;

    @Test
    public void getDaysSinceLastProductionDeploy_returnsTheDaysSinceLastProductionDeploy() throws Exception {
        LocalDateTime endOf1970Jan1 = LocalDateTime.of(1970, 1, 1, 23, 59, 59, 999_999_999);
        LocalDateTime beginningOf1970Jan1 = LocalDateTime.of(1970, 1, 1, 0, 0, 0, 0);
        when(lastProductionDeployService.timeOfLastProductionDeploy()).thenReturn(beginningOf1970Jan1);

        when(clock.instant()).thenReturn(endOf1970Jan1.toInstant(ZoneOffset.UTC));
        mockMvc.perform(get("/daysSinceLastProductionDeploy")).andExpect(status().isOk())
                .andExpect(content().json("{\"days\":  0}"));

        LocalDateTime _1970Jan3 = endOf1970Jan1.plusNanos(1).plusDays(1);
        when(clock.instant()).thenReturn(_1970Jan3.toInstant(ZoneOffset.UTC));
        mockMvc.perform(get("/daysSinceLastProductionDeploy")).andExpect(status().isOk())
                .andExpect(content().json("{\"days\":  2}"));
    }

    @Test
    public void getDaysSinceLastProductionDeploy_returnsNullIfThereHasNotBeenAProductionDeployYet() throws Exception {
        when(lastProductionDeployService.timeOfLastProductionDeploy()).thenReturn(null);
        mockMvc.perform(get("/daysSinceLastProductionDeploy")).andExpect(status().isOk())
                .andExpect(content().json("{\"days\":  null}"));
    }

    @Test
    public void updateDaysSinceLastProductionDeploy_updatesTheDaysSinceLastProductionDeploy() throws Exception {
        LocalDateTime now = Randomly.provideALocalDateTime();
        when(clock.instant()).thenReturn(now.toInstant(ZoneOffset.UTC));

        mockMvc.perform(put("/daysSinceLastProductionDeploy")).andExpect(status().isOk());

        verify(lastProductionDeployService).reportADeployToProduction(now);
    }
}