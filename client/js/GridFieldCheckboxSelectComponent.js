/**
 * Handles selection and check-all as well as confirmations.
 *
 * @author Mark Guinn <mark@adaircreative.com>
 * @date 12.22.2014
 * @package gridfieldmultiselect
 * @subpackage javascript
 */
(function($){
	$.entwine('ss', function($) {
        function setstate(el){
            var statestorage = el.parents('fieldset.grid-field').find('.gridstate');
            var state = JSON.parse(statestorage.attr('value'));
            var checked = el.prop('checked');
            var val = el.val();
            if(!state.MultiSelect) {
                state.MultiSelect = [];
            }
            var instate = state.MultiSelect.indexOf(val);
            var changed = false;
            if(instate > -1 && !checked) {
                state.MultiSelect.splice(instate,1);
                changed = true;
            } else if(instate < 0 && checked) {
                state.MultiSelect.push(val);
                changed = true;
            }
            if(changed) {
                statestorage.attr('value', JSON.stringify(state));
            }
        }

		$('.ss-gridfield .multiselect').entwine({
			onclick: function (e) {
                e.stopPropagation();
                setstate(this);
			}
		});

		$('.ss-gridfield .multiselect-all').entwine({
			onclick: function () {
				this.closest('table').find('.multiselect').prop('checked', this.prop('checked')).each(setstate);
			}
		});

		$('.ss-gridfield .multiselect-button').entwine({
			onclick: function(e) {
				if (this.closest('.ss-gridfield').find('.multiselect:checked').length == 0) {
					alert('Please check one or more rows.');
					return false;
				}

				if (this.data('confirm') && !confirm(this.data('confirm'))) {
					e.preventDefault();
					e.stopPropagation();
					return false;
				}

				this._super(e);
			}
		});

	});
})(jQuery);
