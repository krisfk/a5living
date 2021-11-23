(function($){'use strict';var wc_password_strength_meter={init:function(){$(document.body).on('keyup change','form.register #reg_password, form.checkout #account_password, '+'form.edit-account #password_1, form.lost_reset_password #password_1',this.strengthMeter);$('form.checkout #createaccount').trigger('change');},strengthMeter:function(){var wrapper=$('form.register, form.checkout, form.edit-account, form.lost_reset_password'),submit=$('button[type="submit"]',wrapper),field=$('#reg_password, #account_password, #password_1',wrapper),strength=1,fieldValue=field.val(),stop_checkout=!wrapper.is('form.checkout');wc_password_strength_meter.includeMeter(wrapper,field);strength=wc_password_strength_meter.checkPasswordStrength(wrapper,field);if(wc_password_strength_meter_params.stop_checkout){stop_checkout=true;}
if(fieldValue.length>0&&strength<wc_password_strength_meter_params.min_password_strength&&-1!==strength&&stop_checkout){submit.attr('disabled','disabled').addClass('disabled');}else{submit.prop('disabled',false).removeClass('disabled');}},includeMeter:function(wrapper,field){var meter=wrapper.find('.woocommerce-password-strength');if(''===field.val()){meter.hide();$(document.body).trigger('wc-password-strength-hide');}else if(0===meter.length){field.after('<div class="woocommerce-password-strength" aria-live="polite"></div>');$(document.body).trigger('wc-password-strength-added');}else{meter.show();$(document.body).trigger('wc-password-strength-show');}},checkPasswordStrength:function(wrapper,field){var meter=wrapper.find('.woocommerce-password-strength'),hint=wrapper.find('.woocommerce-password-hint'),hint_html='<small class="woocommerce-password-hint">'+wc_password_strength_meter_params.i18n_password_hint+'</small>',strength=wp.passwordStrength.meter(field.val(),wp.passwordStrength.userInputDisallowedList()),error='';meter.removeClass('short bad good strong');hint.remove();if(meter.is(':hidden')){return strength;}
if(strength<wc_password_strength_meter_params.min_password_strength){error=' - '+wc_password_strength_meter_params.i18n_password_error;}
switch(strength){case 0:meter.addClass('short').html(pwsL10n['short']+error);meter.after(hint_html);break;case 1:meter.addClass('bad').html(pwsL10n.bad+error);meter.after(hint_html);break;case 2:meter.addClass('bad').html(pwsL10n.bad+error);meter.after(hint_html);break;case 3:meter.addClass('good').html(pwsL10n.good+error);break;case 4:meter.addClass('strong').html(pwsL10n.strong+error);break;case 5:meter.addClass('short').html(pwsL10n.mismatch);break;}
return strength;}};wc_password_strength_meter.init();})(jQuery);;
/*!
 * JavaScript Cookie v2.1.4
 * https://github.com/js-cookie/js-cookie
 *
 * Copyright 2006, 2015 Klaus Hartl & Fagner Brack
 * Released under the MIT license
 */
;(function(factory){var registeredInModuleLoader=false;if(typeof define==='function'&&define.amd){define(factory);registeredInModuleLoader=true;}
if(typeof exports==='object'){module.exports=factory();registeredInModuleLoader=true;}
if(!registeredInModuleLoader){var OldCookies=window.Cookies;var api=window.Cookies=factory();api.noConflict=function(){window.Cookies=OldCookies;return api;};}}(function(){function extend(){var i=0;var result={};for(;i<arguments.length;i++){var attributes=arguments[i];for(var key in attributes){result[key]=attributes[key];}}
return result;}
function init(converter){function api(key,value,attributes){var result;if(typeof document==='undefined'){return;}
if(arguments.length>1){attributes=extend({path:'/'},api.defaults,attributes);if(typeof attributes.expires==='number'){var expires=new Date();expires.setMilliseconds(expires.getMilliseconds()+attributes.expires*864e+5);attributes.expires=expires;}
attributes.expires=attributes.expires?attributes.expires.toUTCString():'';try{result=JSON.stringify(value);if(/^[\{\[]/.test(result)){value=result;}}catch(e){}
if(!converter.write){value=encodeURIComponent(String(value)).replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g,decodeURIComponent);}else{value=converter.write(value,key);}
key=encodeURIComponent(String(key));key=key.replace(/%(23|24|26|2B|5E|60|7C)/g,decodeURIComponent);key=key.replace(/[\(\)]/g,escape);var stringifiedAttributes='';for(var attributeName in attributes){if(!attributes[attributeName]){continue;}
stringifiedAttributes+='; '+attributeName;if(attributes[attributeName]===true){continue;}
stringifiedAttributes+='='+attributes[attributeName];}
return(document.cookie=key+'='+value+stringifiedAttributes);}
if(!key){result={};}
var cookies=document.cookie?document.cookie.split('; '):[];var rdecode=/(%[0-9A-Z]{2})+/g;var i=0;for(;i<cookies.length;i++){var parts=cookies[i].split('=');var cookie=parts.slice(1).join('=');if(cookie.charAt(0)==='"'){cookie=cookie.slice(1,-1);}
try{var name=parts[0].replace(rdecode,decodeURIComponent);cookie=converter.read?converter.read(cookie,name):converter(cookie,name)||cookie.replace(rdecode,decodeURIComponent);if(this.json){try{cookie=JSON.parse(cookie);}catch(e){}}
if(key===name){result=cookie;break;}
if(!key){result[name]=cookie;}}catch(e){}}
return result;}
api.set=api;api.get=function(key){return api.call(api,key);};api.getJSON=function(){return api.apply({json:true},[].slice.call(arguments));};api.defaults={};api.remove=function(key,attributes){api(key,'',extend(attributes,{expires:-1}));};api.withConverter=init;return api;}
return init(function(){});}));