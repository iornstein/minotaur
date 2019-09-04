package io.pivotal.minotaur.tracker.web;

import com.fasterxml.jackson.databind.ObjectMapper;
import io.pivotal.minotaur.tracker.domainObjects.TrackerProject;
import io.pivotal.minotaur.tracker.services.TrackerService;
import io.pivotal.minotaur.utils.Randomly;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@WebMvcTest(TrackerProjectController.class)
public class TrackerProjectControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper mapper;

    @MockBean
    private TrackerService trackerService;

    @Test
    public void getProject_shouldReturnTheProjectDetails() throws Exception {
        TrackerProject project = Randomly.provideATrackerProject();
        when(trackerService.getProject()).thenReturn(project);

        String expectedResponse = mapper.writeValueAsString(project);

        mockMvc.perform(get("/tracker/project"))
                .andExpect(status().isOk())
                .andExpect(content().json(expectedResponse));
    }
}