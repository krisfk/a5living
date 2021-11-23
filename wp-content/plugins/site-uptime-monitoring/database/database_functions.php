<?php
class MoSUT_SiteUptime_Query{
	function __construct(){
		global $wpdb;
		$this->userDetailsTable    = $wpdb->prefix . 'mo2f_user_details';
	}
	
	
	function MoSUT_plugin_activate(){
	    global $wpdb;
		if(!get_option('MoSUT_dbversion')||get_option('MoSUT_dbversion')<147)
		{
		    update_option('MoSUT_dbversion', MoSUT_SiteUptime_Constants::DB_VERSION );
		}else{
			$current_db_version = get_option('MoSUT_dbversion');
			if($current_db_version < MoSUT_SiteUptime_Constants::DB_VERSION)
			update_option('MoSUT_dbversion', MoSUT_SiteUptime_Constants::DB_VERSION );
		}
	}

	function mosut_get_user_detail( $column_name, $user_id ) {
		global $wpdb;
		if($wpdb->get_var("SHOW TABLES LIKE '$this->userDetailsTable'")!==$this->userDetailsTable )
			return 'error';
		$user_column_detail = $wpdb->get_results( "SELECT " . $column_name . " FROM " . $this->userDetailsTable . " WHERE user_id = " . $user_id . ";" );
		$value              = empty( $user_column_detail ) ? '' : get_object_vars( $user_column_detail[0] );

		return $value == '' ? '' : $value[ $column_name ];
	}
	
}
