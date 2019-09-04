package io.pivotal.minotaur.utils;

import io.pivotal.minotaur.tracker.domainObjects.TrackerProject;

import java.net.URI;
import java.time.LocalDateTime;
import java.time.Month;
import java.time.ZoneOffset;
import java.util.concurrent.ThreadLocalRandom;

public class Randomly {

    public static LocalDateTime provideALocalDateTime() {
        long minimumTime = LocalDateTime.of(1970, Month.JANUARY, 1, 0, 0).toEpochSecond(ZoneOffset.UTC);
        long maximumTime = LocalDateTime.of(2071, Month.JANUARY, 1, 0, 0).toEpochSecond(ZoneOffset.UTC);
        long randomEpochSecond = ThreadLocalRandom.current().nextLong(minimumTime, maximumTime);
        return LocalDateTime.ofEpochSecond(randomEpochSecond, 0, ZoneOffset.UTC);
    }

    public static Long providerAnIntegerBetween(Long min, Long max) {
        return ThreadLocalRandom.current().nextLong((max - min) + 1) + min;
    }

    public static Long provideAPositiveInteger() {
        return providerAnIntegerBetween(0L, 1000000L);
    }

    public static Double provideAPositiveNumber() {
        return ThreadLocalRandom.current().nextDouble(0, 1000000);
    }

    public static String provideAString() {
        return String.format("a%dz", provideAPositiveInteger());
    }

    public static TrackerProject provideATrackerProject() {
        return new TrackerProject(provideAString(), provideAPositiveInteger(), provideAPositiveNumber());
    }
}