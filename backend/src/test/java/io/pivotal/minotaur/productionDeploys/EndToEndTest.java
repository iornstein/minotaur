package io.pivotal.minotaur.productionDeploys;

import io.pivotal.minotaur.utils.Randomly;
import org.json.JSONException;
import org.json.JSONObject;
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
import org.springframework.test.context.junit4.SpringRunner;

import java.time.Clock;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.time.temporal.ChronoUnit;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.when;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class EndToEndTest {

    @MockBean
    private Clock clock;

    @Autowired
    private TestRestTemplate restTemplate;

    @LocalServerPort
    private Integer port;

    @Test
    public void shouldUpdateTheDaysSinceLastProductionDeployAppropriately() throws JSONException {
        LocalDateTime currentTime = Randomly.provideALocalDateTime();

        when(clock.instant()).thenReturn(currentTime.toInstant(ZoneOffset.UTC));
        restTemplate.put("http://localhost:" + port + "/daysSinceLastProductionDeploy", null);
        assertThatDaysSinceLastProductionDeployIs(0);

        when(clock.instant()).thenReturn(currentTime.toInstant(ZoneOffset.UTC).plus(3, ChronoUnit.DAYS));
        assertThatDaysSinceLastProductionDeployIs(3);
        restTemplate.put("http://localhost:" + port + "/daysSinceLastProductionDeploy", null);
        assertThatDaysSinceLastProductionDeployIs(0);
    }

    private void assertThatDaysSinceLastProductionDeployIs(int expectedDays) throws JSONException {
        ResponseEntity<String> firstGetResponse = restTemplate.getForEntity("http://localhost:" + port + "/daysSinceLastProductionDeploy", String.class);
        assertThat(firstGetResponse.getStatusCode()).isEqualTo(HttpStatus.OK);
        JSONAssert.assertEquals(String.format("{\"days\": %d}", expectedDays), firstGetResponse.getBody(), JSONCompareMode.STRICT);
    }
}