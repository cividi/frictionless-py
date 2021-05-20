(window.webpackJsonp=window.webpackJsonp||[]).push([[62],{135:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return o})),n.d(t,"metadata",(function(){return l})),n.d(t,"toc",(function(){return c})),n.d(t,"default",(function(){return u}));var r=n(3),a=n(8),i=(n(0),n(161)),o={title:"Working with API"},l={unversionedId:"tutorials/working-with-api",id:"tutorials/working-with-api",isDocsHomePage:!1,title:"Working with API",description:"This functionality requires an experimental server plugin. Read More",source:"@site/../docs/tutorials/working-with-api.md",slug:"/tutorials/working-with-api",permalink:"/docs/tutorials/working-with-api",editUrl:"https://github.com/frictionlessdata/frictionless-py/edit/master/docs/../docs/tutorials/working-with-api.md",version:"current",lastUpdatedBy:"Lilly Winfree",lastUpdatedAt:1621493342,formattedLastUpdatedAt:"5/20/2021",sidebar:"tutorials",previous:{title:"Working with CLI",permalink:"/docs/tutorials/working-with-cli"},next:{title:"Buffer Tutorial",permalink:"/docs/tutorials/schemes/buffer-tutorial"}},c=[{value:"Install",id:"install",children:[]},{value:"Server",id:"server",children:[]},{value:"Inputs",id:"inputs",children:[]},{value:"Ouputs",id:"ouputs",children:[]},{value:"Debug",id:"debug",children:[]}],s={toc:c};function u(e){var t=e.components,n=Object(a.a)(e,["components"]);return Object(i.b)("wrapper",Object(r.a)({},s,n,{components:t,mdxType:"MDXLayout"}),Object(i.b)("blockquote",null,Object(i.b)("p",{parentName:"blockquote"},"This functionality requires an experimental ",Object(i.b)("inlineCode",{parentName:"p"},"server")," plugin. ",Object(i.b)("a",{parentName:"p",href:"/docs/references/plugins-reference"},"Read More"))),Object(i.b)("p",null,"It's possible to start Frictionless API as a standalone server. This capability is highly experimental at the moment and ",Object(i.b)("strong",{parentName:"p"},"it's not tested to be secure"),". Please don't use the server in production environment."),Object(i.b)("h2",{id:"install"},"Install"),Object(i.b)("p",null,"The API server are shipped as plugin so you need to install it with the core framework:"),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre",className:"language-bash",metastring:'title="CLI"',title:'"CLI"'},"pip install frictionless[server]\n")),Object(i.b)("h2",{id:"server"},"Server"),Object(i.b)("p",null,"It's simple to start the API server:"),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre",className:"language-bash",metastring:'title="CLI"',title:'"CLI"'},"frictionless api\n")),Object(i.b)("p",null,"Not you can make HTTP calls to:"),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre"},"http://localhost:8000\n")),Object(i.b)("p",null,"The API is the same as Python and Command-Line interfaces use."),Object(i.b)("h2",{id:"inputs"},"Inputs"),Object(i.b)("p",null,"All input data is expected to be in JSON format, for exmaple:"),Object(i.b)("blockquote",null,Object(i.b)("p",{parentName:"blockquote"},"[POST]"," http://localhost:8000/extract")),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre",className:"language-json",metastring:'title="API"',title:'"API"'},'{\n    "source": "data/table.csv"\n}\n')),Object(i.b)("h2",{id:"ouputs"},"Ouputs"),Object(i.b)("p",null,"All output data will be in JSON format, for example:"),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre",className:"language-json",metastring:'title="API"',title:'"API"'},'[\n    {\n        "id": 1,\n        "name": "english"\n    },\n    {\n        "id": 2,\n        "name": "\u4e2d\u56fd\u4eba"\n    }\n]\n')),Object(i.b)("h2",{id:"debug"},"Debug"),Object(i.b)("p",null,"Watch the command-line session when you ran ",Object(i.b)("inlineCode",{parentName:"p"},"frictionless api")," to get the server's logs."))}u.isMDXComponent=!0},161:function(e,t,n){"use strict";n.d(t,"a",(function(){return p})),n.d(t,"b",(function(){return m}));var r=n(0),a=n.n(r);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function c(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var s=a.a.createContext({}),u=function(e){var t=a.a.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):l(l({},t),e)),n},p=function(e){var t=u(e.components);return a.a.createElement(s.Provider,{value:t},e.children)},b={inlineCode:"code",wrapper:function(e){var t=e.children;return a.a.createElement(a.a.Fragment,{},t)}},d=a.a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,i=e.originalType,o=e.parentName,s=c(e,["components","mdxType","originalType","parentName"]),p=u(n),d=r,m=p["".concat(o,".").concat(d)]||p[d]||b[d]||i;return n?a.a.createElement(m,l(l({ref:t},s),{},{components:n})):a.a.createElement(m,l({ref:t},s))}));function m(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var i=n.length,o=new Array(i);o[0]=d;var l={};for(var c in t)hasOwnProperty.call(t,c)&&(l[c]=t[c]);l.originalType=e,l.mdxType="string"==typeof e?e:r,o[1]=l;for(var s=2;s<i;s++)o[s]=n[s];return a.a.createElement.apply(null,o)}return a.a.createElement.apply(null,n)}d.displayName="MDXCreateElement"}}]);