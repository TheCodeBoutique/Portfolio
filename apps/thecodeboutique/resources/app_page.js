// ==========================================================================
// Project:   Thecodeboutique.homePage
// Copyright: ©2011 The Code Boutique
// Engineered by: Chad Eubanks and Kyle Carriedo
// ==========================================================================
/*globals Thecodeboutique */

Thecodeboutique.appPage = SC.Page.design({

  mainPane: SC.MainPane.design({
    childViews: 'thecodeboutique endeavourFrame hacktimeFrame comunityFrame tutorialFrame animationFrame gameFrame'.w(),
		defaultResponder: Thecodeboutique.statechart,
		
		thecodeboutique:SC.ImageView.design({
		 layout: { centerX: 0, centerY:0, height:163, width: 534 },
		 useImageQueue: NO, 
		 value: sc_static('/images/thecodeboutique.png'),
		}),
		
		endeavourFrame:SC.View.design({
			layout:{top:0,bottom:0,right:0,left:0},
    	childViews:'endeavourDescription endeavourImage endeavourReleaseLabel endeavourDateLabel'.w(),

			endeavourImage:SC.ImageView.design({
		 		layout: { centerX: 0, top:35, height:87, width: 671 },
		 		useImageQueue: NO, 
		 		value: sc_static('/images/endeavourBannerLRG.png'),
				}),
		
			endeavourDescription:SC.LabelView.design({
				classNames: ['app-content-text'],
		 		layout: { top:130, height:300, centerX:0, width: 750 },
	   		escapeHTML: NO,
		 		isTextSelectable: YES,
		 		value:'&nbsp &nbsp Endeavour-os ("Endeavour"),  is a testament to the state of the web.  It is an application that advances the internet and changes how we as humans perceive it as a tool.  One thing is for sure... endeavour it is not another social network.<br></br><br></br>Endeavour empowers users to build a web presence that is unique to their individual personalities and provides the necessary tools for a users creative business to develop, expand, and flourish in the global market.<br></br><br></br>Endeavour is built with one goal in mind:  revolutionize the web by engineering software that transcends between a users digital life as well as their physical life.'
			}),
			
			endeavourReleaseLabel:SC.LabelView.design({
				classNames: ['app-content-text'],
		 		layout: { top:430, height:300, centerX:-270, width: 200 },
	   		escapeHTML: NO,
		 		isTextSelectable: YES,
		 		value:'Release Date'
			}),
			
			endeavourDateLabel:SC.LabelView.design({
				classNames: ['app-content-text'],
		 		layout: { top:450, height:300, centerX:-260, width: 200 },
	   		escapeHTML: NO,
		 		isTextSelectable: YES,
		 		value:'Late 2011'
			})
			
			}),
					
		hacktimeFrame:SC.View.design({
			layout:{top:0,bottom:0,right:0,left:0},
    	childViews:'hacktimeDescription hacktimeImage hacktimeWebsiteLabel hacktimeURLLabel'.w(),

			hacktimeImage:SC.ImageView.design({
				layout: { centerX: 0, top: 30, height: 90, width: 547 },
				useImageQueue: NO, 
				value: sc_static('/images/hacktimeBannerLRG.png'),
				}),
		
			hacktimeDescription:SC.LabelView.design({
				classNames: ['app-content-text'],
				layout: { top:130, height:300, centerX:0, width: 750 },
	    	escapeHTML: NO,
				isTextSelectable: YES,
				value:'&nbsp &nbsp HackTime was built in 10 hours during a Hackathon in San Diego Ca.  Hackathon was hosted by San Diego start up Open Candy.  The event housed 50 engineers in a warehouse for  24 hours of hacking.  The challenge was for each team to create an application using any platform of choice within the allotted 24 hours.<br></br><br></br>HackTime is a concept application that is part of a whole.  Using the FaceTime protocol, The Code Boutique further blurred the lines between web and native experience by providing a web solution to launch FaceTime on both a desktop mac or iOS device.<br></br><br></br>Due to the nature of SproutCore: build cloud applications that are integrated with native applications, we felt this application complimented our choice of technology quite well.'
			}),
			
			hacktimeWebsiteLabel:SC.LabelView.design({
				classNames: ['app-content-text'],
		 		layout: { top:430, height:300, centerX:-270, width: 200 },
	   		escapeHTML: NO,
		 		isTextSelectable: YES,
		 		value:'Website URL'
			}),
			
			hacktimeURLLabel:SC.LabelView.design({
				classNames: ['app-content-text'],
		 		layout: { top:450, height:300, centerX:-260, width: 200 },
	   		escapeHTML: NO,
		 		isTextSelectable: YES,
		 		value:'hacktime.heroku.com'
			})
			
		}),
		
		comunityFrame:SC.View.design({
			layout:{top:0,bottom:0,right:0,left:0},
    	childViews:'comunityDescription comunityImage communityReleaseLabel communityDateLabel communityWebsiteLabel communityURLLabel demoButton'.w(),

			comunityImage:SC.ImageView.design({
				layout: { centerX: 0, top:30, height:132, width: 668 },
				useImageQueue: NO, 
				value: sc_static('/images/communityBannerLRG.png'),
			}),
		
			comunityDescription:SC.LabelView.design({
				classNames: ['app-content-text'],
				layout: { top:170, height:300, centerX:0, width: 750 },
	    	escapeHTML: NO,
				isTextSelectable: YES,
				value:'&nbsp &nbsp SC Community is an application designed for SproutCore engineers to post developer profiles, company or team profiles, and allow them to reach out to other community members.  Within sc community recruiters will be able to find a developers profile or team profile to hire.  Developers and Teams will be able to express tips on SproutCore, and community members will be able to post press-releases on new product launches.<br></br><br></br>SC Community app is engineered with hopes to encourage community camaraderie and to build a place for community members to network with each other.'
			}),
					
		communityReleaseLabel:SC.LabelView.design({
			classNames: ['app-content-text'],
	 		layout: { top:430, height:300, centerX:-270, width: 200 },
   		escapeHTML: NO,
	 		isTextSelectable: YES,
	 		value:'Release Date'
		}),
		
		communityDateLabel:SC.LabelView.design({
			classNames: ['app-content-text'],
	 		layout: { top:450, height:300, centerX:-260, width: 200 },
   		escapeHTML: NO,
	 		isTextSelectable: YES,
	 		value:'Mid 2011'
		}),
		
		communityWebsiteLabel:SC.LabelView.design({
			classNames: ['app-content-text'],
	 		layout: { top:430, height:300, centerX:-100, width: 200 },
   		escapeHTML: NO,
	 		isTextSelectable: YES,
	 		value:'Website URL'
		}),
		
		communityURLLabel:SC.LabelView.design({
			classNames: ['app-content-text'],
	 		layout: { top:450, height:300, centerX:-60, width: 250 },
   		escapeHTML: NO,
	 		isTextSelectable: YES,
	 		value:'communityalpha.heroku.com'
		}),
		
		demoButton:SC.ButtonView.design({
		 layout: { top:430, height: 40, centerX: 250, width: 106 },
		 title:  "Demo",
		 target: "Thecodeboutique.statechart",
		 action: "goToCommunityDemo",
		}),
		
	}),
		
		tutorialFrame:SC.View.design({
	 		layout:{top:0,bottom:0,right:0,left:0},
   		childViews:'tutorialDescription tutorialImage tutorialReleaseLabel tutorialDateLabel demoButton'.w(),

			tutorialImage:SC.ImageView.design({
				layout: { centerX: 0, top:40, height:121, width: 657 },
				useImageQueue: NO, 
				value: sc_static('/images/sproutcoreTutorialsBannerLRG.png'),
			}),
	
			tutorialDescription:SC.LabelView.design({
				classNames: ['app-content-text'],
				layout: { top:170, height:300, centerX:0, width: 750 },
	  		escapeHTML: NO,
				isTextSelectable: YES,
				value:'&nbsp &nbsp To our knowledge, SproutCore Tutorials was the first public initiative to rewrite sproutcores documentation.  Initially we demoed another version of this app during a sproutcore meeting within Apple Corporate.  At that time, the theme was much different then what we released and had a more ‘traditional desktop’ feel to it.  We rewrote the app from scratched, created a new theme and released a desktop and tablet version.<br></br><br></br>SproutCore tutorials was our first publicly released app.  We hope to revisit this application and bundle it into our live cloud training program.'
			}),
			
			tutorialReleaseLabel:SC.LabelView.design({
				classNames: ['app-content-text'],
		 		layout: { top:430, height:300, centerX:-270, width: 200 },
	   		escapeHTML: NO,
		 		isTextSelectable: YES,
		 		value:'Release Date'
			}),

			tutorialDateLabel:SC.LabelView.design({
				classNames: ['app-content-text'],
		 		layout: { top:450, height:300, centerX:-260, width: 200 },
	   		escapeHTML: NO,
		 		isTextSelectable: YES,
		 		value:'Currently Unavailable...'
			}),
			
			demoButton:SC.ButtonView.design({
			 layout: { top:430, height: 40, centerX: 250, width: 106 },
			 title:  "Demo",
			 target: "Thecodeboutique.statechart",
			 action: "",
			}),
			
		}),
	
		animationFrame:SC.View.design({
			layout:{top:0,bottom:0,right:0,left:0},
    	childViews:'animationDescription animationImage animationWebsiteLabel animationURLLabel'.w(),

			animationImage:SC.ImageView.design({
				layout: { centerX: 0, top:35, height:140, width: 676 },
				useImageQueue: NO, 
				value: sc_static('/images/animationBannerLRG.png'),
			}),
		
			animationDescription:SC.LabelView.design({
				classNames: ['app-content-text'],
	 			layout: { top:180, height:300, centerX:0, width: 750 },
     		escapeHTML: NO,
				isTextSelectable: YES,
				value:'&nbsp &nbsp The Code Boutique is happy to help the sproutcore community by providing guides for the animation layer of 1.5.   Not only did we provide well documented guides but we also created a sample app the showcases multiple animations.'
			}),
			
			animationWebsiteLabel:SC.LabelView.design({
				classNames: ['app-content-text'],
		 		layout: { top:430, height:300, centerX:-270, width: 200 },
	   		escapeHTML: NO,
		 		isTextSelectable: YES,
		 		value:'Website URL'
			}),

			animationURLLabel:SC.LabelView.design({
				classNames: ['app-content-text'],
		 		layout: { top:450, height:300, centerX:-100, width: 500 },
	   		escapeHTML: NO,
		 		isTextSelectable: YES,
		 		value:'guides.sproutcore.com / animate.strobeapp.com'
			}),
		}),
	
		gameFrame:SC.View.design({
			layout:{top:0,bottom:0,right:0,left:0},
    	childViews:'gameDescription gameImage gameWebsiteLabel gameURLLabel'.w(),

			gameImage:SC.ImageView.design({
				layout: { centerX: 0, top:30, height:103, width: 652 },
				useImageQueue: NO, 
				value: sc_static('/images/gameBannerLRG.png'),
			}),
	
			gameDescription:SC.LabelView.design({
				classNames: ['app-content-text'],
				layout: { top:170, height:300, centerX:0, width: 750 },
    		escapeHTML: NO,
				isTextSelectable: YES,
				value:'&nbsp &nbsp During a trip from San Diego to San Francisco, The Code Boutique decided to express an alternate side of not only themselves but of sproutcore.  Within a 12 hour ride on a train, The Code Boutique whipped up a fun little game for safari based desktops and iPad.<br></br><br></br>The theme is in the vein of classic nintendo styled games and brought back many fun childhood memories.  Best of all, The Code Boutique showcased the power of html5 offline audio, multi touch capabilities and animations within a simple game.'
			}),
			
			gameWebsiteLabel:SC.LabelView.design({
				classNames: ['app-content-text'],
		 		layout: { top:430, height:150, centerX:-270, width: 200 },
	   		escapeHTML: NO,
		 		isTextSelectable: YES,
		 		value:'Website URL'
			}),

			gameURLLabel:SC.LabelView.design({
				classNames: ['app-content-text'],
		 		layout: { top:450, height:150, centerX:-100, width: 500 },
	   		escapeHTML: NO,
		 		isTextSelectable: YES,
		 		value:'tcb-game.strobeapp.com'
			}),
		
		}),
	
	})

});