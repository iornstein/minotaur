package io.pivotal.minotaur.tracker.client;

import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriBuilder;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;

@Service
public class TrackerClient {

    private final RestTemplate restTemplate;
    private final String trackerToken;

    public TrackerClient(RestTemplateBuilder restTemplateBuilder, String trackerURI, String trackerToken) {
        restTemplate = restTemplateBuilder.rootUri(trackerURI + "/services/v5").build();
        this.trackerToken = trackerToken;
    }

    public Project getProject(Long projectId) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("X-TrackerToken", trackerToken);
        URI uri = ((UriBuilder) UriComponentsBuilder.newInstance().path("/projects/" + projectId).queryParam("fields", "current_velocity,name,current_volatility")).build();
        ResponseEntity<Project> response = restTemplate.exchange(uri.toString(), HttpMethod.GET, new HttpEntity<>(headers), Project.class);

        return response.getBody();
    }
}