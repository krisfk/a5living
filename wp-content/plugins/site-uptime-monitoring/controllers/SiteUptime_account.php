<?php 
	global $MoSUTDirName,$SiteUptimeDbQueries;

	if ( current_user_can( 'manage_options' ) and isset( $_POST['option'] ) )
	{
		$option =sanitize_text_field( wp_unslash($_POST['option']));
		switch($option)
		{
			case "mo_wpns_register_customer":
				mosut_register_customer(sanitize_text_field(wp_unslash($_POST['mosut_register_nonce'])), sanitize_email(wp_unslash($_POST['email'])), sanitize_text_field($_SERVER["SERVER_NAME"]), sanitize_text_field(wp_unslash($_POST['password'])), sanitize_text_field(wp_unslash($_POST['confirmPassword'])));				
				break;
			case "mo_wpns_verify_customer":
				mosut_verify_customer(sanitize_text_field(wp_unslash($_POST['mosut_login_nonce'])), sanitize_email( wp_unslash($_POST['email'] )), sanitize_text_field( wp_unslash($_POST['password'] ))); 
				break;
			case "mo_wpns_cancel":
				mosut_revert_back_registration(sanitize_text_field(wp_unslash($_POST['mosut_cancel_nonce']))); 
				break;
			case "mo_wpns_reset_password":
				mosut_reset_password(sanitize_text_field(wp_unslash($_POST['mosut_forget_nonce']))); 		   
				break;
		    case "mo2f_goto_verifycustomer":
		        mosut_goto_sign_in_page(sanitize_text_field(wp_unslash($_POST['mo2f_goto_verifycustomer_nonce'])));
		        break;
		}
	} 

	$user   = wp_get_current_user();
	$status = $SiteUptimeDbQueries->mosut_get_user_detail( 'mo_2factor_user_registration_status', $user->ID);
	$mo2f_current_registration_status = get_option('mo_2factor_user_registration_status');
	if($status == 'error')	
	{
		 $mo2f_current_registration_status = get_option('mo_2factor_user_registration_status');
		 if ((get_option ( 'mo_wpns_verify_customer' ) == 'true' || (get_option('mo2f_email') && !get_option('mo2f_customerKey'))) && $mo2f_current_registration_status == "MO_2_FACTOR_VERIFY_CUSTOMER")
		 {
		 	$admin_email = get_option('mo2f_email') ? get_option('mo2f_email') : "";		
		 	include $MoSUTDirName . 'views'.DIRECTORY_SEPARATOR.'account'.DIRECTORY_SEPARATOR.'login.php';
		 }
		 else if (!mosut_is_customer_register()) 
		 {
		 	delete_option ( 'password_mismatch' );
		 	update_option ( 'mo_wpns_new_registration', 'true' );
	    	update_option('mo_2factor_user_registration_status', 'REGISTRATION_STARTED');
	 	include $MoSUTDirName . 'views'.DIRECTORY_SEPARATOR.'account'.DIRECTORY_SEPARATOR.'register.php';
		 }
		else if(get_option('mo_2factor_admin_registration_status')=='MO_2_FACTOR_CUSTOMER_REGISTERED_SUCCESS')
		{

		$email = get_option('mo2f_email');
		$key   = get_option('mo2f_customerKey');
		$api   = get_option('mo2f_api_key');
		$token = get_option('mo2f_customer_token');
		include $MoSUTDirName . 'views'.DIRECTORY_SEPARATOR.'account'.DIRECTORY_SEPARATOR.'profile.php';
		}
	}  
	else if(get_option('mo_2factor_admin_registration_status')=='MO_2_FACTOR_CUSTOMER_REGISTERED_SUCCESS')
	{
		$email = get_option('mo2f_email');
		$key   = get_option('mo2f_customerKey');
		$api   = get_option('mo2f_api_key');
		$token = get_option('mo2f_customer_token');
		include $MoSUTDirName . 'views'.DIRECTORY_SEPARATOR.'account'.DIRECTORY_SEPARATOR.'profile.php';
	}
	else if ((get_option ( 'mo_wpns_verify_customer' ) == 'true' || (get_option('mo2f_email') && !get_option('mo2f_customerKey'))) && $mo2f_current_registration_status == "MO_2_FACTOR_VERIFY_CUSTOMER")
		 {
		 	$admin_email = get_option('mo2f_email') ? get_option('mo2f_email') : "";		
		 	include $MoSUTDirName . 'views'.DIRECTORY_SEPARATOR.'account'.DIRECTORY_SEPARATOR.'login.php';
		 }
	else
	{
			delete_option ( 'password_mismatch' );
			update_option ( 'mo_wpns_new_registration', 'true' );
	    	update_option('mo_2factor_user_registration_status', 'REGISTRATION_STARTED');
			include $MoSUTDirName . 'views'.DIRECTORY_SEPARATOR.'account'.DIRECTORY_SEPARATOR.'register.php';
	}





	 function mosut_is_customer_register() 
	{
		$email 			= get_option('mo2f_email');
		$customerKey 	= get_option('mo2f_customerKey');
		if( ! $email || ! $customerKey || ! is_numeric( trim( $customerKey ) ) )
			return 0;
		else
			return 1;
	}

	
	function mosut_register_customer($nonce, $email, $company, $password, $confirmPassword)
	{
		global $SiteUptimeDbQueries;
		 if ( ! wp_verify_nonce( $nonce, 'mosut-register-nonce' ) ){
          do_action('moSUT_show_message',Mosut_Messages::mosut_show_message('NONCE_ERROR'),'ERROR');
          return;
        } 
		
		$user   = wp_get_current_user();

		if( strlen( $password ) < 6 || strlen( $confirmPassword ) < 6)
		{
			do_action('moSUT_show_message',Mosut_Messages::mosut_show_message('PASS_LENGTH'),'ERROR');
			return;
		}
		
		if( $password != $confirmPassword )
		{
			do_action('moSUT_show_message',Mosut_Messages::mosut_show_message('PASS_MISMATCH'),'ERROR');
			return;
		}
		if( mosut_check_empty_or_null( $email ) || mosut_check_empty_or_null( $password ) 
			|| mosut_check_empty_or_null( $confirmPassword ) ) 
		{
			do_action('moSUT_show_message',Mosut_Messages::mosut_show_message('REQUIRED_FIELDS'),'ERROR');
			return;
		} 

		update_option( 'mo2f_email', $email );
		
		update_option( 'mo_wpns_company'    , $company );
		
		update_option( 'mo_wpns_password'   , $password );

		$customer = new Mosut_Curl();
		$content  = json_decode($customer->mosut_check_customer($email), true);
		update_option('user_id', $user->ID );
		switch ($content['status'])
		{
			case 'CUSTOMER_NOT_FOUND':
			      $customerKey = json_decode($customer->mosut_create_customer($email, $company, $password, $phone = '', $first_name = '', $last_name = ''), true);
			   if(strcasecmp($customerKey['status'], 'SUCCESS') == 0) 
				{
					mosut_save_success_customer_config($email, $customerKey['id'], $customerKey['apiKey'], $customerKey['token'], $customerKey['appSecret']);
				}
				
				break;

			case 'SUCCESS':	
			{
			do_action('moSUT_show_message','User already exist. Please SIGN IN','ERROR');
			}
			break;
			default:
				mosut_get_current_customer($email,$password);
				break;
		}

	}

	function mosut_check_empty_or_null( $value )
	{
		if( ! isset( $value ) || empty( $value ) )
			return true;
		return false;
	}

   function mosut_goto_sign_in_page($nonce){
   	   global  $SiteUptimeDbQueries;
		 if ( ! wp_verify_nonce( $nonce, 'mo2f-goto-verifycustomer-nonce' ) ){
          do_action('moSUT_show_message',Mosut_Messages::mosut_show_message('NONCE_ERROR'),'ERROR');
          return;
        } 
   	   $user   = wp_get_current_user();
   	   update_option('mo_wpns_verify_customer','true');
	   update_option( 'mo_2factor_user_registration_status','MO_2_FACTOR_VERIFY_CUSTOMER' );
   }

	function mosut_revert_back_registration($nonce)
	{
         if ( ! wp_verify_nonce( $nonce, 'mosut-cancel-nonce' ) ){
          do_action('moSUT_show_message',Mosut_Messages::mosut_show_message('NONCE_ERROR'),'ERROR');
          return;
        } 
		$user   = wp_get_current_user();
		delete_option('mo2f_email');
		delete_option('mo_wpns_registration_status');
		delete_option('mo_wpns_verify_customer');
		update_option('mo_2factor_user_registration_status' , '' );
	}

	function mosut_reset_password($nonce)
	{
        if ( ! wp_verify_nonce( $nonce, 'mosut-forget-nonce' ) ){
          do_action('moSUT_show_message',Mosut_Messages::mosut_show_message('NONCE_ERROR'),'ERROR');
          return;
        } 
		$customer = new Mosut_Curl();
		$forgot_password_response = json_decode($customer->mosut_forgot_password());
		if($forgot_password_response->status == 'SUCCESS')
			do_action('moSUT_show_message',Mosut_Messages::mosut_show_message('RESET_PASS'),'SUCCESS');
	}

	function mosut_verify_customer($nonce, $email, $password)
	{   
		 if ( ! wp_verify_nonce( $nonce, 'mosut-login-nonce' ) ){
          do_action('moSUT_show_message',Mosut_Messages::mosut_show_message('NONCE_ERROR'),'ERROR');
          return;
        } 
		

		if( mosut_check_empty_or_null( $email ) || mosut_check_empty_or_null( $password ) ) 
		{
			do_action('moSUT_show_message',Mosut_Messages::mosut_show_message('REQUIRED_FIELDS'),'ERROR');
			return;
		} 
		mosut_get_current_customer($email,$password);
	}

	function mosut_get_current_customer($email,$password)
	{
		global $SiteUptimeDbQueries;
		$user   = wp_get_current_user();
		$customer 	 = new Mosut_Curl();
		$content     = $customer->mosut_get_customer_key($email, $password);
		$customerKey = json_decode($content, true);
		if(json_last_error() == JSON_ERROR_NONE) 
		{
			if($customerKey==NULL || $customerKey=='ERROR')
				do_action('moSUT_show_message','ERROR','ERROR');	
		    else
		    {
				if(isset($customerKey['phone'])){
					update_option( 'mo_wpns_admin_phone', $customerKey['phone'] );
					update_option( 'mo2f_user_phone' , $customerKey['phone']  );
				}
				update_option('mo2f_email',$email);
				mosut_save_success_customer_config($email, $customerKey['id'], $customerKey['apiKey'], $customerKey['token'], $customerKey['appSecret']);
				do_action('moSUT_show_message',Mosut_Messages::mosut_show_message('REG_SUCCESS'),'SUCCESS');
			}
		} 
		else 
		{
			update_option('mosut_user_registration_status','MO_2_FACTOR_VERIFY_CUSTOMER' );
			update_option('mo_wpns_verify_customer', 'true');
			delete_option('mo_wpns_new_registration');
			do_action('moSUT_show_message',Mosut_Messages::mosut_show_message('INVALID_CREDENTIALS'),'ERROR');
		}
	}
	
		
	function mosut_save_success_customer_config($email, $id, $apiKey, $token, $appSecret)
	{

		$user   = wp_get_current_user();
		update_option( 'mo2f_customerKey'  , $id 		  );
		update_option( 'mo2f_api_key'       , $apiKey    );
		update_option( 'mo2f_customer_token'		 , $token 	  );
		update_option( 'mo2f_app_secret'			 , $appSecret );
		update_option( 'mo_wpns_enable_log_requests' , true 	  );
		update_option( 'mo2f_miniorange_admin', $user->ID );
		update_option( 'mo_2factor_admin_registration_status', 'MO_2_FACTOR_CUSTOMER_REGISTERED_SUCCESS' );
		delete_option('mo_wpns_verify_customer');
		delete_option('mo2f_current_registration_status');
		delete_option( 'mo_wpns_password'						  ); 	
	}