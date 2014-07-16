//	TODO: test only, need clean up

app.scenes.scene_boracay = {
	type: 'scene',
	text: 'Boracay',
	nodes: [ {
		name: 'multiplex_main',
		type: 'view_multiplex',
		height: 0.8,
		alignment_v: lc.alignment.v.top,
		nodes: [ { 
			name: 'view_static',
			type: 'view',
			color_bg: lc.color.grey_light,
			nodes: [ {
				name: 'view_static_top',
				type: 'view',
				width: 100,
				height: 100,
				alignment_v: lc.alignment.v.top,
				color_bg: lc.color.grey,
			}, {
				name: 'view_static_view1',
				type: 'view',
				width: 400,
				height: 400,
				alignment_v: lc.alignment.v.bottom,
				color_bg: lc.color.grey,
			}, {
				name: 'label_static_test',
				type: 'label',
				text: 'Static',
				width: 160,
				height: 160,
				alignment_h: lc.alignment.h.right,
				alignment_v: lc.alignment.v.middle,
				color_text: lc.color.white,
				color_bg: lc.color.blue,
			} ],
		}, {
			name: 'view_dynamic',
			type: 'view',
			color_bg: lc.color.grey_light,
			nodes: [ {
				name: 'view_dynamic_test',
				type: 'view',
				width: 200,
				height: 200,
				alignment_v: lc.alignment.v.bottom,
				color_bg: lc.color.grey,
				nodes: [ {
					name: 'label_dynamic_test',
					type: 'label',
					text: 'Dynamic',
					width: 160,
					height: 160,
					alignment_h: lc.alignment.h.center,
					alignment_v: lc.alignment.v.middle,
					color_text: lc.color.white,
					color_bg: lc.color.blue,
				} ],
			}, {
				name: 'button_dynamic_test',
				type: 'button',
				width: 200,
				height: 200,
				text: 'test',
				alignment_v: lc.alignment.v.top,
				color_bg: lc.color.green,
				action: function(type) {
					var view = lu.nodes.view_dynamic_test.view;
					if (type == lc.touch.press)
						view.x += 10;
					else if (type == lc.touch.release)
						view.y += 10;
					else if (type == lc.touch.cancel)
						view.y -= 10;
					//	else if (type == lu.touch.drag) view.x -= 10;
					lu.controller.pop();
				},	//	TODO: do we really need action array?
			}],
		}, {
			name: 'view_wedding',
			type: 'view',
			color_bg: lc.color.metro.teal.light,
		}, {
			name: 'view_contact',
			type: 'view',
			color_bg: lc.color.white,
		} ],
	}, {
		name: 'tab_main',
		type: 'tab',
		multiplex: 'multiplex_main',
		height: 0.2,
		row: 2,
		alignment_v: lc.alignment.v.bottom,
		nodes: [ { 
			name: 'button_accomondation',
			type: 'button',
			text: 'Accomondation',
			color_bg: lc.color.grey,
		}, {
			name: 'button_entertaiment',
			type: 'button',
			text: 'Entertainment',
			color_bg: lc.color.grey_light,
		}, {
			name: 'button_wedding',
			type: 'button',
			text: 'Wedding',
			color_bg: lc.color.metro.teal.dark,
		}, {
			name: 'button_contact',
			type: 'button',
			text: 'Contact',
			color_bg: lc.color.white,
		} ],
	} ],
};


/*
 * test code
 */
lu.test_view = function() {
	this.init = function(s) {
        var size = cc.director.getWinSize();
        var layer = new cc.LayerColor(lc.color.white, size.width, size.height);
		layer.x = 0;
		layer.y = 0;
		this.layer = layer;

		//	ui processor
		app.scenes[0].root = {
			name: 'screen',
			view: this.layer,
		};
		app.scenes[1].root = {
			name: 'screen',
			view: this.layer,
		};
		lu.process.inflate(app.scenes[0]);

		lu.log('----', 'views');
		for (var key in lu.nodes)
			if (lu.nodes.hasOwnProperty(key))
				lu.log(key, lu.nodes[key].type);
		//	lu.nodes.multiplex_main.view.layer_switch(1);

		//	property test
		var node;

		/*
		node = lu.nodes.view_dynamic_test;
		var view = node.view;
		view.x += 10;
		view.y += 100;
		//view.w = 300;
		//view.h = 250;
		view.color_bg = lc.color.red;

		node = lu.nodes.label_dynamic_test;
		var label = node.view;
		label.x += 10;
		label.y += 10;
		label.w += 100;
		label.text = 'dynamite';

		node = lu.nodes.button_dynamic_test;
		var button = node.view;
		button.x += 10;
		button.y -= 100;
		button.w = 200;
		button.h = 150;
		button.text = 'Test';
		button.color_bg = lc.color.white;
		button.color_text = lc.color.red;
		*/

		/*
		//	view
		var view = lu.view.create(100, 600, 100, 100, lc.color.red);
		view.x = 50;
		view.w = 200;
		view.color = lc.color.green;
		this.layer.addChild(view);

		//	label
		var label = lu.label.create(100, 500, 300, 50, 'Hello');
		this.layer.addChild(label);

		var button = lu.button.create(200, 250, 160, 100);
		button.color = lc.color.grey_light;
		button._button.setTitleText('test');
		button._button.addTouchEventListener(this.touchEvent ,this);
		this.layer.addChild(button);

		var label = cc.LabelTTF.create(s, "Arial", 38);
		label.x = 300;
		label.y = 400;
		label.color = lc.color.blue;
		label.text = 'test...';
		this.label = label;
		this.layer.addChild(label);
		*/

		/*
		var _layer = cc.Layer.extend({
			ctor:function() {
				this._super();
				var label = cc.LabelTTF.create(s, "Arial", 38);
				label.x = 200;
				label.y = 200;
				label.dimensions = cc.size(400, 400);
				this.addChild(label);
				return true;
			}
		});
		this.layer = _layer;
		*/
	};
};


