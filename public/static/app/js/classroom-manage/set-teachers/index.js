webpackJsonp(["app/js/classroom-manage/set-teachers/index"],{"55e73d7afebf9c74b73e":function(e,t,a){"use strict";function o(e){return e&&e.__esModule?e:{default:e}}function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}function s(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function l(e,t,a,o){var n,r={itemId:Math.random(),nickname:t[o.nickname],isVisible:1==t[o.isVisible],avatar:t[o.avatar],seq:a,id:t[o.id],outputValue:(n={},s(n,o.id,t[o.id]),s(n,o.isVisible,t[o.isVisible]),n)};e.push(r)}function c(e,t){e.map(function(a,o){a.itemId==t&&(e[o].isVisible=!e[o].isVisible,e[o].outputValue.isVisible=e[o].isVisible?1:0)})}Object.defineProperty(t,"__esModule",{value:!0});var u=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var o in a)Object.prototype.hasOwnProperty.call(a,o)&&(e[o]=a[o])}return e},p=function(){function e(e,t){for(var a=0;a<t.length;a++){var o=t[a];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,a,o){return a&&e(t.prototype,a),o&&e(t,o),t}}(),d=a("33a776824bec073629e5"),f=o(d),m=a("26fa658edb0135ccf5db"),b=o(m),h=a("d0399763e3c229c64154"),y=o(h),g=function(e){function t(e){n(this,t);var a=r(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return a.onChecked=function(e){var t=e.currentTarget.value;c(a.state.dataSourceUi,t),a.setState({dataSourceUi:a.state.dataSourceUi})},a.addItem=function(e,t){t&&(a.props.replaceItem&&(a.state.dataSourceUi=[]),l(a.state.dataSourceUi,t,a.state.dataSourceUi.length+1,a.props),a.setState({dataSourceUi:a.state.dataSourceUi}))},a}return i(t,e),p(t,[{key:"componentWillMount",value:function(){var e=this;this.state={dataSourceUi:[]},this.props.dataSource.map(function(t,a){l(e.state.dataSourceUi,t,a+1,e.props)})}},{key:"getChildContext",value:function(){return{addable:this.props.addable,searchable:this.props.searchable,sortable:this.props.sortable,listClassName:this.props.listClassName,inputName:this.props.inputName,showCheckbox:this.props.showCheckbox,showDeleteBtn:this.props.showDeleteBtn,checkBoxName:this.props.checkBoxName,onChecked:this.onChecked,removeItem:this.removeItem,sortItem:this.sortItem,addItem:this.addItem,dataSourceUi:this.state.dataSourceUi}}},{key:"getList",value:function(){return f.default.createElement(y.default,null)}}]),t}(b.default);t.default=g,g.propTypes=u({},b.default.propTypes,{id:f.default.PropTypes.string,nickname:f.default.PropTypes.string,avatar:f.default.PropTypes.string,isVisible:f.default.PropTypes.string,replaceItem:f.default.PropTypes.bool,showCheckbox:f.default.PropTypes.bool,showDeleteBtn:f.default.PropTypes.bool}),g.defaultProps=u({},b.default.defaultProps,{id:"id",nickname:"nickname",avatar:"avatar",isVisible:"isVisible",replaceItem:!1,showCheckbox:!0,showDeleteBtn:!0}),g.childContextTypes=u({},b.default.childContextTypes,{showCheckbox:f.default.PropTypes.bool,showDeleteBtn:f.default.PropTypes.bool,checkBoxName:f.default.PropTypes.string,onChecked:f.default.PropTypes.func})},c4c0c592951b81e54f85:function(e,t,a){"use strict";function o(e){return e&&e.__esModule?e:{default:e}}var n=a("5fdcf1aea784583ca083"),r=o(n),i=a("33a776824bec073629e5"),s=o(i),l=a("55e73d7afebf9c74b73e"),c=o(l);r.default.render(s.default.createElement(c.default,function(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}({showAddBtnGroup:!1,showDeleteBtn:!1,sortable:!0,showCheckbox:!1,addable:!0,outputDataElement:"teachers",searchable:{enable:!1},inputName:"teacherIds[]",dataSource:$("#classroom-manage-set-teachers").data("teachers")},"showAddBtnGroup",!1)),document.getElementById("classroom-manage-set-teachers"))},d0399763e3c229c64154:function(e,t,a){"use strict";function o(e){return e&&e.__esModule?e:{default:e}}function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var s=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var o in a)Object.prototype.hasOwnProperty.call(a,o)&&(e[o]=a[o])}return e},l=function(){function e(e,t){for(var a=0;a<t.length;a++){var o=t[a];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,a,o){return a&&e(t.prototype,a),o&&e(t,o),t}}(),c=a("33a776824bec073629e5"),u=o(c),p=a("8f840897d9471c8c1fbd"),d=(o(p),a("3fb32ce3bf28bfad7e02"),a("fdfc24440b4845bd47af")),f=o(d),m=function(e){function t(e){return n(this,t),r(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e))}return i(t,e),l(t,[{key:"render",value:function(){var e=this,t=this.context,a=t.dataSourceUi,o=t.listClassName,n=t.sortable,r=t.showCheckbox,i=t.showDeleteBtn,s=t.checkBoxName,l=t.inputName,c="";return a.length>0&&(c="list-group"),u.default.createElement("ul",{id:this.listId,className:"multi-list sortable-list "+c+" "+o},a.map(function(t,a){return u.default.createElement("li",{className:"list-group-item",id:t.itemId,key:a,"data-seq":t.seq},n&&u.default.createElement("i",{className:"es-icon es-icon-yidong mrl color-gray inline-block vertical-middle"}),u.default.createElement("img",{className:"avatar-sm avatar-sm-square mrm",src:t.avatar}),u.default.createElement("span",{className:"label-name text-overflow inline-block vertical-middle"},t.nickname),u.default.createElement("label",{className:r?"":"hidden"},u.default.createElement("input",{type:"checkbox",name:s+t.id,checked:t.isVisible,onChange:function(t){return e.context.onChecked(t)},value:t.itemId}),Translator.trans("course.manage.teacher_display_label")),u.default.createElement("a",{className:i?"pull-right link-gray mtm":"hidden",onClick:function(t){return e.context.removeItem(t)},"data-item-id":t.itemId},u.default.createElement("i",{className:"es-icon es-icon-close01 text-12"})),u.default.createElement("input",{type:"hidden",name:l,value:t.id}))}))}}]),t}(f.default);t.default=m,m.contextTypes=s({},f.default.contextTypes,{showCheckbox:u.default.PropTypes.bool,showDeleteBtn:u.default.PropTypes.bool,checkBoxName:u.default.PropTypes.string,onChecked:u.default.PropTypes.func})},d5edd94aba2c5d017a51:function(e,t,a){var o=a("d5edd94aba2c5d017a5d");"string"==typeof o&&(o=[[e.i,o,""]]);var n={insertAt:"top",hmr:!0};n.transform=void 0;a("3296c0d42e5b7cde21ad")(o,n);o.locals&&(e.exports=o.locals)},d5edd94aba2c5d017a5d:function(e,t,a){t=e.exports=a("e7f1add7f34e416618de")(void 0),t.push([e.i,".multi-group {\n  position: relative;\n}\n.multi-group .multi-list {\n  margin-bottom: 0;\n}\n.multi-group .list-group {\n  margin-bottom: 20px;\n}\n.multi-group .list-group .list-group-item {\n  padding: 10px 40px;\n  cursor: move;\n}\n.multi-group .list-group .drag-icon-btn,\n.multi-group .list-group .move-icon-btn {\n  position: absolute;\n}\n.multi-group .list-group .drag-icon-btn {\n  left: 10px;\n  top: 14px;\n}\n.multi-group .list-group .move-icon-btn {\n  right: 10px;\n  top: 10px;\n}\n.multi-group .list-group .move-icon-btn i {\n  font-size: 14px;\n}\n.multi-group .list-group .placeholder {\n  margin-bottom: 0;\n}\n.multi-group .list-group .label-name {\n  width: 160px;\n}\n",""])}},["c4c0c592951b81e54f85"]);