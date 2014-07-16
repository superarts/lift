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
					name: 'button_menu_table',
					type: 'button',
					text: 'Table Demo',
					color_text: lc.color.white,
					color_bg: lc.color.metro.blue.dark,
					action_release: function(type) {
						var scene = cc.Scene.extend({
							onEnter:function () {
								this._super();
								var layer = new TableViewTestLayer();
								layer.init();
								this.addChild(layer);
							}
						});
						cc.director.pushScene(new scene());
					},
				}, {
					name: 'button_menu_old',
					type: 'button',
					text: 'Old Demo',
					clone: 'button_menu_table',		//	clone keys from other view
					color_bg: lc.color.metro.sky.dark,
					action_release: function(type) {
						lu.controller.push('scene_boracay');
					},
				}, {
					name: 'button_menu_tab',
					type: 'button',
					text: 'Tab Demo',
					clone: 'button_menu_table',
					color_bg: lc.color.metro.green.dark,
					action_release: function(type) {
						lu.controller.push('scene_tab');
					},
				}, {
					name: 'button_menu_nest',
					type: 'button',
					text: 'Nesting Demo',
					clone: 'button_menu_table',
					color_bg: lc.color.metro.purple.dark,
					action_release: function(type) {
						lu.controller.push('scene_nest');
					},
				}, {
					name: 'button_menu_action',
					type: 'button',
					text: 'Action Demo',
					clone: 'button_menu_table',
					color_bg: lc.color.metro.red.dark,
					action_release: function(type) {
						lu.controller.push('scene_action');
					},
				} ],
			}, {
				name: 'label_menu',
				type: 'label',
				text: 'This menu itself is a matrix demo.\n(Please ignore "Old Demo" and "Table Demo" for now.)',
				height: 0.1,
				alignment_v: lc.alignment.v.bottom,
				color_bg: lc.color.white,
			} ]
		},
	},
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
				action_release: function() {
					lu.controller.pop();
				},
			}],
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
