(window.webpackJsonp=window.webpackJsonp||[]).push([[17],{161:function(e,t,r){"use strict";r.d(t,"a",(function(){return p})),r.d(t,"b",(function(){return b}));var n=r(0),a=r.n(n);function i(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function c(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach((function(t){i(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function s(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},i=Object.keys(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var l=a.a.createContext({}),u=function(e){var t=a.a.useContext(l),r=t;return e&&(r="function"==typeof e?e(t):c(c({},t),e)),r},p=function(e){var t=u(e.components);return a.a.createElement(l.Provider,{value:t},e.children)},m={inlineCode:"code",wrapper:function(e){var t=e.children;return a.a.createElement(a.a.Fragment,{},t)}},d=a.a.forwardRef((function(e,t){var r=e.components,n=e.mdxType,i=e.originalType,o=e.parentName,l=s(e,["components","mdxType","originalType","parentName"]),p=u(r),d=n,b=p["".concat(o,".").concat(d)]||p[d]||m[d]||i;return r?a.a.createElement(b,c(c({ref:t},l),{},{components:r})):a.a.createElement(b,c({ref:t},l))}));function b(e,t){var r=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var i=r.length,o=new Array(i);o[0]=d;var c={};for(var s in t)hasOwnProperty.call(t,s)&&(c[s]=t[s]);c.originalType=e,c.mdxType="string"==typeof e?e:n,o[1]=c;for(var l=2;l<i;l++)o[l]=r[l];return a.a.createElement.apply(null,o)}return a.a.createElement.apply(null,r)}d.displayName="MDXCreateElement"},91:function(e,t,r){"use strict";r.r(t),r.d(t,"frontMatter",(function(){return c})),r.d(t,"metadata",(function(){return s})),r.d(t,"toc",(function(){return l})),r.d(t,"default",(function(){return p}));var n=r(3),a=r(8),i=(r(0),r(161)),o=["components"],c={title:"Stream Tutorial",sidebar_label:"Stream"},s={unversionedId:"tutorials/schemes/stream-tutorial",id:"tutorials/schemes/stream-tutorial",isDocsHomePage:!1,title:"Stream Tutorial",description:"Frictionless supports using data stored as File-Like objects in Python.",source:"@site/../docs/tutorials/schemes/stream-tutorial.md",slug:"/tutorials/schemes/stream-tutorial",permalink:"/docs/tutorials/schemes/stream-tutorial",editUrl:"https://github.com/frictionlessdata/frictionless-py/edit/main/docs/../docs/tutorials/schemes/stream-tutorial.md",version:"current",lastUpdatedBy:"roll",lastUpdatedAt:1625991887,formattedLastUpdatedAt:"7/11/2021",sidebar_label:"Stream",sidebar:"tutorials",previous:{title:"S3 Tutorial",permalink:"/docs/tutorials/schemes/s3-tutorial"},next:{title:"BigQuery Tutorial",permalink:"/docs/tutorials/formats/bigquery-tutorial"}},l=[{value:"Reading Data",id:"reading-data",children:[]},{value:"Writing Data",id:"writing-data",children:[]},{value:"Configuring Data",id:"configuring-data",children:[]}],u={toc:l};function p(e){var t=e.components,r=Object(a.a)(e,o);return Object(i.b)("wrapper",Object(n.a)({},u,r,{components:t,mdxType:"MDXLayout"}),Object(i.b)("p",null,"Frictionless supports using data stored as File-Like objects in Python."),Object(i.b)("h2",{id:"reading-data"},"Reading Data"),Object(i.b)("blockquote",null,Object(i.b)("p",{parentName:"blockquote"},"It's recommended to open files in byte-mode. If the file is opened in text-mode, Frictionless will try to re-open it in byte-mode.")),Object(i.b)("p",null,"You can read Stream using ",Object(i.b)("inlineCode",{parentName:"p"},"Package/Resource"),", for example:"),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre",className:"language-python",metastring:'script title="Python"',script:!0,title:'"Python"'},"from pprint import pprint\nfrom frictionless import Resource\n\nwith open('data/table.csv', 'rb') as file:\n  resource = Resource(file, format='csv')\n  pprint(resource.read_rows())\n")),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre"},"[{'id': 1, 'name': 'english'}, {'id': 2, 'name': '\u4e2d\u56fd\u4eba'}]\n")),Object(i.b)("h2",{id:"writing-data"},"Writing Data"),Object(i.b)("p",null,"A similiar approach can be used for writing:"),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre",className:"language-python",metastring:'script title="Python"',script:!0,title:'"Python"'},"from frictionless import Resource\n\nsource = Resource(data=[['id', 'name'], [1, 'english'], [2, 'german']])\ntarget = source.write(scheme='stream', format='csv')\npprint(target)\npprint(target.read_rows())\n")),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre"},"{'data': <_io.BufferedReader name='/tmp/tmpaxbiv_8_'>,\n 'format': 'csv',\n 'scheme': 'stream'}\n[{'id': 1, 'name': 'english'}, {'id': 2, 'name': 'german'}]\n")),Object(i.b)("h2",{id:"configuring-data"},"Configuring Data"),Object(i.b)("p",null,"There are no options available for ",Object(i.b)("inlineCode",{parentName:"p"},"StreamControl"),"."),Object(i.b)("p",null,"References:"),Object(i.b)("ul",null,Object(i.b)("li",{parentName:"ul"},Object(i.b)("a",{parentName:"li",href:"/docs/references/schemes-reference#stream"},"Stream Control"))))}p.isMDXComponent=!0}}]);