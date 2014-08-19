/*
 * app data
 */
app = {
	scenes: { 
		scene_menu: {
			type: 'scene',
			nodes: [ {
				name: 'matrix_menu',
				type: 'matrix',
				column: 1,
				height: 0.9,
				alignment_v: lc.alignment.v.top,
				nodes: [ {
					name: 'button_menu_auto',
					type: 'button',
					text: 'Auto Demo',
					color_text: lc.color.white,
					color_bg: lc.color.metro.blue.dark,
					action_release: function(type) {
						/*
						var scene = cc.Scene.extend({
							onEnter:function () {
								this._super();
								var layer = new TableViewTestLayer();
								layer.init();
								this.addChild(layer);
							}
						});
						cc.director.pushScene(new scene());
						*/
						lu.controller.push('scene_auto');
					},
				}, {
					name: 'button_menu_scroll',
					type: 'button',
					text: 'Scroll Demo',
					clone: 'button_menu_auto',		//	clone keys from other view
					color_bg: lc.color.metro.sky.dark,
					action_release: function(type) {
						//text: 'Old Demo',
						//lu.controller.push('scene_boracay');
						lu.controller.push('scene_scroll');
					},
				}, {
					name: 'button_menu_tab',
					type: 'button',
					text: 'Tab Demo',
					clone: 'button_menu_auto',
					color_bg: lc.color.metro.green.dark,
					action_release: function(type) {
						lu.controller.push('scene_tab');
					},
				}, {
					name: 'button_menu_nest',
					type: 'button',
					text: 'Nesting Demo',
					clone: 'button_menu_auto',
					color_bg: lc.color.metro.purple.dark,
					action_release: function(type) {
						lu.controller.push('scene_nest');
					},
				}, {
					name: 'button_menu_action',
					type: 'button',
					text: 'Action Demo',
					clone: 'button_menu_auto',
					color_bg: lc.color.metro.red.dark,
					action_release: function(type) {
						lu.controller.push('scene_action');
					},
				} ],
			}, {
				name: 'label_menu',
				type: 'label',
				text: 'This menu itself is a matrix demo.',
				height: 0.1,
				alignment_v: lc.alignment.v.bottom,
				color_bg: lc.color.white,
			} ]
		},
	},
};

/*
 * manual
 */
