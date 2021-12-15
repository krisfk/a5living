<?php
/**
 * Single Product Price
 *
 * This template can be overridden by copying it to yourtheme/woocommerce/single-product/price.php.
 *
 * HOWEVER, on occasion WooCommerce will need to update template files and you
 * (the theme developer) will need to copy the new files to your theme to
 * maintain compatibility. We try to do this as little as possible, but it does
 * happen. When this occurs the version of the template file will be bumped and
 * the readme will list any important changes.
 *
 * @see     https://docs.woocommerce.com/document/template-structure/
 * @package WooCommerce\Templates
 * @version 3.0.0
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly
}

global $product;

?>

<p class="<?php echo esc_attr( apply_filters( 'woocommerce_product_price_class', 'price' ) ); ?>">
    <?php 
    
//    echo $product->get_price_html();
    ?>

    <?php
                    $product_type = $product->get_type();

                    if($product_type=='simple')
                    {
                        echo $product->get_price_html();
                    }
                    else
                    {
                        $variations = $product->get_available_variations();
                        // $was_price=[];
                        // $now_price=[];
                        $all_price=[];
                        // print_r($variations);
                    
                        foreach ($variations as $variation) {

                            $display_price = $variation['display_price'];
                            array_push($all_price,$display_price );

                        
                            // $display_regular_price = $variation['display_regular_price'];
                            // $display_price = $variation['display_price'];
                            // array_push($was_price,$display_regular_price );
                            // array_push($now_price,$display_price );
                        }

                        $min_price = min($all_price);
                        $max_price = max($all_price);

                        if($min_price==$max_price)
                        {
                            echo '<div class="show-price-range">$'.$min_price.'</div>';
                        }
                        else
                        {
                            echo '<div class="show-price-range">$'.$min_price.' - $'.$max_price.'</div>'; 

                        }


                            
                        // print_r($all_price);
    
                                
                    }
// echo 999;
// print_r($product);
?>


</p>