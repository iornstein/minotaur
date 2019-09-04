package io.pivotal.minotaur.tracker.web;

import io.pivotal.minotaur.tracker.domainObjects.TrackerProject;
import io.pivotal.minotaur.tracker.services.TrackerService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/tracker")
public class TrackerProjectController {

    private final TrackerService trackerService;

    public TrackerProjectController(TrackerService trackerService) {
        this.trackerService = trackerService;
    }

    @CrossOrigin
    @GetMapping("/project")
    public TrackerProject getProject() {
        return trackerService.getProject();
    }
}