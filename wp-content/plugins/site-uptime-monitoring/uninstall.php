<?php
  //if uninstall not called from WordPress exit
   if ( !defined( 'WP_UNINSTALL_PLUGIN' ) ) 
       exit();

   delete_option('mosut_customer_selected_plan');
   delete_option('MoSUT_dbversion');

?>