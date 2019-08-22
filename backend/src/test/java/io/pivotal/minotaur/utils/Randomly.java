package io.pivotal.minotaur.utils;

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
}