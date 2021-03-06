// ==========================================================================
// Project:   Thecodeboutique.contentController
// Copyright: ©2011 My Company, Inc.
// ==========================================================================
/*globals Thecodeboutique */

/** @class

  (Document Your Controller Here)

  @extends SC.Object
*/
Thecodeboutique.contentController = SC.ObjectController.create({
	
	newMessage: '',
	newName: '',
	newEmail: '',
	
	one:'The Code Boutique',
	
	two:'specializes in engineering cloud applications for desktop, mobile, and tablet devices running the latest browser',
	
	three:'technology.  We use cutting edge web frameworks such as sproutcore, node.js, and websockets to synchronize web services to native apple applications through the cloud with minimal server requests, one database, and blazing fast data parsing.',
	
	bottom:'Current Projects in development:',
	
	_newMessage:function()
	{
		var visitor;
		
		var newMessage = Thecodeboutique.contentController.get('newMessage');
		var newName = Thecodeboutique.contentController.get('newName');
		var newEmail = Thecodeboutique.contentController.get('newEmail');
		if(newMessage === '' || newName === '' || newEmail === '')
		{
			alert('Please Fill out all fields');

		}else
		{
			
			visitor = Thecodeboutique.store.createRecord(Thecodeboutique.Visitor,{
					"name": newName,
					"email":newEmail,
					"message":newMessage	
		 }),
		
		console.log('submit');
		alert('Thank you for submitting your comments');
		Thecodeboutique.contentController.set('newMessage','');	
		Thecodeboutique.contentController.set('newName','');	
		Thecodeboutique.contentController.set('newEmail','');	
		}
	}

	    // create a new task in the store
	  
});
; if ((typeof SC !== 'undefined') && SC && SC.Module && SC.Module.scriptDidLoad) SC.Module.scriptDidLoad('thecodeboutique');