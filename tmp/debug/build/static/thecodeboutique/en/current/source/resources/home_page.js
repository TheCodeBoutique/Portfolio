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
			 value: '/static/endeavourlight/en/current/resources/images/globe.png?1299484324',
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
					var image2 = '/static/endeavourlight/en/current/resources/images/tutorials.png?1299484324';
					var image4 = '/static/endeavourlight/en/current/resources/images/animate.png?1299484324';
					var image6 = '/static/endeavourlight/en/current/resources/images/hacktime.png?1299484324';
					images = [image2,image4,image6];
					this.set('value',images[i]);
					this.invokeLater(this.fadeit,3200);
					this.animate('opacity',0,{duration:3.2, timing:'ease-in-out'});
					Thecodeboutique.homePage.mainPane.middleView.slideShowBack.animate('opacity',1,{duration:3.2, timing:'ease-in-out'});
				},
				
				fadeit:function(){
					var images = [];
					var image2 = '/static/endeavourlight/en/current/resources/images/tutorials.png?1299484324';
					var image4 = '/static/endeavourlight/en/current/resources/images/animate.png?1299484324';
					var image6 = '/static/endeavourlight/en/current/resources/images/hacktime.png?1299484324';
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
					var image1 = '/static/endeavourlight/en/current/resources/images/comunity.png?1299484324';
					var image3 = '/static/endeavourlight/en/current/resources/images/end.png?1299484324';
					var image5 = '/static/endeavourlight/en/current/resources/images/Game.png?1299484324';
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
						var active = '/static/endeavourlight/en/current/resources/images/slideshowActive.png?1299484324';
						var inactive = '/static/endeavourlight/en/current/resources/images/slideshowNotActive.png?1299484324';
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
						var image1 = '/static/endeavourlight/en/current/resources/images/comunity.png?1299484324';
						var image3 = '/static/endeavourlight/en/current/resources/images/end.png?1299484324';
						var image5 = '/static/endeavourlight/en/current/resources/images/Game.png?1299484324';
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
						value: '/static/endeavourlight/en/current/resources/images/slideshowNotActive.png?1299484324',
					}),
					
					selector2:SC.ImageView.design({
						layout: { bottom:5, right:220, height:15, width:15 },
						useImageQueue: NO, 
						value: '/static/endeavourlight/en/current/resources/images/slideshowNotActive.png?1299484324',
					}),
					
					selector3:SC.ImageView.design({
						layout: { bottom:5, right:200, height:15, width:15 },
						useImageQueue: NO, 
						value: '/static/endeavourlight/en/current/resources/images/slideshowNotActive.png?1299484324',
					}),
					
					selector4:SC.ImageView.design({
						layout: { bottom:5, right:180, height:15, width:15 },
						useImageQueue: NO, 
						value: '/static/endeavourlight/en/current/resources/images/slideshowNotActive.png?1299484324',
					}),
					
					selector5:SC.ImageView.design({
						layout: { bottom:5, right:160, height:15, width:15 },
						useImageQueue: NO, 
						value: '/static/endeavourlight/en/current/resources/images/slideshowNotActive.png?1299484324',
					}),
					
					selector6:SC.ImageView.design({
						layout: { bottom:5, right:140, height:15, width:15 },
						useImageQueue: NO, 
						value: '/static/endeavourlight/en/current/resources/images/slideshowNotActive.png?1299484324',
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
					value: '/static/endeavourlight/en/current/resources/images/animationBanner.png?1299484324',
				}),
				
				image2:SC.ImageView.design({
					layout: { left:319, top:50, height:126, width: 265 },
					useImageQueue: NO, 
					value: '/static/endeavourlight/en/current/resources/images/communityBanner.png?1299484324',
				}),
				
				image3:SC.ImageView.design({
					layout: { right:319, top:50, height:126, width: 264 },
					useImageQueue: NO, 
					value: '/static/endeavourlight/en/current/resources/images/cloudTrainingBanner.png?1299484324',
				}),
		  	
				image4:SC.ImageView.design({
		 		 layout: { right:25, top:50, height:123, width: 265 },
		 		 useImageQueue: NO, 
		 		 value: '/static/endeavourlight/en/current/resources/images/endeavourBanner.png?1299484324',
		  	}),
		
			}),
			
		})
  
	})

});
; if ((typeof SC !== 'undefined') && SC && SC.Module && SC.Module.scriptDidLoad) SC.Module.scriptDidLoad('thecodeboutique');