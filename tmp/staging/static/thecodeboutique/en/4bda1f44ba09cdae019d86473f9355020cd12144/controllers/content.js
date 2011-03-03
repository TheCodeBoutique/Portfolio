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
		var a = Thecodeboutique.contentController.get('newMessage');
		var b = Thecodeboutique.contentController.get('newName');
		var c = Thecodeboutique.contentController.get('newEmail');
		if(a === '' || b === '' || c === '')
		{
			alert('Please Fill out all fields');

		}else
		{
		console.log('submit');
		alert('Thank you for submitting your comments');
		Thecodeboutique.contentController.set('newMessage','');	
		Thecodeboutique.contentController.set('newName','');	
		Thecodeboutique.contentController.set('newEmail','');	
		}
	}

});
