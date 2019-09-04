package io.pivotal.minotaur.tracker;

import io.pivotal.minotaur.utils.Randomly;
import org.json.JSONException;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockserver.integration.ClientAndServer;
import org.mockserver.model.HttpRequest;
import org.skyscreamer.jsonassert.JSONAssert;
import org.skyscreamer.jsonassert.JSONCompareMode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;

import static com.google.common.net.MediaType.JSON_UTF_8;
import static org.assertj.core.api.Assertions.assertThat;
import static org.mockserver.integration.ClientAndServer.startClientAndServer;
import static org.mockserver.model.HttpResponse.response;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@ActiveProfiles("test")
public class EndToEndTest {

    @LocalServerPort
    private Integer port;

    @Autowired
    @Qualifier("trackerPort")
    private Integer trackerPort;

    @Autowired
    private TestRestTemplate testRestTemplate;

    @Autowired
    @Qualifier("trackerProjectId")
    private Long trackerProjectId;

    @Autowired
    @Qualifier("trackerToken")
    private String trackerToken;

    private ClientAndServer mockServer;

    @Before
    public void setUp() {
        mockServer = startClientAndServer(trackerPort);
    }

    @After
    public void tearDown() {
        mockServer.stop();
    }

    @Test
    public void shouldReturnTheBasicProjectInformation() throws JSONException {
        String trackerProjectPath = "/services/v5/projects/" + trackerProjectId;

        String projectName = "Project " + Randomly.provideAPositiveInteger();
        Long velocity = Randomly.provideAPositiveInteger();
        Double volatility = Randomly.provideAPositiveNumber();

        mockServer.when(HttpRequest.request(trackerProjectPath)).respond(response().withStatusCode(200).withBody(
                String.format("{    \"id\": %s,\"name\": \"%s\",    \"current_velocity\": %s,    \"current_volatility\": %s}",
                        Randomly.provideAPositiveInteger(),
                        projectName,
                        velocity,
                        volatility
                ), JSON_UTF_8
        ));

        ResponseEntity<String> entity = testRestTemplate.getForEntity("http://localhost:" + port + "/tracker" + "/project", String.class);
        assertThat(entity.getStatusCode()).isEqualTo(HttpStatus.OK);

        mockServer.verify(HttpRequest.request(trackerProjectPath)
                .withMethod("GET")
                .withQueryStringParameter("fields", "current_velocity,name,current_volatility")
                .withHeader("X-TrackerToken", trackerToken));

        JSONAssert.assertEquals(String.format("{\"name\": \"%s\", \"velocity\": %s, \"volatility\": %s}", projectName, velocity, volatility), entity.getBody(), JSONCompareMode.STRICT);
    }
}
