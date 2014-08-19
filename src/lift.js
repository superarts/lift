var lift = {
	util: {},
	ui: {
		//	TODO: replace left/right with head/tail (leading/trailing to support right-to-left languages)

		hex_to_color: function(hex, alpha) {
			var color = cc.hexToColor(hex);
			return cc.color(color.r, color.g, color.b, 255);
		},
		size_to_string: function(size) {
			return '(' + size.width + ', ' + size.height + ')';
		},
		point_to_string: function(point) {
			return '(' + point.x + ', ' + point.y + ')';
		},
		rect_to_string: function(rect) {
			return '(' + rect.x + ', ' + rect.y + ', ' + rect.width + ', ' + rect.height + ')';
		},
	},
};
lift.util.log = function(s1, s2) {
	var s = s2;
	if (s == null)
		s = '';
	else if (typeof s === 'object')
		s = ': ' + s.toSource();
	else
		s = ': ' + s;
	cc.log(s1 + s);
}

lu = lift.ui;
lu.log = lift.util.log;

lu.constants = {
	touch: {
		unknown:	'unknown',
		press:		'press',
		drag:		'drag',
		release:	'release',
		cancel:		'cancel',
	},
	alignment: {
		h: {
			left:		'left',
			center:		'center',
			right:		'right',
		},
		v: {
			top:		'top',
			middle:		'middle',
			bottom:		'bottom',
		},
	},
	font: {
		size: {
			large:		cc.director.getWinSize().width / 10,
			medium:		cc.director.getWinSize().width / 16,
			small:		cc.director.getWinSize().width / 20,
			default:	cc.director.getWinSize().width / 20,
		},
	},
	color: {
		black:	cc.color(	0,		0,		0,		255	),
		white:	cc.color(	255,	255,	255,	255	),
		clear:	cc.color(	0,		0,		0,		0	),
		grey:	cc.color(	128,	128,	128,	255	),
		grey_light:		cc.color(	192,	192,	192,	255	),
		grey_dark:		cc.color(	64,		64,		64,		255	),

		red:	cc.color(	255,	0,		0,		255	),
		green:	cc.color(	0,		255,	0,		255	),
		blue:	cc.color(	0,		0,		255,	255	),

		yellow:	cc.color(	255,	255,	0,		255	),
		pink:	cc.color(	255,	0,		255,	255	),
		cyan:	cc.color(	0,		255,	255,	255	),

		metro: {
			teal: {
				dark:	lu.hex_to_color('#008299'),
				light:	lu.hex_to_color('#00a0b1'),
			},
			blue: {
				dark:	lu.hex_to_color('#2672ec'),
				light:	lu.hex_to_color('#2e8def'),
			},
			pink: {
				dark:	lu.hex_to_color('#8c0095'),
				light:	lu.hex_to_color('#a700ae'),
			},
			purple: {
				dark:	lu.hex_to_color('#5133ab'),
				light:	lu.hex_to_color('#643ebf'),
			},
			red: {
				dark:	lu.hex_to_color('#ac193d'),
				light:	lu.hex_to_color('#bf1e4b'),
			},
			orange: {
				dark:	lu.hex_to_color('#d24726'),
				light:	lu.hex_to_color('#dc572e'),
			},
			green: {
				dark:	lu.hex_to_color('#008a00'),
				light:	lu.hex_to_color('#00a600'),
			},
			sky: {
				dark:	lu.hex_to_color('#094ab2'),
				light:	lu.hex_to_color('#0a5bc4'),
			},
		},
	},
},
lc = lift.ui.constants;

/*
 * view
 * 	from super: x, y
 * 	properties: w, h, color_bg
 */
lu.view = cc.Node.extend({
	init_rect: function(x, y, w, h) {
		return this.init_rect_color(x, y, w, h, lc.color.clear);
	},
	init_rect_color: function(x, y, w, h, color) {

		color = typeof color !== 'undefined' ? color : lc.color.clear;

		if (!cc.Node.prototype.init.call(this))
		{
			cc.log('VIEW failed');
			return false;
		}

		this._layer = cc.LayerColor.create(color, w, h);
		this._layer.x = 0;
		this._layer.y = 0;
		this.addChild(this._layer);

		Object.defineProperty(this, "w", {
			configurable: true,
			get: function () {
				return this._layer.width;
			},
			set: function (w) {
				this._layer.width = w;
				this.setContentSize(w, this._layer.height);
			},
		});
		Object.defineProperty(this, "h", {
			configurable: true,
			get: function () {
				return this._layer.height;
			},
			set: function (h) {
				this._layer.height = h;
				this.setContentSize(this._layer.width, h);
			},
		});
		Object.defineProperty(this, "color_bg", {
			configurable: true,
			get: function () {
				return this._layer.color;
			},
			set: function (color) {
				if (color === undefined)
					color = lc.color.clear;
				this._layer.color = color;
			},
		});

		this.x = x;
		this.y = y;
		this.setContentSize(w, h);

		return true;
	},
});
lu.view.create = function(x, y, w, h, color) {
	var view = new lu.view();
	view.init_rect_color(x, y, w, h, color);

	return view;
}


