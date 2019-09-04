package io.pivotal.minotaur.tracker.services;

import io.pivotal.minotaur.tracker.client.Project;
import io.pivotal.minotaur.tracker.client.TrackerClient;
import io.pivotal.minotaur.tracker.domainObjects.TrackerProject;
import org.springframework.stereotype.Service;

@Service
public class TrackerService {
    private final Long projectId;
    private final TrackerClient trackerClient;

    public TrackerService(Long projectId, TrackerClient trackerClient) {
        this.projectId = projectId;
        this.trackerClient = trackerClient;
    }

    public TrackerProject getProject() {
        Project project = trackerClient.getProject(projectId);
        return new TrackerProject(project.getName(), project.getCurrent_velocity(), project.getCurrent_volatility());
    }
}