app.scenes.scene_scroll = {
	type: 'scene',
	nodes: [ {
		name: 'scroll_scroll_main',
		type: 'view_scroll',
		color_bg: lc.color.white,
		nodes: [ {
			name: 'button_tab_back',
			type: 'button',
			height: 0.1,
			alignment_v: lc.alignment.v.top,
			text: 'Back',
			color_text: lc.color.white,
			color_bg: lc.color.black,
			action_release: function() {
				lu.controller.pop();
			},
		} ],
		init: function(node) {
			for (var i = 0; i < 16; i++)
			{
				var label = cc.LabelTTF.create("test " + (i + 1), "Arial", 100);
				label.x = 200;
				label.y = 50 + 100 * i;
				//var label = lu.label.create(50, i * 100, 500, 100, 'test ' + (i + 1));
				this.view.add(label);
			}
		},
	} ],
};
app.scenes.scene_tab = {
	type: 'scene',
	nodes: [ {
		name: 'multiplex_tab_main',
		type: 'view_multiplex',
		height: 0.9,
		alignment_v: lc.alignment.v.top,
		nodes: [ { 
			name: 'view_tab_0',
			type: 'view',
			color_bg: lc.color.metro.sky.light,
			nodes: [ {
				name: 'button_tab_back',
				type: 'button',
				height: 0.1,
				alignment_v: lc.alignment.v.top,
				text: 'Back',
				color_text: lc.color.white,
				color_bg: lc.color.black,
				action_release: function() {
					lu.controller.pop();
				},
			}, {
				name: 'label_tab_message',
				type: 'label',
				height: 0.9,
				alignment_v: lc.alignment.v.bottom,
				text: 'This demo shows how to use tab with multiplex view. Check app.scenes.tab for implementation.\n\nPress the "Back" button on top to return to menu.',
				color_text: lc.color.white,
			} ],
		}, {
			name: 'view_tab_1',
			type: 'view',
			color_bg: lc.color.metro.blue.light,
		}, {
			name: 'view_tab_2',
			type: 'view',
			color_bg: lc.color.metro.teal.light,
		} ],
	}, {
		name: 'tab_main',
		type: 'tab',
		multiplex: 'multiplex_tab_main',
		height: 0.1,
		row: 1,
		alignment_v: lc.alignment.v.bottom,
		nodes: [ { 
			name: 'button_tab_0',
			type: 'button',
			text: 'Tab 1',
			color_text: lc.color.white,
			color_bg: lc.color.metro.sky.dark,
		}, {
			name: 'button_tab_1',
			type: 'button',
			text: 'Tab 2',
			clone: 'button_tab_0',
			color_bg: lc.color.metro.blue.dark,
		}, {
			name: 'button_tab_2',
			type: 'button',
			text: 'Tab 3',
			clone: 'button_tab_0',
			color_bg: lc.color.metro.teal.dark,
		} ],
	} ],
};
app.scenes.scene_nest = {
	type: 'scene',
	nodes: [ {
		name: 'view_nest_top',
		type: 'view',
		height: 0.7,
		y: -0.1,
		alignment_v: lc.alignment.v.top,
		color_bg: lc.color.metro.sky.dark,
		nodes: [ {
			name: 'label_nest_top',
			type: 'label',
			text: 'Top',
			alignment_v: lc.alignment.v.top,
			alignment_h: lc.alignment.h.center,
			y: -10,
			width: 100,
			height: 100,
			color_text: lc.color.white,
			color_bg: lc.color.grey_dark,
		}, {
			name: 'view_nest_middle',
			type: 'view',
			alignment_v: lc.alignment.v.middle,
			alignment_h: lc.alignment.h.center,
			width: 0.5,
			height: 0.5,
			color_bg: lc.color.grey_dark,
			nodes: [ {
				name: 'label_nest_left',
				type: 'label',
				text: 'Left',
				x: 0.1,
				y: 0.1,
				width: 100,
				height: 100,
				color_text: lc.color.white,
				color_bg: lc.color.black,
			}, {
				name: 'image_nest_right',
				type: 'image',
				//filename: 'res/test128x64.png',
				//filename: 'res/test64x128.png',
				filename: 'res/test128x128.png',
				x: 0.7,
				y: 0.7,
				width: 0.2,
				height: 0.2,
			} ],
		}, {
			name: 'label_nest_bottom',
			type: 'label',
			text: 'Related Bottom',
			alignment_v: 'view_nest_middle',
			alignment_h: lc.alignment.h.center,
			y: -10,
			width: 100,
			height: 100,
			color_text: lc.color.white,
			color_bg: lc.color.grey_dark,
		} ],
	}, {
		name: 'button_nest_back',
		type: 'button',
		height: 0.1,
		//clone: 'button_tab_back',		//	TODO: how to clone a view in another scene?
		alignment_v: lc.alignment.v.top,
		text: 'Back',
		color_text: lc.color.white,
		color_bg: lc.color.black,
		action_release: function() {
			lu.controller.pop();
		},
	}, {
		name: 'label_nest_bottom',
		type: 'label',
		height: 0.2,
		text: 'For x, y, width & height, values > 1 means pixel while <= 1 means percentage, which applies to parent size.',
		alignemnt_v: lc.alignment.v.bottom,
		color_text: lc.color.white,
		color_bg: lc.color.metro.blue.dark,
	} ],
};
app.scenes.scene_action = {
	type: 'scene',
	nodes: [ {
		name: 'view_action_main',
		type: 'view',
		color_bg: lc.color.metro.sky.dark,
		nodes: [ {
			name: 'button_action_back',
			type: 'button',
			height: 0.1,
			alignment_v: lc.alignment.v.top,
			text: 'Back',
			color_text: lc.color.white,
			color_bg: lc.color.black,
			action_release: function() {
				lu.controller.pop();
			},
		}, {
			name: 'label_action_move',
			type: 'label',
			text: 'Test',
			alignment_h: lc.alignment.h.center,
			alignment_v: lc.alignment.v.middle,
			width: 200,
			height: 100,
			color_text: lc.color.white,
			color_bg: lc.color.metro.pink.dark,
		}, {
			name: 'matrix_action_move',
			type: 'matrix',
			row: 1,
			height: 0.2,
			nodes: [ {
				name: 'button_move_left',
				type: 'button',
				text: 'Left\n(release)',
				color_text: lc.color.white,
				color_bg: lc.color.metro.blue.dark,
				action_release: function() {
					lu.nodes.label_action_move.view.x -= 10;
				},
				action: function(event) {
					lu.nodes.label_action_move.view.text = event;
				},
			}, {
				name: 'button_move_right',
				type: 'button',
				text: 'Right\n(release)',
				clone: 'button_move_left',
				color_bg: lc.color.metro.blue.light,
				action_release: function() {
					lu.nodes.label_action_move.view.x += 10;
				},
			}, {
				name: 'button_move_up',
				type: 'button',
				text: 'Up\n(Press)',
				clone: 'button_move_left',
				action_press: function() {
					lu.nodes.label_action_move.view.y += 50;
				},
				action_release: function() {
				},
			}, {
				name: 'button_move_down',
				type: 'button',
				text: 'Down\n(Drag)',
				clone: 'button_move_right',
				action_drag: function() {
					lu.nodes.label_action_move.view.y -= 5;
				},
				action_release: function() {
				},
			}, {
				name: 'button_move_cancel',
				type: 'button',
				text: 'Reset\n(Cancel)',
				clone: 'button_move_left',
				action_cancel: function() {
					lu.nodes.label_action_move.view.x = 200;		//	TODO: add relative support to x/y
					lu.nodes.label_action_move.view.y = 300;
				},
			} ],
		} ],
	} ],
};