var CustomTableViewCell = cc.TableViewCell.extend({
    draw:function (ctx) {
        this._super(ctx);
    }
});

var TableViewTestLayer = cc.Layer.extend({

    init:function () {
        if (!this._super()) {
            return false;
        }

        var winSize = cc.director.getWinSize();

        var tableView = cc.TableView.create(this, cc.size(600, 60));
        tableView.setDirection(cc.SCROLLVIEW_DIRECTION_HORIZONTAL);
        tableView.x = 20;
        tableView.y = winSize.height / 2 - 150;
        tableView.setDelegate(this);
        this.addChild(tableView);
        tableView.reloadData();

        tableView = cc.TableView.create(this, cc.size(60, 350));
        tableView.setDirection(cc.SCROLLVIEW_DIRECTION_VERTICAL);
        tableView.x = winSize.width - 150;
        tableView.y = winSize.height / 2 - 150;
        tableView.setDelegate(this);
        tableView.setVerticalFillOrder(cc.TABLEVIEW_FILL_TOPDOWN);
        this.addChild(tableView);
        tableView.reloadData();

        return true;
    },

    toExtensionsMainLayer:function (sender) {
        var scene = new ExtensionsTestScene();
        scene.runThisTest();
    },

    scrollViewDidScroll:function (view) {
    },
    scrollViewDidZoom:function (view) {
    },

    tableCellTouched:function (table, cell) {
        cc.log("cell touched at index: " + cell.getIdx());
		if (cell.getIdx() == 0)
		{
			cc.director.popScene();
		}
    },

    tableCellSizeForIndex:function (table, idx) {
        if (idx == 2) {
            return cc.size(150, 150);
        }
        return cc.size(100, 100);
    },

    tableCellAtIndex:function (table, idx) {
        var strValue = idx.toFixed(0);
        var cell = table.dequeueCell();
        var label;
        if (!cell) {
            cell = new CustomTableViewCell();
            //var sprite = cc.Sprite.create('res/CloseSelected.png');
            var sprite = cc.Sprite.create('res/CloseSelected.png');
            sprite.anchorX = 0;
            sprite.anchorY = 0;
            sprite.x = 0;
            sprite.y = 0;
            cell.addChild(sprite);

            label = cc.LabelTTF.create(strValue, "Arial", 20.0);
            label.x = 0;
            label.y = 0;
            label.anchorX = 0;
            label.anchorY = 0;
            label.tag = 123;
            cell.addChild(label);
        } else {
            label = cell.getChildByTag(123);
            label.setString(strValue);
        }

        return cell;
    },

    numberOfCellsInTableView:function (table) {
        return 100;
    }
});


var HelloWorldLayer = cc.Layer.extend({
    sprite:null,
    ctor:function () {
        //////////////////////////////
        // 1. super init first
        this._super();

        /////////////////////////////
        // 2. add a menu item with "X" image, which is clicked to quit the program
        //    you may modify it.
        // ask director the window size
        var size = cc.director.getWinSize();

        // add a "close" icon to exit the progress. it's an autorelease object
        var closeItem = cc.MenuItemImage.create(
            res.CloseNormal_png,
            res.CloseSelected_png,
            function () {
                cc.log("Menu is clicked!");
            }, this);
        closeItem.attr({
            x: size.width - 20,
            y: 20,
            anchorX: 0.5,
            anchorY: 0.5
        });

        var menu = cc.Menu.create(closeItem);
        menu.x = 0;
        menu.y = 0;
        this.addChild(menu, 1);

        /////////////////////////////
        // 3. add your codes below...
        // add a label shows "Hello World"
        // create and initialize a label
        var helloLabel = cc.LabelTTF.create("Hello, World", "Arial", 38);
        // position the label on the center of the screen
        helloLabel.x = size.width / 2;
        helloLabel.y = 0;
        // add the label as a child to this layer
        this.addChild(helloLabel, 5);

        // add "HelloWorld" splash screen"
        this.sprite = cc.Sprite.create(res.HelloWorld_png);
        this.sprite.attr({
            x: size.width / 2,
            y: size.height / 2,
            scale: 0.5,
            rotation: 180
        });
        this.addChild(this.sprite, 0);

        var rotateToA = cc.RotateTo.create(2, 0);
        var scaleToA = cc.ScaleTo.create(2, 1, 1);

        this.sprite.runAction(cc.Sequence.create(rotateToA, scaleToA));
        helloLabel.runAction(cc.Spawn.create(cc.MoveBy.create(2.5, cc.p(0, size.height - 40)),cc.TintTo.create(2.5,255,125,0)));
        return true;
    }
});

var SceneTest = cc.Scene.extend({
    onEnter:function () {
        this._super();
		var view = new lu.test_view();
		view.init('TEST');
        var layer = view.layer;
        this.addChild(layer);
    }
});

var SceneTable = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new TableViewTestLayer();
		layer.init();
        this.addChild(layer);

		/*
		cc.log('TEST performance');
		var array = new Array();
		for (var i = 0; i < 200000; i++) {
            array[i] = cc.Sprite.create('res/CloseSelected.png');
            array[i].anchorX = 0;
            array[i].anchorY = 0;
            array[i].x = 0;
            array[i].y = 0;
		}
		*/
	}
});
