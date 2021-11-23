<?php
# Generated by the protocol buffer compiler.  DO NOT EDIT!
# source: google/ads/googleads/v8/errors/distinct_error.proto

namespace Google\Ads\GoogleAds\V8\Errors\DistinctErrorEnum;

use UnexpectedValueException;

/**
 * Enum describing possible distinct errors.
 *
 * Protobuf type <code>google.ads.googleads.v8.errors.DistinctErrorEnum.DistinctError</code>
 */
class DistinctError
{
    /**
     * Enum unspecified.
     *
     * Generated from protobuf enum <code>UNSPECIFIED = 0;</code>
     */
    const UNSPECIFIED = 0;
    /**
     * The received error code is not known in this version.
     *
     * Generated from protobuf enum <code>UNKNOWN = 1;</code>
     */
    const UNKNOWN = 1;
    /**
     * Duplicate element.
     *
     * Generated from protobuf enum <code>DUPLICATE_ELEMENT = 2;</code>
     */
    const DUPLICATE_ELEMENT = 2;
    /**
     * Duplicate type.
     *
     * Generated from protobuf enum <code>DUPLICATE_TYPE = 3;</code>
     */
    const DUPLICATE_TYPE = 3;

    private static $valueToName = [
        self::UNSPECIFIED => 'UNSPECIFIED',
        self::UNKNOWN => 'UNKNOWN',
        self::DUPLICATE_ELEMENT => 'DUPLICATE_ELEMENT',
        self::DUPLICATE_TYPE => 'DUPLICATE_TYPE',
    ];

    public static function name($value)
    {
        if (!isset(self::$valueToName[$value])) {
            throw new UnexpectedValueException(sprintf(
                    'Enum %s has no name defined for value %s', __CLASS__, $value));
        }
        return self::$valueToName[$value];
    }


    public static function value($name)
    {
        $const = __CLASS__ . '::' . strtoupper($name);
        if (!defined($const)) {
            throw new UnexpectedValueException(sprintf(
                    'Enum %s has no value defined for name %s', __CLASS__, $name));
        }
        return constant($const);
    }
}

// Adding a class alias for backwards compatibility with the previous class name.
class_alias(DistinctError::class, \Google\Ads\GoogleAds\V8\Errors\DistinctErrorEnum_DistinctError::class);

