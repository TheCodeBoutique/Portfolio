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
		classNames:['profile-top-base-view'],
    childViews: 'middleView topView bottomBar'.w(),

		defaultResponder: Thecodeboutique.statechart,
		
		topView: SC.View.design({
			classNames:['profile-top-base-view'],
			layout: { top: 0, left: 0, right: 0, height: 120 },  
<<<<<<< HEAD
			childViews:'logo homeButton portfolioButton contactButton'.w(),
=======
			childViews:'logo homeButton contributionButton contactButton'.w(),
>>>>>>> 1376c7abf43c539c9f41b029f446bc78c92ab5fe
    	
			logo:SC.ImageView.design({
		 		layout: { left:20,top:20, height:100, width: 100 },
		 		useImageQueue: NO, 
		 		value: sc_static('/images/globe.png'),
			}),
			
			homeButton:SC.ButtonView.design({
			 layout: { top:40, height: 40, left: 150, width: 106 },
			 title:  "Home",
			 target: "Thecodeboutique.statechart",
			 action: "goBackToHome",
			}),
			
<<<<<<< HEAD
			portfolioButton:SC.ButtonView.design({
				layout: { top:40, height: 40, left: 288, width: 106 },
			 	title:  "Portfolio",
			  target: "Thecodeboutique.statechart",
			  action: "goToPortfolio",
=======
			contributionButton:SC.ButtonView.design({
				layout: { top:40, height: 40, left: 288, width: 106 },
			 	title:  "Portfolio",
			  target: "Thecodeboutique.statechart",
			  action: "goToContribution",
>>>>>>> 1376c7abf43c539c9f41b029f446bc78c92ab5fe
			 }),
			 
			contactButton:SC.ButtonView.design({
				layout: { top:40, height: 40, left: 426, width: 106 },
				title:  "Contact",
<<<<<<< HEAD
			 	target: "Thecodeboutique.statechart",
			 	action: "goToContact",
=======
			 	//target: "Thecodeboutique.statechart",
			 	//action: "goToContact",
>>>>>>> 1376c7abf43c539c9f41b029f446bc78c92ab5fe
			}),
			
		}),//end of topView
						bottomBar: SC.ToolbarView.design({
									  layout: { bottom: 0, left: 0, right: 0, height: 36 },  
									  //childViews:' '.w(),
										}),
	
	middleView: SC.View.design({
		layout:{left:0,right:0,top:120,height:500},
		childViews:'outsideFrame topBar'.w(),
		
		topBar: SC.ToolbarView.design({
					  layout: { top: 0, left: 0, right: 0, height: 36 },  
					  //childViews:' '.w(),
						}),
		
	
		outsideFrame:SC.View.design({
				classNames: ['contact-leftView'],
				layout:{centerX:0,centerY:0,width:750,height:325},
				childViews:'contactFrame'.w(),
		contactFrame:SC.View.design({
			classNames: ['contact-listview-middle'],
			layout:{centerX:0,centerY:0,width:700,height:275},
			childViews:'nameLabel nameField emailLabel emailsField messageLabel messageField title submitButon'.w(),
			
			
			title: SC.LabelView.design({
						    layout: { top: 5, height: 24, left: 20, width: 300 },
						    escapeHTML: NO,
						    isTextSelectable: YES,
						    value:'Want to know more about The Code Boutique, send us a message.'
						  	}),
			submitButon:SC.ButtonView.design({
								layout: { bottom: 5, height: 40, right: 12, width: 106 },
								title:  "Submit",
								target: "Thecodeboutique.contentController",
								action: "_newMessage",
								//isDefault: YES
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
					})
				})
			})//end of frame...
	})
});