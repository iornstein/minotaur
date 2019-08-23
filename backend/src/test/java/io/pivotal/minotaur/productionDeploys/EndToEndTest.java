package io.pivotal.minotaur.productionDeploys;

import io.pivotal.minotaur.utils.Randomly;
import org.json.JSONException;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.skyscreamer.jsonassert.JSONAssert;
import org.skyscreamer.jsonassert.JSONCompareMode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.context.junit4.SpringRunner;

import java.time.Clock;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.time.temporal.ChronoUnit;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.when;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@DirtiesContext
public class EndToEndTest {

    @MockBean
    private Clock clock;

    @Autowired
    private TestRestTemplate restTemplate;

    @LocalServerPort
    private Integer port;

    @Before
    public void setUp() {
        when(clock.instant()).thenReturn(Randomly.provideALocalDateTime().toInstant(ZoneOffset.UTC));
    }

    @Test
    public void shouldCorrectlyReportTheTimeSinceLastProductionDeploy() throws JSONException {
        assertThatDaysAndHoursSinceLastProductionDeployIs(null, null);

        LocalDateTime currentTime = Randomly.provideALocalDateTime();

        when(clock.instant()).thenReturn(currentTime.toInstant(ZoneOffset.UTC));
        restTemplate.put("http://localhost:" + port + "/reportAProductionDeploy", null);
        assertThatDaysAndHoursSinceLastProductionDeployIs(0, 0);

        when(clock.instant()).thenReturn(currentTime.toInstant(ZoneOffset.UTC).plus(3, ChronoUnit.DAYS));
        assertThatDaysAndHoursSinceLastProductionDeployIs(3, 0);
        restTemplate.put("http://localhost:" + port + "/reportAProductionDeploy", null);
        assertThatDaysAndHoursSinceLastProductionDeployIs(0, 0);
    }

    private void assertThatDaysAndHoursSinceLastProductionDeployIs(Integer expectedDays, Integer expectedHours) throws JSONException {
        ResponseEntity<String> firstGetResponse = restTemplate.getForEntity("http://localhost:" + port + "/timeSinceLastProductionDeploy", String.class);
        assertThat(firstGetResponse.getStatusCode()).isEqualTo(HttpStatus.OK);
        JSONAssert.assertEquals(String.format("{\"days\": %d, \"hours\": %d}", expectedDays, expectedHours), firstGetResponse.getBody(), JSONCompareMode.STRICT);
    }
}