/*
 * label
 * 	from super: x, y, w, h, color_bg
 * 	properties: text, color_text, font_size
 */
lu.label = lu.view.extend({
	init_rect_text: function(x, y, w, h, text) {
		//	lu.log('LABEL init', text);
		if (!lu.view.prototype.init_rect.call(this, x, y, w, h))
		{
			cc.log('LABEL failed');
			return false;
		}

		var font_size = 24;
		this._label = cc.LabelTTF.create(text, "Arial", font_size);
		this._label.x = w / 2;
		this._label.y = h / 2;
		this._label.w = w;
		this._label.h = h;

		this._label.setDimensions(cc.size(w, 0));
		//lu.log(text, lu.size_to_string(this._label.getContentSize()));
		var size = this._label.getContentSize();
		this._label.setDimensions(cc.size(w, size.height + font_size * 2));
		//lu.log(text, lu.size_to_string(this._label.getContentSize()));

		this._label.color = lc.color.blue;
		this._label.setHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);
		this._label.setVerticalAlignment(cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
		this.addChild(this._label);

		this.func_set_w = this.__lookupSetter__('w');
		Object.defineProperty(this, "w", {
			configurable: true,
			set: function (w) {
				this.func_set_w(w);
				this._label.w = w;
				this._label.x = w / 2;
			},
		});
		this.func_set_h = this.__lookupSetter__('h');
		Object.defineProperty(this, "h", {
			configurable: true,
			set: function (h) {
				this.func_set_h(h);
				this._label.h = h;
				this._label.y = h / 2;
			},
		});
		Object.defineProperty(this, "text", {
			configurable: true,
			get: function () {
				return this._label.getString();
			},
			set: function (text) {
				this._label.setString(text);
			},
		});
		Object.defineProperty(this, "color_text", {
			configurable: true,
			get: function () {
				return this._label.color;
			},
			set: function (color) {
				this._label.color = color;
			},
		});
		Object.defineProperty(this, "font_size", {
			configurable: true,
			get: function () {
				return this._label.getFontSize();
			},
			set: function (size) {
				this._label.setFontSize(size);
			},
		});

		return true;
	},
});
lu.label.get_height = function(w, text, font_size) {
	var label = cc.LabelTTF.create(text, "Arial", font_size);
	label.setDimensions(cc.size(w, 0));
	//lu.log(text, lu.size_to_string(this._label.getContentSize()));
	var size = label.getContentSize();
	return size.height + font_size * 2;
};
lu.label.create = function(x, y, w, h, text) {
	//	cc.log('LABEL create');
	var label = new lu.label();
	label.init_rect_text(x, y, w, h, text);
	return label;
};


/*
 * image
 * 	from super: x, y, w, h, color_bg
 */
lu.image = lu.view.extend({
	init_rect_filename: function(x, y, w, h, filename) {
		if (!lu.view.prototype.init_rect.call(this, x, y, w, h))
		{
			cc.log('IMAGE failed');
			return false;
		}
		this._imageView = ccui.ImageView.create();
		this._imageView.loadTexture(filename);
		this._imageView.x = w / 2;
		this._imageView.y = h / 2;

		//	TODO: support other modes than "scale fit"
		var size = this._imageView.getContentSize();
		var scale_w = w / size.width;
		var scale_h = h / size.height;
		this._imageView.scale = Math.min(scale_w, scale_h);
		this.addChild(this._imageView);

		//this.color_bg = lc.color.blue;

		return true;
	},
});
lu.image.get_size = function(filename) {
	var image = ccui.ImageView.create();
	image.loadTexture(filename);
	return image.getContentSize();
};
lu.image.create = function(x, y, w, h, filename) {
	var image = new lu.image();
	image.init_rect_filename(x, y, w, h, filename);
	return image;
}


