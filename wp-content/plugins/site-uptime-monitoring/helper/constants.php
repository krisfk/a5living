<?php
	
	class MoSUT_SiteUptime_Constants
	{
		
		const DB_VERSION				= '146';
		const HOST_NAME					= "https://login.xecurify.com";
        
	
		function __construct()
		{
			$this->MoSUT_define_global();
		}

		function MoSUT_define_global()
		{
			global $SiteUptimeDbQueries , $MoSUTDirName;
			$SiteUptimeDbQueries	 	= new MoSUT_SiteUptime_Query();
			$MoSUTDirName 				= dirname(dirname(__FILE__)).DIRECTORY_SEPARATOR;
			
		}
		
	}
	new MoSUT_SiteUptime_Constants;

?>