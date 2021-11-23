<?php
global $MoSUTDirName;
$MoSUTDirName = dirname(dirname(__FILE__)).DIRECTORY_SEPARATOR;

if(current_user_can( 'manage_options' )  && isset($_POST['option'])){
	$option = sanitize_text_field(wp_unslash($_POST['option']));
	
    switch($option)
	{
        case "mo_wpns_send_query":
		    mosut_handle_support_form(sanitize_email($_POST['query_email']), sanitize_text_field($_POST['query']), sanitize_text_field($_POST['query_phone']),sanitize_text_field(wp_unslash($_POST['mosut_support_nonce'])));
		    break;
		}
	}
	$current_user 	= wp_get_current_user();
	$email 			= get_site_option("mo2f_email");
	$phone 			= get_site_option("mo_wpns_admin_phone");
	if($phone =='false')
		$phone='';
	if(empty($email))
		$email 		= $current_user->user_email;

	include $MoSUTDirName . 'views'.DIRECTORY_SEPARATOR.'support.php';

function mosut_handle_support_form($email,$query,$phone,$nonce){

      
	if ( ! wp_verify_nonce( $nonce, 'mosut-support-nonce' ) ){
          do_action('moSUT_show_message',Mosut_Messages::mosut_show_message('NONCE_ERROR'),'ERROR');
          return;
        } 
	
	if( empty($email) || empty($query) )
	{
	    do_action('moSUT_show_message',Mosut_Messages::mosut_show_message('SUPPORT_FORM_VALUES'),'SUCCESS');
		return;
	}
	
	if(!empty($phone) && !is_numeric($phone))
	{
		do_action('moSUT_show_message',Mosut_Messages::mosut_show_message('INVALID_PHONE'),'SUCCESS');
		return;
	}
	$contact_us = new Mosut_Curl();
	$submited = json_decode($contact_us->mosut_submit_contact_us($email, $phone, $query),true);
    if(json_last_error() == JSON_ERROR_NONE) 
	{
		do_action('moSUT_show_message',Mosut_Messages::mosut_show_message('SUPPORT_FORM_SENT'),'SUCCESS');
		return;
	}
	do_action('moSUT_show_message',Mosut_Messages::mosut_show_message('SUPPORT_FORM_SENT'),'SUCCESS');
	
}