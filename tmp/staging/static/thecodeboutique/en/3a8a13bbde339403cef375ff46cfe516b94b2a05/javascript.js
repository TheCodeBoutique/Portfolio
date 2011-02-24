/* >>>>>>>>>> BEGIN module_info.js */

/* >>>>>>>>>> BEGIN source/core.js */
// ==========================================================================
// Project:   Thecodeboutique
// Copyright: ©2011 My Company, Inc.
// ==========================================================================
/*globals Thecodeboutique */

/** @namespace

  My cool new app.  Describe your application.
  
  @extends SC.Object
*/
Thecodeboutique = SC.Application.create(
  /** @scope Thecodeboutique.prototype */ {

  NAMESPACE: 'Thecodeboutique',
  VERSION: '0.1.0',

  // This is your application store.  You will use this store to access all
  // of your model data.  You can also set a data source on this store to
  // connect to a backend server.  The default setup below connects the store
  // to any fixtures you define.
  store: SC.Store.create().from(SC.Record.fixtures)
  
  // TODO: Add global constants or singleton objects needed by your app here.

}) ;

/* >>>>>>>>>> BEGIN source/controllers/content.js */
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
	
	nowShowing:'Lorem ipsum dolor sit amet, aliquam turpis. Morbi laoreet. Libero lacinia lacinia in lectus feugiat, feugiat tortor nostra, molestie sapien, velit vestibulum erat sit, platea blandit tellus tortor volutpat viverra vestibulum. A ultricies aliquam vel blandit volutpat elementum, ipsum eget felis sapiente. Etiam convallis iaculis ligula sit justo egestas, erat lacus amet risus. Ut vestibulum arcu, nullam sodales mi odio, neque sodales. Sed leo dui, pede a leo. A ultricies leo lacinia mollis, massa nunc egestas nec pellentesque vitae, in fringilla lorem proin, magna dui tortor, et risus nec. Et sed, mattis dolor massa aut at aliquet posuere.',


});

/* >>>>>>>>>> BEGIN source/resources/states.js */
SC.mixin(Thecodeboutique, {
  
  statechart: Ki.Statechart.create({

    rootState: Ki.State.design({

      initialSubstate: 'Landing',

      Landing: Ki.State.design({

        enterState: function() {
  				console.log('Landing');
					Thecodeboutique.getPath('mainPage.mainPane').append();
					//ScCommunityApp.getPath('signInPage.mainPane').append();
					Thecodeboutique.mainPage.mainPane.frame.iconOne.animate('rotateY',180,{duration:1.0, timing:'ease-in-out'});
					Thecodeboutique.mainPage.mainPane.frame.iconTwo.animate('rotateY',180,{duration:1.2, timing:'ease-in-out'});
					Thecodeboutique.mainPage.mainPane.frame.iconThree.animate('rotateY',180,{duration:1.4, timing:'ease-in-out'});
					Thecodeboutique.mainPage.mainPane.frame.iconForth.animate('rotateY',180,{duration:1.6, timing:'ease-in-out'});
					
					//setup fram on other view
					Thecodeboutique.getPath('profilePage.mainPane');
					Thecodeboutique.profilePage.mainPane.frame.animate('scale',0.001,{duration:.5, timing:'ease-in-out'});
					
					this.invokeLater(this.fadeBarIn,1200);
        },
				fadeBarIn:function()
				{
					console.log('go bar');
					Thecodeboutique.mainPage.mainPane.frame.animate('opacity',0.8,{duration:1, timing:'ease-in-out'});
					Thecodeboutique.mainPage.mainPane.frame.animate('width',0.99,{duration:1, timing:'ease-in-out'});
					//this.gotoState('SignUp');
					this.invokeLater(this.flipLogos,600);
					
				},
				flipLogos:function()
				{
					Thecodeboutique.mainPage.mainPane.frame.iconOne.animate('rotateY',0,{duration:1.0, timing:'ease-in-out'});
					Thecodeboutique.mainPage.mainPane.frame.iconTwo.animate('rotateY',0,{duration:1.2, timing:'ease-in-out'});
					Thecodeboutique.mainPage.mainPane.frame.iconThree.animate('rotateY',0,{duration:1.4, timing:'ease-in-out'});
					Thecodeboutique.mainPage.mainPane.frame.iconForth.animate('rotateY',0,{duration:1.6, timing:'ease-in-out'});
				},
				goToProfilePage:function()
				{
					this.gotoState('Profile');
					
				}
			}), // end of the foo
			

			
	Exit: Ki.State.design({

    enterState: function() {
				console.log('EEEE');

    }
	}), // end of the foo		
			
			
			
			Profile: Ki.State.design({
				
				enterState: function() {
						console.log('Profile');
						Thecodeboutique.getPath('mainPage.mainPane').remove();
						Thecodeboutique.getPath('profilePage.mainPane').append();
						
						Thecodeboutique.profilePage.mainPane.frame.animate('opacity',1,{duration:.5, timing:'ease-in-out'});
						this.invokeLater(this.scaleIn,500);


        	},
					scaleIn:function()
					{
						Thecodeboutique.profilePage.mainPane.frame.animate('scale',1.3,{duration:.5, timing:'ease-in-out'},this.invokeLater(this.backDown,500));
						
					},
					backDown:function()
					{
						Thecodeboutique.profilePage.mainPane.frame.contentFrame.animate('width',450,{duration:.5, timing:'ease-in-out'});
						Thecodeboutique.profilePage.mainPane.frame.animate('scale',1.0,{duration:.5, timing:'ease-in-out'});		
						Thecodeboutique.profilePage.mainPane.bottomFrame.animate('opacity',1.0,{duration:1.5, timing:'ease-in-out'});
						Thecodeboutique.profilePage.mainPane.topFrame.animate('opacity',1.0,{duration:1.5, timing:'ease-in-out'});						
					},
					exit:function()
					{
						this.gotoState('Exit');
					},
					goToProfileState:function()
					{
						this.gotoState('Profile');
					}
			}),
			
			Contact: Ki.State.design({
				
				enterState: function() {


					
        	},
					nextFunction:function()
					{
					}
			})
    })
  
  })

});

