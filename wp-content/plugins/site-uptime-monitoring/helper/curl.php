<?php
include dirname(__FILE__).DIRECTORY_SEPARATOR .'mosut_api.php';
class Mosut_Curl
{
       
       function mosut_submit_contact_us( $q_email, $q_phone, $query )
		{
		$current_user = wp_get_current_user();
		$url    = MoSUT_SiteUptime_Constants::HOST_NAME . "/moas/rest/customer/contact-us";
		$query  = '[WordPress Site-Uptime Plugin: - V '.MoSUT_PLUGIN_VERSION.']: ' . $query;
        
		$fields = array(
					'firstName'	=> $current_user->user_firstname,
					'lastName'	=> $current_user->user_lastname,
					'company' 	=> sanitize_text_field($_SERVER['SERVER_NAME']),
					'email' 	=> $q_email,
					'ccEmail'   => '2fasupport@xecurify.com',
					'phone'		=> $q_phone,
					'query'		=> $query
				);
		 $field_string = json_encode( $fields );
        $headers = array("Content-Type"=>"application/json","charset"=>"UTF-8","Authorization"=>"Basic");
        $mosut_api =  new Mosut_Api();
        $response = $mosut_api->mosut_make_curl_call( $url, $field_string );
        return $response;

	  }

        function mosut_check_customer() {
        $url = MoSUT_SiteUptime_Constants::HOST_NAME . "/moas/rest/customer/check-if-exists";
        $email = get_option( "mo2f_email" );
        $fields = array (
            'email' => $email
        );
        $field_string = json_encode ( $fields );

        $headers = array("Content-Type"=>"application/json","charset"=>"UTF-8","Authorization"=>"Basic");
        $mosut_api =  new Mosut_Api();
        $response = $mosut_api->mosut_make_curl_call( $url, $field_string );
        return $response;

    }

    function mosut_forgot_password()
    {
    
        $url         = MoSUT_SiteUptime_Constants::HOST_NAME . '/moas/rest/customer/password-reset';
        $email       = get_option('mo2f_email');
        $customerKey = get_option('mo2f_customerKey');
        $apiKey      = get_option('mo2f_api_key');
    
        $fields      = array(
                        'email' => $email
                     );
    
        $field_string        = json_encode($fields);

        $headers = array("Content-Type"=>"application/json","charset"=>"UTF-8","Authorization"=>"Basic");
        $mosutApi= new Mosut_Api();
        $response = $mosutApi->mosut_make_curl_call( $url, $field_string );
        return $response;
    }


    function mosut_create_customer($email, $company, $password, $phone = '', $first_name = '', $last_name = '') {

        $url = MoSUT_SiteUptime_Constants::HOST_NAME . '/moas/rest/customer/add';
       
        $fields       = array(
            'companyName'     => $company,
            'areaOfInterest'  => 'WordPress Site-Uptime Plugin',
            'productInterest' => 'Site-Uptime Monitor',
            'firstname'       => $first_name,
            'lastname'        => $last_name,
            'email'           => $email,
            'phone'           => $phone,
            'password'        => $password
        );
        $field_string = json_encode( $fields );
        $headers = array("Content-Type"=>"application/json","charset"=>"UTF-8","Authorization"=>"Basic");
        $mosutApi= new Mosut_Api();
        $content = $mosutApi->mosut_make_curl_call( $url, $field_string );
        return $content;
    }

     function mosut_get_customer_key($email,$password) {
        $url      = MoSUT_SiteUptime_Constants::HOST_NAME . "/moas/rest/customer/key";
        $fields       = array(
            'email'    => $email,
            'password' => $password
        );
        $field_string = json_encode( $fields );
        
        $headers = array("Content-Type"=>"application/json","charset"=>"UTF-8","Authorization"=>"Basic");
        $mosut_api =  new Mosut_Api();
        $content = $mosut_api->mosut_make_curl_call( $url, $field_string );
        return $content;
    }


	function mosut_send_email_alert($email,$phone,$message,$feedback_option){
    
	    global $moWpnsUtility;
	    global $user;
	    
        $url = MoSUT_SiteUptime_Constants::HOST_NAME . '/moas/api/notify/send';
        $customerKey = MoSUT_SiteUptime_Constants::DEFAULT_CUSTOMER_KEY;
        $apiKey      = MoSUT_SiteUptime_Constants::DEFAULT_API_KEY;
        $fromEmail			= 'no-reply@xecurify.com';
        if ($feedback_option == 'mo_eb_skip_feedback') 
        {
        	$subject            = "Deactivate [Skipped Feedback]: WordPress Site-Uptime Plugin -". $email;
        }
        elseif ($feedback_option == 'mo_eb_feedback') 
        {
        	$subject            = "Feedback: WordPress Site-Uptime Plugin -". $email;
        }

        $user         = wp_get_current_user();

		$query = '[WordPress Site-Uptime Plugin: - V '.MoSUT_SiteUptime_Constants::MoSUT_PLUGIN_VERSION.']: ' . $message;


        $content='<div >Hello, <br><br>First Name :'.$user->user_firstname.'<br><br>Last  Name :'.$user->user_lastname.'   <br><br>Company :<a href="'.$_SERVER['SERVER_NAME'].'" target="_blank" >'.$_SERVER['SERVER_NAME'].'</a><br><br>Phone Number :'.$phone.'<br><br>Email :<a href="mailto:'.$email.'" target="_blank">'.$email.'</a><br><br>Query :'.$query.'</div>';


        $fields = array(
            'customerKey'	=> $customerKey,
            'sendEmail' 	=> true,
            'email' 		=> array
            (
                'customerKey' 	=> $customerKey,
                'fromEmail' 	=> $fromEmail,
                'fromName' 		=> 'Xecurify',
                'toEmail' 		=> '2fasupport@xecurify.com',
                'toName' 		=> '2fasupport@xecurify.com',
                'subject' 		=> $subject,
                'content' 		=> $content
            ),
        );
        $field_string = json_encode($fields);
        $headers = array("Content-Type"=>"application/json","charset"=>"UTF-8","Authorization"=>"Basic");
        $mosut_api =  new Mosut_Api();
        $response = $mosut_api->mosut_make_curl_call( $url, $field_string );
        return $response;

    }

    private static function createAuthHeader($customerKey, $apiKey) {
        $currentTimestampInMillis = round(microtime(true) * 1000);
        $currentTimestampInMillis = number_format($currentTimestampInMillis, 0, '', '');

        $stringToHash = $customerKey . $currentTimestampInMillis . $apiKey;
        $authHeader = hash("sha512", $stringToHash);

        $header = array (
            "Content-Type: application/json",
            "Customer-Key: $customerKey",
            "Timestamp: $currentTimestampInMillis",
            "Authorization: $authHeader"
        );
        return $header;
    }   
}