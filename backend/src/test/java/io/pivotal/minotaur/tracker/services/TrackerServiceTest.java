package io.pivotal.minotaur.tracker.services;

import io.pivotal.minotaur.tracker.client.Project;
import io.pivotal.minotaur.tracker.client.RandomlyProvideATracker;
import io.pivotal.minotaur.tracker.client.TrackerClient;
import io.pivotal.minotaur.tracker.domainObjects.TrackerProject;
import io.pivotal.minotaur.utils.Randomly;
import org.junit.Before;
import org.junit.Test;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.*;

public class TrackerServiceTest {

    private TrackerClient trackerClient = mock(TrackerClient.class);
    private Long projectId;
    private TrackerService subject;

    @Before
    public void setUp() {
        projectId = Randomly.provideAPositiveInteger();
        subject = new TrackerService(projectId, trackerClient);
        when(trackerClient.getProject(anyLong())).thenReturn(RandomlyProvideATracker.project());
    }

    @Test
    public void getProject_shouldMakeTheRequestToTracker() {
        subject.getProject();

        verify(trackerClient).getProject(projectId);
    }

    @Test
    public void getProject_returnsTheProject() {
        Project projectFromClient = RandomlyProvideATracker.project();

        when(trackerClient.getProject(anyLong())).thenReturn(projectFromClient);

        TrackerProject actual = subject.getProject();
        assertThat(actual.getName()).isEqualTo(projectFromClient.getName());
        assertThat(actual.getVelocity()).isEqualTo(projectFromClient.getCurrent_velocity());
        assertThat(actual.getVolatility()).isEqualTo(projectFromClient.getCurrent_volatility());
    }
}