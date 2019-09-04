package io.pivotal.minotaur;

import io.pivotal.minotaur.utils.Randomly;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.util.SocketUtils;

@Configuration
@Profile("test")
public class TestConfiguration {

    private Integer availableTcpPort;

    @Bean
    public Integer trackerPort() {
        if (availableTcpPort == null) {
            availableTcpPort = SocketUtils.findAvailableTcpPort();
        }
        return availableTcpPort;
    }

    @Bean
    public String trackerURI(Integer trackerPort) {
        return String.format("http://localhost:%d", trackerPort);
    }

    @Bean
    public Long trackerProjectId() {
        return Randomly.provideAPositiveInteger();
    }

    @Bean
    public String trackerToken() {
        return Randomly.provideAString();
    }
}
