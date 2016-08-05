<?php

class PriorityType {

    const LOW = 1;
    const MEDIUM = 2;
    const HIGH = 3;

    private static $types = [
        self::LOW => "Low",
        self::MEDIUM => "Medium",
        self::HIGH => "High",
    ];

    public static function getTypes() {
        return self::$types;
    }

    public static function typeName($type) {
        if (array_key_exists($type, self::$types)) {
            return self::$types[$type];
        }
        return "None type";
    }

}
