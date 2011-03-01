// ==========================================================================
// Project:   Thecodeboutique.appController
// Copyright: ©2011 My Company, Inc.
// ==========================================================================
/*globals Thecodeboutique */

/** @class

  (Document Your Controller Here)

  @extends SC.Object
*/
Thecodeboutique.appController = SC.ObjectController.create({

 	contentBinding: "Thecodeboutique.appsController.selection",
	nowShowing:'Thecodeboutique.appPage.mainPane.thecodeboutique',
	contentBindingDefault: SC.Binding.single('Thecodeboutique.appsController.selection'),
	
	
	delayShow: function() {
	    // wait a moment before loading to let things finish...
	    this.invokeLater(this.set, 50, "nowShowing", this.get("show"));
	  }.observes("show"),

}) ;
