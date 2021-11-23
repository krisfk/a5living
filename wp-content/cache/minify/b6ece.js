jQuery(function($){var TokenizationForm=function($target){this.$target=$target;this.$formWrap=$target.closest('.payment_box');this.params=$.extend({},{'is_registration_required':false,'is_logged_in':false},wc_tokenization_form_params);this.onDisplay=this.onDisplay.bind(this);this.hideForm=this.hideForm.bind(this);this.showForm=this.showForm.bind(this);this.showSaveNewCheckbox=this.showSaveNewCheckbox.bind(this);this.hideSaveNewCheckbox=this.hideSaveNewCheckbox.bind(this);this.$target.on('click change',':input.woocommerce-SavedPaymentMethods-tokenInput',{tokenizationForm:this},this.onTokenChange);$('input#createaccount').on('change',{tokenizationForm:this},this.onCreateAccountChange);this.onDisplay();};TokenizationForm.prototype.onDisplay=function(){if(0===$(':input.woocommerce-SavedPaymentMethods-tokenInput:checked',this.$target).length){$(':input.woocommerce-SavedPaymentMethods-tokenInput:last',this.$target).prop('checked',true);}
if(0===this.$target.data('count')){$('.woocommerce-SavedPaymentMethods-new',this.$target).remove();}
var hasCreateAccountCheckbox=0<$('input#createaccount').length,createAccount=hasCreateAccountCheckbox&&$('input#createaccount').is(':checked');if(createAccount||this.params.is_logged_in||this.params.is_registration_required){this.showSaveNewCheckbox();}else{this.hideSaveNewCheckbox();}
$(':input.woocommerce-SavedPaymentMethods-tokenInput:checked',this.$target).trigger('change');};TokenizationForm.prototype.onTokenChange=function(event){if('new'===$(this).val()){event.data.tokenizationForm.showForm();event.data.tokenizationForm.showSaveNewCheckbox();}else{event.data.tokenizationForm.hideForm();event.data.tokenizationForm.hideSaveNewCheckbox();}};TokenizationForm.prototype.onCreateAccountChange=function(event){if($(this).is(':checked')){event.data.tokenizationForm.showSaveNewCheckbox();}else{event.data.tokenizationForm.hideSaveNewCheckbox();}};TokenizationForm.prototype.hideForm=function(){$('.wc-payment-form',this.$formWrap).hide();};TokenizationForm.prototype.showForm=function(){$('.wc-payment-form',this.$formWrap).show();};TokenizationForm.prototype.showSaveNewCheckbox=function(){$('.woocommerce-SavedPaymentMethods-saveNew',this.$formWrap).show();};TokenizationForm.prototype.hideSaveNewCheckbox=function(){$('.woocommerce-SavedPaymentMethods-saveNew',this.$formWrap).hide();};$.fn.wc_tokenization_form=function(args){new TokenizationForm(this,args);return this;};$(document.body).on('updated_checkout wc-credit-card-form-init',function(){var $saved_payment_methods=$('ul.woocommerce-SavedPaymentMethods');$saved_payment_methods.each(function(){$(this).wc_tokenization_form();});});});