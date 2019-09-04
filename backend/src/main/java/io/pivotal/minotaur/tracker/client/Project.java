package io.pivotal.minotaur.tracker.client;

import java.util.Objects;

public class Project {

    private Long id;
    private String name;
    private Long current_velocity;
    private Double current_volatility;

    public Project() { }

    Project(Long id, String name, Long current_velocity, Double current_volatility) {
        this.id = id;
        this.name = name;
        this.current_velocity = current_velocity;
        this.current_volatility = current_volatility;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Long getCurrent_velocity() {
        return current_velocity;
    }

    public void setCurrent_velocity(Long current_velocity) {
        this.current_velocity = current_velocity;
    }

    public Double getCurrent_volatility() {
        return current_volatility;
    }

    public void setCurrent_volatility(Double current_volatility) {
        this.current_volatility = current_volatility;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Project project = (Project) o;
        return Objects.equals(id, project.id) &&
                Objects.equals(name, project.name) &&
                Objects.equals(current_velocity, project.current_velocity) &&
                Objects.equals(current_volatility, project.current_volatility);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name, current_velocity, current_volatility);
    }
}