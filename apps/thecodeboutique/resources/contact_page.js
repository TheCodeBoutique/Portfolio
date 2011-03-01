// ==========================================================================
// Project:   Thecodeboutique.contactPage
// Copyright: ©2011 My Company, Inc.
// ==========================================================================
/*globals Thecodeboutique */

// This page describes a part of the interface for your application.
Thecodeboutique.contactPage = SC.Page.design({

  // The main pane is made visible on screen as soon as your app is loaded.
  // Add childViews to this pane for views to display immediately on page 
  // load.
  mainPane: SC.MainPane.design({
    childViews: 'contactFrame topBar bottomBar'.w(),

		defaultResponder: Thecodeboutique.statechart,
		
		topBar: SC.ToolbarView.design({
					  layout: { top: 0, left: 0, right: 0, height: 125 },  
					  childViews:'logo profileButton contributionButton contactButton'.w(),

						logo:SC.ImageView.design({
									layout: { left:20,top:20, height:100, width: 100 },
									useImageQueue: NO, 
									value: sc_static('/images/globe.png'),
						    	}),
						profileButton:SC.ButtonView.design({
								  layout: { top:40, height: 44, left: 150, width: 125 },
								  title:  "Profile",
									controlSize: SC.JUMBO_CONTROL_SIZE,
									target: "Thecodeboutique.statechart",
									action: "goBackToProfile",
								  }),
						contributionButton:SC.ButtonView.design({
						      layout: { top:40, height: 44, left: 288, width: 125 },
						      title:  "Contribution",
						  		controlSize: SC.JUMBO_CONTROL_SIZE,
						  		target: "Thecodeboutique.statechart",
						 			action: "goToContribution",
						    	}),
						 contactButton:SC.ButtonView.design({
						 		 	layout: { top:40, height: 44, left: 426, width: 125 },
						 			title:  "Contact",
						 			controlSize: SC.JUMBO_CONTROL_SIZE,
						 			//target: "Thecodeboutique.statechart",
						 			//action: "goToContribution",
									 }),
						}),//end of top toolBar..
						bottomBar: SC.ToolbarView.design({
									  layout: { bottom: 0, left: 0, right: 0, height: 45 },  
									  //childViews:' '.w(),
										}),
		
		contactFrame:SC.View.design({
			backgroundColor:'gray',
			layout:{centerX:0,centerY:0,width:700,height:275},
			childViews:'nameLabel nameField emailLabel emailsField messageLabel messageField title submitButon'.w(),
			
			
			title: SC.LabelView.design({
						    layout: { top: 5, height: 24, left: 20, width: 300 },
						    escapeHTML: NO,
						    isTextSelectable: YES,
						    value:'Want to know more about The Code Boutique, send us a message.'
						  	}),
			submitButon:SC.ButtonView.design({
								layout: { bottom: 5, height: 42, right: 12, width: 100 },
								title:  "Submit",
								controlSize: SC.JUMBO_CONTROL_SIZE,
								target: "Thecodeboutique.contentController",
								action: "_newMessage",
								isDefault: YES
								}),
			nameLabel:SC.LabelView.design({
						   layout:{top:45,left:20,width:80,height:20},
			          escapeHTML: NO,
						    isTextSelectable: YES,
						    value:'Your Name'
						  	}), 
			nameField:SC.TextFieldView.design({
							layout:{top:45,left:100,width:215,height:20},
							controlSize: SC.LARGE_CONTROL_SIZE,
			        fontWeight: SC.BOLD_WEIGHT,
							hint: 'name:',
							valueBinding:'Thecodeboutique.contentController.newName'
						}),
			emailLabel:SC.LabelView.design({
						   layout:{top:45,right:190,width:80,height:20},
			          escapeHTML: NO,
						    isTextSelectable: YES,
						    value:'Email'
						  	}), 
			emailsField:SC.TextFieldView.design({
							layout:{top:45,right:20,width:215,height:20},
							controlSize: SC.LARGE_CONTROL_SIZE,
			        fontWeight: SC.BOLD_WEIGHT,
							hint: 'email:',
							valueBinding:'Thecodeboutique.contentController.newEmail'
						}),
			messageLabel:SC.LabelView.design({
							layout:{top:80,left:20,width:80,height:20},
						  escapeHTML: NO,
							isTextSelectable: YES,
							value:'Message'
							}), 			
			messageField:SC.TextFieldView.design({
						layout:{top:80,left:98,width:583,height:140},
						isTextArea:YES,
						isEditing:YES,
						hint: 'Messege :',
						valueBinding:'Thecodeboutique.contentController.newMessage'
						}),
					})//end of frame...
	})
});