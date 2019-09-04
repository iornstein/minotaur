package io.pivotal.minotaur.tracker.domainObjects;

import java.util.Objects;

public class TrackerProject {
    private final String name;
    private final Long velocity;
    private final Double volatility;

    public TrackerProject() {
        this(null, null, null);
    }

    public TrackerProject(String name, Long velocity, Double volatility) {
        this.name = name;
        this.velocity = velocity;
        this.volatility = volatility;
    }

    public String getName() {
        return name;
    }

    public Long getVelocity() {
        return velocity;
    }

    public Double getVolatility() {
        return volatility;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        TrackerProject that = (TrackerProject) o;
        return Objects.equals(name, that.name) &&
                Objects.equals(velocity, that.velocity) &&
                Objects.equals(volatility, that.volatility);
    }

    @Override
    public int hashCode() {
        return Objects.hash(name, velocity, volatility);
    }
}
