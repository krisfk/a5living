jQuery(function($){if(typeof wc_cart_fragments_params==='undefined'){return false;}
var $supports_html5_storage=true,cart_hash_key=wc_cart_fragments_params.cart_hash_key;try{$supports_html5_storage=('sessionStorage'in window&&window.sessionStorage!==null);window.sessionStorage.setItem('wc','test');window.sessionStorage.removeItem('wc');window.localStorage.setItem('wc','test');window.localStorage.removeItem('wc');}catch(err){$supports_html5_storage=false;}
function set_cart_creation_timestamp(){if($supports_html5_storage){sessionStorage.setItem('wc_cart_created',(new Date()).getTime());}}
function set_cart_hash(cart_hash){if($supports_html5_storage){localStorage.setItem(cart_hash_key,cart_hash);sessionStorage.setItem(cart_hash_key,cart_hash);}}
var $fragment_refresh={url:wc_cart_fragments_params.wc_ajax_url.toString().replace('%%endpoint%%','get_refreshed_fragments'),type:'POST',data:{time:new Date().getTime()},timeout:wc_cart_fragments_params.request_timeout,success:function(data){if(data&&data.fragments){$.each(data.fragments,function(key,value){$(key).replaceWith(value);});if($supports_html5_storage){sessionStorage.setItem(wc_cart_fragments_params.fragment_name,JSON.stringify(data.fragments));set_cart_hash(data.cart_hash);if(data.cart_hash){set_cart_creation_timestamp();}}
$(document.body).trigger('wc_fragments_refreshed');}},error:function(){$(document.body).trigger('wc_fragments_ajax_error');}};function refresh_cart_fragment(){$.ajax($fragment_refresh);}
if($supports_html5_storage){var cart_timeout=null,day_in_ms=(24*60*60*1000);$(document.body).on('wc_fragment_refresh updated_wc_div',function(){refresh_cart_fragment();});$(document.body).on('added_to_cart removed_from_cart',function(event,fragments,cart_hash){var prev_cart_hash=sessionStorage.getItem(cart_hash_key);if(prev_cart_hash===null||prev_cart_hash===undefined||prev_cart_hash===''){set_cart_creation_timestamp();}
sessionStorage.setItem(wc_cart_fragments_params.fragment_name,JSON.stringify(fragments));set_cart_hash(cart_hash);});$(document.body).on('wc_fragments_refreshed',function(){clearTimeout(cart_timeout);cart_timeout=setTimeout(refresh_cart_fragment,day_in_ms);});$(window).on('storage onstorage',function(e){if(cart_hash_key===e.originalEvent.key&&localStorage.getItem(cart_hash_key)!==sessionStorage.getItem(cart_hash_key)){refresh_cart_fragment();}});$(window).on('pageshow',function(e){if(e.originalEvent.persisted){$('.widget_shopping_cart_content').empty();$(document.body).trigger('wc_fragment_refresh');}});try{var wc_fragments=JSON.parse(sessionStorage.getItem(wc_cart_fragments_params.fragment_name)),cart_hash=sessionStorage.getItem(cart_hash_key),cookie_hash=Cookies.get('woocommerce_cart_hash'),cart_created=sessionStorage.getItem('wc_cart_created');if(cart_hash===null||cart_hash===undefined||cart_hash===''){cart_hash='';}
if(cookie_hash===null||cookie_hash===undefined||cookie_hash===''){cookie_hash='';}
if(cart_hash&&(cart_created===null||cart_created===undefined||cart_created==='')){throw'No cart_created';}
if(cart_created){var cart_expiration=((1*cart_created)+day_in_ms),timestamp_now=(new Date()).getTime();if(cart_expiration<timestamp_now){throw'Fragment expired';}
cart_timeout=setTimeout(refresh_cart_fragment,(cart_expiration-timestamp_now));}
if(wc_fragments&&wc_fragments['div.widget_shopping_cart_content']&&cart_hash===cookie_hash){$.each(wc_fragments,function(key,value){$(key).replaceWith(value);});$(document.body).trigger('wc_fragments_loaded');}else{throw'No fragment';}}catch(err){refresh_cart_fragment();}}else{refresh_cart_fragment();}
if(Cookies.get('woocommerce_items_in_cart')>0){$('.hide_cart_widget_if_empty').closest('.widget_shopping_cart').show();}else{$('.hide_cart_widget_if_empty').closest('.widget_shopping_cart').hide();}
$(document.body).on('adding_to_cart',function(){$('.hide_cart_widget_if_empty').closest('.widget_shopping_cart').show();});var hasSelectiveRefresh=('undefined'!==typeof wp&&wp.customize&&wp.customize.selectiveRefresh&&wp.customize.widgetsPreview&&wp.customize.widgetsPreview.WidgetPartial);if(hasSelectiveRefresh){wp.customize.selectiveRefresh.bind('partial-content-rendered',function(){refresh_cart_fragment();});}});
;/*!
 * WPBakery Page Builder v6.0.0 (https://wpbakery.com)
 * Copyright 2011-2021 Michael M, WPBakery
 * License: Commercial. More details: http://go.wpbakery.com/licensing
 */

// jscs:disable
// jshint ignore: start