/* >>>>>>>>>> BEGIN source/resources/main_page.js */
// ==========================================================================
// Project:   Thecodeboutique - mainPage
// Copyright: ©2011 My Company, Inc.
// ==========================================================================
/*globals Thecodeboutique */

// This page describes the main user interface for your application.  
Thecodeboutique.mainPage = SC.Page.design({

  // The main pane is made visible on screen as soon as your app is loaded.
  // Add childViews to this pane for views to display immediately on page 
  // load.
  mainPane: SC.MainPane.design({
    childViews: 'TCB frame '.w(),

		defaultResponder: Thecodeboutique.statechart,
    
		TCB:SC.ImageView.design({
					//classNames:['sprout'],
					layout: { bottom:153,right:-174, height:400, width:415 },
					useImageQueue: NO, 
					value: '/static/thecodeboutique/en/3a8a13bbde339403cef375ff46cfe516b94b2a05/resources/images/globe.png',
		    }),
    frame: SC.View.design({
			classNames:['frame'],
			layout:{bottom:190, left:0, width:0,height:120},
			backgroundColor:'gray',
			childViews:'title iconOne iconTwo iconThree iconForth'.w(),
			
			title:SC.LabelView.design({
								classNames:['title-label'],
						    layout: {centerY:0,height:120, left: 0, width:400 },
								escapeHTML: NO,
						    value:'The Code Boutique'
						  	}),
			iconOne:SC.View.design({
				classNames:['icon-one'],
				layout:{right:440,centerY:0,height:100,width:100},
				backgroundColor:'black',
				mouseEntered: function(evt) {
			        this.animate('scale',1.07,{duration:.3,timing:'ease-in-out'});
			        return YES
			    },
					mouseExited: function() {
						this.animate('scale',1,{duration:.3,timing:'ease-in-out'});
		        return YES
						},
					mouseDown:function(evt){Thecodeboutique.statechart.sendEvent('goToProfilePage');},
				childViews:'profile'.w(),
				profile:SC.LabelView.design({
									classNames:['landing-labels'],
							    layout: { bottom:0, height: 46, centerX: 0, width: 200 },
							    escapeHTML: NO,
							    value:'Profile',
							  	}),
			}),
			iconTwo:SC.View.design({
				classNames:['icon-one'],
				layout:{right:300,centerY:0,height:100,width:100},
				backgroundColor:'black',
				childViews:'profile'.w(),
				profile:SC.LabelView.design({
									classNames:['landing-labels'],
							    layout: { bottom:0, height: 46, centerX: 0, width: 200 },
							    escapeHTML: NO,
							    value:'Contribution'
							  	}),
				
			}),
			iconThree:SC.View.design({
				classNames:['icon-one'],
				layout:{right:150,centerY:0,height:100,width:100},
				backgroundColor:'black',
				childViews:'profile'.w(),
				profile:SC.LabelView.design({
									classNames:['landing-labels'],
							    layout: { bottom:0, height: 46, centerX: 0, width: 200 },
							    escapeHTML: NO,
							    value:'Contact'
							  	}),
			}),
			iconForth:SC.View.design({
				classNames:['icon-one'],
				layout:{right:10,centerY:0,height:100,width:100},
				backgroundColor:'black',
				childViews:'profile'.w(),
				profile:SC.LabelView.design({
									classNames:['landing-labels'],
							    layout: { bottom:0, height: 46, centerX: 0, width: 200 },
							    escapeHTML: NO,
							    value:'Unknown'
							  	}),
			}),
		}),//end of frame
  })

});