/*
 * button
 * 	from super: x, y, w, h, color_bg
 * 	properties: text, color_text, action
 */
lu.button = lu.view.extend({
	init_rect: function(x, y, w, h) {
		if (!lu.view.prototype.init_rect.call(this, x, y, w, h))
		{
			cc.log('BUTTON failed');
			return false;
		}
		this._button = ccui.Button.create();
		this._button.setTouchEnabled(true);
		this._button.setScale9Enabled(true);
		this._button.setTitleText("");
		this._button.setTitleFontSize(24);
		this._button.setTitleColor(lc.color.blue);
		//this._button.setColor(lc.color.red);			//	no use?
		this._button.setSize(cc.size(w, h));
		this._button.x = w / 2;
		this._button.y = h / 2;
		this._button.addTouchEventListener(this.listener_touch ,this);
		//_button.loadTextures("res/button.png", "res/buttonHighlighted.png", "");
		this.addChild(this._button);

		this.func_set_w = this.__lookupSetter__('w');
		Object.defineProperty(this, "w", {
			configurable: true,
			set: function (w) {
				this.func_set_w(w);
				var h = this._layer.height;
				this.reset_size(w, h);
			},
		});
		this.func_set_h = this.__lookupSetter__('h');
		Object.defineProperty(this, "h", {
			configurable: true,
			set: function (h) {
				this.func_set_h(h);
				var w = this._layer.width;
				this.reset_size(w, h);
			},
		});
		Object.defineProperty(this, "text", {
			configurable: true,
			get: function () {
				return this._button.getTitleText();
			},
			set: function (text) {
				this._button.setTitleText(text);
			},
		});
		Object.defineProperty(this, "color_text", {
			configurable: true,
			get: function () {
				return this._button.getTitleColor();
			},
			set: function (color) {
				this._button.setTitleColor(color);
			},
		});

		return true;
	},
	reset_size: function(w, h) {
		this._button.setSize(cc.size(w, h));
		this._button.x = w / 2;
		this._button.y = h / 2;
	},
	action: function(type) {
		//lu.log('event', type);
	},
	listener_touch: function(sender, type) {
		var t = lc.touch.unknown;
        switch (type) {
            case ccui.Widget.TOUCH_BEGAN:
				if (typeof this.action_press === 'function') this.action_press();
				t = lc.touch.press;
                break;
            case ccui.Widget.TOUCH_MOVED:
				if (typeof this.action_drag === 'function') this.action_drag();
				t = lc.touch.drag;
                break;
            case ccui.Widget.TOUCH_ENDED:
				if (typeof this.action_release === 'function') this.action_release();
				t = lc.touch.release;
                break;
            case ccui.Widget.TOUCH_CANCELED:
				if (typeof this.action_cancel === 'function') this.action_cancel();
				t = lc.touch.cancel;
                break;
            default:
                break;
        }
		this.action(t);
	},
});
lu.button.create = function(x, y, w, h) {
	var button = new lu.button();
	button.init_rect(x, y, w, h);
	return button;
}

/*
 * scroll view
 * 	from super: x, y, w, h, color_bg
 * 	properties: add
 * 	TODO: support horizontal mode
 */
lu.view_scroll = lu.view.extend({
	init_rect: function(x, y, w, h) {
		if (!lu.view.prototype.init_rect.call(this, x, y, w, h))
		{
			cc.log('MULTIPLEX VIEW failed');
			return false;
		}
		this._scroll = new ccui.ScrollView();
		this._scroll.x  = 0;
		this._scroll.y  = 0;
		this._scroll.width	= w;
		this._scroll.height  = h;
		this._scroll.setBackGroundColor(lc.color.blue);
		this._scroll.setDirection(ccui.ScrollView.DIR_VERTICAL);
		this.addChild(this._scroll);

		return true;
	},
	add: function(view) {
		var size = this._scroll.getInnerContainerSize();
		var h = view.y + view.height / 2;
		this._scroll.addChild(view);
		//	lu.log('SCROLL add', h + ' to ' + size.height + ' (' + view.y + ', ' + view.height + ')');
		var offset = view.height / 2 - view.y;
		if (h > size.height)
			this._scroll.setInnerContainerSize(cc.size(size.width, h));
		else if (offset > 0)
		{
			var children = this._scroll.getChildren();
			for (var i = 0; i < children.length; i++)
			{
				//	lu.log('children ' + i, children[i].y + ' ' + children[i].height);
				children[i].y += offset;
			}
			this._scroll.setInnerContainerSize(cc.size(size.width, size.height + offset));
		}
	},
});
lu.view_scroll.create = function(x, y, w, h) {
	var view_scroll = new lu.view_scroll();
	view_scroll.init_rect(x, y, w, h);
	return view_scroll;
};

