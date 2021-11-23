<?php
	$logo_url       = plugin_dir_url(dirname(__FILE__)) . 'includes'.DIRECTORY_SEPARATOR .'images'.DIRECTORY_SEPARATOR .'miniorange_logo.png';
	$profile_url	= add_query_arg( array('page' => 'moSUT_site_account'		), $_SERVER['REQUEST_URI'] );

	$uptime_main_url	= add_query_arg( array('page' => 'moSUT_site_uptime'		), $_SERVER['REQUEST_URI'] );
	$report_url	= add_query_arg( array('page' => 'moSUT_site_statistics	'		), $_SERVER['REQUEST_URI'] );

include $MoSUTDirName . 'views'.DIRECTORY_SEPARATOR.'navbar.php';