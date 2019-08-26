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

    public void setDays(long days) {
        this.days = days;
    }

    public void setHours(long hours) {
        this.hours = hours;
    }
}
