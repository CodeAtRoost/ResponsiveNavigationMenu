define( ["qlik", "text!./template.html",'text!./style.css'],
	function ( qlik, template,css ) {
	 $( '<style>' ).html(css).appendTo( 'head' );
		return {
			template: template,
			definition : {
			type : "items",
			component : "accordion",
			items: {
				settings: {
					uses: "settings",
					items: {
						MyList: {
							type: "array",
                            ref: "menuItems",
                            label: "Menu Items",
                            itemTitleRef: "label",
                            allowAdd: true,
                            allowRemove: true,
                            addTranslation: "Add Menu Item",
                            items: {
                                target: {
									type: "string",
									ref: "target",
									label: "Target",
									expression: "optional"
								},
								label: {
									type: "string",
									ref: "label",
									label: "Label",
									expression: "optional"
								},
								issheetid: {
								type: "boolean",
								label: "Target is a sheet id in this app",
								ref: "issheetid",
								defaultValue: false
								}
                            }
						}
					}
				}
			}
		},
			support: {
				snapshot: true,
				export: true,
				exportData: false
			},
			paint: function () {
				
				if (qlik.navigation.getMode()=="edit"){
					$(this.$element).closest(".cell").css("display", "block");
				}
				else{
				$(this.$element).closest(".cell").css("display", "none");
				}
				
				return qlik.Promise.resolve();
			},
			controller: ['$scope','$element', function ( $scope, $element ) {
				$(document).ready(function(){
				
					//if ( angular.element('.qvt-sheet').children('#myTopnav_large').length==0 ) {						
							$('.qvt-sheet').children('#myTopnav_large').remove()
							$('#myTopnav_large').prependTo($('.qvt-sheet'))
						//}		
					//if ( angular.element('.qvt-sheet').children('#myTopnav_small').length==0 ) {						
							$('qs-header').children('#myTopnav_small').remove()
							$('#myTopnav_small').appendTo($('.qs-header'))
						//}		
				});
				$scope.menuNav= function(){				
					var x = document.getElementById("myTopnav");
					  if (x.className === "cw_topnav") {
						x.className += " responsive";
					  } else {
						x.className = "cw_topnav";
					  }
				}
				$scope.navigate=function(link)
				{
					let app =  qlik.currApp();	
					if (link.issheetid)
					{
						qlik.navigation.gotoSheet(link.target)
					}
					else
					{
						window.open(link.target, '_blank')
					}
					
				}
				$scope.menuItems= $scope.layout.menuItems
				
				
			}]
		};

	} );

