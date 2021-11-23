<?php
global $MoSUTDirName;
$controller = $MoSUTDirName . 'controllers'.DIRECTORY_SEPARATOR;
global $active_tab;
include $controller . 'navbar.php';

if( isset( $_GET[ 'page' ])) {
	$page = sanitize_text_field(wp_unslash($_GET['page']));

	switch($page){
		case 'moSUT_site_uptime':
			include $controller . 'SiteUptime_registeration.php';		break;
		case 'moSUT_site_statistics':
			include $controller . 'SiteUptime_statistics.php';				break;	
		case 'moSUT_site_account':
			include $controller . 'SiteUptime_account.php';		break;
	}
}
include $controller . 'support.php';