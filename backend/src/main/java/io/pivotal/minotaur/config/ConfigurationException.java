package io.pivotal.minotaur.config;

public class ConfigurationException extends RuntimeException {

    private final static String spacing = "\n ~~~~~~~~~~~~~~\n~~~~~~~~~~~~~~\n~~~~~~~~~~~~~~\n";

    private ConfigurationException(String message) {
        super(spacing + message + spacing);
    }

    private static String propertyMessagePrefix(String property) {
        return "You must properly configure a (" + property + ") in the application.yml.";
    }

    public static ConfigurationException forMissingProperty(String property) {
        return new ConfigurationException(propertyMessagePrefix(property) + " Right now that property is missing. See the README for details.");
    }

    public static ConfigurationException forPropertyThatShouldBeANumber(String property, String value) {
        String message = propertyMessagePrefix(property) + " Right now that property is (" + value + "), but it needs to be a number. See the README for details.";
        return new ConfigurationException(message);
    }
}