document.documentElement.className+=" js_active ",document.documentElement.className+="ontouchstart"in document.documentElement?" vc_mobile ":" vc_desktop ",function(){for(var prefix=["-webkit-","-moz-","-ms-","-o-",""],i=0;i<prefix.length;i++)prefix[i]+"transform"in document.documentElement.style&&(document.documentElement.className+=" vc_transform ")}(),function($){"function"!=typeof window.vc_js&&(window.vc_js=function(){"use strict";vc_toggleBehaviour(),vc_tabsBehaviour(),vc_accordionBehaviour(),vc_teaserGrid(),vc_carouselBehaviour(),vc_slidersBehaviour(),vc_prettyPhoto(),vc_pinterest(),vc_progress_bar(),vc_plugin_flexslider(),vc_gridBehaviour(),vc_rowBehaviour(),vc_prepareHoverBox(),vc_googleMapsPointer(),vc_ttaActivation(),jQuery(document).trigger("vc_js"),window.setTimeout(vc_waypoints,500)}),"function"!=typeof window.vc_plugin_flexslider&&(window.vc_plugin_flexslider=function($parent){($parent?$parent.find(".wpb_flexslider"):jQuery(".wpb_flexslider")).each(function(){var this_element=jQuery(this),sliderTimeout=1e3*parseInt(this_element.attr("data-interval"),10),sliderFx=this_element.attr("data-flex_fx"),slideshow=0==sliderTimeout?!1:!0;this_element.is(":visible")&&this_element.flexslider({animation:sliderFx,slideshow:slideshow,slideshowSpeed:sliderTimeout,sliderSpeed:800,smoothHeight:!0})})}),"function"!=typeof window.vc_googleplus&&(window.vc_googleplus=function(){0<jQuery(".wpb_googleplus").length&&function(){var po=document.createElement("script");po.type="text/javascript",po.async=!0,po.src="https://apis.google.com/js/plusone.js";var s=document.getElementsByTagName("script")[0];s.parentNode.insertBefore(po,s)}()}),"function"!=typeof window.vc_pinterest&&(window.vc_pinterest=function(){0<jQuery(".wpb_pinterest").length&&function(){var po=document.createElement("script");po.type="text/javascript",po.async=!0,po.src="https://assets.pinterest.com/js/pinit.js";var s=document.getElementsByTagName("script")[0];s.parentNode.insertBefore(po,s)}()}),"function"!=typeof window.vc_progress_bar&&(window.vc_progress_bar=function(){void 0!==jQuery.fn.vcwaypoint&&jQuery(".vc_progress_bar").each(function(){var $el=jQuery(this);$el.vcwaypoint(function(){$el.find(".vc_single_bar").each(function(index){var bar=jQuery(this).find(".vc_bar"),val=bar.data("percentage-value");setTimeout(function(){bar.css({width:val+"%"})},200*index)})},{offset:"85%"})})}),"function"!=typeof window.vc_waypoints&&(window.vc_waypoints=function(){void 0!==jQuery.fn.vcwaypoint&&jQuery(".wpb_animate_when_almost_visible:not(.wpb_start_animation)").each(function(){var $el=jQuery(this);$el.vcwaypoint(function(){$el.addClass("wpb_start_animation animated")},{offset:"85%"})})}),"function"!=typeof window.vc_toggleBehaviour&&(window.vc_toggleBehaviour=function($el){function event(content){content&&content.preventDefault&&content.preventDefault();var element=jQuery(this).closest(".vc_toggle"),content=element.find(".vc_toggle_content");element.hasClass("vc_toggle_active")?content.slideUp({duration:300,complete:function(){element.removeClass("vc_toggle_active")}}):content.slideDown({duration:300,complete:function(){element.addClass("vc_toggle_active")}})}($el?$el.hasClass("vc_toggle_title")?$el.unbind("click"):$el.find(".vc_toggle_title").off("click"):jQuery(".vc_toggle_title").off("click")).on("click",event)}),"function"!=typeof window.vc_tabsBehaviour&&(window.vc_tabsBehaviour=function(ver){var $call,old_version;jQuery.ui&&($call=ver||jQuery(".wpb_tabs, .wpb_tour"),ver=jQuery.ui&&jQuery.ui.version?jQuery.ui.version.split("."):"1.10",old_version=1===parseInt(ver[0],10)&&parseInt(ver[1],10)<9,$call.each(function(index){var interval=jQuery(this).attr("data-interval"),tabs_array=[],$tabs=jQuery(this).find(".wpb_tour_tabs_wrapper").tabs({show:function(event,ui){wpb_prepare_tab_content(event,ui)},activate:function(event,ui){wpb_prepare_tab_content(event,ui)}});if(interval&&0<interval)try{$tabs.tabs("rotate",1e3*interval)}catch(err){window.console&&window.console.warn&&console.warn("tabs behaviours error",err)}jQuery(this).find(".wpb_tab").each(function(){tabs_array.push(this.id)}),jQuery(this).find(".wpb_tabs_nav li").on("click",function(e){return e&&e.preventDefault&&e.preventDefault(),old_version?$tabs.tabs("select",jQuery("a",this).attr("href")):$tabs.tabs("option","active",jQuery(this).index()),!1}),jQuery(this).find(".wpb_prev_slide a, .wpb_next_slide a").on("click",function(length){var index;length&&length.preventDefault&&length.preventDefault(),old_version?(index=$tabs.tabs("option","selected"),jQuery(this).parent().hasClass("wpb_next_slide")?index++:index--,index<0?index=$tabs.tabs("length")-1:index>=$tabs.tabs("length")&&(index=0),$tabs.tabs("select",index)):(index=$tabs.tabs("option","active"),length=$tabs.find(".wpb_tab").length,index=jQuery(this).parent().hasClass("wpb_next_slide")?length<=index+1?0:index+1:index-1<0?length-1:index-1,$tabs.tabs("option","active",index))})}))}),"function"!=typeof window.vc_accordionBehaviour&&(window.vc_accordionBehaviour=function(){jQuery(".wpb_accordion").each(function(index){var $this=jQuery(this),active_tab=($this.attr("data-interval"),!isNaN(jQuery(this).data("active-tab"))&&0<parseInt($this.data("active-tab"),10)&&parseInt($this.data("active-tab"),10)-1),$tabs=!1===active_tab||"yes"===$this.data("collapsible"),$tabs=$this.find(".wpb_accordion_wrapper").accordion({header:"> div > h3",autoHeight:!1,heightStyle:"content",active:active_tab,collapsible:$tabs,navigation:!0,activate:vc_accordionActivate,change:function(event,ui){void 0!==jQuery.fn.isotope&&ui.newContent.find(".isotope").isotope("layout"),vc_carouselBehaviour(ui.newPanel)}});!0===$this.data("vcDisableKeydown")&&($tabs.data("uiAccordion")._keydown=function(){})})}),"function"!=typeof window.vc_teaserGrid&&(window.vc_teaserGrid=function(){var layout_modes={fitrows:"fitRows",masonry:"masonry"};jQuery(".wpb_grid .teaser_grid_container:not(.wpb_carousel), .wpb_filtered_grid .teaser_grid_container:not(.wpb_carousel)").each(function(){var $container=jQuery(this),$thumbs=$container.find(".wpb_thumbnails"),layout_mode=$thumbs.attr("data-layout-mode");$thumbs.isotope({itemSelector:".isotope-item",layoutMode:void 0===layout_modes[layout_mode]?"fitRows":layout_modes[layout_mode]}),$container.find(".categories_filter a").data("isotope",$thumbs).on("click",function($thumbs){$thumbs&&$thumbs.preventDefault&&$thumbs.preventDefault();$thumbs=jQuery(this).data("isotope");jQuery(this).parent().parent().find(".active").removeClass("active"),jQuery(this).parent().addClass("active"),$thumbs.isotope({filter:jQuery(this).attr("data-filter")})}),jQuery(window).on("load resize",function(){$thumbs.isotope("layout")})})}),"function"!=typeof window.vc_carouselBehaviour&&(window.vc_carouselBehaviour=function($parent){($parent?$parent.find(".wpb_carousel"):jQuery(".wpb_carousel")).each(function(){var fluid_ul=jQuery(this);!0!==fluid_ul.data("carousel_enabled")&&fluid_ul.is(":visible")&&(fluid_ul.data("carousel_enabled",!0),getColumnsCount(jQuery(this)),jQuery(this).hasClass("columns_count_1"),(fluid_ul=jQuery(this).find(".wpb_thumbnails-fluid li")).css({"margin-right":fluid_ul.css("margin-left"),"margin-left":0}),(fluid_ul=jQuery(this).find("ul.wpb_thumbnails-fluid")).width(fluid_ul.width()+300))})}),"function"!=typeof window.vc_slidersBehaviour&&(window.vc_slidersBehaviour=function(){jQuery(".wpb_gallery_slides").each(function(index){var $imagesGrid,sliderTimeout,this_element=jQuery(this);this_element.hasClass("wpb_slider_nivo")?(0===(sliderTimeout=1e3*this_element.attr("data-interval"))&&(sliderTimeout=9999999999),this_element.find(".nivoSlider").nivoSlider({effect:"boxRainGrow,boxRain,boxRainReverse,boxRainGrowReverse",slices:15,boxCols:8,boxRows:4,animSpeed:800,pauseTime:sliderTimeout,startSlide:0,directionNav:!0,directionNavHide:!0,controlNav:!0,keyboardNav:!1,pauseOnHover:!0,manualAdvance:!1,prevText:"Prev",nextText:"Next"})):this_element.hasClass("wpb_image_grid")&&(jQuery.fn.imagesLoaded?$imagesGrid=this_element.find(".wpb_image_grid_ul").imagesLoaded(function(){$imagesGrid.isotope({itemSelector:".isotope-item",layoutMode:"fitRows"})}):this_element.find(".wpb_image_grid_ul").isotope({itemSelector:".isotope-item",layoutMode:"fitRows"}))})}),"function"!=typeof window.vc_prettyPhoto&&(window.vc_prettyPhoto=function(){try{jQuery&&jQuery.fn&&jQuery.fn.prettyPhoto&&jQuery('a.prettyphoto, .gallery-icon a[href*=".jpg"]').prettyPhoto({animationSpeed:"normal",hook:"data-rel",padding:15,opacity:.7,showTitle:!0,allowresize:!0,counter_separator_label:"/",hideflash:!1,deeplinking:!1,modal:!1,callback:function(){-1<location.href.indexOf("#!prettyPhoto")&&(location.hash="")},social_tools:""})}catch(err){window.console&&window.console.warn&&window.console.warn("vc_prettyPhoto initialize error",err)}}),"function"!=typeof window.vc_google_fonts&&(window.vc_google_fonts=function(){return window.console&&window.console.warn&&window.console.warn("function vc_google_fonts is deprecated, no need to use it"),!1}),window.vcParallaxSkroll=!1,"function"!=typeof window.vc_rowBehaviour&&(window.vc_rowBehaviour=function(){var callSkrollInit,$=window.jQuery;function fullWidthRow(){var $elements=$('[data-vc-full-width="true"]');$.each($elements,function(key,item){var $el=$(this);$el.addClass("vc_hidden");var el_margin_left,el_margin_right,offset,width,padding,paddingRight,$el_full=$el.next(".vc_row-full-width");($el_full=!$el_full.length?$el.parent().next(".vc_row-full-width"):$el_full).length&&(el_margin_left=parseInt($el.css("margin-left"),10),el_margin_right=parseInt($el.css("margin-right"),10),offset=0-$el_full.offset().left-el_margin_left,width=$(window).width(),"rtl"===$el.css("direction")&&(offset-=$el_full.width(),offset+=width,offset+=el_margin_left,offset+=el_margin_right),$el.css({position:"relative",left:offset,"box-sizing":"border-box",width:width}),$el.data("vcStretchContent")||("rtl"===$el.css("direction")?((padding=offset)<0&&(padding=0),(paddingRight=offset)<0&&(paddingRight=0)):(paddingRight=width-(padding=(padding=-1*offset)<0?0:padding)-$el_full.width()+el_margin_left+el_margin_right)<0&&(paddingRight=0),$el.css({"padding-left":padding+"px","padding-right":paddingRight+"px"})),$el.attr("data-vc-full-width-init","true"),$el.removeClass("vc_hidden"),$(document).trigger("vc-full-width-row-single",{el:$el,offset:offset,marginLeft:el_margin_left,marginRight:el_margin_right,elFull:$el_full,width:width}))}),$(document).trigger("vc-full-width-row",$elements)}function fullHeightRow(){var windowHeight,offsetTop,$element=$(".vc_row-o-full-height:first");$element.length&&(windowHeight=$(window).height(),(offsetTop=$element.offset().top)<windowHeight&&$element.css("min-height",100-offsetTop/(windowHeight/100)+"vh")),$(document).trigger("vc-full-height-row",$element)}$(window).off("resize.vcRowBehaviour").on("resize.vcRowBehaviour",fullWidthRow).on("resize.vcRowBehaviour",fullHeightRow),fullWidthRow(),fullHeightRow(),(0<window.navigator.userAgent.indexOf("MSIE ")||navigator.userAgent.match(/Trident.*rv\:11\./))&&$(".vc_row-o-full-height").each(function(){"flex"===$(this).css("display")&&$(this).wrap('<div class="vc_ie-flexbox-fixer"></div>')}),vc_initVideoBackgrounds(),callSkrollInit=!1,window.vcParallaxSkroll&&window.vcParallaxSkroll.destroy(),$(".vc_parallax-inner").remove(),$("[data-5p-top-bottom]").removeAttr("data-5p-top-bottom data-30p-top-bottom"),$("[data-vc-parallax]").each(function(){var skrollrSize,$parallaxElement,parallaxImage,youtubeId;callSkrollInit=!0,"on"===$(this).data("vcParallaxOFade")&&$(this).children().attr("data-5p-top-bottom","opacity:0;").attr("data-30p-top-bottom","opacity:1;"),skrollrSize=100*$(this).data("vcParallax"),($parallaxElement=$("<div />").addClass("vc_parallax-inner").appendTo($(this))).height(skrollrSize+"%"),parallaxImage=$(this).data("vcParallaxImage"),(youtubeId=vcExtractYoutubeId(parallaxImage))?insertYoutubeVideoAsBackground($parallaxElement,youtubeId):void 0!==parallaxImage&&$parallaxElement.css("background-image","url("+parallaxImage+")"),$parallaxElement.attr("data-bottom-top","top: "+-(skrollrSize-100)+"%;").attr("data-top-bottom","top: 0%;")}),callSkrollInit&&window.skrollr&&(window.vcParallaxSkroll=skrollr.init({forceHeight:!1,smoothScrolling:!1,mobileCheck:function(){return!1}}),window.vcParallaxSkroll)}),"function"!=typeof window.vc_gridBehaviour&&(window.vc_gridBehaviour=function(){jQuery.fn.vcGrid&&jQuery("[data-vc-grid]").vcGrid()}),"function"!=typeof window.getColumnsCount&&(window.getColumnsCount=function(el){for(var find=!1,i=1;!1===find;){if(el.hasClass("columns_count_"+i))return find=!0,i;i++}}),"function"!=typeof window.wpb_prepare_tab_content&&(window.wpb_prepare_tab_content=function(event,ui){var panel=ui.panel||ui.newPanel,$pie_charts=panel.find(".vc_pie_chart:not(.vc_ready)"),$round_charts=panel.find(".vc_round-chart"),$frame=panel.find(".vc_line-chart"),$google_maps=panel.find('[data-ride="vc_carousel"]');vc_carouselBehaviour(),vc_plugin_flexslider(panel),ui.newPanel.find(".vc_masonry_media_grid, .vc_masonry_grid").length&&ui.newPanel.find(".vc_masonry_media_grid, .vc_masonry_grid").each(function(){var grid=jQuery(this).data("vcGrid");grid&&grid.gridBuilder&&grid.gridBuilder.setMasonry&&grid.gridBuilder.setMasonry()}),panel.find(".vc_masonry_media_grid, .vc_masonry_grid").length&&panel.find(".vc_masonry_media_grid, .vc_masonry_grid").each(function(){var grid=jQuery(this).data("vcGrid");grid&&grid.gridBuilder&&grid.gridBuilder.setMasonry&&grid.gridBuilder.setMasonry()}),$pie_charts.length&&jQuery.fn.vcChat&&$pie_charts.vcChat(),$round_charts.length&&jQuery.fn.vcRoundChart&&$round_charts.vcRoundChart({reload:!1}),$frame.length&&jQuery.fn.vcLineChart&&$frame.vcLineChart({reload:!1}),$google_maps.length&&jQuery.fn.carousel&&$google_maps.carousel("resizeAction"),$frame=panel.find(".isotope, .wpb_image_grid_ul"),$google_maps=panel.find(".wpb_gmaps_widget"),0<$frame.length&&$frame.isotope("layout"),$google_maps.length&&!$google_maps.is(".map_ready")&&(($frame=$google_maps.find("iframe")).attr("src",$frame.attr("src")),$google_maps.addClass("map_ready")),panel.parents(".isotope").length&&panel.parents(".isotope").each(function(){jQuery(this).isotope("layout")}),$(document).trigger("wpb_prepare_tab_content",panel)}),"function"!=typeof window.vc_ttaActivation&&(window.vc_ttaActivation=function(){jQuery("[data-vc-accordion]").on("show.vc.accordion",function(e){var $=window.jQuery,ui={};ui.newPanel=$(this).data("vc.accordion").getTarget(),window.wpb_prepare_tab_content(e,ui)})}),"function"!=typeof window.vc_accordionActivate&&(window.vc_accordionActivate=function(event,ui){var $pie_charts,$round_charts,$line_charts,$carousel;ui.newPanel.length&&ui.newHeader.length&&($pie_charts=ui.newPanel.find(".vc_pie_chart:not(.vc_ready)"),$round_charts=ui.newPanel.find(".vc_round-chart"),$line_charts=ui.newPanel.find(".vc_line-chart"),$carousel=ui.newPanel.find('[data-ride="vc_carousel"]'),void 0!==jQuery.fn.isotope&&ui.newPanel.find(".isotope, .wpb_image_grid_ul").isotope("layout"),ui.newPanel.find(".vc_masonry_media_grid, .vc_masonry_grid").length&&ui.newPanel.find(".vc_masonry_media_grid, .vc_masonry_grid").each(function(){var grid=jQuery(this).data("vcGrid");grid&&grid.gridBuilder&&grid.gridBuilder.setMasonry&&grid.gridBuilder.setMasonry()}),vc_carouselBehaviour(ui.newPanel),vc_plugin_flexslider(ui.newPanel),$pie_charts.length&&jQuery.fn.vcChat&&$pie_charts.vcChat(),$round_charts.length&&jQuery.fn.vcRoundChart&&$round_charts.vcRoundChart({reload:!1}),$line_charts.length&&jQuery.fn.vcLineChart&&$line_charts.vcLineChart({reload:!1}),$carousel.length&&jQuery.fn.carousel&&$carousel.carousel("resizeAction"),ui.newPanel.parents(".isotope").length&&ui.newPanel.parents(".isotope").each(function(){jQuery(this).isotope("layout")}))}),"function"!=typeof window.initVideoBackgrounds&&(window.initVideoBackgrounds=function(){return window.console&&window.console.warn&&window.console.warn("this function is deprecated use vc_initVideoBackgrounds"),vc_initVideoBackgrounds()}),"function"!=typeof window.vc_initVideoBackgrounds&&(window.vc_initVideoBackgrounds=function(){jQuery("[data-vc-video-bg]").each(function(){var youtubeId,$element=jQuery(this);$element.data("vcVideoBg")?(youtubeId=$element.data("vcVideoBg"),(youtubeId=vcExtractYoutubeId(youtubeId))&&($element.find(".vc_video-bg").remove(),insertYoutubeVideoAsBackground($element,youtubeId)),jQuery(window).on("grid:items:added",function(event,$grid){$element.has($grid).length&&vcResizeVideoBackground($element)})):$element.find(".vc_video-bg").remove()})}),"function"!=typeof window.insertYoutubeVideoAsBackground&&(window.insertYoutubeVideoAsBackground=function($element,youtubeId,counter){if("undefined"==typeof YT||void 0===YT.Player)return 100<(counter=void 0===counter?0:counter)?void console.warn("Too many attempts to load YouTube api"):void setTimeout(function(){insertYoutubeVideoAsBackground($element,youtubeId,counter++)},100);var $container=$element.prepend('<div class="vc_video-bg vc_hidden-xs"><div class="inner"></div></div>').find(".inner");new YT.Player($container[0],{width:"100%",height:"100%",videoId:youtubeId,playerVars:{playlist:youtubeId,iv_load_policy:3,enablejsapi:1,disablekb:1,autoplay:1,controls:0,showinfo:0,rel:0,loop:1,wmode:"transparent"},events:{onReady:function(event){event.target.mute().setLoop(!0)}}}),vcResizeVideoBackground($element),jQuery(window).on("resize",function(){vcResizeVideoBackground($element)})}),"function"!=typeof window.vcResizeVideoBackground&&(window.vcResizeVideoBackground=function($element){var iframeW,iframeH,marginLeft,marginTop,containerW=$element.innerWidth(),containerH=$element.innerHeight();containerW/containerH<16/9?(iframeW=containerH*(16/9),iframeH=containerH,marginLeft=-Math.round((iframeW-containerW)/2)+"px",marginTop=-Math.round((iframeH-containerH)/2)+"px"):(iframeH=(iframeW=containerW)*(9/16),marginTop=-Math.round((iframeH-containerH)/2)+"px",marginLeft=-Math.round((iframeW-containerW)/2)+"px"),iframeW+="px",iframeH+="px",$element.find(".vc_video-bg iframe").css({maxWidth:"1000%",marginLeft:marginLeft,marginTop:marginTop,width:iframeW,height:iframeH})}),"function"!=typeof window.vcExtractYoutubeId&&(window.vcExtractYoutubeId=function(id){if(void 0===id)return!1;id=id.match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/);return null!==id&&id[1]}),"function"!=typeof window.vc_googleMapsPointer&&(window.vc_googleMapsPointer=function(){var $=window.jQuery,$wpbGmapsWidget=$(".wpb_gmaps_widget");$wpbGmapsWidget.on("click",function(){$("iframe",this).css("pointer-events","auto")}),$wpbGmapsWidget.on("mouseleave",function(){$("iframe",this).css("pointer-events","none")}),$(".wpb_gmaps_widget iframe").css("pointer-events","none")}),"function"!=typeof window.vc_setHoverBoxPerspective&&(window.vc_setHoverBoxPerspective=function(hoverBox){hoverBox.each(function(){var $this=jQuery(this),width=$this.width();$this.css("perspective",4*width+"px")})}),"function"!=typeof window.vc_setHoverBoxHeight&&(window.vc_setHoverBoxHeight=function(hoverBox){hoverBox.each(function(){var hoverBoxHeight=jQuery(this),hoverBoxInner=hoverBoxHeight.find(".vc-hoverbox-inner");hoverBoxInner.css("min-height",0);var frontHeight=hoverBoxHeight.find(".vc-hoverbox-front-inner").outerHeight(),hoverBoxHeight=hoverBoxHeight.find(".vc-hoverbox-back-inner").outerHeight(),hoverBoxHeight=hoverBoxHeight<frontHeight?frontHeight:hoverBoxHeight;hoverBoxInner.css("min-height",(hoverBoxHeight=hoverBoxHeight<250?250:hoverBoxHeight)+"px")})}),"function"!=typeof window.vc_prepareHoverBox&&(window.vc_prepareHoverBox=function(){var hoverBox=jQuery(".vc-hoverbox");vc_setHoverBoxHeight(hoverBox),vc_setHoverBoxPerspective(hoverBox)}),jQuery(document).ready(window.vc_prepareHoverBox),jQuery(window).on("resize",window.vc_prepareHoverBox),jQuery(document).ready(function($){window.vc_js()})}(window.jQuery);
;!function(a){function b(b,d,e){return e=p(d,e),this.on("click.pjax",b,function(b){var d=e;d.container||(d=a.extend({},e),d.container=a(this).attr("data-pjax")),c(b,d)})}function c(b,c,d){d=p(c,d);var f=b.currentTarget,g=a(f);if("A"!==f.tagName.toUpperCase())throw"$.fn.pjax or $.pjax.click requires an anchor element";if(!(b.which>1||b.metaKey||b.ctrlKey||b.shiftKey||b.altKey||location.protocol!==f.protocol||location.hostname!==f.hostname||f.href.indexOf("#")>-1&&o(f)==o(location)||b.isDefaultPrevented())){var h={url:f.href,container:g.attr("data-pjax"),target:f},i=a.extend({},h,d),j=a.Event("pjax:click");g.trigger(j,[i]),j.isDefaultPrevented()||(e(i),b.preventDefault(),g.trigger("pjax:clicked",[i]))}}function d(b,c,d){d=p(c,d);var f=b.currentTarget,g=a(f);if("FORM"!==f.tagName.toUpperCase())throw"$.pjax.submit requires a form element";var h={type:(g.attr("method")||"GET").toUpperCase(),url:g.attr("action"),container:g.attr("data-pjax"),target:f};if("GET"!==h.type&&void 0!==window.FormData)h.data=new FormData(f),h.processData=!1,h.contentType=!1;else{if(g.find(":file").length)return;h.data=g.serializeArray()}e(a.extend({},h,d)),b.preventDefault()}function e(b){function c(c,d,e){e||(e={}),e.relatedTarget=b.target;var f=a.Event(c,e);return h.trigger(f,d),!f.isDefaultPrevented()}b=a.extend(!0,{},a.ajaxSettings,e.defaults,b),"function"==typeof b.url&&(b.url=b.url());var d=n(b.url).hash,f=typeof b.container;if("string"!==f)throw"expected string value for 'container' option; got "+f;var h=b.context=a(b.container);if(!h.length)throw"the container selector '"+b.container+"' did not match anything";b.data||(b.data={}),Array.isArray(b.data)?b.data.push({name:"_pjax",value:b.container}):b.data._pjax=b.container;var i;b.beforeSend=function(a,e){if("GET"!==e.type&&(e.timeout=0),a.setRequestHeader("X-PJAX","true"),a.setRequestHeader("X-PJAX-Container",b.container),!c("pjax:beforeSend",[a,e]))return!1;e.timeout>0&&(i=setTimeout(function(){c("pjax:timeout",[a,b])&&a.abort("timeout")},e.timeout),e.timeout=0);var f=n(e.url);d&&(f.hash=d),b.requestUrl=m(f)},b.complete=function(a,d){i&&clearTimeout(i),c("pjax:complete",[a,d,b]),c("pjax:end",[a,b])},b.error=function(a,d,e){var f=s("",a,b),h=c("pjax:error",[a,d,e,b]);"GET"==b.type&&"abort"!==d&&h&&g(f.url)},b.success=function(f,i,j){function l(){var e=h.find("input[autofocus], textarea[autofocus]").last()[0];e&&document.activeElement!==e&&e.focus(),t(q.scripts);var g=b.scrollTo;if(d){var k=decodeURIComponent(d.slice(1)),l=document.getElementById(k)||document.getElementsByName(k)[0];l&&(g=a(l).offset().top)}"number"==typeof g&&a(window).scrollTop(g),c("pjax:success",[f,i,j,b])}var m=e.state,o="function"==typeof a.pjax.defaults.version?a.pjax.defaults.version():a.pjax.defaults.version,p=j.getResponseHeader("X-PJAX-Version"),q=s(f,j,b),r=n(q.url);if(d&&(r.hash=d,q.url=r.href),o&&p&&o!==p)return void g(q.url);if(!q.contents)return void g(q.url);if(e.state={id:b.id||k(),url:q.url,title:q.title,container:b.container,fragment:b.fragment,timeout:b.timeout},(b.push||b.replace)&&window.history.replaceState(e.state,q.title,q.url),a.contains(h,document.activeElement))try{document.activeElement.blur()}catch(u){}q.title&&(document.title=q.title),c("pjax:beforeReplace",[q.contents,b],{state:e.state,previousState:m}),"function"==typeof b.renderCallback?b.renderCallback(h,q.contents,l):(h.html(q.contents),l())},e.state||(e.state={id:k(),url:window.location.href,title:document.title,container:b.container,fragment:b.fragment,timeout:b.timeout},window.history.replaceState(e.state,document.title)),j(e.xhr),e.options=b;var o=e.xhr=a.ajax(b);return o.readyState>0&&(b.push&&!b.replace&&(u(e.state.id,[b.container,l(h)]),window.history.pushState(null,"",b.requestUrl)),c("pjax:start",[o,b]),c("pjax:send",[o,b])),e.xhr}function f(b,c){var d={url:window.location.href,push:!1,replace:!0,scrollTo:!1};return e(a.extend(d,p(b,c)))}function g(a){window.history.replaceState(null,"",e.state.url),window.location.replace(a)}function h(b){A||j(e.xhr);var c,d=e.state,f=b.state;if(f&&f.container){if(A&&B==f.url)return;if(d){if(d.id===f.id)return;c=d.id<f.id?"forward":"back"}var h=D[f.id]||[],i=h[0]||f.container,k=a(i),m=h[1];if(k.length){d&&v(c,d.id,[i,l(k)]);var n=a.Event("pjax:popstate",{state:f,direction:c});k.trigger(n);var o={id:f.id,url:f.url,container:i,push:!1,fragment:f.fragment,timeout:f.timeout,scrollTo:!1};if(m){k.trigger("pjax:start",[null,o]),e.state=f,f.title&&(document.title=f.title);var p=a.Event("pjax:beforeReplace",{state:f,previousState:d});k.trigger(p,[m,o]),k.html(m),k.trigger("pjax:end",[null,o])}else e(o);k[0].offsetHeight}else g(location.href)}A=!1}function i(b){var c="function"==typeof b.url?b.url():b.url,d=b.type?b.type.toUpperCase():"GET",e=a("<form>",{method:"GET"===d?"GET":"POST",action:c,style:"display:none"});"GET"!==d&&"POST"!==d&&e.append(a("<input>",{type:"hidden",name:"_method",value:d.toLowerCase()}));var f=b.data;if("string"==typeof f)a.each(f.split("&"),function(b,c){var d=c.split("=");e.append(a("<input>",{type:"hidden",name:d[0],value:d[1]}))});else if(Array.isArray(f))a.each(f,function(b,c){e.append(a("<input>",{type:"hidden",name:c.name,value:c.value}))});else if("object"==typeof f){var g;for(g in f)e.append(a("<input>",{type:"hidden",name:g,value:f[g]}))}a(document.body).append(e),e.submit()}function j(b){b&&b.readyState<4&&(b.onreadystatechange=a.noop,b.abort())}function k(){return(new Date).getTime()}function l(a){var b=a.clone();return b.find("script").each(function(){this.src||jQuery._data(this,"globalEval",!1)}),b.contents()}function m(a){return a.search=a.search.replace(/([?&])(_pjax|_)=[^&]*/g,"").replace(/^&/,""),a.href.replace(/\?($|#)/,"$1")}function n(a){var b=document.createElement("a");return b.href=a,b}function o(a){return a.href.replace(/#.*/,"")}function p(b,c){return b&&c?(c=a.extend({},c),c.container=b,c):a.isPlainObject(b)?b:{container:b}}function q(a,b){return a.filter(b).add(a.find(b))}function r(b){return a.parseHTML(b,document,!0)}function s(b,c,d){var e={},f=/<html/i.test(b),g=c.getResponseHeader("X-PJAX-URL");e.url=g?m(n(g)):d.requestUrl;var h,i;if(f){i=a(r(b.match(/<body[^>]*>([\s\S.]*)<\/body>/i)[0]));var j=b.match(/<head[^>]*>([\s\S.]*)<\/head>/i);h=null!=j?a(r(j[0])):i}else h=i=a(r(b));if(0===i.length)return e;if(e.title=q(h,"title").last().text(),d.fragment){var k=i;"body"!==d.fragment&&(k=q(k,d.fragment).first()),k.length&&(e.contents="body"===d.fragment?k:k.contents(),e.title||(e.title=k.attr("title")||k.data("title")))}else f||(e.contents=i);return e.contents&&(e.contents=e.contents.not(function(){return a(this).is("title")}),e.contents.find("title").remove(),e.scripts=q(e.contents,"script[src]").remove(),e.contents=e.contents.not(e.scripts)),e.title&&(e.title=a.trim(e.title)),e}function t(b){if(b){var c=a("script[src]");b.each(function(){var b=this.src;if(!c.filter(function(){return this.src===b}).length){var d=document.createElement("script"),e=a(this).attr("type");e&&(d.type=e),d.src=a(this).attr("src"),document.head.appendChild(d)}})}}function u(a,b){D[a]=b,F.push(a),w(E,0),w(F,e.defaults.maxCacheLength)}function v(a,b,c){var d,f;D[b]=c,"forward"===a?(d=F,f=E):(d=E,f=F),d.push(b),b=f.pop(),b&&delete D[b],w(d,e.defaults.maxCacheLength)}function w(a,b){for(;a.length>b;)delete D[a.shift()]}function x(){return a("meta").filter(function(){var b=a(this).attr("http-equiv");return b&&"X-PJAX-VERSION"===b.toUpperCase()}).attr("content")}function y(){a.fn.pjax=b,a.pjax=e,a.pjax.enable=a.noop,a.pjax.disable=z,a.pjax.click=c,a.pjax.submit=d,a.pjax.reload=f,a.pjax.defaults={timeout:650,push:!0,replace:!1,type:"GET",dataType:"html",scrollTo:0,maxCacheLength:20,version:x},a(window).on("popstate.pjax",h)}function z(){a.fn.pjax=function(){return this},a.pjax=i,a.pjax.enable=y,a.pjax.disable=a.noop,a.pjax.click=a.noop,a.pjax.submit=a.noop,a.pjax.reload=function(){window.location.reload()},a(window).off("popstate.pjax",h)}var A=!0,B=window.location.href,C=window.history.state;C&&C.container&&(e.state=C),"state"in window.history&&(A=!1);var D={},E=[],F=[];a.event.props&&a.inArray("state",a.event.props)<0?a.event.props.push("state"):"state"in a.Event.prototype||a.event.addProp("state"),a.support.pjax=window.history&&window.history.pushState&&window.history.replaceState&&!navigator.userAgent.match(/((iPod|iPhone|iPad).+\bOS\s+[1-4]\D|WebApps\/.+CFNetwork)/),a.support.pjax?y():z()}(jQuery);
;/*! This file is auto-generated */
/*!
 * imagesLoaded PACKAGED v4.1.4
 * JavaScript is all like "You images are done yet or what?"
 * MIT License
 */

!function(e,t){"function"==typeof define&&define.amd?define("ev-emitter/ev-emitter",t):"object"==typeof module&&module.exports?module.exports=t():e.EvEmitter=t()}("undefined"!=typeof window?window:this,function(){function e(){}var t=e.prototype;return t.on=function(e,t){if(e&&t){var i=this._events=this._events||{},n=i[e]=i[e]||[];return n.indexOf(t)==-1&&n.push(t),this}},t.once=function(e,t){if(e&&t){this.on(e,t);var i=this._onceEvents=this._onceEvents||{},n=i[e]=i[e]||{};return n[t]=!0,this}},t.off=function(e,t){var i=this._events&&this._events[e];if(i&&i.length){var n=i.indexOf(t);return n!=-1&&i.splice(n,1),this}},t.emitEvent=function(e,t){var i=this._events&&this._events[e];if(i&&i.length){i=i.slice(0),t=t||[];for(var n=this._onceEvents&&this._onceEvents[e],o=0;o<i.length;o++){var r=i[o],s=n&&n[r];s&&(this.off(e,r),delete n[r]),r.apply(this,t)}return this}},t.allOff=function(){delete this._events,delete this._onceEvents},e}),function(e,t){"use strict";"function"==typeof define&&define.amd?define(["ev-emitter/ev-emitter"],function(i){return t(e,i)}):"object"==typeof module&&module.exports?module.exports=t(e,require("ev-emitter")):e.imagesLoaded=t(e,e.EvEmitter)}("undefined"!=typeof window?window:this,function(e,t){function i(e,t){for(var i in t)e[i]=t[i];return e}function n(e){if(Array.isArray(e))return e;var t="object"==typeof e&&"number"==typeof e.length;return t?d.call(e):[e]}function o(e,t,r){if(!(this instanceof o))return new o(e,t,r);var s=e;return"string"==typeof e&&(s=document.querySelectorAll(e)),s?(this.elements=n(s),this.options=i({},this.options),"function"==typeof t?r=t:i(this.options,t),r&&this.on("always",r),this.getImages(),h&&(this.jqDeferred=new h.Deferred),void setTimeout(this.check.bind(this))):void a.error("Bad element for imagesLoaded "+(s||e))}function r(e){this.img=e}function s(e,t){this.url=e,this.element=t,this.img=new Image}var h=e.jQuery,a=e.console,d=Array.prototype.slice;o.prototype=Object.create(t.prototype),o.prototype.options={},o.prototype.getImages=function(){this.images=[],this.elements.forEach(this.addElementImages,this)},o.prototype.addElementImages=function(e){"IMG"==e.nodeName&&this.addImage(e),this.options.background===!0&&this.addElementBackgroundImages(e);var t=e.nodeType;if(t&&u[t]){for(var i=e.querySelectorAll("img"),n=0;n<i.length;n++){var o=i[n];this.addImage(o)}if("string"==typeof this.options.background){var r=e.querySelectorAll(this.options.background);for(n=0;n<r.length;n++){var s=r[n];this.addElementBackgroundImages(s)}}}};var u={1:!0,9:!0,11:!0};return o.prototype.addElementBackgroundImages=function(e){var t=getComputedStyle(e);if(t)for(var i=/url\((['"])?(.*?)\1\)/gi,n=i.exec(t.backgroundImage);null!==n;){var o=n&&n[2];o&&this.addBackground(o,e),n=i.exec(t.backgroundImage)}},o.prototype.addImage=function(e){var t=new r(e);this.images.push(t)},o.prototype.addBackground=function(e,t){var i=new s(e,t);this.images.push(i)},o.prototype.check=function(){function e(e,i,n){setTimeout(function(){t.progress(e,i,n)})}var t=this;return this.progressedCount=0,this.hasAnyBroken=!1,this.images.length?void this.images.forEach(function(t){t.once("progress",e),t.check()}):void this.complete()},o.prototype.progress=function(e,t,i){this.progressedCount++,this.hasAnyBroken=this.hasAnyBroken||!e.isLoaded,this.emitEvent("progress",[this,e,t]),this.jqDeferred&&this.jqDeferred.notify&&this.jqDeferred.notify(this,e),this.progressedCount==this.images.length&&this.complete(),this.options.debug&&a&&a.log("progress: "+i,e,t)},o.prototype.complete=function(){var e=this.hasAnyBroken?"fail":"done";if(this.isComplete=!0,this.emitEvent(e,[this]),this.emitEvent("always",[this]),this.jqDeferred){var t=this.hasAnyBroken?"reject":"resolve";this.jqDeferred[t](this)}},r.prototype=Object.create(t.prototype),r.prototype.check=function(){var e=this.getIsImageComplete();return e?void this.confirm(0!==this.img.naturalWidth,"naturalWidth"):(this.proxyImage=new Image,this.proxyImage.addEventListener("load",this),this.proxyImage.addEventListener("error",this),this.img.addEventListener("load",this),this.img.addEventListener("error",this),void(this.proxyImage.src=this.img.src))},r.prototype.getIsImageComplete=function(){return this.img.complete&&this.img.naturalWidth},r.prototype.confirm=function(e,t){this.isLoaded=e,this.emitEvent("progress",[this,this.img,t])},r.prototype.handleEvent=function(e){var t="on"+e.type;this[t]&&this[t](e)},r.prototype.onload=function(){this.confirm(!0,"onload"),this.unbindEvents()},r.prototype.onerror=function(){this.confirm(!1,"onerror"),this.unbindEvents()},r.prototype.unbindEvents=function(){this.proxyImage.removeEventListener("load",this),this.proxyImage.removeEventListener("error",this),this.img.removeEventListener("load",this),this.img.removeEventListener("error",this)},s.prototype=Object.create(r.prototype),s.prototype.check=function(){this.img.addEventListener("load",this),this.img.addEventListener("error",this),this.img.src=this.url;var e=this.getIsImageComplete();e&&(this.confirm(0!==this.img.naturalWidth,"naturalWidth"),this.unbindEvents())},s.prototype.unbindEvents=function(){this.img.removeEventListener("load",this),this.img.removeEventListener("error",this)},s.prototype.confirm=function(e,t){this.isLoaded=e,this.emitEvent("progress",[this,this.element,t])},o.makeJQueryPlugin=function(t){t=t||e.jQuery,t&&(h=t,h.fn.imagesLoaded=function(e,t){var i=new o(this,e,t);return i.jqDeferred.promise(h(this))})},o.makeJQueryPlugin(),o});