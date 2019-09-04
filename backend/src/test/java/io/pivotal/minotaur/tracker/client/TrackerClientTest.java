package io.pivotal.minotaur.tracker.client;

import io.pivotal.minotaur.TestConfiguration;
import io.pivotal.minotaur.utils.Randomly;
import org.hamcrest.BaseMatcher;
import org.hamcrest.Description;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.client.RestClientTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.client.MockRestServiceServer;

import java.util.Arrays;
import java.util.List;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.CoreMatchers.startsWith;
import static org.springframework.test.web.client.match.MockRestRequestMatchers.*;
import static org.springframework.test.web.client.response.MockRestResponseCreators.withSuccess;

@RunWith(SpringRunner.class)
@RestClientTest({TrackerClient.class, TestConfiguration.class})
@ActiveProfiles("test")
public class TrackerClientTest {

    @Autowired
    private TrackerClient subject;

    @Autowired
    private MockRestServiceServer server;

    @Autowired
    private String trackerToken;

    @Test
    public void getProject_makesRequestToGetTheProject() {
        Long trackerProjectId = Randomly.provideAPositiveInteger();

        server
                .expect(header("X-TrackerToken", trackerToken))
                .andExpect(requestTo(startsWith("/projects/" + trackerProjectId + "?")))
                .andExpect(queryParam("fields", new StringContainsCommaSeparatedInAnyOrder("current_velocity", "name", "current_volatility")))
                .andRespond(withSuccess("{}", MediaType.APPLICATION_JSON));

        subject.getProject(trackerProjectId);

        server.verify();
    }

    @Test
    public void getProject_returnsTheResponseFromTracker() {
        Project project = RandomlyProvideATracker.project();

        server.expect(anything()).andRespond(withSuccess("{\n" +
                "  \"id\": " + project.getId() + ",\n" +
                "  \"name\": \"" + project.getName() + "\",\n" +
                "  \"current_velocity\": " + project.getCurrent_velocity() + ",\n" +
                "  \"current_volatility\": " + project.getCurrent_volatility() + "\n" +
                "}", MediaType.APPLICATION_JSON));

        Project actual = subject.getProject(project.getId());

        assertThat(actual).isEqualTo(project);
    }

    private static class StringContainsCommaSeparatedInAnyOrder extends BaseMatcher<String> {

        private final List<String> toContain;

        StringContainsCommaSeparatedInAnyOrder(String... itemsToContain) {
            toContain = Arrays.asList(itemsToContain);
        }

        @Override
        public void describeTo(Description description) {
            description.appendText("a string that contains ALL these values ")
                    .appendText(toContain.toString());
        }

        @Override
        public boolean matches(Object item) {
            List<String> actual = Arrays.asList(((String) item).split(","));
            return actual.containsAll(toContain);
        }
    }
}