/*
 * multiplex view
 * 	from super: x, y, w, h, color_bg
 * 	properties: add
 */
lu.view_multiplex = lu.view.extend({
	count: 0,
	init_rect: function(x, y, w, h) {
		if (!lu.view.prototype.init_rect.call(this, x, y, w, h))
		{
			cc.log('MULTIPLEX VIEW failed');
			return false;
		}
		this._multiplex = new cc.LayerMultiplex();
		this._multiplex.x  = 0;
		this._multiplex.y  = 0;
		this._multiplex.width	= w;
		this._multiplex.height  = h;
		this.addChild(this._multiplex);

		return true;
	},
	add: function(layer) {
		this._multiplex.addLayer(layer);
		if (this.count == 0)
			this._multiplex.switchTo(0);
		this.count++;
	},
	switch: function(index) {
		this._multiplex.switchTo(index);
	},
});
lu.view_multiplex.create = function(x, y, w, h) {
	var view_multiplex = new lu.view_multiplex();
	view_multiplex.init_rect(x, y, w, h);
	return view_multiplex;
};


/*
 * processor
 */
lu.nodes = {};		//	get node from name
lu.process = {
	get_size: function(node)
	{
		var w = node.root.view.w;
		var h = node.root.view.h;
		if (typeof node.width == 'number')
		{
			if (node.width > 1)
				w = node.width;
			else
				w *= node.width;
		}
		if (typeof node.height == 'number')
		{
			if (node.height > 1)
				h = node.height;
			else
				h *= node.height;
		}
		else if (node.type == 'label')
		{
			node.font_size = node.font_size || lc.font.size.default;
			h = lu.label.get_height(w, node.text, node.font_size);
		}
		else if (node.type == 'image')
		{
			var size = lu.image.get_size(node.filename);
			w = size.width;
			h = size.height;
		}

		return cc.size(w, h);
	},
	get_rect: function(node) {
		var size = lu.process.get_size(node);
		var x = 0;
		var y = 0;
		if (node.alignment_h !== undefined)
		{
			switch (node.alignment_h)
			{
				case lc.alignment.h.left:
					x = 0;
					break;
				case lc.alignment.h.center:
					x = (node.root.view.w - size.width) / 2;
					break;
				case lc.alignment.h.right:
					x = node.root.view.w - size.width;
					break;
			}
		}
		if (node.alignment_v !== undefined)
		{
			switch (node.alignment_v)
			{
				case lc.alignment.v.top:
					y = node.root.view.h - size.height;
					break;
				case lc.alignment.v.middle:
					y = (node.root.view.h - size.height) / 2;
					break;
				case lc.alignment.v.bottom:
					y = 0;
					break;
				default:
					var view = lu.nodes[node.alignment_v].view;
					if (view !== undefined)
					{
						var node_relative = lu.nodes[node.alignment_v];
						if (node.y > 0)
							y = view.y + view.h;
						else
							y = view.y - size.height;
					}
			}
		}
		if (typeof node.x == 'number')
		{
			if (Math.abs(node.x) > 1)
				x += node.x;
			else
				x += node.root.view.w * node.x;
		}
		if (typeof node.y == 'number')
		{
			if (Math.abs(node.y) > 1)
				y += node.y;
			else
				y += node.root.view.h * node.y;
		}

		if ((node.root.type == 'matrix') ||
			(node.root.type == 'tab'))
		{
			size.width	/= node.root.column;
			size.height	/= node.root.row;
			x = size.width * (node.index % node.root.column)
			y = size.height * Math.floor(node.index / node.root.column);
		}

		return cc.rect(x, y, size.width, size.height);
	},

	scene: function(node) {
		var size = cc.director.getWinSize();
		return lu.view.create(0, 0, size.width, size.height, lc.color.grey_light);
	},
	view: function(node) {
		var rect = lu.process.get_rect(node);
		return lu.view.create(rect.x, rect.y, rect.width, rect.height, node.color_bg);
	},
	matrix: function(node) {
		var rect = lu.process.get_rect(node);

		//	1 row by default
		if ((node.row === undefined) && (node.column === undefined))
		{
			node.row = 1;
			node.column = node.count;
		}
		else if (node.column === undefined)
			node.column = Math.floor(node.count / node.row);
		else	
			node.row = Math.floor(node.count / node.column);

		//	integrity check
		if (node.column * node.row != node.count)
			lu.log('WARNING matrix (column * row != count)', node.root.name);

		return lu.view.create(rect.x, rect.y, rect.width, rect.height, lc.color.clear);
	},
	tab: function(node) {
		var matrix = lu.process.matrix(node);

		var index = 0;
		for (var i = 0; i < node.nodes.length; i++)
		{
			var subnode = node.nodes[i];
			if (subnode.type == 'button')
			{
				let layer_index = index;
				subnode.action_press = function() {
					lu.nodes[node.multiplex].view.switch(layer_index);
				};
				index++;
			}
		}

		return matrix;
	},
	view_scroll: function(node) {
		var rect = lu.process.get_rect(node);
		var scroll = lu.view_scroll.create(rect.x, rect.y, rect.width, rect.height);
		scroll.color_bg = node.color_bg;
		return scroll;
	},
	view_multiplex: function(node) {
		var rect = lu.process.get_rect(node);
		return lu.view_multiplex.create(rect.x, rect.y, rect.width, rect.height);
	},
	label: function(node) {
		node.text = node.text || '';
		node.color = node.color || lc.color.blue;

		var rect = lu.process.get_rect(node);
		var label = lu.label.create(rect.x, rect.y, rect.width, rect.height, node.text);

		lu.process.set_keys(node, label);
		return label;
	},
	image: function(node) {
		var rect = lu.process.get_rect(node);
		var image = lu.image.create(rect.x, rect.y, rect.width, rect.height, node.filename);
		lu.process.set_keys(node, image);
		return image;
	},
	button: function(node) {
		node.text = node.text || '';
		node.color_text = node.color_text || lc.color.blue;

		var rect = lu.process.get_rect(node);
		var button = lu.button.create(rect.x, rect.y, rect.width, rect.height);

		lu.process.set_keys(node, button);
		return button;
	},
	set_keys: function(node, view) {
		for (var key in node)
		{
			if ((key != 'name') &&
				(key != 'type') &&
				(key != 'root') &&
				(key != 'x') &&
				(key != 'y') &&
				(key != 'index'))
			{
				view[key] = node[key];
			}
		}
	},

	inflate: function(node) {
		if (node.clone !== undefined)
		{
			var dest = lu.nodes[node.clone];
			for (var key in dest)
				if ((node[key] === undefined) && (key != 'view'))
					node[key] = dest[key];
		}
		var func_get_view = window['lu']['process'][node.type];
		if (typeof func_get_view === "function")
		{
			if (node.hasOwnProperty('nodes'))
				node.count = Object.keys(node.nodes).length;
			//	get view needs view.count
			node.view = func_get_view(node);

			//	subnode needs root.view
			if (node.hasOwnProperty('nodes'))
			{
				//for (var key in node.nodes)
				for (var i = 0; i < node.nodes.length; i++)
				{
					subnode = node.nodes[i];
					subnode.root = node;
					subnode.index = i;
					this.inflate(subnode);
				}
			}

			if (node.type != 'scene')
			{
				if ((node.root.type == 'view_multiplex') || (node.root.type == 'view_scroll'))
					node.root.view.add(node.view);
				else
					node.root.view.addChild(node.view);
			}
			if (typeof node.init === 'function') node.init(node);

			lu.nodes[node.name] = node;
			//	if (node.root != undefined) lu.log('Added', node.name + ' to ' + node.root.name);
		}
		else
		{
			lu.log('WARNING unknown view type', node.name);
		}
	},

	auto_tab: function(nodes, node) {
		if (node.views === undefined)
		{
			lu.log('WARNING', 'missing "views" in auto-tab');
			return;
		}
		if (node.tabs === undefined)
		{
			lu.log('WARNING', 'missing "tabs" in auto-tab');
			return;
		}

		var node_multiplex = {
			name: 'multiplex_todo',
			type: 'view_multiplex',
			height: 0.8,
			alignment_v: lc.alignment.v.middle,
			nodes: [],
		};
		for (var i = 0; i < node.views.length; i++)
		{
			var node_view = {
				name: 'view_todo_' + i,
				type: 'view',
				color_bg: lc.color.metro.sky.light,
			};
		}
		lu.process.automate(node_multiplex.nodes, node.views);
		nodes.push(node_multiplex);

		var node_tab = {
			name: 'tab_todo',
			type: 'tab',
			multiplex: 'multiplex_todo',
			height: 0.1,
			row: 1,
			alignment_v: lc.alignment.v.bottom,
			nodes: [],
		};
		for (var i = 0; i < node.tabs.length; i++)
		{
			if (typeof node.tabs[i] == 'string')
			{
				node.tabs[i] = {
					name: 'button_todo_' + i,
					type: 'button',
					text: node.tabs[i],
					color_text: lc.color.white,
					color_bg: lc.color.metro.sky.dark,	//	TODO: random color based on theme
				};
			}
		}
		lu.process.automate(node_tab.nodes, node.tabs);
		nodes.push(node_tab);
	},
	/*
	auto_view: function(nodes, array) {
		var node_view = {
			name: 'view_todo',
			type: 'view_scroll',
			nodes: [],
		};
		lu.process.automate(node_view.nodes, array);
		nodes.push(node_view);
	},
	*/
	auto_view_scroll: function(nodes, node) {
		lu.process.automate(node.nodes, node.views);
		nodes.push(node);
	},
	auto_matrix: function(nodes, node) {
		lu.process.automate(node.nodes, node.views);
		nodes.push(node);
		//	lu.log('matrix', node);
	},
	auto_label: function(nodes, node) {
		node.font_size = node.font_size || lc.font.size.medium;
		if (nodes.length > 0)
		{
			node.alignment_v = nodes[nodes.length - 1].name;
		}
		//lu.log(node.text, nodes);
		nodes.push(node);
	},
	auto_image: function(nodes, node) {
		if (nodes.length > 0)
		{
			node.alignment_v = nodes[nodes.length - 1].name;
		}
		//lu.log('image', node);
		nodes.push(node);
	},
	automate: function(nodes, nodes_auto) {
		if (nodes_auto === undefined)
			return;
		if (nodes === undefined)
			nodes = [];
		for (var i = 0; i < nodes_auto.length; i++)
		{
			var node_auto = nodes_auto[i];

			//	1. turn array / string into object
			if (node_auto instanceof Array) 
			{
				//	lu.log('AUTO array');
				//	this.auto_view(nodes, node_auto);
				node_auto = {
					type: 'view_scroll',
					nodes: [],
					views: node_auto,
				};
			}
			else if (typeof node_auto === 'string')
			{
				//	lu.log('AUTO string', node_auto);
				if (node_auto.indexOf(".png") > -1)
				{
					node_auto = {
						type: 'image',
						filename: node_auto,
					};
				}
				else
				{
					node_auto = {
						type: 'label',
						text: node_auto,
					};
				}
				this.index++;
			}

			//	2. modify object
			if (node_auto.type == 'matrix')
			{
				node_auto.nodes = node_auto.nodes || [];
			}

			//	3. process object
			if (typeof node_auto === 'object')
			{
				node_auto.alignment_h = node_auto.alignment_h || lc.alignment.h.center;
				node_auto.alignment_v = node_auto.alignment_v || lc.alignment.v.top;
				node_auto.name = node_auto.name || node_auto.type + '_auto_' + this.index;

				if (node_auto.type == 'button')
					nodes.push(node_auto);
				else if (node_auto.type == 'view_scroll')
				{
					lu.process.automate(node_auto.nodes, node_auto.views);
					nodes.push(node_auto);
				}
				else 
				{
					var func_auto = this['auto_' + node_auto.type];
					if (typeof func_auto === "function")
						func_auto(nodes, node_auto);
					else
						lu.log('WARNING unknown auto type: ' + node_auto.type);
				}
			}
			else
				lu.log('WARNING unknown auto type');
		}
	},
	index: 0,
};


/*
 * controller
 */
lu.controller = {
	scene: function(index) {
		var scene = cc.Scene.extend({
			onEnter:function () {
				this._super();
				lu.process.automate(app.scenes[index].nodes[0].nodes, app.scenes[index].auto);
				lu.process.inflate(app.scenes[index]);
				this.addChild(app.scenes[index].view);
			}
		});
		return scene;
	},
	run: function(index) {
		var scene = this.scene(index);
		cc.director.runScene(new scene());
	},
	push: function(index) {
		var scene = this.scene(index);
		cc.director.pushScene(new scene());
	},
	pop: function() {
		cc.director.popScene();
	},
};