/*
 * auto
 */
app.scenes.scene_auto = {
	type: 'scene',
	nodes: [ {
		name: 'view_auto_main',
		type: 'view',
		color_bg: lc.color.white,
		nodes: [ {
			name: 'button_tab_back',
			type: 'button',
			height: 0.1,
			alignment_v: lc.alignment.v.top,
			text: 'Back',
			color_text: lc.color.white,
			color_bg: lc.color.black,
			action_release: function() {
				lu.controller.pop();
			},
		} ],
	} ],
	auto: [
		{
			type: 'tab',
			tabs: [
				'Tab 1',
				'Tab 2',
				'Tab 3',
			],
			views: [ [
				'Title 1',
				'Description 1.1',
				'res/test128x128.png',
				'Description 1.2',
				'Description 1.3',
				'Description 1.4',
				'Description 1.5',
				'Description 1.6',
				'Description 1.7',
				'Description 1.8',
				'Description 1.9',
			], [
				'Title 2',
				'Description 2',
				'res/test128x128.png',
			], [
				'Title 3',
				{
					type: 'matrix',
					row: 2,
					height: 0.4,
					views: [
						'Contact 1',
						'Contact 2',
						'Contact 3',
						'Contact 4',
					],
				},
				'res/test128x128.png',
				'Description 3' + '\n\nTODO: fix this length issue\n\nLorem ipsum dolor sit er elit lamet, consectetaur cillium adipisicing pecu, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Nam liber te conscient to factor tum poen legum odioque civiuda.\n\nLorem ipsum dolor sit er elit lamet, consectetaur cillium adipisicing pecu, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Nam liber te conscient to factor tum poen legum odioque civiuda.',
			] ],
		},
	],
};
