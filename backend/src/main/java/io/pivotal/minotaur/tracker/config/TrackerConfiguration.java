package io.pivotal.minotaur.tracker.config;

import io.pivotal.minotaur.config.ConfigurationException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

@Configuration
@Profile("!test")
public class TrackerConfiguration {

    @Bean
    public String trackerURI(@Value("${tracker.url}") String url) {
        return url;
    }

    @Bean
    public Long trackerProjectId(@Value("${tracker.projectId}") String projectId) {
        if (projectId.equals("") || projectId.equals("write your projectId here")) {
            throw ConfigurationException.forMissingProperty("tracker.projectId");
        }
        try {
            return Long.parseLong(projectId);
        } catch (NumberFormatException e) {
            throw ConfigurationException.forPropertyThatShouldBeANumber("tracker.projectId", projectId);
        }
    }

    @Bean
    public String trackerToken(@Value("${tracker.token}") String token) {
        if (token.equals("") || token.equals("write your token here")) {
            throw ConfigurationException.forMissingProperty("tracker.token");
        }
        return token;
    }
}