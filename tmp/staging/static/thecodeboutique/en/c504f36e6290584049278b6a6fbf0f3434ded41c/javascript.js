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
  //store: SC.Store.create().from(SC.Record.fixtures)
  
  // TODO: Add global constants or singleton objects needed by your app here.
	store: SC.Store.create({ 
	  commitRecordsAutomatically: YES
		}).from('Thecodeboutique.VisitorDataSource')
}) ;

/* >>>>>>>>>> BEGIN source/controllers/app.js */
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

/* >>>>>>>>>> BEGIN source/controllers/apps.js */
// ==========================================================================
// Project:   Thecodeboutique.appsController
// Copyright: ©2011 My Company, Inc.
// ==========================================================================
/*globals Thecodeboutique */

/** @class

  (Document Your Controller Here)

  @extends SC.Object
*/
Thecodeboutique.appsController = SC.ArrayController.create({


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

/* >>>>>>>>>> BEGIN source/data_sources/Thecodeboutique.VisitorsJSONProxy.js */
Thecodeboutique.VisitorsJSONProxy = SC.Object.create({
          normalize_task_data: function(data) {
               result = new Array();
               if (data.length == undefined)
               {
                    array_name = 'data.visitor';
                    eval(array_name).guid = eval(array_name).id;
                    result.push(eval(array_name));
               }
               else
               {
                    for(var i=0; i<data.length; i++) {
                         array_name = 'data[i].visitor';
                         eval(array_name).guid = eval(array_name).id;
                         result.push(eval(array_name));
                    }  
               }
               return result;
          } 
     }) ;

/* >>>>>>>>>> BEGIN source/data_sources/visitor.js */
// ==========================================================================
// Project:   Thecodeboutique.VisitorDataSource
// Copyright: ©2011 My Company, Inc.
// ==========================================================================
/*globals Thecodeboutique */

/** @class

  (Document Your Data Source Here)

  @extends SC.DataSource
*/
Thecodeboutique.VisitorDataSource = SC.DataSource.extend(
/** @scope Thecodeboutique.VisitorDataSource.prototype */ {

  // ..........................................................
  // QUERY SUPPORT
  // 

 fetch: function(store, query) {
		if (query === Thecodeboutique.VISITOR_QUERY) {
		      SC.Request.getUrl('/visitors.json').header({
			        'Accept': 'application/json'
			      }).json().notify(this, 'didFetchQuery', store, query).send();

	return YES;
	}

		  return NO;
	  },


	  didFetchQuery: function(response, store, query) {
		var storeKeys = store.loadRecords(Thecodeboutique.Visitor,
		     Thecodeboutique.VisitorsJSONProxy.normalize_task_data(response.get('body')));
	  	if(SC.ok(response)) {

	      store.loadRecords(query.primaryKey, response.get('body'));
	      store.dataSourceDidFetchQuery(query);
	    } else store.dataSourceDidErrorQuery(query, response);	
	  },

	 	retrieveRecord: function(store, storeKey) {
			if (SC.kindOf(store.recordTypeFor(storeKey), Thecodeboutique.Visitor)) {

			    var url = store.idFor(storeKey);


			    SC.Request.getUrl(url).header({
			                'Accept': 'application/json'
			            }).json()
			      .notify(this, 'didRetrieveTask', store, storeKey)
			      .send();

			    return YES;

			  } else return NO;
			},
			didRetrieveTask: function(response, store, storeKey) {
			  if (SC.ok(response)) {
			    var dataHash = response.get('body');

			     store.loadRecord(recordType, dataHash, id);

			  } else store.dataSourceDidError(storeKey, response);
			},

				  createRecord: function(store, storeKey) {
				    if (SC.kindOf(store.recordTypeFor(storeKey), Thecodeboutique.Visitor)) {

					    SC.Request.postUrl('/visitors.json').header({
					                'Accept': 'application/json'
					            }).json()
					      .notify(this, this.didCreateTask, store, storeKey)
					      .send(store.readDataHash(storeKey));
					    return YES;

					  } else return NO;
				  },
				didCreateTask: function(response, store, storeKey) {
				  if (SC.ok(response)) {
				    // Adapted from parseUri 1.2.2
				    // (c) Steven Levithan <stevenlevithan.com>
				    // MIT License
				    var parser = /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/;
				    var url = parser.exec(response.header('Location'))[8];
				    store.dataSourceDidComplete(storeKey, null, url); // update url

				  } else store.dataSourceDidError(storeKey, response);
				},

				  updateRecord: function(store, storeKey) {
				  if (SC.kindOf(store.recordTypeFor(storeKey), Thecodeboutique.Visitor)) {
				    SC.Request.putUrl(store.idFor(storeKey)).header({
				                'Accept': 'application/json'
				            }).json()
				      .notify(this, this.didUpdateTask, store, storeKey)
				      .send(store.readDataHash(storeKey));
				    return YES;

				  } else return NO ;
				},
				didUpdateTask: function(response, store, storeKey) {
				  if (SC.ok(response)) {
				    //var data = response.get('body');
				    //if (data) data = data.content; // if hash is returned; use it.
				    store.dataSourceDidComplete(storeKey,response.get('body')) ;

				  } else store.dataSourceDidError(storeKey); 
				},

				  destroyRecord: function(store, storeKey) {

				    // TODO: Add handlers to destroy records on the data source.
				    // call store.dataSourceDidDestroy(storeKey) when done

				    return NO ; // return YES if you handled the storeKey
				  }


			}) ;

/* >>>>>>>>>> BEGIN source/models/visitor.js */
// ==========================================================================
// Project:   Thecodeboutique.Visitor
// Copyright: ©2011 My Company, Inc.
// ==========================================================================
/*globals Thecodeboutique */

/** @class

  (Document your Model here)

  @extends SC.Record
  @version 0.1
*/
Thecodeboutique.Visitor = SC.Record.extend({

	name: SC.Record.attr(String),
	email: SC.Record.attr(String),
	message:SC.Record.attr(String),

});

/* >>>>>>>>>> BEGIN source/resources/app_list.js */
Thecodeboutique.appList = SC.ListItemView.extend(
/** @scope ImageSearch.ImageThumbListItemView.prototype */ {
  
  escapeHTML: NO,
  
  classNames: ['sc-list-item-view'],
  
});
/* >>>>>>>>>> BEGIN source/resources/applications.js */
Thecodeboutique.apps = [
			// About Page //
		SC.Object.create({
			name: "Endeavour-os",
			show: "Thecodeboutique.appPage.mainPane.endFrame",
			appImage:'/static/endeavourlight/en/49c10eaa51cc70c03d2b8e56fc4854947d33ba67/resources/images/endeavour_icon.png',
			description:"This is description about somthing",
			}),
		
				// About Page //
		SC.Object.create({
			name: "Hacktime",
			show: "Thecodeboutique.appPage.mainPane.hacktimeFrame",
			appImage:'/static/endeavourlight/en/49c10eaa51cc70c03d2b8e56fc4854947d33ba67/resources/images/hacktime_icon.png',
			description:"This is description about somthing",
			}),

			// Developers //
		SC.Object.create({
			name: "SC Community App",
			show: "Thecodeboutique.appPage.mainPane.comunityFrame",
			appImage:'/static/endeavourlight/en/49c10eaa51cc70c03d2b8e56fc4854947d33ba67/resources/images/community_icon.png',
			description:"This is description about somthing",
			}),
			// Demo Page //
		SC.Object.create({
			name: "Sproutcore Tutorials",
			show: "Thecodeboutique.appPage.mainPane.tutorialFrame",
			appImage:'/static/endeavourlight/en/49c10eaa51cc70c03d2b8e56fc4854947d33ba67/resources/images/sproutcore_icon.png',
			description:"This is description about somthing",
			}),
		SC.Object.create({
			name: "Animation",
			show: "Thecodeboutique.appPage.mainPane.animationFrame",
			appImage:'/static/endeavourlight/en/49c10eaa51cc70c03d2b8e56fc4854947d33ba67/resources/images/animation.png',
			description:"This is description about somthing",
			}),
			// Demo Page //
		SC.Object.create({
			name: "Game",
			show: "Thecodeboutique.appPage.mainPane.gameFrame",
			appImage:'/static/endeavourlight/en/49c10eaa51cc70c03d2b8e56fc4854947d33ba67/resources/images/animation.png',
			description:"This is description about somthing",
			})
];	
/* >>>>>>>>>> BEGIN source/resources/states.js */
SC.mixin(Thecodeboutique, {
  statechart: Ki.Statechart.create({
    rootState: Ki.State.design({
      initialSubstate: 'FirstView',
      FirstView: Ki.State.design({

        enterState: function() {
					// State description: sets the mainPage.mainPane, //
					// delays the animated navigation bar, //
					// sets the tcb text to 0, //
					// sets the navigation buttons reversed //
  				console.log('enterState: mainPage.mainPane w/ animated navigation');
					Thecodeboutique.getPath('mainPage.mainPane').append();
					Thecodeboutique.mainPage.mainPane.slideInNav.homeButton.animate('rotateY',180,{duration:1.0, timing:'ease-in-out'});
					Thecodeboutique.mainPage.mainPane.slideInNav.portfolioButton.animate('rotateY',180,{duration:1.2, timing:'ease-in-out'});
					Thecodeboutique.mainPage.mainPane.slideInNav.contactButton.animate('rotateY',180,{duration:1.4, timing:'ease-in-out'});
					Thecodeboutique.mainPage.mainPane.tcbText.animate('opacity',0.0,{duration:1, timing:'ease-in-out'});
					// sets the content in the controller apps //
					// sets the profilePage.mainPane //
					// starts the imageArray //
					console.log('enterStatePreLoad: homePage.mainPane w/ slideShow array');
					Thecodeboutique.getPath('homePage.mainPane');
					Thecodeboutique.appsController.set('content', Thecodeboutique.apps);
					Thecodeboutique.homePage.mainPane.middleView.slideShow.imageArray();
					Thecodeboutique.homePage.mainPane.middleView.slideShowBack.imageArray();
					this.invokeLater(this.slideNavigationBarIn,1200);
				},
				
				slideNavigationBarIn:function() {
					// Function description: slides the navigation bar in and delays the flipping navigation buttons //
					console.log('    slideNavigationBarIn: slides the navigation bar in from the left');
					Thecodeboutique.mainPage.mainPane.slideInNav.animate('opacity',0.9,{duration:1, timing:'ease-in-out'});
					Thecodeboutique.mainPage.mainPane.slideInNav.animate('width',.9999,{duration:1, timing:'ease-in-out'});
					this.invokeLater(this.adjustTCBTextOpacity,500);
				},
				
				adjustTCBTextOpacity:function() {
					// Function description: changes the opacity bar in and delays the flipping navigation buttons //
					console.log('    adjustTCBTextOpacity: changes the opacity of the TCB text from 0 to 1');
					Thecodeboutique.mainPage.mainPane.tcbText.animate('opacity',1.0,{duration:1, timing:'ease-in-out'});
					this.flipNavigationButtons();
				},
				
				flipNavigationButtons:function() {
					// Function description: flips the navigation buttons 180 degrees //
					console.log('    flipNavigationButtons: flips the navigation buttons 180 degrees');
					Thecodeboutique.mainPage.mainPane.slideInNav.homeButton.animate('rotateY',0,{duration:1.0, timing:'ease-in-out'});
					Thecodeboutique.mainPage.mainPane.slideInNav.portfolioButton.animate('rotateY',0,{duration:1.2, timing:'ease-in-out'});
					Thecodeboutique.mainPage.mainPane.slideInNav.contactButton.animate('rotateY',0,{duration:1.4, timing:'ease-in-out'});
				},
				
				goToHomePage:function() {
					// Function description: exits the current state and goes to the profile views enter state //
					console.log('    goToHomePage: starts the enter state for the profile view');
					this.gotoState('Home');
				},

				goToPortfolio:function() { 
					this.gotoState('Portfolio');
				},
				
				goToContact:function() {
					this.gotoState('Contact');
				}
				
			}), 

// end of the first view //
// start of the home view //
			
			Home: Ki.State.design({
				
				enterState: function() {
						console.log('enterState: homePage.mainPane');
						Thecodeboutique.getPath('mainPage.mainPane').remove();
						Thecodeboutique.getPath('homePage.mainPane').append();
						Thecodeboutique.homePage.mainPane.middleView.animate('opacity',1,{duration:.5, timing:'ease-in-out'});
						this.invokeLater(this.scaleIn,500);
						Thecodeboutique.homePage.mainPane.middleView.animate('scale',0.001,{duration:.5, timing:'ease-in-out'});
						this.loadData();
        	},
					loadData:function()
					{
						sc_require('models/visitor');
						Thecodeboutique.VISITOR_QUERY = SC.Query.local(Thecodeboutique.Visitor);
					},
				
				scaleIn:function() {
						Thecodeboutique.homePage.mainPane.middleView.animate('scale',1.3,{duration:.5, timing:'ease-in-out'},this.invokeLater(this.backDown,500));
					},
					
				backDown:function() {
					Thecodeboutique.homePage.mainPane.middleView.contentFrame.animate('width',650,{duration:.5, timing:'ease-in-out'});
					Thecodeboutique.homePage.mainPane.middleView.animate('scale',1.0,{duration:.5, timing:'ease-in-out'});		
					Thecodeboutique.homePage.mainPane.bottomView.animate('opacity',1.0,{duration:1.5, timing:'ease-in-out'});
					Thecodeboutique.homePage.mainPane.topView.animate('opacity',1.0,{duration:1.5, timing:'ease-in-out'});						
				},
				
				exit:function() {
					this.gotoState('Exit');
				},
				

				goToPortfolio:function() { 
					this.gotoState('Portfolio');
				},
				
				goToContact:function() {
					this.gotoState('Contact');
				},
				
			}), 
			
// end of the home view //
// start of the portfolio view //

Portfolio: Ki.State.design({
				
				enterState: function() {
					console.log('Porfolio');
					Thecodeboutique.getPath('mainPage.mainPane').remove();
					Thecodeboutique.getPath('profilePage.mainPane').append();
					
					// Reset home page to its default state //
					Thecodeboutique.getPath('homePage.mainPane')
					Thecodeboutique.homePage.mainPane.middleView.animate('opacity',0.0,{duration:.5, timing:'ease-in-out'});
					Thecodeboutique.homePage.mainPane.middleView.animate('scale',0.001,{duration:.5, timing:'ease-in-out'});
					Thecodeboutique.homePage.mainPane.bottomView.animate('opacity',0.0,{duration:1.5, timing:'ease-in-out'});
					Thecodeboutique.homePage.mainPane.topView.animate('opacity',0.0,{duration:1.5, timing:'ease-in-out'});
					Thecodeboutique.homePage.mainPane.middleView.contentFrame.animate('width',0,{duration:.5, timing:'ease-in-out'});
        	},
					goBackToHome:function()
					{
						Thecodeboutique.getPath('profilePage.mainPane').remove();
						Thecodeboutique.getPath('homePage.mainPane').append();
						Thecodeboutique.homePage.mainPane.middleView.animate('scale',0.001,{duration:.5, timing:'ease-in-out'});
						this.gotoState('Home');
					},
					goToContact:function()
					{
						Thecodeboutique.getPath('profilePage.mainPane').remove();
						Thecodeboutique.getPath('contactPage.mainPane').append();
						this.gotoState('Contact');
					}
			}),
			
			Contact: Ki.State.design({
				
				enterState: function() {
					console.log('Profile');
					Thecodeboutique.getPath('mainPage.mainPane').remove();
					Thecodeboutique.getPath('contactPage.mainPane').append();
					
					// Reset home page to its default state //
					Thecodeboutique.getPath('homePage.mainPane')
					Thecodeboutique.homePage.mainPane.middleView.animate('opacity',0.0,{duration:.5, timing:'ease-in-out'});
					Thecodeboutique.homePage.mainPane.middleView.animate('scale',0.001,{duration:.5, timing:'ease-in-out'});
					Thecodeboutique.homePage.mainPane.bottomView.animate('opacity',0.0,{duration:1.5, timing:'ease-in-out'});
					Thecodeboutique.homePage.mainPane.topView.animate('opacity',0.0,{duration:1.5, timing:'ease-in-out'});
					Thecodeboutique.homePage.mainPane.middleView.contentFrame.animate('width',0,{duration:.5, timing:'ease-in-out'});
        	},
					goBackToHome:function()
					{
						Thecodeboutique.getPath('contactPage.mainPane').remove();
						Thecodeboutique.getPath('homePage.mainPane').append();
						Thecodeboutique.homePage.mainPane.middleView.animate('scale',0.001,{duration:.5, timing:'ease-in-out'});
						this.gotoState('Home');
					},

					goToPortfolio:function() { 
						Thecodeboutique.getPath('contactPage.mainPane').remove();
						Thecodeboutique.getPath('profilePage.mainPane').append();
						this.gotoState('Portfolio');
					},
				
				})
    	
			})
  
  	})

	});

/* >>>>>>>>>> BEGIN source/resources/app_page.js */
// ==========================================================================
// Project:   Thecodeboutique.homePage
// Copyright: ©2011 The Code Boutique
// Engineered by: Chad Eubanks and Kyle Carriedo
// ==========================================================================
/*globals Thecodeboutique */

Thecodeboutique.appPage = SC.Page.design({

  mainPane: SC.MainPane.design({
    childViews: 'thecodeboutique endFrame hacktimeFrame comunityFrame tutorialFrame animationFrame gameFrame'.w(),
		defaultResponder: Thecodeboutique.statechart,
		
		thecodeboutique:SC.ImageView.design({
		 layout: { centerX: 0, centerY:0, height:163, width: 534 },
		 useImageQueue: NO, 
		 value: '/static/endeavourlight/en/49c10eaa51cc70c03d2b8e56fc4854947d33ba67/resources/images/thecodeboutique.png',
		}),
		
		endFrame:SC.View.design({
			layout:{top:0,bottom:0,right:0,left:0},
    	childViews:'endDescription endImage'.w(),

			endImage:SC.ImageView.design({
		 		layout: { centerX: 0, top:35, height:87, width: 671 },
		 		useImageQueue: NO, 
		 		value: '/static/endeavourlight/en/49c10eaa51cc70c03d2b8e56fc4854947d33ba67/resources/images/endeavourBannerLRG.png',
				}),
		
			endDescription:SC.LabelView.design({
				classNames: ['app-content-text'],
		 		layout: { top:130, height:300, centerX:0, width: 750 },
	   		escapeHTML: NO,
		 		isTextSelectable: YES,
		 		value:'&nbsp &nbsp Endeavour-os ("Endeavour"),  is a testament to the state of the web.  It is an application that advances the internet and changes how we as humans perceive it as a tool.  One thing is for sure... endeavour it is not another social network.<br></br><br></br>Endeavour empowers users to build a web presence that is unique to their individual personalities and provides the necessary tools for a users creative business to develop, expand, and flourish in the global market.<br></br><br></br>Endeavour is built with one goal in mind:  revolutionize the web by engineering software that transcends between a users digital life as well as their physical life.'
			})
			}),
					
		hacktimeFrame:SC.View.design({
			layout:{top:0,bottom:0,right:0,left:0},
    	childViews:'hacktimeDescription hacktimeImage'.w(),

			hacktimeImage:SC.ImageView.design({
				layout: { centerX: 0, top:30, height:109, width: 663 },
				useImageQueue: NO, 
				value: '/static/endeavourlight/en/49c10eaa51cc70c03d2b8e56fc4854947d33ba67/resources/images/hacktimeBannerLRG.png',
				}),
		
			hacktimeDescription:SC.LabelView.design({
				classNames: ['app-content-text'],
				layout: { top:150, height:300, centerX:0, width: 750 },
	    	escapeHTML: NO,
				isTextSelectable: YES,
				value:'&nbsp &nbsp HackTime was built in 10 hours during a Hackathon in San Diego Ca.  Hackathon was hosted by San Diego start up Open Candy.  The event housed 50 engineers in a warehouse for  24 hours of hacking.  The challenge was for each team to create an application using any platform of choice within the allotted 24 hours.<br></br><br></br>HackTime is a concept application that is part of a whole.  Using the FaceTime protocol, The Code Boutique further blurred the lines between web and native experience by providing a web solution to launch FaceTime on both a desktop mac or iOS device.<br></br><br></br>Due to the nature of SproutCore: build cloud applications that are integrated with native applications, we felt this application complimented our choice of technology quite well.'
			})
		}),
		
		comunityFrame:SC.View.design({
			layout:{top:0,bottom:0,right:0,left:0},
    	childViews:'comunityDescription comunityImage'.w(),

			comunityImage:SC.ImageView.design({
				layout: { centerX: 0, top:30, height:132, width: 668 },
				useImageQueue: NO, 
				value: '/static/endeavourlight/en/49c10eaa51cc70c03d2b8e56fc4854947d33ba67/resources/images/communityBannerLRG.png',
			}),
		
			comunityDescription:SC.LabelView.design({
				classNames: ['app-content-text'],
				layout: { top:170, height:300, centerX:0, width: 750 },
	    	escapeHTML: NO,
				isTextSelectable: YES,
				value:'&nbsp &nbsp SC Community is an application designed for SproutCore engineers to post developer profiles, company or team profiles, and allow them to reach out to other community members.  Within sc community recruiters will be able to find a developers profile or team profile to hire.  Developers and Teams will be able to express tips on SproutCore, and community members will be able to post press-releases on new product launches.<br></br><br></br>SC Community app is engineered with hopes to encourage community camaraderie and to build a place for community members to network with each other.'
			})
		}),
		
		tutorialFrame:SC.View.design({
	 		layout:{top:0,bottom:0,right:0,left:0},
   		childViews:'tutorialDescription tutorialImage'.w(),

			tutorialImage:SC.ImageView.design({
				layout: { centerX: 0, top:40, height:121, width: 657 },
				useImageQueue: NO, 
				value: '/static/endeavourlight/en/49c10eaa51cc70c03d2b8e56fc4854947d33ba67/resources/images/sproutcoreTutorialsBannerLRG.png',
			}),
	
			tutorialDescription:SC.LabelView.design({
				classNames: ['app-content-text'],
				layout: { top:170, height:300, centerX:0, width: 750 },
	  		escapeHTML: NO,
				isTextSelectable: YES,
				value:'&nbsp &nbsp To our knowledge, SproutCore Tutorials was the first public initiative to rewrite sproutcores documentation.  Initially we demoed another version of this app during a sproutcore meeting within Apple Corporate.  At that time, the theme was much different then what we released and had a more ‘traditional desktop’ feel to it.  We rewrote the app from scratched, created a new theme and released a desktop and tablet version.<br></br><br></br>SproutCore tutorials was our first publicly released app.  We hope to revisit this application and bundle it into our live cloud training program.'
			})
		}),
	
		animationFrame:SC.View.design({
			layout:{top:0,bottom:0,right:0,left:0},
    	childViews:'animationDescription animationImage'.w(),

			animationImage:SC.ImageView.design({
				layout: { centerX: 0, top:35, height:140, width: 676 },
				useImageQueue: NO, 
				value: '/static/endeavourlight/en/49c10eaa51cc70c03d2b8e56fc4854947d33ba67/resources/images/animationBannerLRG.png',
			}),
		
			animationDescription:SC.LabelView.design({
				classNames: ['app-content-text'],
	 			layout: { top:180, height:300, centerX:0, width: 750 },
     		escapeHTML: NO,
				isTextSelectable: YES,
				value:'&nbsp &nbsp The Code Boutique is happy to help the sproutcore community by providing guides for the animation layer of 1.5.   Not only did we provide well documented guides but we also created a sample app the showcases multiple animations.'
			})
		}),
	
		gameFrame:SC.View.design({
			layout:{top:0,bottom:0,right:0,left:0},
    	childViews:'gameDescription gameImage'.w(),

			gameImage:SC.ImageView.design({
				layout: { centerX: 0, top:30, height:103, width: 652 },
				useImageQueue: NO, 
				value: '/static/endeavourlight/en/49c10eaa51cc70c03d2b8e56fc4854947d33ba67/resources/images/gameBannerLRG.png',
			}),
	
			gameDescription:SC.LabelView.design({
				classNames: ['app-content-text'],
				layout: { top:170, height:300, centerX:0, width: 750 },
    		escapeHTML: NO,
				isTextSelectable: YES,
				value:'&nbsp &nbsp During a trip from San Diego to San Francisco, The Code Boutique decided to express an alternate side of not only themselves but of sproutcore.  Within a 12 hour ride on a train, The Code Boutique whipped up a fun little game for safari based desktops and iPad.<br></br><br></br>The theme is in the vein of classic nintendo styled games and brought back many fun childhood memories.  Best of all, The Code Boutique showcased the power of html5 offline audio, multi touch capabilities and animations within a simple game.'
			})
		
		}),
	
	})

});
/* >>>>>>>>>> BEGIN source/resources/contact_page.js */
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
			childViews:'logo homeButton portfolioButton contactButton'.w(),
    	
			logo:SC.ImageView.design({
		 		layout: { left:20,top:20, height:100, width: 100 },
		 		useImageQueue: NO, 
		 		value: '/static/endeavourlight/en/49c10eaa51cc70c03d2b8e56fc4854947d33ba67/resources/images/globe.png',
			}),
			
			homeButton:SC.ButtonView.design({
			 layout: { top:40, height: 40, left: 150, width: 106 },
			 title:  "Home",
			 target: "Thecodeboutique.statechart",
			 action: "goBackToHome",
			}),
			
			portfolioButton:SC.ButtonView.design({
				layout: { top:40, height: 40, left: 288, width: 106 },
			 	title:  "Portfolio",
			  target: "Thecodeboutique.statechart",
			  action: "goToPortfolio",
			 }),
			 
			contactButton:SC.ButtonView.design({
				layout: { top:40, height: 40, left: 426, width: 106 },
				title:  "Contact",
			 	//target: "Thecodeboutique.statechart",
			 	//action: "goToContact",
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
/* >>>>>>>>>> BEGIN source/resources/contribution_page.js */
Thecodeboutique.contributionPage = SC.Page.design({

  // The main pane is made visible on screen as soon as your app is loaded.
  // Add childViews to this pane for views to display immediately on page 
  // load.
  mainPane: SC.MainPane.design({
		classNames:['base-view'],
    childViews: 'selectionView topView bottomBar'.w(),

		defaultResponder: Thecodeboutique.statechart,
		
		topView: SC.View.design({
					  layout: { top: 0, left: 0, right: 0, height: 125 },  
					  childViews:'logo homeButton contributionButton contactButton'.w(),

						logo:SC.ImageView.design({
									layout: { left:20,top:20, height:100, width: 100 },
									useImageQueue: NO, 
									value: '/static/endeavourlight/en/49c10eaa51cc70c03d2b8e56fc4854947d33ba67/resources/images/globe.png',
						    	}),
						homeButton:SC.ButtonView.design({
								  layout: { top:40, height: 40, left: 150, width: 106 },
								  title:  "Home",
									target: "Thecodeboutique.statechart",
									action: "goBackToHome",
								  }),
						contributionButton:SC.ButtonView.design({
						     layout: { top:40, height: 40, left: 288, width: 106 },
								  title:  "Portfolio",
									target: "Thecodeboutique.statechart",
									action: "goToContribution",
						    	}),
						 contactButton:SC.ButtonView.design({
						 		 	layout: { top:40, height: 40, left: 426, width: 106 },
								  title:  "Contact",
						 			target: "Thecodeboutique.statechart",
						 			action: "goToContact",
									 }),
						}),//end of top toolBar..
						bottomBar: SC.ToolbarView.design({
									  layout: { bottom: 0, left: 0, right: 0, height: 45 },  
									  //childViews:' '.w(),
										}),
	
		  	selectionView: SC.SplitView.design({	
		    	layout: { left: 0, top: 125, right: 0, bottom: 32 },
		      layoutDirection: SC.LAYOUT_HORIZONTAL,
		      autoresizeBehavior: SC.RESIZE_BOTTOM_RIGHT,
		      defaultThickness: 0.8,

		     topLeftView: SC.View.design({
		     	layout: { top: 45, bottom: 32, width: 200 },
		      childViews: 'appView'.w(),

		appView: SC.ScrollView.design({
			    hasHorizontalScroller: NO,
			    layout: { top: 0, bottom: 0, left: 0, right:0},
			    //Here is the original list view, which is bound to the tasksController

		contentView: SC.ListView.design({
			    	contentValueKey: "name",
						contentBinding: "Thecodeboutique.appsController.arrangedObjects",
						selectionBinding: "Thecodeboutique.appsController.selection",
			      rowHeight: 50,
						rowSpacing: 2,
						exampleView:Thecodeboutique.appList,
						contentIconKey: "appImage",
						hasContentIcon:  YES,
            escapeHTML: NO,	
			    })
			   })//end of scroll view
		     }),//end of top left view

		//This is use so that no matter what that the signup image is always going to have a 400 max size
		 topLeftMaxThickness: 250,

		        //canCollapseViews: YES,
		        dividerView: SC.SplitDividerView.design({layout: {}}),

				//This is the right side of the site we can use this to keep switching out pages
		 bottomRightView:SC.ContainerView.design({
				nowShowingBinding:'Thecodeboutique.appController.nowShowing',
				layout: { centerX:0, top:0, bottom:0, centerY:0 }
			}), 
		 }),
	})	
	});
/* >>>>>>>>>> BEGIN source/resources/home_page.js */
// ==========================================================================
// Project:   Thecodeboutique.homePage
// Copyright: ©2011 The Code Boutique
// Engineered by: Chad Eubanks and Kyle Carriedo
// ==========================================================================
/*globals Thecodeboutique */

var i = 0;
var t = -1;
Thecodeboutique.homePage = SC.Page.design({

  mainPane: SC.MainPane.design({
		classNames:['base-view'],
    childViews: 'topView middleView bottomView'.w(),
		defaultResponder: Thecodeboutique.statechart,
		
		topView: SC.View.design({
			classNames:['home-topview'],
			layout:{top:0,height:160},
			backgroundColor:'transparent',
			childViews:'globe homeButton portfolioButton contactButton'.w(),
			
			globe: SC.ImageView.design({
			 layout: { left:20,top:20, height:100, width: 100 },
			 useImageQueue: NO, 
			 value: '/static/endeavourlight/en/49c10eaa51cc70c03d2b8e56fc4854947d33ba67/resources/images/globe.png',
			}),
			
			homeButton:SC.ButtonView.design({
			  layout: { top:40, height: 40, left: 150, width: 106 },
			  title:  "Home",
			}),
			
			portfolioButton:SC.ButtonView.design({
			  layout: { top:40, height: 40, left: 288, width: 106 },
			  title:  "Portfolio",
				target: "Thecodeboutique.statechart",
			  action: "goToPortfolio",
			}),
			
			contactButton:SC.ButtonView.design({
			  layout: { top:40, height: 40, left: 426, width: 106 },
			  title:  "Contact",
				target: "Thecodeboutique.statechart",
			 	action: "goToContact",
			}),
		}),
    
    middleView:SC.View.design({
			classNames:['home-middleview'],
			layout:{top:120, height:300},
			childViews:'contentFrame slideShow slideShowBack selectorFrame'.w(),
			
			slideShow: SC.ImageView.design({
				classNames:['slide-show'],
				layout: { top:5, height:272, right:10, width:400 },
				useImageQueue: NO, 
				value: '',
				imageArray:function() {
					var images = [];
					var image2 = '/static/endeavourlight/en/49c10eaa51cc70c03d2b8e56fc4854947d33ba67/resources/images/tutorials.png';
					var image4 = '/static/endeavourlight/en/49c10eaa51cc70c03d2b8e56fc4854947d33ba67/resources/images/animate.png';
					var image6 = '/static/endeavourlight/en/49c10eaa51cc70c03d2b8e56fc4854947d33ba67/resources/images/hacktime.png';
					images = [image2,image4,image6];
					this.set('value',images[i]);
					this.invokeLater(this.fadeit,3200);
					this.animate('opacity',0,{duration:3.2, timing:'ease-in-out'});
					Thecodeboutique.homePage.mainPane.middleView.slideShowBack.animate('opacity',1,{duration:3.2, timing:'ease-in-out'});
				},
				
				fadeit:function(){
					var images = [];
					var image2 = '/static/endeavourlight/en/49c10eaa51cc70c03d2b8e56fc4854947d33ba67/resources/images/tutorials.png';
					var image4 = '/static/endeavourlight/en/49c10eaa51cc70c03d2b8e56fc4854947d33ba67/resources/images/animate.png';
					var image6 = '/static/endeavourlight/en/49c10eaa51cc70c03d2b8e56fc4854947d33ba67/resources/images/hacktime.png';
					images = [image2,image4,image6];
					if(i<2){
						i++;
						this.set('value',images[i]);
						this.imageArray();
					}else{
						i=0;
						this.imageArray();
					};
				}
			}),
			
			slideShowBack: SC.ImageView.design({
				classNames:['slide-show'],
				layout: { top:5, height:272, right:10, width:400 },
				useImageQueue: NO, 
				value: '',
				imageArray:function(){
					var images = [];
					var image1 = '/static/endeavourlight/en/49c10eaa51cc70c03d2b8e56fc4854947d33ba67/resources/images/comunity.png';
					var image3 = '/static/endeavourlight/en/49c10eaa51cc70c03d2b8e56fc4854947d33ba67/resources/images/end.png';
					var image5 = '/static/endeavourlight/en/49c10eaa51cc70c03d2b8e56fc4854947d33ba67/resources/images/Game.png';
					images = [image1,image3,image5];
					this.set('value',images[i]);
					this.invokeLater(this.fadeit,3200);
					this.animate('opacity',0,{duration:3.2, timing:'ease-in-out'});
					Thecodeboutique.homePage.mainPane.middleView.slideShow.animate('opacity',1,{duration:3.2, timing:'ease-in-out'});				
				},
					
					fadeit:function(){
						if(t<=4){
							t++;
						}else{
							t =0;
						};
						var active = '/static/endeavourlight/en/49c10eaa51cc70c03d2b8e56fc4854947d33ba67/resources/images/slideshowActive.png';
						var inactive = '/static/endeavourlight/en/49c10eaa51cc70c03d2b8e56fc4854947d33ba67/resources/images/slideshowNotActive.png';
						if(t === 0){
							Thecodeboutique.homePage.mainPane.middleView.selectorFrame.selector6.set('value',inactive);
							Thecodeboutique.homePage.mainPane.middleView.selectorFrame.selector1.set('value',active);
						}else if (t === 1){
							Thecodeboutique.homePage.mainPane.middleView.selectorFrame.selector1.set('value',inactive);
							Thecodeboutique.homePage.mainPane.middleView.selectorFrame.selector2.set('value',active);
						}else if (t === 2){
							Thecodeboutique.homePage.mainPane.middleView.selectorFrame.selector2.set('value',inactive);
							Thecodeboutique.homePage.mainPane.middleView.selectorFrame.selector3.set('value',active);
						}else if (t === 3){
							Thecodeboutique.homePage.mainPane.middleView.selectorFrame.selector3.set('value',inactive);
							Thecodeboutique.homePage.mainPane.middleView.selectorFrame.selector4.set('value',active);
						}else if (t === 4){
							Thecodeboutique.homePage.mainPane.middleView.selectorFrame.selector4.set('value',inactive);
							Thecodeboutique.homePage.mainPane.middleView.selectorFrame.selector5.set('value',active);
						}else if (t === 5){
							Thecodeboutique.homePage.mainPane.middleView.selectorFrame.selector5.set('value',inactive);
							Thecodeboutique.homePage.mainPane.middleView.selectorFrame.selector6.set('value',active);
						}
						var images = [];
						var image1 = '/static/endeavourlight/en/49c10eaa51cc70c03d2b8e56fc4854947d33ba67/resources/images/comunity.png';
						var image3 = '/static/endeavourlight/en/49c10eaa51cc70c03d2b8e56fc4854947d33ba67/resources/images/end.png';
						var image5 = '/static/endeavourlight/en/49c10eaa51cc70c03d2b8e56fc4854947d33ba67/resources/images/Game.png';
						images = [image1,image3,image5];
						if(i<2){
							i++;
							this.set('value',images[i]);
							this.imageArray();
						}else{
							i=0;
							this.imageArray();
						};
					}
					
				 }),
				 
				 selectorFrame:SC.View.design({
			    layout:{height:100,width:330,bottom:0,right:0},
			    childViews:'selector1 selector2 selector3 selector4 selector5 selector6'.w(),
					
					selector1:SC.ImageView.design({
						layout: { bottom:5, right:240, height:15, width:15 },
						useImageQueue: NO, 
						value: '/static/endeavourlight/en/49c10eaa51cc70c03d2b8e56fc4854947d33ba67/resources/images/slideshowNotActive.png',
					}),
					
					selector2:SC.ImageView.design({
						layout: { bottom:5, right:220, height:15, width:15 },
						useImageQueue: NO, 
						value: '/static/endeavourlight/en/49c10eaa51cc70c03d2b8e56fc4854947d33ba67/resources/images/slideshowNotActive.png',
					}),
					
					selector3:SC.ImageView.design({
						layout: { bottom:5, right:200, height:15, width:15 },
						useImageQueue: NO, 
						value: '/static/endeavourlight/en/49c10eaa51cc70c03d2b8e56fc4854947d33ba67/resources/images/slideshowNotActive.png',
					}),
					
					selector4:SC.ImageView.design({
						layout: { bottom:5, right:180, height:15, width:15 },
						useImageQueue: NO, 
						value: '/static/endeavourlight/en/49c10eaa51cc70c03d2b8e56fc4854947d33ba67/resources/images/slideshowNotActive.png',
					}),
					
					selector5:SC.ImageView.design({
						layout: { bottom:5, right:160, height:15, width:15 },
						useImageQueue: NO, 
						value: '/static/endeavourlight/en/49c10eaa51cc70c03d2b8e56fc4854947d33ba67/resources/images/slideshowNotActive.png',
					}),
					
					selector6:SC.ImageView.design({
						layout: { bottom:5, right:140, height:15, width:15 },
						useImageQueue: NO, 
						value: '/static/endeavourlight/en/49c10eaa51cc70c03d2b8e56fc4854947d33ba67/resources/images/slideshowNotActive.png',
					}),
					
				}),

			contentFrame:SC.View.design({
				layout:{top:55, height:150,left:20,width:0},
				childViews:'textOne textTwo textThree'.w(),
				
				textOne:SC.LabelView.design({
					classNames: ['home-content-text-one'],
					layout: { top:0, height:70, left:10, width:300 },
					escapeHTML: NO,
					isTextSelectable: YES,
					valueBinding:'Thecodeboutique.contentController.one'
				}),
				
				textTwo:SC.LabelView.design({
					classNames: ['home-content-text-two'],
					layout: { top:19, height:50, left:235, width:445 },
					escapeHTML: NO,
					isTextSelectable: YES,
					valueBinding:'Thecodeboutique.contentController.two'
				}),
				
				textThree:SC.LabelView.design({
					classNames: ['home-content-text-three'],
					layout: { top:62, height:130, left:10, width:645 },
					escapeHTML: NO,
					isTextSelectable: YES,
					valueBinding:'Thecodeboutique.contentController.three'
				}),
						
			}),
			
		}), 
			
		bottomView: SC.View.design({
			classNames:['bottom-frame'],
			layout:{top:430,height:200},
			childViews:'imageContainer bottomViewText'.w(),
			
			bottomViewText:SC.LabelView.design({
				classNames: ['home-bottomview-text'],
				layout: { top:10, height:35, left:10, width:325 },
				escapeHTML: NO,
				isTextSelectable: YES,
				valueBinding:'Thecodeboutique.contentController.bottom'
			}),
			
			imageContainer: SC.View.design({
				layout:{centerX:0, centerY:0, width: 1200, height: 200},
				childViews:'image1 image2 image3 image4'.w(),
			
				image1:SC.ImageView.design({
					layout: { left:25, top:50, height:124, width: 264 },
					useImageQueue: NO, 
					value: '/static/endeavourlight/en/49c10eaa51cc70c03d2b8e56fc4854947d33ba67/resources/images/animationBanner.png',
				}),
				
				image2:SC.ImageView.design({
					layout: { left:319, top:50, height:126, width: 265 },
					useImageQueue: NO, 
					value: '/static/endeavourlight/en/49c10eaa51cc70c03d2b8e56fc4854947d33ba67/resources/images/communityBanner.png',
				}),
				
				image3:SC.ImageView.design({
					layout: { right:319, top:50, height:126, width: 264 },
					useImageQueue: NO, 
					value: '/static/endeavourlight/en/49c10eaa51cc70c03d2b8e56fc4854947d33ba67/resources/images/cloudTrainingBanner.png',
				}),
		  	
				image4:SC.ImageView.design({
		 		 layout: { right:25, top:50, height:123, width: 265 },
		 		 useImageQueue: NO, 
		 		 value: '/static/endeavourlight/en/49c10eaa51cc70c03d2b8e56fc4854947d33ba67/resources/images/endeavourBanner.png',
		  	}),
		
			}),
			
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

  mainPane: SC.MainPane.design({
		classNames:['base-view'],
    childViews: 'globeImage tcbText slideInNav'.w(),
		defaultResponder: Thecodeboutique.statechart,
		
		globeImage: SC.ImageView.design({
			classNames:['globe-image'],
			layout: { bottom:153,right:-174, height:400, width:415 },
			useImageQueue: NO, 
		 }),
		
		tcbText: SC.LabelView.design({
		 classNames:['tcb-text'],
		 layout:{bottom:150, left:10, width:550,height:150},
		 escapeHTML: NO,
		 value:'The Code Boutique'
		}),
		
    slideInNav: SC.View.design({
			classNames:['sliding-navigation'],
			layout:{bottom:190, left:0, width:0,height:128},
			childViews:'homeButton portfolioButton contactButton'.w(),

			homeButton:SC.ButtonView.design({
				classNames: ['home-button-large'],
			  layout:{right:310,centerY:0,height:110,width:110},
		 		target: "Thecodeboutique.statechart",
				action: "goToHomePage",
			}),
			
			portfolioButton:SC.ButtonView.design({
				classNames: ['portfolio-button-large'],
			  layout:{right:160,centerY:0,height:110,width:110},
		 		target: "Thecodeboutique.statechart",
			  action: "goToPortfolio",
			}),
			
			contactButton:SC.ButtonView.design({
				classNames: ['contact-button-large'],
			  layout:{right:10,centerY:0,height:110,width:110},
		 		target: "Thecodeboutique.statechart",
			 	action: "goToContact",

			}),
			
		}), //end of slideInNav
  
	})

});

/* >>>>>>>>>> BEGIN source/resources/profile_page.js */
Thecodeboutique.profilePage = SC.Page.design({

  // The main pane is made visible on screen as soon as your app is loaded.
  // Add childViews to this pane for views to display immediately on page 
  // load.
  mainPane: SC.MainPane.design({
		classNames:['base-view'],
    childViews: 'topView topBar middleView bottomBar'.w(),
		defaultResponder: Thecodeboutique.statechart,
		
		topView: SC.View.design({
			classNames:['profile-top-base-view'],
			layout: { top: 0, left: 0, right: 0, height: 120 },  
			childViews:'logo homeButton contributionButton contactButton'.w(),
    	
			logo:SC.ImageView.design({
		 		layout: { left:20,top:20, height:100, width: 100 },
		 		useImageQueue: NO, 
		 		value: '/static/endeavourlight/en/49c10eaa51cc70c03d2b8e56fc4854947d33ba67/resources/images/globe.png',
			}),
			
			homeButton:SC.ButtonView.design({
			 layout: { top:40, height: 40, left: 150, width: 106 },
			 title:  "Home",
			 target: "Thecodeboutique.statechart",
			 action: "goBackToHome",
			}),
			
			contributionButton:SC.ButtonView.design({
				layout: { top:40, height: 40, left: 288, width: 106 },
			 	title:  "Portfolio",
			  target: "Thecodeboutique.statechart",
			  action: "goToContribution",
			 }),
			 
			contactButton:SC.ButtonView.design({
				layout: { top:40, height: 40, left: 426, width: 106 },
				title:  "Contact",
			 	target: "Thecodeboutique.statechart",
			 	action: "goToContact",
			}),
			
		}),
		
		topBar: SC.ToolbarView.design({
			classNames: ['toolbar'],
			layout: { top: 120, left: 0, right: 0, height: 37 },
		}),
		
		bottomBar: SC.ToolbarView.design({
			classNames: ['toolbar'],
			layout: { bottom: 0, left: 0, right: 0, height: 37 },
		}),
	
		middleView: SC.SplitView.design({	
	 		layout: { left: 0, top: 125, right: 0, bottom: 32 },
		  layoutDirection: SC.LAYOUT_HORIZONTAL,
		  autoresizeBehavior: SC.RESIZE_BOTTOM_RIGHT,
		  defaultThickness: 0.8,

		  topLeftView: SC.View.design({
		  	classNames: ['profile-leftView'],
				layout: { top: 205, bottom: 32, width: 200 },
		    childViews: 'appView topListView middleListView bottomListView'.w(),
		
				topListView: SC.View.design({
					classNames: ['profile-listview-top'],
					layout: { height: 18, width: 239, top: 50, left: 2 },
				}),
				
				middleListView: SC.View.design({
					classNames: ['profile-listview-middle'],
					layout: { top: 68, bottom: 45, width: 239, left: 2 },
				}),
				
				bottomListView: SC.View.design({
					classNames: ['profile-listview-bottom'],
					layout: { height: 18, width: 242, bottom: 27, left: 1 },
				}),

				appView: SC.ScrollView.design({
					classNames: ['profile-appView'],
			  	hasHorizontalScroller: NO,
			    layout: { top: 70, bottom: 0, left: 10, right: 10},
			    
					contentView: SC.ListView.design({
			  		contentValueKey: "name",
						contentBinding: "Thecodeboutique.appsController.arrangedObjects",
						selectionBinding: "Thecodeboutique.appsController.selection",
			     	rowHeight: 50,
						rowSpacing: 2,
						exampleView:Thecodeboutique.appList,
						contentIconKey: "appImage",
						hasContentIcon:  YES,
          	escapeHTML: NO,	
			  	})
			  
				})
		   
			}),//end of top left view

		//This is use so that no matter what that the signup image is always going to have a 400 max size
		 topLeftMaxThickness: 250,

		        //canCollapseViews: YES,
		        dividerView: SC.SplitDividerView.design({layout: {}}),

				//This is the right side of the site we can use this to keep switching out pages
		 bottomRightView:SC.ContainerView.design({
				nowShowingBinding:'Thecodeboutique.appController.nowShowing',
				layout: { centerX:0, top:0, bottom:0, centerY:0 }
			}), 
		 }),
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

