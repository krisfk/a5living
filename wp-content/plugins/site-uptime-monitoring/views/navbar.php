<?php

echo'<div class="wrap">
				<div><img  style="float:left;margin-top:5px;" src="'.$logo_url.'"></div>
				<h1>
					miniOrange SiteUptime &nbsp;
					<a class="add-new-h2 " href="'.$profile_url.'">Account</a>	
				</h1>

		</div>';
		$active_tab = sanitize_text_field(wp_unslash($_GET['page']));
		if($active_tab == 'moSUT_site')
			$active_tab = 'moSUT_site_uptime';
		?>

<div class="mo_flex-container" style="margin-bottom: 55px;">
	
	<a class="nav-tab <?php echo ($active_tab == 'moSUT_site_uptime' 	  ? 'nav-tab-active' : '')?>" href="<?php echo $uptime_main_url;?>" id="schdule">Register</a>
  	
  	<a class="nav-tab <?php echo ($active_tab == 'moSUT_site_statistics' 	  ? 'nav-tab-active' : '')?>" href="<?php echo $report_url;?>" id="report">Website Statistics</a>

</div>
<br>