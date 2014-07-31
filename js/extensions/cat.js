ds.register_dashboard_item('cat', {
  constructor: function(data) {
    'use strict'

    var self = limivorous.observable()
                         .property('size')
                         .extend(ds.models.item, {item_type: 'cat'})
                         .build()

    if (data) {
      self.size = data.size
    }
    ds.models.item.init(self, data)

    self.toJSON = function() {
      return ds.models.item.json(self, {
        size: self.size
      })
    }
    return self
  },

  template: '<div style="align: center" class="ds-item ds-cat {{css_class item}}" id="{{item.item_id}}">{{ds-edit-bar item}}' +
            '<img style="max-width:100%; max-height:100%;" src="http://thecatapi.com/api/images/get?format=src&type=gif&size={{item.size}}" />' +
            '</div>',

  interactive_properties: [
    {
      id: 'size',
      template: '{{item.size}}',
      edit_options: {
        type: 'select',
        source: function() { return ['small', 'med', 'full'] },
        value: function(item) {
          return item.size ? item.size : undefined
        }
      }
    },
  ]

})
var new_cat_action = ds.action({
    name: 'new-cat',
    display: 'Add a Cat',
    icon: 'fa fa-paw',
    handler: function(action, container) {
      container.add(ds.models.factory('cat'))
      ds.manager.current.dashboard.update_index()
      ds.manager.update_item_view(container)
    }
  })

ds.actions.register('new-item', new_cat_action);