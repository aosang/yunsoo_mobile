if (typeof Promise !== "undefined" && !Promise.prototype.finally) {
  Promise.prototype.finally = function(callback) {
    const promise = this.constructor;
    return this.then(
      (value) => promise.resolve(callback()).then(() => value),
      (reason) => promise.resolve(callback()).then(() => {
        throw reason;
      })
    );
  };
}
;
if (typeof uni !== "undefined" && uni && uni.requireGlobal) {
  const global = uni.requireGlobal();
  ArrayBuffer = global.ArrayBuffer;
  Int8Array = global.Int8Array;
  Uint8Array = global.Uint8Array;
  Uint8ClampedArray = global.Uint8ClampedArray;
  Int16Array = global.Int16Array;
  Uint16Array = global.Uint16Array;
  Int32Array = global.Int32Array;
  Uint32Array = global.Uint32Array;
  Float32Array = global.Float32Array;
  Float64Array = global.Float64Array;
  BigInt64Array = global.BigInt64Array;
  BigUint64Array = global.BigUint64Array;
}
;
if (uni.restoreGlobal) {
  uni.restoreGlobal(Vue, weex, plus, setTimeout, clearTimeout, setInterval, clearInterval);
}
(function(vue) {
  "use strict";
  function addUnit(num) {
    return Number.isNaN(Number(num)) ? `${num}` : `${num}px`;
  }
  function isObj(value) {
    return Object.prototype.toString.call(value) === "[object Object]" || typeof value === "object";
  }
  function getType(target) {
    const typeStr = Object.prototype.toString.call(target);
    const match = typeStr.match(/\[object (\w+)\]/);
    const type = match && match.length ? match[1].toLowerCase() : "";
    return type;
  }
  const isDef = (value) => value !== void 0 && value !== null;
  function kebabCase(word) {
    const newWord = word.replace(/[A-Z]/g, function(match) {
      return "-" + match;
    }).toLowerCase();
    return newWord;
  }
  function isArray(value) {
    if (typeof Array.isArray === "function") {
      return Array.isArray(value);
    }
    return Object.prototype.toString.call(value) === "[object Array]";
  }
  function isString(value) {
    return getType(value) === "string";
  }
  function objToStyle(styles) {
    if (isArray(styles)) {
      const result = styles.filter(function(item) {
        return item != null && item !== "";
      }).map(function(item) {
        return objToStyle(item);
      }).join(";");
      return result ? result.endsWith(";") ? result : result + ";" : "";
    }
    if (isString(styles)) {
      return styles ? styles.endsWith(";") ? styles : styles + ";" : "";
    }
    if (isObj(styles)) {
      const result = Object.keys(styles).filter(function(key) {
        return styles[key] != null && styles[key] !== "";
      }).map(function(key) {
        return [kebabCase(key), styles[key]].join(":");
      }).join(";");
      return result ? result.endsWith(";") ? result : result + ";" : "";
    }
    return "";
  }
  const numericProp = [Number, String];
  const makeRequiredProp = (type) => ({
    type,
    required: true
  });
  const makeBooleanProp = (defaultVal) => ({
    type: Boolean,
    default: defaultVal
  });
  const makeNumberProp = (defaultVal) => ({
    type: Number,
    default: defaultVal
  });
  const makeStringProp = (defaultVal) => ({
    type: String,
    default: defaultVal
  });
  const baseProps = {
    /**
     * 自定义根节点样式
     */
    customStyle: makeStringProp(""),
    /**
     * 自定义根节点样式类
     */
    customClass: makeStringProp("")
  };
  const iconProps = {
    ...baseProps,
    /**
     * 使用的图标名字，可以使用链接图片
     */
    name: makeRequiredProp(String),
    /**
     * 图标的颜色
     */
    color: String,
    /**
     * 图标的字体大小
     */
    size: numericProp,
    /**
     * 类名前缀，用于使用自定义图标
     */
    classPrefix: makeStringProp("wd-icon")
  };
  const __default__$3 = {
    name: "wd-icon",
    options: {
      virtualHost: true,
      addGlobalClass: true,
      styleIsolation: "shared"
    }
  };
  const _sfc_main$8 = /* @__PURE__ */ vue.defineComponent({
    ...__default__$3,
    props: iconProps,
    emits: ["click", "touch"],
    setup(__props, { expose: __expose, emit: __emit }) {
      __expose();
      const props = __props;
      const emit = __emit;
      const isImage = vue.computed(() => {
        return isDef(props.name) && props.name.includes("/");
      });
      const rootClass = vue.computed(() => {
        const prefix = props.classPrefix;
        return `${prefix} ${props.customClass} ${isImage.value ? "wd-icon--image" : prefix + "-" + props.name}`;
      });
      const rootStyle = vue.computed(() => {
        const style = {};
        if (props.color) {
          style["color"] = props.color;
        }
        if (props.size) {
          style["font-size"] = addUnit(props.size);
        }
        return `${objToStyle(style)} ${props.customStyle}`;
      });
      function handleClick(event) {
        emit("click", event);
      }
      const __returned__ = { props, emit, isImage, rootClass, rootStyle, handleClick };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  });
  const _export_sfc = (sfc, props) => {
    const target = sfc.__vccOpts || sfc;
    for (const [key, val] of props) {
      target[key] = val;
    }
    return target;
  };
  function _sfc_render$7(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        onClick: $setup.handleClick,
        class: vue.normalizeClass($setup.rootClass),
        style: vue.normalizeStyle($setup.rootStyle)
      },
      [
        $setup.isImage ? (vue.openBlock(), vue.createElementBlock("image", {
          key: 0,
          class: "wd-icon__image",
          src: _ctx.name
        }, null, 8, ["src"])) : vue.createCommentVNode("v-if", true)
      ],
      6
      /* CLASS, STYLE */
    );
  }
  const wdIcon = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["render", _sfc_render$7], ["__scopeId", "data-v-24906af6"], ["__file", "/Users/wangle/Desktop/yunsoo_mobile/uni_modules/wot-design-uni/components/wd-icon/wd-icon.vue"]]);
  function formatAppLog(type, filename, ...args) {
    if (uni.__log__) {
      uni.__log__(type, filename, ...args);
    } else {
      console[type].apply(console, [...args, filename]);
    }
  }
  function resolveEasycom(component, easycom) {
    return typeof component === "string" ? easycom : component;
  }
  function useParent(key) {
    const parent = vue.inject(key, null);
    if (parent) {
      const instance = vue.getCurrentInstance();
      const { link, unlink, internalChildren } = parent;
      link(instance);
      vue.onUnmounted(() => unlink(instance));
      const index = vue.computed(() => internalChildren.indexOf(instance));
      return {
        parent,
        index
      };
    }
    return {
      parent: null,
      index: vue.ref(-1)
    };
  }
  const ROW_KEY = Symbol("wd-row");
  const rowProps = {
    ...baseProps,
    /**
     * 列元素之间的间距（单位为px）
     */
    gutter: makeNumberProp(0)
  };
  const colProps = {
    ...baseProps,
    /**
     * 列元素宽度
     */
    span: makeNumberProp(24),
    /**
     * 列元素偏移距离
     */
    offset: makeNumberProp(0)
  };
  const __default__$2 = {
    name: "wd-col",
    options: {
      addGlobalClass: true,
      virtualHost: true,
      styleIsolation: "shared"
    }
  };
  const _sfc_main$7 = /* @__PURE__ */ vue.defineComponent({
    ...__default__$2,
    props: colProps,
    setup(__props, { expose: __expose }) {
      __expose();
      const props = __props;
      const { parent: row } = useParent(ROW_KEY);
      const rootStyle = vue.computed(() => {
        const gutter = isDef(row) ? row.props.gutter || 0 : 0;
        const padding = `${gutter / 2}px`;
        const style = gutter > 0 ? `padding-left: ${padding}; padding-right: ${padding};background-clip: content-box;` : "";
        return `${style}${props.customStyle}`;
      });
      vue.watch([() => props.span, () => props.offset], () => {
        check();
      });
      function check() {
        const { span, offset } = props;
        if (span < 0 || offset < 0) {
          formatAppLog("error", "at uni_modules/wot-design-uni/components/wd-col/wd-col.vue:42", "[wot-design] warning(wd-col): attribute span/offset must be greater than or equal to 0");
        }
      }
      const __returned__ = { props, row, rootStyle, check };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  });
  function _sfc_render$6(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: vue.normalizeClass(["wd-col", _ctx.span && "wd-col__" + _ctx.span, _ctx.offset && "wd-col__offset-" + _ctx.offset, _ctx.customClass]),
        style: vue.normalizeStyle($setup.rootStyle)
      },
      [
        vue.createCommentVNode(" 每一列 "),
        vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
      ],
      6
      /* CLASS, STYLE */
    );
  }
  const __easycom_1 = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["render", _sfc_render$6], ["__scopeId", "data-v-2afa91f2"], ["__file", "/Users/wangle/Desktop/yunsoo_mobile/uni_modules/wot-design-uni/components/wd-col/wd-col.vue"]]);
  function isVNode(value) {
    return value ? value.__v_isVNode === true : false;
  }
  function flattenVNodes(children) {
    const result = [];
    const traverse = (children2) => {
      if (Array.isArray(children2)) {
        children2.forEach((child) => {
          var _a;
          if (isVNode(child)) {
            result.push(child);
            if ((_a = child.component) == null ? void 0 : _a.subTree) {
              result.push(child.component.subTree);
              traverse(child.component.subTree.children);
            }
            if (child.children) {
              traverse(child.children);
            }
          }
        });
      }
    };
    traverse(children);
    return result;
  }
  const findVNodeIndex = (vnodes, vnode) => {
    const index = vnodes.indexOf(vnode);
    if (index === -1) {
      return vnodes.findIndex((item) => vnode.key !== void 0 && vnode.key !== null && item.type === vnode.type && item.key === vnode.key);
    }
    return index;
  };
  function sortChildren(parent, publicChildren, internalChildren) {
    const vnodes = parent && parent.subTree && parent.subTree.children ? flattenVNodes(parent.subTree.children) : [];
    internalChildren.sort((a, b) => findVNodeIndex(vnodes, a.vnode) - findVNodeIndex(vnodes, b.vnode));
    const orderedPublicChildren = internalChildren.map((item) => item.proxy);
    publicChildren.sort((a, b) => {
      const indexA = orderedPublicChildren.indexOf(a);
      const indexB = orderedPublicChildren.indexOf(b);
      return indexA - indexB;
    });
  }
  function useChildren(key) {
    const publicChildren = vue.reactive([]);
    const internalChildren = vue.reactive([]);
    const parent = vue.getCurrentInstance();
    const linkChildren = (value) => {
      const link = (child) => {
        if (child.proxy) {
          internalChildren.push(child);
          publicChildren.push(child.proxy);
          sortChildren(parent, publicChildren, internalChildren);
        }
      };
      const unlink = (child) => {
        const index = internalChildren.indexOf(child);
        publicChildren.splice(index, 1);
        internalChildren.splice(index, 1);
      };
      vue.provide(
        key,
        Object.assign(
          {
            link,
            unlink,
            children: publicChildren,
            internalChildren
          },
          value
        )
      );
    };
    return {
      children: publicChildren,
      linkChildren
    };
  }
  const __default__$1 = {
    name: "wd-row",
    options: {
      virtualHost: true,
      addGlobalClass: true,
      styleIsolation: "shared"
    }
  };
  const _sfc_main$6 = /* @__PURE__ */ vue.defineComponent({
    ...__default__$1,
    props: rowProps,
    setup(__props, { expose: __expose }) {
      __expose();
      const props = __props;
      const { linkChildren } = useChildren(ROW_KEY);
      linkChildren({ props });
      const rowStyle = vue.computed(() => {
        const style = {};
        const { gutter } = props;
        if (gutter < 0) {
          formatAppLog("error", "at uni_modules/wot-design-uni/components/wd-row/wd-row.vue:32", "[wot ui] warning(wd-row): attribute gutter must be greater than or equal to 0");
        } else if (gutter) {
          style.marginLeft = addUnit(gutter / 2);
          style.marginRight = addUnit(gutter / 2);
        }
        return `${objToStyle(style)}${props.customStyle}`;
      });
      const __returned__ = { props, linkChildren, rowStyle };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  });
  function _sfc_render$5(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: vue.normalizeClass(`wd-row ${_ctx.customClass}`),
        style: vue.normalizeStyle($setup.rowStyle)
      },
      [
        vue.createCommentVNode(" 每一行 "),
        vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
      ],
      6
      /* CLASS, STYLE */
    );
  }
  const __easycom_2 = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["render", _sfc_render$5], ["__scopeId", "data-v-88acc730"], ["__file", "/Users/wangle/Desktop/yunsoo_mobile/uni_modules/wot-design-uni/components/wd-row/wd-row.vue"]]);
  const _sfc_main$5 = {};
  function _sfc_render$4(_ctx, _cache) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "navigation_bar" });
  }
  const Navigation = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["render", _sfc_render$4], ["__scopeId", "data-v-6082cd98"], ["__file", "/Users/wangle/Desktop/yunsoo_mobile/components/navigation_header.vue"]]);
  const _sfc_main$4 = {
    __name: "index",
    setup(__props, { expose: __expose }) {
      __expose();
      vue.onMounted(() => {
      });
      const myData = vue.ref([]);
      const __returned__ = { myData, Navigation, ref: vue.ref, onMounted: vue.onMounted };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  };
  function _sfc_render$3(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_wd_icon = resolveEasycom(vue.resolveDynamicComponent("wd-icon"), wdIcon);
    const _component_wd_col = resolveEasycom(vue.resolveDynamicComponent("wd-col"), __easycom_1);
    const _component_wd_row = resolveEasycom(vue.resolveDynamicComponent("wd-row"), __easycom_2);
    return vue.openBlock(), vue.createElementBlock("view", { class: "content" }, [
      vue.createVNode($setup["Navigation"]),
      vue.createElementVNode("view", { class: "home_bg" }, [
        vue.createElementVNode("view", { class: "home_info" }, [
          vue.createElementVNode("text", null, "Yunsoo云梳"),
          vue.createElementVNode("text", null, "xiaole2071")
        ]),
        vue.createElementVNode("view", { class: "home_bg_banner" }, [
          vue.createElementVNode("image", {
            src: "https://www.wangle.run/yunsoo_wrap/yunsoo_banner.png",
            mode: "widthFix"
          })
        ])
      ]),
      vue.createCommentVNode(" nav "),
      vue.createElementVNode("view", { class: "home_nav" }, [
        vue.createVNode(_component_wd_row, null, {
          default: vue.withCtx(() => [
            vue.createVNode(_component_wd_col, { span: 6 }, {
              default: vue.withCtx(() => [
                vue.createElementVNode("view", { class: "home_nav_item home_nav_inventory" }, [
                  vue.createVNode(_component_wd_icon, {
                    name: "a-controlplatform",
                    size: "32px",
                    color: "#fff"
                  })
                ]),
                vue.createElementVNode("text", { class: "home_nav_text" }, "库存管理")
              ]),
              _: 1
              /* STABLE */
            }),
            vue.createVNode(_component_wd_col, { span: 6 }, {
              default: vue.withCtx(() => [
                vue.createElementVNode("view", { class: "home_nav_item home_nav_inspection" }, [
                  vue.createVNode(_component_wd_icon, {
                    name: "check-circle",
                    size: "32px",
                    color: "#fff"
                  })
                ]),
                vue.createElementVNode("text", { class: "home_nav_text" }, "巡检记录")
              ]),
              _: 1
              /* STABLE */
            }),
            vue.createVNode(_component_wd_col, { span: 6 }, {
              default: vue.withCtx(() => [
                vue.createElementVNode("view", { class: "home_nav_item home_nav_library" }, [
                  vue.createVNode(_component_wd_icon, {
                    name: "folder",
                    size: "32px",
                    color: "#fff"
                  })
                ]),
                vue.createElementVNode("text", { class: "home_nav_text" }, "知识库")
              ]),
              _: 1
              /* STABLE */
            }),
            vue.createVNode(_component_wd_col, { span: 6 }, {
              default: vue.withCtx(() => [
                vue.createElementVNode("view", { class: "home_nav_item home_nav_user" }, [
                  vue.createVNode(_component_wd_icon, {
                    name: "usergroup",
                    size: "32px",
                    color: "#fff"
                  })
                ]),
                vue.createElementVNode("text", { class: "home_nav_text" }, "人员管理")
              ]),
              _: 1
              /* STABLE */
            })
          ]),
          _: 1
          /* STABLE */
        })
      ]),
      vue.createCommentVNode(" 工单信息 "),
      vue.createElementVNode("view", { class: "home_nav_title" }, [
        vue.createElementVNode("view", { class: "home_nav_subtitle" }, "工单信息"),
        vue.createElementVNode("view", { class: "home_workorder" }, [
          vue.createElementVNode("view", { class: "home_workorder_item" }),
          vue.createElementVNode("view", { class: "home_workorder_item" }),
          vue.createElementVNode("view", { class: "home_workorder_item" }),
          vue.createElementVNode("view", { class: "home_workorder_item" })
        ])
      ])
    ]);
  }
  const PagesIndexIndex = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["render", _sfc_render$3], ["__file", "/Users/wangle/Desktop/yunsoo_mobile/pages/index/index.vue"]]);
  const _sfc_main$3 = {
    data() {
      return {};
    },
    methods: {}
  };
  function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", null, " Workorder ");
  }
  const PagesWorkorderWorkorder = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["render", _sfc_render$2], ["__file", "/Users/wangle/Desktop/yunsoo_mobile/pages/workorder/workorder.vue"]]);
  const _b64chars = [..."ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"];
  const _mkUriSafe = (src) => src.replace(/[+/]/g, (m0) => m0 === "+" ? "-" : "_").replace(/=+\$/m, "");
  const fromUint8Array = (src, rfc4648 = false) => {
    let b64 = "";
    for (let i = 0, l = src.length; i < l; i += 3) {
      const [a0, a1, a2] = [src[i], src[i + 1], src[i + 2]];
      const ord = a0 << 16 | a1 << 8 | a2;
      b64 += _b64chars[ord >>> 18];
      b64 += _b64chars[ord >>> 12 & 63];
      b64 += typeof a1 !== "undefined" ? _b64chars[ord >>> 6 & 63] : "=";
      b64 += typeof a2 !== "undefined" ? _b64chars[ord & 63] : "=";
    }
    return rfc4648 ? _mkUriSafe(b64) : b64;
  };
  const _btoa = typeof btoa === "function" ? (s) => btoa(s) : (s) => {
    if (s.charCodeAt(0) > 255) {
      throw new RangeError("The string contains invalid characters.");
    }
    return fromUint8Array(Uint8Array.from(s, (c) => c.charCodeAt(0)));
  };
  const utob = (src) => unescape(encodeURIComponent(src));
  function encode(src, rfc4648 = false) {
    const b64 = _btoa(utob(src));
    return rfc4648 ? _mkUriSafe(b64) : b64;
  }
  const buttonProps = {
    ...baseProps,
    /**
     * 幽灵按钮
     */
    plain: makeBooleanProp(false),
    /**
     * 圆角按钮
     */
    round: makeBooleanProp(true),
    /**
     * 禁用按钮
     */
    disabled: makeBooleanProp(false),
    /**
     * 是否细边框
     */
    hairline: makeBooleanProp(false),
    /**
     * 块状按钮
     */
    block: makeBooleanProp(false),
    /**
     * 按钮类型，可选值：primary / success / info / warning / error / text / icon
     */
    type: makeStringProp("primary"),
    /**
     * 按钮尺寸，可选值：small / medium / large
     */
    size: makeStringProp("medium"),
    /**
     * 图标类名
     */
    icon: String,
    /**
     * 类名前缀，用于使用自定义图标，用法参考Icon组件
     */
    classPrefix: makeStringProp("wd-icon"),
    /**
     * 加载中按钮
     */
    loading: makeBooleanProp(false),
    /**
     * 加载图标颜色
     */
    loadingColor: String,
    /**
     * 开放能力
     */
    openType: String,
    /**
     * 指定是否阻止本节点的祖先节点出现点击态
     */
    hoverStopPropagation: Boolean,
    /**
     * 指定返回用户信息的语言，zh_CN 简体中文，zh_TW 繁体中文，en 英文
     */
    lang: String,
    /**
     * 会话来源，open-type="contact"时有效
     */
    sessionFrom: String,
    /**
     * 会话内消息卡片标题，open-type="contact"时有效
     */
    sendMessageTitle: String,
    /**
     * 会话内消息卡片点击跳转小程序路径，open-type="contact"时有效
     */
    sendMessagePath: String,
    /**
     * 会话内消息卡片图片，open-type="contact"时有效
     */
    sendMessageImg: String,
    /**
     * 打开 APP 时，向 APP 传递的参数，open-type=launchApp时有效
     */
    appParameter: String,
    /**
     * 是否显示会话内消息卡片，设置此参数为 true，用户进入客服会话会在右下角显示"可能要发送的小程序"提示，用户点击后可以快速发送小程序消息，open-type="contact"时有效
     */
    showMessageCard: Boolean,
    /**
     * 按钮的唯一标识，可用于设置隐私同意授权按钮的id
     */
    buttonId: String,
    /**
     * 支付宝小程序，当 open-type 为 getAuthorize 时有效。
     * 可选值：'phoneNumber' | 'userInfo'
     */
    scope: String
  };
  const __default__ = {
    name: "wd-button",
    options: {
      addGlobalClass: true,
      virtualHost: true,
      styleIsolation: "shared"
    }
  };
  const _sfc_main$2 = /* @__PURE__ */ vue.defineComponent({
    ...__default__,
    props: buttonProps,
    emits: [
      "click",
      "getuserinfo",
      "contact",
      "getphonenumber",
      "error",
      "launchapp",
      "opensetting",
      "chooseavatar",
      "agreeprivacyauthorization"
    ],
    setup(__props, { expose: __expose, emit: __emit }) {
      __expose();
      const loadingIcon = (color = "#4D80F0", reverse = true) => {
        return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 42 42"><defs><linearGradient x1="100%" y1="0%" x2="0%" y2="0%" id="a"><stop stop-color="${reverse ? color : "#fff"}" offset="0%" stop-opacity="0"/><stop stop-color="${reverse ? color : "#fff"}" offset="100%"/></linearGradient></defs><g fill="none" fill-rule="evenodd"><path d="M21 1c11.046 0 20 8.954 20 20s-8.954 20-20 20S1 32.046 1 21 9.954 1 21 1zm0 7C13.82 8 8 13.82 8 21s5.82 13 13 13 13-5.82 13-13S28.18 8 21 8z" fill="${reverse ? "#fff" : color}"/><path d="M4.599 21c0 9.044 7.332 16.376 16.376 16.376 9.045 0 16.376-7.332 16.376-16.376" stroke="url(#a)" stroke-width="3.5" stroke-linecap="round"/></g></svg>`;
      };
      const props = __props;
      const emit = __emit;
      const hoverStartTime = vue.ref(20);
      const hoverStayTime = vue.ref(70);
      const loadingIconSvg = vue.ref("");
      const loadingStyle = vue.computed(() => {
        return `background-image: url(${loadingIconSvg.value});`;
      });
      vue.watch(
        () => props.loading,
        () => {
          buildLoadingSvg();
        },
        { deep: true, immediate: true }
      );
      function handleClick(event) {
        if (!props.disabled && !props.loading) {
          emit("click", event);
        }
      }
      function handleGetAuthorize(event) {
        if (props.scope === "phoneNumber") {
          handleGetphonenumber(event);
        } else if (props.scope === "userInfo") {
          handleGetuserinfo(event);
        }
      }
      function handleGetuserinfo(event) {
        emit("getuserinfo", event.detail);
      }
      function handleConcat(event) {
        emit("contact", event.detail);
      }
      function handleGetphonenumber(event) {
        emit("getphonenumber", event.detail);
      }
      function handleError(event) {
        emit("error", event.detail);
      }
      function handleLaunchapp(event) {
        emit("launchapp", event.detail);
      }
      function handleOpensetting(event) {
        emit("opensetting", event.detail);
      }
      function handleChooseavatar(event) {
        emit("chooseavatar", event.detail);
      }
      function handleAgreePrivacyAuthorization(event) {
        emit("agreeprivacyauthorization", event.detail);
      }
      function buildLoadingSvg() {
        const { loadingColor, type, plain } = props;
        let color = loadingColor;
        if (!color) {
          switch (type) {
            case "primary":
              color = "#4D80F0";
              break;
            case "success":
              color = "#34d19d";
              break;
            case "info":
              color = "#333";
              break;
            case "warning":
              color = "#f0883a";
              break;
            case "error":
              color = "#fa4350";
              break;
            case "default":
              color = "#333";
              break;
          }
        }
        const svg = loadingIcon(color, !plain);
        loadingIconSvg.value = `"data:image/svg+xml;base64,${encode(svg)}"`;
      }
      const __returned__ = { loadingIcon, props, emit, hoverStartTime, hoverStayTime, loadingIconSvg, loadingStyle, handleClick, handleGetAuthorize, handleGetuserinfo, handleConcat, handleGetphonenumber, handleError, handleLaunchapp, handleOpensetting, handleChooseavatar, handleAgreePrivacyAuthorization, buildLoadingSvg, wdIcon };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  });
  function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("button", {
      id: _ctx.buttonId,
      "hover-class": `${_ctx.disabled || _ctx.loading ? "" : "wd-button--active"}`,
      style: vue.normalizeStyle(_ctx.customStyle),
      class: vue.normalizeClass([
        "wd-button",
        "is-" + _ctx.type,
        "is-" + _ctx.size,
        _ctx.round ? "is-round" : "",
        _ctx.hairline ? "is-hairline" : "",
        _ctx.plain ? "is-plain" : "",
        _ctx.disabled ? "is-disabled" : "",
        _ctx.block ? "is-block" : "",
        _ctx.loading ? "is-loading" : "",
        _ctx.customClass
      ]),
      "hover-start-time": $setup.hoverStartTime,
      "hover-stay-time": $setup.hoverStayTime,
      "open-type": _ctx.disabled || _ctx.loading ? void 0 : _ctx.openType,
      "send-message-title": _ctx.sendMessageTitle,
      "send-message-path": _ctx.sendMessagePath,
      "send-message-img": _ctx.sendMessageImg,
      "app-parameter": _ctx.appParameter,
      "show-message-card": _ctx.showMessageCard,
      "session-from": _ctx.sessionFrom,
      lang: _ctx.lang,
      "hover-stop-propagation": _ctx.hoverStopPropagation,
      scope: _ctx.scope,
      onClick: $setup.handleClick,
      "on:getAuthorize": $setup.handleGetAuthorize,
      onGetuserinfo: $setup.handleGetuserinfo,
      onContact: $setup.handleConcat,
      onGetphonenumber: $setup.handleGetphonenumber,
      onError: $setup.handleError,
      onLaunchapp: $setup.handleLaunchapp,
      onOpensetting: $setup.handleOpensetting,
      onChooseavatar: $setup.handleChooseavatar,
      onAgreeprivacyauthorization: $setup.handleAgreePrivacyAuthorization
    }, [
      vue.createElementVNode("view", { class: "wd-button__content" }, [
        _ctx.loading ? (vue.openBlock(), vue.createElementBlock("view", {
          key: 0,
          class: "wd-button__loading"
        }, [
          vue.createElementVNode(
            "view",
            {
              class: "wd-button__loading-svg",
              style: vue.normalizeStyle($setup.loadingStyle)
            },
            null,
            4
            /* STYLE */
          )
        ])) : _ctx.icon ? (vue.openBlock(), vue.createBlock($setup["wdIcon"], {
          key: 1,
          "custom-class": "wd-button__icon",
          name: _ctx.icon,
          classPrefix: _ctx.classPrefix
        }, null, 8, ["name", "classPrefix"])) : vue.createCommentVNode("v-if", true),
        vue.createElementVNode("view", { class: "wd-button__text" }, [
          vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
        ])
      ])
    ], 46, ["id", "hover-class", "hover-start-time", "hover-stay-time", "open-type", "send-message-title", "send-message-path", "send-message-img", "app-parameter", "show-message-card", "session-from", "lang", "hover-stop-propagation", "scope"]);
  }
  const __easycom_0 = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render$1], ["__scopeId", "data-v-d858c170"], ["__file", "/Users/wangle/Desktop/yunsoo_mobile/uni_modules/wot-design-uni/components/wd-button/wd-button.vue"]]);
  const _sfc_main$1 = {
    data() {
      return {};
    },
    methods: {}
  };
  function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_wd_button = resolveEasycom(vue.resolveDynamicComponent("wd-button"), __easycom_0);
    return vue.openBlock(), vue.createElementBlock("view", null, [
      vue.createVNode(_component_wd_button, { type: "info" }, {
        default: vue.withCtx(() => [
          vue.createTextVNode("信息按钮")
        ]),
        _: 1
        /* STABLE */
      })
    ]);
  }
  const PagesProfileProfile = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render], ["__file", "/Users/wangle/Desktop/yunsoo_mobile/pages/profile/profile.vue"]]);
  __definePage("pages/index/index", PagesIndexIndex);
  __definePage("pages/workorder/workorder", PagesWorkorderWorkorder);
  __definePage("pages/profile/profile", PagesProfileProfile);
  const _sfc_main = {
    // onLaunch: function() {
    // 	__f__('log','at App.vue:4','App Launch')
    // },
    // onShow: function() {
    // 	__f__('log','at App.vue:7','App Show')
    // },
    // onHide: function() {
    // 	__f__('log','at App.vue:10','App Hide')
    // }
  };
  const App = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "/Users/wangle/Desktop/yunsoo_mobile/App.vue"]]);
  function createApp() {
    const app = vue.createVueApp(App);
    return {
      app
    };
  }
  const { app: __app__, Vuex: __Vuex__, Pinia: __Pinia__ } = createApp();
  uni.Vuex = __Vuex__;
  uni.Pinia = __Pinia__;
  __app__.provide("__globalStyles", __uniConfig.styles);
  __app__._component.mpType = "app";
  __app__._component.render = () => {
  };
  __app__.mount("#app");
})(Vue);
