package io.pivotal.minotaur.tracker.client;

import io.pivotal.minotaur.utils.Randomly;

public class RandomlyProvideATracker {

    public static Project project() {
        return new Project(
                Randomly.provideAPositiveInteger(),
                Randomly.provideAString(),
                Randomly.provideAPositiveInteger(),
                Randomly.provideAPositiveNumber()
        );
    }
}