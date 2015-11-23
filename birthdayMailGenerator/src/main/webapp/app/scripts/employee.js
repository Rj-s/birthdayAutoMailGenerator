var Employee = Backbone.Model.extend({
	urlRoot : 'http://localhost:8080',
	url : '/birthdayMailGenerator/rest/employee'
});
var Employees = Backbone.Collection.extend({});

var employees = new Employees();

var EmployeeView = Backbone.View.extend({
	model : new Employee(),
	tagName : 'tr',
	initialize : function() {
		this.template = _.template($('.employees-list-template').html())
	},
	render : function() {
		this.$el.html(this.template(this.model.toJSON()));
		return this;
	}
})

var EmployeesView = Backbone.View.extend({
	model : employees,
	el : $('.employees-list'),
	initialize : function() {
		this.render();
	},
	render : function() {
		var self = this;
		this.$el.html('');
		_.each(this.model.toArray(), function(employee) {
			self.$el.append((new EmployeeView({
				model : employee
			})).render().$el);
		});
		return this;
	}
});


$(document).ready(function() {
	
	$('.add-employee').on('click',function(){

	  var data = new FormData();
      data.append('file', ($('input[name="file"]')[0].files[0]));
      data.append('name', $('.name-input').val());
      data.append('dob', $('.dob-input').val());
      $.ajax({
          url: 'http://localhost:8080//birthdayMailGenerator/rest/employee',
          processData: false,
          contentType: false,
          type: 'POST',
          data: data
      }).success(function(response){ 
    	  employees.reset();
    	  fetchAllEmployees();
      });
     
      $('.name-input').val('');
	  $('.dob-input').val('');
		
	});
	
	var fetchAllEmployees = function(){
		new Employee().fetch({
		success: function(response){
                for (var key in response.attributes) {
                	var employee = new Employee({
            			photo: "data:image/png;base64," + response.attributes[key].photo,
            			name : response.attributes[key].name,
            			dob : response.attributes[key].dob
            		});
                	employees.add(employee);
                }
                var employeesView = new EmployeesView();
		}
		});
	}

	fetchAllEmployees();

	    $('#employeeTable').DataTable( {
	        "aoColumns":[
	                     {"bSortable": false},
	                     {"bSortable": true},
	                     {"bSortable": false}
	                     ]
	    } );
	
	    $('#example').DataTable( {
	    	"iDisplayLength": -1,
	        "aoColumns":[
	            {"bSortable": true},
	            {"bSortable": false},
	            {"bSortable": true},
	            {"bSortable": true},
	            {"bSortable": true},
	            {"bSortable": true}
	        ]
	    } );
	    
});
