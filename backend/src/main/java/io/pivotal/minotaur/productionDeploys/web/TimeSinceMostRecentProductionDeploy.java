package io.pivotal.minotaur.productionDeploys.web;

public class TimeSinceMostRecentProductionDeploy {

    private Long days;
    private Long hours;

    public TimeSinceMostRecentProductionDeploy() {
    }

    TimeSinceMostRecentProductionDeploy(Long days, Long hours) {
        this.days = days;
        this.hours = hours;
    }

    public Long getDays() {
        return days;
    }

    public Long getHours() {
        return hours;
    }

    public void setDays(Long days) {
        this.days = days;
    }

    public void setHours(Long hours) {
        this.hours = hours;
    }
}
