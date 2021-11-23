<?php 
/**
 * Plugin Name: Site UpTime Monitoring
 * Description: Know when your website or server is down - before your customers do.SiteUptime will check your website at regular intervals.
 * Version: 1.0.1
 * Author: miniOrange
 * Author URI: https://miniorange.com
 * License: GPL2
 */
 
 define( 'MoSUT_PLUGIN_VERSION', '1.0.1' );
 class MoSUT_Mo_Uptime{
	 function __construct(){
		register_activation_hook   (__FILE__		 , array( $this, 'MoSUT_activate'			   )	    );
		add_action( 'admin_menu'		         , array( $this	   , 'MoSUT_widget_menu'		   )		);
		add_action( 'admin_enqueue_scripts'		 , array( $this, 'MoSUT_settings_style'	       )		);
		
		add_action( 'admin_enqueue_scripts'		 , array( $this, 'MoSUT_settings_script'	       )	    );
		add_action( 'moSUT_show_message'		 	 , array( $this, 'MoSUT_show_messages' 				   ), 1 , 2 );
		$this->MoSUT_includes();
	 }
	 
	  function MoSUT_activate(){
		  global $SiteUptimeDbQueries;
		  $SiteUptimeDbQueries->MoSUT_plugin_activate();
		  
	  }
	  
	  function MoSUT_widget_menu(){
		$menu_slug = 'moSUT_site_uptime';
		add_menu_page (	'miniOrange SiteUptime ' , 'miniOrange SiteUptime' , 'activate_plugins', $menu_slug , array( $this, 'MoSUT_main'), plugin_dir_url(__FILE__).'includes'.DIRECTORY_SEPARATOR.'images'.DIRECTORY_SEPARATOR.'miniorange_icon.png' );
		
		add_submenu_page( $menu_slug	,'miniOrange SiteUptime'	,'Uptime Monitor','administrator','moSUT_site_uptime'			, array( $this, 'MoSUT_main'),2);
			
			add_submenu_page( $menu_slug	,'miniOrange SiteUptime'	,'Website Statistics','administrator','moSUT_site_statistics'			, array( $this, 'MoSUT_main'),5);
			add_submenu_page( $menu_slug	,'miniOrange SiteUptime'	,'Upgrade','administrator','moSUT_site_upgrade'			, array( $this, 'MoSUT_main'),6);

			add_submenu_page( $menu_slug	,'miniOrange SiteUptime'	,'Account','administrator','moSUT_site_account'			, array( $this, 'MoSUT_main'),7);
	  }
	  function MoSUT_main(){
		include 'controllers'.DIRECTORY_SEPARATOR .'main_controller.php';
	  }
	  function MoSUT_settings_style($hook){
		if(strpos($hook, 'page_moSUT')){
			wp_enqueue_style( 'mo_wpns_admin_settings_style'			, plugins_url('includes'.DIRECTORY_SEPARATOR .'css'.DIRECTORY_SEPARATOR .'style_settings.css', __FILE__));
		
			wp_enqueue_style( 'mo_wpns_admin_settings_datatable_style'	, plugins_url('includes'.DIRECTORY_SEPARATOR .'css'.DIRECTORY_SEPARATOR.'jquery.dataTables.min.css', __FILE__));
		}
	  }

	  function MoSUT_settings_script($hook){
	  	if(strpos($hook, 'page_moSUT')){
				wp_enqueue_script( 'mo_wpns_admin_datatable_script'			, plugins_url('includes'.DIRECTORY_SEPARATOR .'js'.DIRECTORY_SEPARATOR .'jquery.dataTables.min.js', __FILE__ ), array('jquery'));
			}
	  }

	  function MoSUT_show_messages($content,$type) 
		{
			if($type=="NOTICE")
				echo '	<div class="is-dismissible notice notice-warning"> <p>'.esc_html($content).'</p> </div>';
			if($type=="ERROR")
				echo '	<div class="notice notice-error is-dismissible"> <p>'.esc_html($content).'</p> </div>';
			if($type=="SUCCESS")
				echo '	<div class="notice notice-success"> <p>'.esc_html($content).'</p> </div>';
		}
	  
	  function MoSUT_includes(){
		  require('database'.DIRECTORY_SEPARATOR .'database_functions.php');
		  require('helper'.DIRECTORY_SEPARATOR .'curl.php');
		  require('helper'.DIRECTORY_SEPARATOR .'constants.php');
		  require('controllers'.DIRECTORY_SEPARATOR .'SiteUptime_ajax.php');
		  require('helper'. DIRECTORY_SEPARATOR. 'mosut_messages.php');
	  }

}new MoSUT_Mo_Uptime;
