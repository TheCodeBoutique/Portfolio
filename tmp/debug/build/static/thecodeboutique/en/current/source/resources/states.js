SC.mixin(Thecodeboutique, {
  statechart: Ki.Statechart.create({
    rootState: Ki.State.design({
      initialSubstate: 'FirstView',
      FirstView: Ki.State.design({

        enterState: function() {
					// State description: gets mainPage.mainPane, delays the animated navigation bar, sets the tcb text to 0, sets the navigation buttons reversed //
  				console.log('enterState: mainPage.mainPane w/ animated navigation');
					Thecodeboutique.getPath('mainPage.mainPane').append();
					Thecodeboutique.mainPage.mainPane.slideInNav.homeButton.animate('rotateY',180,{duration:1.0, timing:'ease-in-out'});
					Thecodeboutique.mainPage.mainPane.slideInNav.portfolioButton.animate('rotateY',180,{duration:1.2, timing:'ease-in-out'});
					Thecodeboutique.mainPage.mainPane.slideInNav.contactButton.animate('rotateY',180,{duration:1.4, timing:'ease-in-out'});
					Thecodeboutique.mainPage.mainPane.tcbText.animate('opacity',0.0,{duration:1, timing:'ease-in-out'});
					// sets the profilePage.mainPane, sets the content in the controller apps, starts the imageArray //
					console.log('enterStatePreLoad: homePage.mainPane w/ slideShow array and the controller apps');
					Thecodeboutique.getPath('homePage.mainPane');
					Thecodeboutique.homePage.mainPane.middleView.slideShow.imageArray();
					Thecodeboutique.homePage.mainPane.middleView.slideShowBack.imageArray();
					Thecodeboutique.appsController.set('content', Thecodeboutique.apps);
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

				loadData:function() {
					sc_require('models/visitor');
					Thecodeboutique.VISITOR_QUERY = SC.Query.local(Thecodeboutique.Visitor);
				},
				
				scaleIn:function() {
					Thecodeboutique.homePage.mainPane.middleView.animate('scale',1.3, 
						{duration:.5, timing:'ease-in-out'}, 
						this.invokeLater(this.backDown,500));
				},
					
				backDown:function() {
					Thecodeboutique.homePage.mainPane.middleView.contentFrame.animate('width',650,
						{duration:.5, timing:'ease-in-out'});
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
					
					// goes back to home page //
					goBackToHome:function()
					{
						Thecodeboutique.getPath('profilePage.mainPane').remove();
						Thecodeboutique.getPath('homePage.mainPane').append();
						Thecodeboutique.homePage.mainPane.middleView.animate('scale',0.001,{duration:.5, timing:'ease-in-out'});
						this.gotoState('Home');
					},
					
					// goes to contact page //
					goToContact:function() {
						Thecodeboutique.getPath('profilePage.mainPane').remove();
						Thecodeboutique.getPath('contactPage.mainPane').append();
						this.gotoState('Contact');
					},
					
					//  goes to community demo page //
					goToCommunityDemo:function() {
						console.log('Community App Description Page Fade Out');
						Thecodeboutique.getPath('appPage.mainPane').remove();
						//Thecodeboutique.getPath('contactPage.mainPane').append();
						this.gotoState('CommunityDemo');						
					}
					
			}),

// end of the portfolio view //
// start of the community demo page //
		CommunityDemo: Ki.State.design({
			
			// State description: gets communityDemoPage.mainPane, fades profilePage.mainPage.middleView out, delays the community demo page //
			enterState: function() {
				console.log('enterState: set communityDemoPage.mainPane, fade profilePage.mainPane.middleView out');
				Thecodeboutique.getPath('communityDemoPage.mainPane').append();
				Thecodeboutique.profilePage.mainPane.middleView.animate('opacity',0.0,{duration:1.5, timing:'ease-in-out'},this.invokeLater(this.buttonOut,1600));
				this.invokeLater(this.fadeCommunityDemoIn,1500);
			},
			
			// fades the communityDemoPage.mainPane in //
			fadeCommunityDemoIn: function() {
				console.log('     fade community demo page in');
				Thecodeboutique.communityDemoPage.mainPane.animate('opacity',1.0,{duration:1.5, timing:'ease-in-out'});
				//this.invokeLater(this.goBackToPortfolio,1500);
			},
			// goes back to portfolio page //
			goBackToPortfolio: function(){
				console.log('      fade portfolio back in');
				this.gotoState('PortfolioBack');
			}
			
		}),
		
		PortfolioBack: Ki.State.design({
			enterState: function() {
				console.log('Porfolio Back');
				Thecodeboutique.getPath('communityDemoPage.mainPane').remove();
				Thecodeboutique.getPath('profilePage.mainPane').append();
				Thecodeboutique.profilePage.mainPane.middleView.animate('opacity',1.0,{duration:1.5, timing:'ease-in-out'});
      }
		}),


// start of the contact view //
			
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
; if ((typeof SC !== 'undefined') && SC && SC.Module && SC.Module.scriptDidLoad) SC.Module.scriptDidLoad('thecodeboutique');