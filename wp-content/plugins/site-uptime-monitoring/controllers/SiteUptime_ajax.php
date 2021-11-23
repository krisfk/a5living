<?php 
class mosut_uptime_ajax{
	function __construct(){
		add_action( 'admin_init'  , array( $this, 'mo_siteUptime_ajax' ) );
	}
	function mo_siteUptime_ajax(){
		 
		add_action( 'wp_ajax_mo_siteUptime', array($this,'mo_siteUptime') );
	}
	function mo_siteUptime(){
			switch(sanitize_text_field($_POST['mo_siteUptime_ajax']))
			{
				case "Register_site":
					$this->mo_register_domain(); break;	
			}
		}


	function mo_register_domain(){
		$email = sanitize_text_field($_POST['email']);
		$domain = sanitize_text_field($_POST['domain']);
		$url = 'http://sitestats.xecurify.com:8080/SiteUptimeCheck/webapi/myresource/register?email='.$email.'&domain='.$domain;
		$key = base64_encode("data");
		$args =  array(
    		'method'      => 'POST',
    		'timeout'     => 45,
    		'redirection' => 5,
    		'httpversion' => '1.0',
    		'blocking'    => true,
    		'headers'     => array(	'Accept'=>'application/json' ,'Content-Type'=>'application/json',"Authorization"=>"Basic".$key),
    		'body'        => json_encode(array('email' => $email)),
    		'cookies'     => array()
    );

		$response = wp_remote_post($url , $args);
		$message =  sanitize_text_field($response['body']);
		if($message == 'details inserted'){
			update_site_option('mosut_registered_email', $email);
		}
		wp_send_json($message);
	}

}
new mosut_uptime_ajax;
?>