/* >>>>>>>>>> BEGIN source/resources/profile_page.js */
Thecodeboutique.profilePage = SC.Page.design({

  // The main pane is made visible on screen as soon as your app is loaded.
  // Add childViews to this pane for views to display immediately on page 
  // load.
  mainPane: SC.MainPane.design({
    childViews: 'frame bottomFrame topFrame'.w(),

		defaultResponder: Thecodeboutique.statechart,
    
    frame:SC.View.design({
			classNames:['profile-frame'],
			layout:{top:120, height:300},
			backgroundColor:'gray',
			childViews:'contentFrame'.w(),
			
			contentFrame:SC.View.design({
				layout:{top:55, height:218,left:20,width:0},
				//backgroundColor:'black',
				childViews:'appContent'.w(),
				
				appContent:SC.LabelView.design({
							    layout: { top:5, height:130, left:10, width:400 },
				          escapeHTML: NO,
							    isTextSelectable: YES,
							    valueBinding:'Thecodeboutique.contentController.nowShowing'
							  	}),
						
			}),
			
		}),//end of the frame
		topFrame:SC.View.design({
			classNames:['bottom-frame'],
			layout:{top:0,height:160},
			backgroundColor:'silver',
			childViews:'logo button1 button2 button3'.w(),
			
			logo:SC.ImageView.design({
						//classNames:['sprout'],
						layout: { left:20,top:20, height:100, width: 100 },
						useImageQueue: NO, 
						value: '/static/thecodeboutique/en/3a8a13bbde339403cef375ff46cfe516b94b2a05/resources/images/globe.png',
			    }),
			button1:SC.ButtonView.design({
					        layout: { top:40, height: 44, left: 150, width: 125 },
					        title:  "Profile",
									controlSize: SC.JUMBO_CONTROL_SIZE,
									//target: "ScCommunityMarketing.betaController",
									//action: "addTask",
									//isDefault: YES
					      }),
									button2:SC.ButtonView.design({
											        layout: { top:40, height: 44, left: 288, width: 125 },
											        title:  "Profile",
															controlSize: SC.JUMBO_CONTROL_SIZE,
															//target: "ScCommunityMarketing.betaController",
															//action: "addTask",
															//isDefault: YES
											      }),
															button3:SC.ButtonView.design({
																	        layout: { top:40, height: 44, left: 426, width: 125 },
																	        title:  "Profile",
																					controlSize: SC.JUMBO_CONTROL_SIZE,
																					//target: "ScCommunityMarketing.betaController",
																					//action: "addTask",
																					//isDefault: YES
																	      }),
			}),
			
		bottomFrame: SC.View.design({
			classNames:['bottom-frame'],
			layout:{bottom:0,height:200},
			backgroundColor:'silver',
			childViews:'image1 image2 image3 image4'.w(),
			
			image1:SC.ImageView.design({
						//classNames:['sprout'],
						layout: { left:100, bottom:10, height:134, width: 231 },
						useImageQueue: NO, 
						value: '/static/thecodeboutique/en/3a8a13bbde339403cef375ff46cfe516b94b2a05/resources/images/One-dark.png',
			    }),
					image2:SC.ImageView.design({
								//classNames:['sprout'],
								layout: { left:354, bottom:10, height:134, width: 231 },
								useImageQueue: NO, 
								value: '/static/thecodeboutique/en/3a8a13bbde339403cef375ff46cfe516b94b2a05/resources/images/One-light.png',
					    }),
							image3:SC.ImageView.design({
										//classNames:['sprout'],
										layout: { right:100, bottom:10, height:134, width: 231 },
										useImageQueue: NO, 
										value: '/static/thecodeboutique/en/3a8a13bbde339403cef375ff46cfe516b94b2a05/resources/images/Two-Dark.png',
							    }),
									image4:SC.ImageView.design({
												//classNames:['sprout'],
												layout: { right:354, bottom:10, height:134, width: 231 },
												useImageQueue: NO, 
												value: '/static/thecodeboutique/en/3a8a13bbde339403cef375ff46cfe516b94b2a05/resources/images/Two-Light.png',
									    }),
			
		})
  })

});
/* >>>>>>>>>> BEGIN source/main.js */
// ==========================================================================
// Project:   Thecodeboutique
// Copyright: ©2011 My Company, Inc.
// ==========================================================================
/*globals Thecodeboutique */

// This is the function that will start your app running.  The default
// implementation will load any fixtures you have created then instantiate
// your controllers and awake the elements on your page.
//
// As you develop your application you will probably want to override this.
// See comments for some pointers on what to do next.
//
Thecodeboutique.main = function main() {

  // Step 1: Instantiate Your Views
  // The default code here will make the mainPane for your application visible
  // on screen.  If you app gets any level of complexity, you will probably 
  // create multiple pages and panes.  
   Thecodeboutique.statechart.initStatechart();

  // Step 2. Set the content property on your primary controller.
  // This will make your app come alive!

  // TODO: Set the content property on your primary controller
  // ex: Thecodeboutique.contactsController.set('content',Thecodeboutique.contacts);

} ;

function main() { Thecodeboutique.main(); }

