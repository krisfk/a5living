<?php add_action( 'admin_footer', 'mosut_siteuptime_ajax' );?>

<div class="mo_wpns_divided_layout">
<div id="wpns_message"></div>
<div class="mo_wpns_setting_layout" id="">
	<div>
	<h3  style="font-size: 146%;" >
				About SiteUptime Monitor
			</h3>
	</div>		
			<hr style="width: 100%;" fixed>
	<div style="font-size: 120%;padding-left: 5%;">

		
		<ul style="list-style-type:disc;">
			<li>Know when your website or server is down - before your customers do.</li>
			<li>Miniorange's free website uptime status checker offers you the<b> best way to analyze whether your website is down.</b></li>
			<li><b>You will receive a mail</b> as soon as we detect that your website is down.</li>
			<li>You will also be notified for how long was your website down via a mail.</li>
		</ul>
	</div>
<hr fixed>

	<h2  style="font-size: 150%;" >
				Get Your Domain Registered Here
			</h2>
			<hr fixed>
			
	<div style="padding-left: 5%;">
	<table id="mosut_table" style="text-align: left; width: 60%;padding-top: 1%;border-collapse:separate; border-spacing: 0 15px; " >
		<tr>
			<td >
				<b style="font-style: italic; font-size: 140%;">Your Domain :</b>
			</td>
			<td style="font-size: 140%;">
				<?php  echo site_url(); ?>
				
			</td>
		</tr>
		<tr>
			<td>
				<b style=" font-size: 140%;">Email :</b>
			</td>
			<td>
				<input class="moSUT_border" type="text" name="" id="siteuptime_email" placeholder="Enter your Email" value="<?php echo $registered_email ?>"  />
			</td>
		</tr>
	</table>
	</div>
	<div style="padding-left:5%; ">
	<input type="button" id="register_uptimeButton" name="" value="Register" class="mo_wpns_button mo_wpns_button1" >
	</div>
	<input type="hidden" id="current_site" value="<?php echo site_url() ?>">
	

	


</div>



</div>

<?php 
function mosut_siteuptime_ajax(){

?>
			<script type="text/javascript">

				jQuery("#register_uptimeButton").click(function(){
					jQuery("#wpns_message").empty();
					var data = {
					'action'                 :'mo_siteUptime',  
					'mo_siteUptime_ajax'	 :'Register_site',
					'email'					 : jQuery("#siteuptime_email").val(),
					'domain'				 : jQuery("#current_site").val(),			 
					};
					jQuery.post(ajaxurl, data, function(response) {
						if(response == 'invalid email'){
							jQuery('#wpns_message').append("<div class= 'notice notice-error is-dismissible' style='height : 25px;padding-top: 10px;  ' >Your email is invalid</div>");
							jQuery("#wpns_message").show();
						}
						else if(response == 'domain exists'){
							jQuery('#wpns_message').append("<div class= 'notice notice-error is-dismissible' style='height : 25px;padding-top: 10px;  ' >Your Domain is already registered with miniorange</div>");
							jQuery("#wpns_message").show();
						}
						else if(response == 'details inserted'){
							jQuery('#wpns_message').append("<div class= 'notice notice-success is-dismissible' style='height : 25px;padding-top: 10px;  ' >Your domain is successfully registered with MiniOrange.</div>");
							jQuery("#wpns_message").show();
						}
						else if(response == 'timeout'){
							jQuery('#wpns_message').append("<div class= 'notice notice-error is-dismissible' style='height : 25px;padding-top: 10px;  ' >Your domain could not be registered with miniorange(timedout).</div>");
							jQuery("#wpns_message").show();
						}
						else if(response == 'forbidden'){
							jQuery('#wpns_message').append("<div class= 'notice notice-error is-dismissible' style='height : 25px;padding-top: 10px;  ' >Your domain could not be registered with miniorange(Miniorange couldn't reach your website.).</div>");
							jQuery("#wpns_message").show();
						}
						else if(response == 'Transaction Limit Exceeded'){
							jQuery('#wpns_message').append("<div class= 'notice notice-error is-dismissible' style='height : 25px;padding-top: 10px;  ' >Transaction Limit Exceeded.</div>");
							jQuery("#wpns_message").show();
						}
						else if(response == 'Localhost'){
							jQuery('#wpns_message').append("<div class= 'notice notice-error is-dismissible' style='height : 25px;padding-top: 10px;  ' >Website is running on a local machine.</div>");
							jQuery("#wpns_message").show();
						}
						else{
							jQuery('#wpns_message').append("<div class= 'notice notice-error is-dismissible' style='height : 25px;padding-top: 10px;  ' >Error while registering.</div>");
							jQuery("#wpns_message").show();
						}
					});
				});

			</script>
   <?php
        }

