<?php
# Generated by the protocol buffer compiler.  DO NOT EDIT!
# source: google/ads/googleads/v8/common/criteria.proto

namespace Google\Ads\GoogleAds\V8\Common;

use Google\Protobuf\Internal\GPBType;
use Google\Protobuf\Internal\RepeatedField;
use Google\Protobuf\Internal\GPBUtil;

/**
 * Criterion for hotel date selection (default dates vs. user selected).
 *
 * Generated from protobuf message <code>google.ads.googleads.v8.common.HotelDateSelectionTypeInfo</code>
 */
class HotelDateSelectionTypeInfo extends \Google\Protobuf\Internal\Message
{
    /**
     * Type of the hotel date selection
     *
     * Generated from protobuf field <code>.google.ads.googleads.v8.enums.HotelDateSelectionTypeEnum.HotelDateSelectionType type = 1;</code>
     */
    protected $type = 0;

    /**
     * Constructor.
     *
     * @param array $data {
     *     Optional. Data for populating the Message object.
     *
     *     @type int $type
     *           Type of the hotel date selection
     * }
     */
    public function __construct($data = NULL) {
        \GPBMetadata\Google\Ads\GoogleAds\V8\Common\Criteria::initOnce();
        parent::__construct($data);
    }

    /**
     * Type of the hotel date selection
     *
     * Generated from protobuf field <code>.google.ads.googleads.v8.enums.HotelDateSelectionTypeEnum.HotelDateSelectionType type = 1;</code>
     * @return int
     */
    public function getType()
    {
        return $this->type;
    }

    /**
     * Type of the hotel date selection
     *
     * Generated from protobuf field <code>.google.ads.googleads.v8.enums.HotelDateSelectionTypeEnum.HotelDateSelectionType type = 1;</code>
     * @param int $var
     * @return $this
     */
    public function setType($var)
    {
        GPBUtil::checkEnum($var, \Google\Ads\GoogleAds\V8\Enums\HotelDateSelectionTypeEnum\HotelDateSelectionType::class);
        $this->type = $var;

        return $this;
    }

}

