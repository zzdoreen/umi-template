"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[199],{24969:function(Zt,Ae,m){m.d(Ae,{Z:function(){return U}});var a=m(87462),Ee=m(67294),Be={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M482 152h60q8 0 8 8v704q0 8-8 8h-60q-8 0-8-8V160q0-8 8-8z"}},{tag:"path",attrs:{d:"M192 474h672q8 0 8 8v60q0 8-8 8H160q-8 0-8-8v-60q0-8 8-8z"}}]},name:"plus",theme:"outlined"},_e=Be,De=m(84089),K=function(I,ye){return Ee.createElement(De.Z,(0,a.Z)({},I,{ref:ye,icon:_e}))},ne=Ee.forwardRef(K),U=ne},49199:function(Zt,Ae,m){m.d(Ae,{Z:function(){return Xa}});var a=m(67294),Ee=m(97937),Be=m(89705),_e=m(24969),De=m(93967),K=m.n(De),ne=m(87462),U=m(4942),q=m(1413),I=m(97685),ye=m(71002),$e=m(91),Ye=m(21770),Lt=m(31131),Re=(0,a.createContext)(null),Qe=m(74902),We=m(48555),Nt=m(66680),Se=m(42550),He=m(75164),Mt=function(t){var n=t.activeTabOffset,r=t.horizontal,i=t.rtl,l=t.indicator,c=l===void 0?{}:l,o=c.size,s=c.align,d=s===void 0?"center":s,v=(0,a.useState)(),u=(0,I.Z)(v,2),b=u[0],Z=u[1],z=(0,a.useRef)(),R=a.useCallback(function(g){return typeof o=="function"?o(g):typeof o=="number"?o:g},[o]);function M(){He.Z.cancel(z.current)}return(0,a.useEffect)(function(){var g={};if(n)if(r){g.width=R(n.width);var f=i?"right":"left";d==="start"&&(g[f]=n[f]),d==="center"&&(g[f]=n[f]+n.width/2,g.transform=i?"translateX(50%)":"translateX(-50%)"),d==="end"&&(g[f]=n[f]+n.width,g.transform="translateX(-100%)")}else g.height=R(n.height),d==="start"&&(g.top=n.top),d==="center"&&(g.top=n.top+n.height/2,g.transform="translateY(-50%)"),d==="end"&&(g.top=n.top+n.height,g.transform="translateY(-100%)");return M(),z.current=(0,He.Z)(function(){Z(g)}),M},[n,r,i,d,R]),{style:b}},Ot=Mt,Je={width:0,height:0,left:0,top:0};function zt(e,t,n){return(0,a.useMemo)(function(){for(var r,i=new Map,l=t.get((r=e[0])===null||r===void 0?void 0:r.key)||Je,c=l.left+l.width,o=0;o<e.length;o+=1){var s=e[o].key,d=t.get(s);if(!d){var v;d=t.get((v=e[o-1])===null||v===void 0?void 0:v.key)||Je}var u=i.get(s)||(0,q.Z)({},d);u.right=c-u.left-u.width,i.set(s,u)}return i},[e.map(function(r){return r.key}).join("_"),t,n])}function qe(e,t){var n=a.useRef(e),r=a.useState({}),i=(0,I.Z)(r,2),l=i[1];function c(o){var s=typeof o=="function"?o(n.current):o;s!==n.current&&t(s,n.current),n.current=s,l({})}return[n.current,c]}var At=.1,et=.01,we=20,tt=Math.pow(.995,we);function Bt(e,t){var n=(0,a.useState)(),r=(0,I.Z)(n,2),i=r[0],l=r[1],c=(0,a.useState)(0),o=(0,I.Z)(c,2),s=o[0],d=o[1],v=(0,a.useState)(0),u=(0,I.Z)(v,2),b=u[0],Z=u[1],z=(0,a.useState)(),R=(0,I.Z)(z,2),M=R[0],g=R[1],f=(0,a.useRef)();function w(p){var L=p.touches[0],C=L.screenX,x=L.screenY;l({x:C,y:x}),window.clearInterval(f.current)}function N(p){if(i){p.preventDefault();var L=p.touches[0],C=L.screenX,x=L.screenY;l({x:C,y:x});var y=C-i.x,T=x-i.y;t(y,T);var Y=Date.now();d(Y),Z(Y-s),g({x:y,y:T})}}function B(){if(i&&(l(null),g(null),M)){var p=M.x/b,L=M.y/b,C=Math.abs(p),x=Math.abs(L);if(Math.max(C,x)<At)return;var y=p,T=L;f.current=window.setInterval(function(){if(Math.abs(y)<et&&Math.abs(T)<et){window.clearInterval(f.current);return}y*=tt,T*=tt,t(y*we,T*we)},we)}}var H=(0,a.useRef)();function _(p){var L=p.deltaX,C=p.deltaY,x=0,y=Math.abs(L),T=Math.abs(C);y===T?x=H.current==="x"?L:C:y>T?(x=L,H.current="x"):(x=C,H.current="y"),t(-x,-x)&&p.preventDefault()}var $=(0,a.useRef)(null);$.current={onTouchStart:w,onTouchMove:N,onTouchEnd:B,onWheel:_},a.useEffect(function(){function p(y){$.current.onTouchStart(y)}function L(y){$.current.onTouchMove(y)}function C(y){$.current.onTouchEnd(y)}function x(y){$.current.onWheel(y)}return document.addEventListener("touchmove",L,{passive:!1}),document.addEventListener("touchend",C,{passive:!0}),e.current.addEventListener("touchstart",p,{passive:!0}),e.current.addEventListener("wheel",x,{passive:!1}),function(){document.removeEventListener("touchmove",L),document.removeEventListener("touchend",C)}},[])}var _t=m(8410);function at(e){var t=(0,a.useState)(0),n=(0,I.Z)(t,2),r=n[0],i=n[1],l=(0,a.useRef)(0),c=(0,a.useRef)();return c.current=e,(0,_t.o)(function(){var o;(o=c.current)===null||o===void 0||o.call(c)},[r]),function(){l.current===r&&(l.current+=1,i(l.current))}}function Dt(e){var t=(0,a.useRef)([]),n=(0,a.useState)({}),r=(0,I.Z)(n,2),i=r[1],l=(0,a.useRef)(typeof e=="function"?e():e),c=at(function(){var s=l.current;t.current.forEach(function(d){s=d(s)}),t.current=[],l.current=s,i({})});function o(s){t.current.push(s),c()}return[l.current,o]}var nt={width:0,height:0,left:0,top:0,right:0};function Wt(e,t,n,r,i,l,c){var o=c.tabs,s=c.tabPosition,d=c.rtl,v,u,b;return["top","bottom"].includes(s)?(v="width",u=d?"right":"left",b=Math.abs(n)):(v="height",u="top",b=-n),(0,a.useMemo)(function(){if(!o.length)return[0,0];for(var Z=o.length,z=Z,R=0;R<Z;R+=1){var M=e.get(o[R].key)||nt;if(M[u]+M[v]>b+t){z=R-1;break}}for(var g=0,f=Z-1;f>=0;f-=1){var w=e.get(o[f].key)||nt;if(w[u]<b){g=f+1;break}}return g>=z?[0,0]:[g,z]},[e,t,r,i,l,b,s,o.map(function(Z){return Z.key}).join("_"),d])}function rt(e){var t;return e instanceof Map?(t={},e.forEach(function(n,r){t[r]=n})):t=e,JSON.stringify(t)}var Ht="TABS_DQ";function it(e){return String(e).replace(/"/g,Ht)}function ot(e,t,n,r){return!(!n||r||e===!1||e===void 0&&(t===!1||t===null))}var jt=a.forwardRef(function(e,t){var n=e.prefixCls,r=e.editable,i=e.locale,l=e.style;return!r||r.showAdd===!1?null:a.createElement("button",{ref:t,type:"button",className:"".concat(n,"-nav-add"),style:l,"aria-label":(i==null?void 0:i.addAriaLabel)||"Add tab",onClick:function(o){r.onEdit("add",{event:o})}},r.addIcon||"+")}),lt=jt,Gt=a.forwardRef(function(e,t){var n=e.position,r=e.prefixCls,i=e.extra;if(!i)return null;var l,c={};return(0,ye.Z)(i)==="object"&&!a.isValidElement(i)?c=i:c.right=i,n==="right"&&(l=c.right),n==="left"&&(l=c.left),l?a.createElement("div",{className:"".concat(r,"-extra-content"),ref:t},l):null}),ct=Gt,kt=m(40228),te=m(15105),Vt=te.Z.ESC,Xt=te.Z.TAB;function Kt(e){var t=e.visible,n=e.triggerRef,r=e.onVisibleChange,i=e.autoFocus,l=e.overlayRef,c=a.useRef(!1),o=function(){if(t){var u,b;(u=n.current)===null||u===void 0||(b=u.focus)===null||b===void 0||b.call(u),r==null||r(!1)}},s=function(){var u;return(u=l.current)!==null&&u!==void 0&&u.focus?(l.current.focus(),c.current=!0,!0):!1},d=function(u){switch(u.keyCode){case Vt:o();break;case Xt:{var b=!1;c.current||(b=s()),b?u.preventDefault():o();break}}};a.useEffect(function(){return t?(window.addEventListener("keydown",d),i&&(0,He.Z)(s,3),function(){window.removeEventListener("keydown",d),c.current=!1}):function(){c.current=!1}},[t])}var Ft=(0,a.forwardRef)(function(e,t){var n=e.overlay,r=e.arrow,i=e.prefixCls,l=(0,a.useMemo)(function(){var o;return typeof n=="function"?o=n():o=n,o},[n]),c=(0,Se.sQ)(t,l==null?void 0:l.ref);return a.createElement(a.Fragment,null,r&&a.createElement("div",{className:"".concat(i,"-arrow")}),a.cloneElement(l,{ref:(0,Se.Yr)(l)?c:void 0}))}),Ut=Ft,be={adjustX:1,adjustY:1},me=[0,0],Yt={topLeft:{points:["bl","tl"],overflow:be,offset:[0,-4],targetOffset:me},top:{points:["bc","tc"],overflow:be,offset:[0,-4],targetOffset:me},topRight:{points:["br","tr"],overflow:be,offset:[0,-4],targetOffset:me},bottomLeft:{points:["tl","bl"],overflow:be,offset:[0,4],targetOffset:me},bottom:{points:["tc","bc"],overflow:be,offset:[0,4],targetOffset:me},bottomRight:{points:["tr","br"],overflow:be,offset:[0,4],targetOffset:me}},Qt=Yt,Jt=["arrow","prefixCls","transitionName","animation","align","placement","placements","getPopupContainer","showAction","hideAction","overlayClassName","overlayStyle","visible","trigger","autoFocus","overlay","children","onVisibleChange"];function qt(e,t){var n,r=e.arrow,i=r===void 0?!1:r,l=e.prefixCls,c=l===void 0?"rc-dropdown":l,o=e.transitionName,s=e.animation,d=e.align,v=e.placement,u=v===void 0?"bottomLeft":v,b=e.placements,Z=b===void 0?Qt:b,z=e.getPopupContainer,R=e.showAction,M=e.hideAction,g=e.overlayClassName,f=e.overlayStyle,w=e.visible,N=e.trigger,B=N===void 0?["hover"]:N,H=e.autoFocus,_=e.overlay,$=e.children,p=e.onVisibleChange,L=(0,$e.Z)(e,Jt),C=a.useState(),x=(0,I.Z)(C,2),y=x[0],T=x[1],Y="visible"in e?w:y,re=a.useRef(null),h=a.useRef(null),F=a.useRef(null);a.useImperativeHandle(t,function(){return re.current});var ae=function(W){T(W),p==null||p(W)};Kt({visible:Y,triggerRef:F,onVisibleChange:ae,autoFocus:H,overlayRef:h});var G=function(W){var J=e.onOverlayClick;T(!1),J&&J(W)},Q=function(){return a.createElement(Ut,{ref:h,overlay:_,prefixCls:c,arrow:i})},ie=function(){return typeof _=="function"?Q:Q()},E=function(){var W=e.minOverlayWidthMatchTrigger,J=e.alignPoint;return"minOverlayWidthMatchTrigger"in e?W:!J},A=function(){var W=e.openClassName;return W!==void 0?W:"".concat(c,"-open")},k=a.cloneElement($,{className:K()((n=$.props)===null||n===void 0?void 0:n.className,Y&&A()),ref:(0,Se.Yr)($)?(0,Se.sQ)(F,$.ref):void 0}),V=M;return!V&&B.indexOf("contextMenu")!==-1&&(V=["click"]),a.createElement(kt.Z,(0,ne.Z)({builtinPlacements:Z},L,{prefixCls:c,ref:re,popupClassName:K()(g,(0,U.Z)({},"".concat(c,"-show-arrow"),i)),popupStyle:f,action:B,showAction:R,hideAction:V,popupPlacement:u,popupAlign:d,popupTransitionName:o,popupAnimation:s,popupVisible:Y,stretch:E()?"minWidth":"",popup:ie(),onPopupVisibleChange:ae,onPopupClick:G,getPopupContainer:z}),k)}var ea=a.forwardRef(qt),ta=ea,st=m(72512),aa=a.forwardRef(function(e,t){var n=e.prefixCls,r=e.id,i=e.tabs,l=e.locale,c=e.mobile,o=e.more,s=o===void 0?{}:o,d=e.style,v=e.className,u=e.editable,b=e.tabBarGutter,Z=e.rtl,z=e.removeAriaLabel,R=e.onTabClick,M=e.getPopupContainer,g=e.popupClassName,f=(0,a.useState)(!1),w=(0,I.Z)(f,2),N=w[0],B=w[1],H=(0,a.useState)(null),_=(0,I.Z)(H,2),$=_[0],p=_[1],L=s.icon,C=L===void 0?"More":L,x="".concat(r,"-more-popup"),y="".concat(n,"-dropdown"),T=$!==null?"".concat(x,"-").concat($):null,Y=l==null?void 0:l.dropdownAriaLabel;function re(E,A){E.preventDefault(),E.stopPropagation(),u.onEdit("remove",{key:A,event:E})}var h=a.createElement(st.ZP,{onClick:function(A){var k=A.key,V=A.domEvent;R(k,V),B(!1)},prefixCls:"".concat(y,"-menu"),id:x,tabIndex:-1,role:"listbox","aria-activedescendant":T,selectedKeys:[$],"aria-label":Y!==void 0?Y:"expanded dropdown"},i.map(function(E){var A=E.closable,k=E.disabled,V=E.closeIcon,j=E.key,W=E.label,J=ot(A,V,u,k);return a.createElement(st.sN,{key:j,id:"".concat(x,"-").concat(j),role:"option","aria-controls":r&&"".concat(r,"-panel-").concat(j),disabled:k},a.createElement("span",null,W),J&&a.createElement("button",{type:"button","aria-label":z||"remove",tabIndex:0,className:"".concat(y,"-menu-item-remove"),onClick:function(ce){ce.stopPropagation(),re(ce,j)}},V||u.removeIcon||"\xD7"))}));function F(E){for(var A=i.filter(function(J){return!J.disabled}),k=A.findIndex(function(J){return J.key===$})||0,V=A.length,j=0;j<V;j+=1){k=(k+E+V)%V;var W=A[k];if(!W.disabled){p(W.key);return}}}function ae(E){var A=E.which;if(!N){[te.Z.DOWN,te.Z.SPACE,te.Z.ENTER].includes(A)&&(B(!0),E.preventDefault());return}switch(A){case te.Z.UP:F(-1),E.preventDefault();break;case te.Z.DOWN:F(1),E.preventDefault();break;case te.Z.ESC:B(!1);break;case te.Z.SPACE:case te.Z.ENTER:$!==null&&R($,E);break}}(0,a.useEffect)(function(){var E=document.getElementById(T);E&&E.scrollIntoView&&E.scrollIntoView(!1)},[$]),(0,a.useEffect)(function(){N||p(null)},[N]);var G=(0,U.Z)({},Z?"marginRight":"marginLeft",b);i.length||(G.visibility="hidden",G.order=1);var Q=K()((0,U.Z)({},"".concat(y,"-rtl"),Z)),ie=c?null:a.createElement(ta,(0,ne.Z)({prefixCls:y,overlay:h,visible:i.length?N:!1,onVisibleChange:B,overlayClassName:K()(Q,g),mouseEnterDelay:.1,mouseLeaveDelay:.1,getPopupContainer:M},s),a.createElement("button",{type:"button",className:"".concat(n,"-nav-more"),style:G,tabIndex:-1,"aria-hidden":"true","aria-haspopup":"listbox","aria-controls":x,id:"".concat(r,"-more"),"aria-expanded":N,onKeyDown:ae},C));return a.createElement("div",{className:K()("".concat(n,"-nav-operations"),v),style:d,ref:t},ie,a.createElement(lt,{prefixCls:n,locale:l,editable:u}))}),na=a.memo(aa,function(e,t){return t.tabMoving}),ra=function(t){var n=t.prefixCls,r=t.id,i=t.active,l=t.tab,c=l.key,o=l.label,s=l.disabled,d=l.closeIcon,v=l.icon,u=t.closable,b=t.renderWrapper,Z=t.removeAriaLabel,z=t.editable,R=t.onClick,M=t.onFocus,g=t.style,f="".concat(n,"-tab"),w=ot(u,d,z,s);function N($){s||R($)}function B($){$.preventDefault(),$.stopPropagation(),z.onEdit("remove",{key:c,event:$})}var H=a.useMemo(function(){return v&&typeof o=="string"?a.createElement("span",null,o):o},[o,v]),_=a.createElement("div",{key:c,"data-node-key":it(c),className:K()(f,(0,U.Z)((0,U.Z)((0,U.Z)({},"".concat(f,"-with-remove"),w),"".concat(f,"-active"),i),"".concat(f,"-disabled"),s)),style:g,onClick:N},a.createElement("div",{role:"tab","aria-selected":i,id:r&&"".concat(r,"-tab-").concat(c),className:"".concat(f,"-btn"),"aria-controls":r&&"".concat(r,"-panel-").concat(c),"aria-disabled":s,tabIndex:s?null:0,onClick:function(p){p.stopPropagation(),N(p)},onKeyDown:function(p){[te.Z.SPACE,te.Z.ENTER].includes(p.which)&&(p.preventDefault(),N(p))},onFocus:M},v&&a.createElement("span",{className:"".concat(f,"-icon")},v),o&&H),w&&a.createElement("button",{type:"button","aria-label":Z||"remove",tabIndex:0,className:"".concat(f,"-remove"),onClick:function(p){p.stopPropagation(),B(p)}},d||z.removeIcon||"\xD7"));return b?b(_):_},ia=ra,oa=function(t,n){var r=t.offsetWidth,i=t.offsetHeight,l=t.offsetTop,c=t.offsetLeft,o=t.getBoundingClientRect(),s=o.width,d=o.height,v=o.x,u=o.y;return Math.abs(s-r)<1?[s,d,v-n.x,u-n.y]:[r,i,c,l]},ge=function(t){var n=t.current||{},r=n.offsetWidth,i=r===void 0?0:r,l=n.offsetHeight,c=l===void 0?0:l;if(t.current){var o=t.current.getBoundingClientRect(),s=o.width,d=o.height;if(Math.abs(s-i)<1)return[s,d]}return[i,c]},Ie=function(t,n){return t[n?0:1]},la=a.forwardRef(function(e,t){var n=e.className,r=e.style,i=e.id,l=e.animated,c=e.activeKey,o=e.rtl,s=e.extra,d=e.editable,v=e.locale,u=e.tabPosition,b=e.tabBarGutter,Z=e.children,z=e.onTabClick,R=e.onTabScroll,M=e.indicator,g=a.useContext(Re),f=g.prefixCls,w=g.tabs,N=(0,a.useRef)(null),B=(0,a.useRef)(null),H=(0,a.useRef)(null),_=(0,a.useRef)(null),$=(0,a.useRef)(null),p=(0,a.useRef)(null),L=(0,a.useRef)(null),C=u==="top"||u==="bottom",x=qe(0,function(D,P){C&&R&&R({direction:D>P?"left":"right"})}),y=(0,I.Z)(x,2),T=y[0],Y=y[1],re=qe(0,function(D,P){!C&&R&&R({direction:D>P?"top":"bottom"})}),h=(0,I.Z)(re,2),F=h[0],ae=h[1],G=(0,a.useState)([0,0]),Q=(0,I.Z)(G,2),ie=Q[0],E=Q[1],A=(0,a.useState)([0,0]),k=(0,I.Z)(A,2),V=k[0],j=k[1],W=(0,a.useState)([0,0]),J=(0,I.Z)(W,2),he=J[0],ce=J[1],ue=(0,a.useState)([0,0]),pe=(0,I.Z)(ue,2),O=pe[0],le=pe[1],xe=Dt(new Map),mt=(0,I.Z)(xe,2),Ka=mt[0],Fa=mt[1],Ze=zt(w,Ka,V[0]),je=Ie(ie,C),Te=Ie(V,C),Ge=Ie(he,C),gt=Ie(O,C),ht=je<Te+Ge,oe=ht?je-gt:je-Ge,Ua="".concat(f,"-nav-operations-hidden"),se=0,ve=0;C&&o?(se=0,ve=Math.max(0,Te-oe)):(se=Math.min(0,oe-Te),ve=0);function ke(D){return D<se?se:D>ve?ve:D}var Ve=(0,a.useRef)(null),Ya=(0,a.useState)(),pt=(0,I.Z)(Ya,2),Le=pt[0],yt=pt[1];function Xe(){yt(Date.now())}function Ke(){Ve.current&&clearTimeout(Ve.current)}Bt(_,function(D,P){function X(ee,fe){ee(function(de){var Oe=ke(de+fe);return Oe})}return ht?(C?X(Y,D):X(ae,P),Ke(),Xe(),!0):!1}),(0,a.useEffect)(function(){return Ke(),Le&&(Ve.current=setTimeout(function(){yt(0)},100)),Ke},[Le]);var Qa=Wt(Ze,oe,C?T:F,Te,Ge,gt,(0,q.Z)((0,q.Z)({},e),{},{tabs:w})),$t=(0,I.Z)(Qa,2),Ja=$t[0],qa=$t[1],St=(0,Nt.Z)(function(){var D=arguments.length>0&&arguments[0]!==void 0?arguments[0]:c,P=Ze.get(D)||{width:0,height:0,left:0,right:0,top:0};if(C){var X=T;o?P.right<T?X=P.right:P.right+P.width>T+oe&&(X=P.right+P.width-oe):P.left<-T?X=-P.left:P.left+P.width>-T+oe&&(X=-(P.left+P.width-oe)),ae(0),Y(ke(X))}else{var ee=F;P.top<-F?ee=-P.top:P.top+P.height>-F+oe&&(ee=-(P.top+P.height-oe)),Y(0),ae(ke(ee))}}),Ne={};u==="top"||u==="bottom"?Ne[o?"marginRight":"marginLeft"]=b:Ne.marginTop=b;var Ct=w.map(function(D,P){var X=D.key;return a.createElement(ia,{id:i,prefixCls:f,key:X,tab:D,style:P===0?void 0:Ne,closable:D.closable,editable:d,active:X===c,renderWrapper:Z,removeAriaLabel:v==null?void 0:v.removeAriaLabel,onClick:function(fe){z(X,fe)},onFocus:function(){St(X),Xe(),_.current&&(o||(_.current.scrollLeft=0),_.current.scrollTop=0)}})}),xt=function(){return Fa(function(){var P,X=new Map,ee=(P=$.current)===null||P===void 0?void 0:P.getBoundingClientRect();return w.forEach(function(fe){var de,Oe=fe.key,It=(de=$.current)===null||de===void 0?void 0:de.querySelector('[data-node-key="'.concat(it(Oe),'"]'));if(It){var rn=oa(It,ee),ze=(0,I.Z)(rn,4),on=ze[0],ln=ze[1],cn=ze[2],sn=ze[3];X.set(Oe,{width:on,height:ln,left:cn,top:sn})}}),X})};(0,a.useEffect)(function(){xt()},[w.map(function(D){return D.key}).join("_")]);var Me=at(function(){var D=ge(N),P=ge(B),X=ge(H);E([D[0]-P[0]-X[0],D[1]-P[1]-X[1]]);var ee=ge(L);ce(ee);var fe=ge(p);le(fe);var de=ge($);j([de[0]-ee[0],de[1]-ee[1]]),xt()}),en=w.slice(0,Ja),tn=w.slice(qa+1),Tt=[].concat((0,Qe.Z)(en),(0,Qe.Z)(tn)),Pt=Ze.get(c),an=Ot({activeTabOffset:Pt,horizontal:C,indicator:M,rtl:o}),nn=an.style;(0,a.useEffect)(function(){St()},[c,se,ve,rt(Pt),rt(Ze),C]),(0,a.useEffect)(function(){Me()},[o]);var Et=!!Tt.length,Pe="".concat(f,"-nav-wrap"),Fe,Ue,Rt,wt;return C?o?(Ue=T>0,Fe=T!==ve):(Fe=T<0,Ue=T!==se):(Rt=F<0,wt=F!==se),a.createElement(We.Z,{onResize:Me},a.createElement("div",{ref:(0,Se.x1)(t,N),role:"tablist",className:K()("".concat(f,"-nav"),n),style:r,onKeyDown:function(){Xe()}},a.createElement(ct,{ref:B,position:"left",extra:s,prefixCls:f}),a.createElement(We.Z,{onResize:Me},a.createElement("div",{className:K()(Pe,(0,U.Z)((0,U.Z)((0,U.Z)((0,U.Z)({},"".concat(Pe,"-ping-left"),Fe),"".concat(Pe,"-ping-right"),Ue),"".concat(Pe,"-ping-top"),Rt),"".concat(Pe,"-ping-bottom"),wt)),ref:_},a.createElement(We.Z,{onResize:Me},a.createElement("div",{ref:$,className:"".concat(f,"-nav-list"),style:{transform:"translate(".concat(T,"px, ").concat(F,"px)"),transition:Le?"none":void 0}},Ct,a.createElement(lt,{ref:L,prefixCls:f,locale:v,editable:d,style:(0,q.Z)((0,q.Z)({},Ct.length===0?void 0:Ne),{},{visibility:Et?"hidden":null})}),a.createElement("div",{className:K()("".concat(f,"-ink-bar"),(0,U.Z)({},"".concat(f,"-ink-bar-animated"),l.inkBar)),style:nn}))))),a.createElement(na,(0,ne.Z)({},e,{removeAriaLabel:v==null?void 0:v.removeAriaLabel,ref:p,prefixCls:f,tabs:Tt,className:!Et&&Ua,tabMoving:!!Le})),a.createElement(ct,{ref:H,position:"right",extra:s,prefixCls:f})))}),dt=la,ca=a.forwardRef(function(e,t){var n=e.prefixCls,r=e.className,i=e.style,l=e.id,c=e.active,o=e.tabKey,s=e.children;return a.createElement("div",{id:l&&"".concat(l,"-panel-").concat(o),role:"tabpanel",tabIndex:c?0:-1,"aria-labelledby":l&&"".concat(l,"-tab-").concat(o),"aria-hidden":!c,style:i,className:K()(n,c&&"".concat(n,"-active"),r),ref:t},s)}),ut=ca,sa=["renderTabBar"],da=["label","key"],ua=function(t){var n=t.renderTabBar,r=(0,$e.Z)(t,sa),i=a.useContext(Re),l=i.tabs;if(n){var c=(0,q.Z)((0,q.Z)({},r),{},{panes:l.map(function(o){var s=o.label,d=o.key,v=(0,$e.Z)(o,da);return a.createElement(ut,(0,ne.Z)({tab:s,key:d,tabKey:d},v))})});return n(c,dt)}return a.createElement(dt,r)},va=ua,fa=m(29372),ba=["key","forceRender","style","className","destroyInactiveTabPane"],ma=function(t){var n=t.id,r=t.activeKey,i=t.animated,l=t.tabPosition,c=t.destroyInactiveTabPane,o=a.useContext(Re),s=o.prefixCls,d=o.tabs,v=i.tabPane,u="".concat(s,"-tabpane");return a.createElement("div",{className:K()("".concat(s,"-content-holder"))},a.createElement("div",{className:K()("".concat(s,"-content"),"".concat(s,"-content-").concat(l),(0,U.Z)({},"".concat(s,"-content-animated"),v))},d.map(function(b){var Z=b.key,z=b.forceRender,R=b.style,M=b.className,g=b.destroyInactiveTabPane,f=(0,$e.Z)(b,ba),w=Z===r;return a.createElement(fa.ZP,(0,ne.Z)({key:Z,visible:w,forceRender:z,removeOnLeave:!!(c||g),leavedClassName:"".concat(u,"-hidden")},i.tabPaneMotion),function(N,B){var H=N.style,_=N.className;return a.createElement(ut,(0,ne.Z)({},f,{prefixCls:u,id:n,tabKey:Z,animated:v,active:w,style:(0,q.Z)((0,q.Z)({},R),H),className:K()(M,_),ref:B}))})})))},ga=ma,dn=m(80334);function ha(){var e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{inkBar:!0,tabPane:!1},t;return e===!1?t={inkBar:!1,tabPane:!1}:e===!0?t={inkBar:!0,tabPane:!1}:t=(0,q.Z)({inkBar:!0},(0,ye.Z)(e)==="object"?e:{}),t.tabPaneMotion&&t.tabPane===void 0&&(t.tabPane=!0),!t.tabPaneMotion&&t.tabPane&&(t.tabPane=!1),t}var pa=["id","prefixCls","className","items","direction","activeKey","defaultActiveKey","editable","animated","tabPosition","tabBarGutter","tabBarStyle","tabBarExtraContent","locale","more","destroyInactiveTabPane","renderTabBar","onChange","onTabClick","onTabScroll","getPopupContainer","popupClassName","indicator"],vt=0,ya=a.forwardRef(function(e,t){var n=e.id,r=e.prefixCls,i=r===void 0?"rc-tabs":r,l=e.className,c=e.items,o=e.direction,s=e.activeKey,d=e.defaultActiveKey,v=e.editable,u=e.animated,b=e.tabPosition,Z=b===void 0?"top":b,z=e.tabBarGutter,R=e.tabBarStyle,M=e.tabBarExtraContent,g=e.locale,f=e.more,w=e.destroyInactiveTabPane,N=e.renderTabBar,B=e.onChange,H=e.onTabClick,_=e.onTabScroll,$=e.getPopupContainer,p=e.popupClassName,L=e.indicator,C=(0,$e.Z)(e,pa),x=a.useMemo(function(){return(c||[]).filter(function(O){return O&&(0,ye.Z)(O)==="object"&&"key"in O})},[c]),y=o==="rtl",T=ha(u),Y=(0,a.useState)(!1),re=(0,I.Z)(Y,2),h=re[0],F=re[1];(0,a.useEffect)(function(){F((0,Lt.Z)())},[]);var ae=(0,Ye.Z)(function(){var O;return(O=x[0])===null||O===void 0?void 0:O.key},{value:s,defaultValue:d}),G=(0,I.Z)(ae,2),Q=G[0],ie=G[1],E=(0,a.useState)(function(){return x.findIndex(function(O){return O.key===Q})}),A=(0,I.Z)(E,2),k=A[0],V=A[1];(0,a.useEffect)(function(){var O=x.findIndex(function(xe){return xe.key===Q});if(O===-1){var le;O=Math.max(0,Math.min(k,x.length-1)),ie((le=x[O])===null||le===void 0?void 0:le.key)}V(O)},[x.map(function(O){return O.key}).join("_"),Q,k]);var j=(0,Ye.Z)(null,{value:n}),W=(0,I.Z)(j,2),J=W[0],he=W[1];(0,a.useEffect)(function(){n||(he("rc-tabs-".concat(vt)),vt+=1)},[]);function ce(O,le){H==null||H(O,le);var xe=O!==Q;ie(O),xe&&(B==null||B(O))}var ue={id:J,activeKey:Q,animated:T,tabPosition:Z,rtl:y,mobile:h},pe=(0,q.Z)((0,q.Z)({},ue),{},{editable:v,locale:g,more:f,tabBarGutter:z,onTabClick:ce,onTabScroll:_,extra:M,style:R,panes:null,getPopupContainer:$,popupClassName:p,indicator:L});return a.createElement(Re.Provider,{value:{tabs:x,prefixCls:i}},a.createElement("div",(0,ne.Z)({ref:t,id:n,className:K()(i,"".concat(i,"-").concat(Z),(0,U.Z)((0,U.Z)((0,U.Z)({},"".concat(i,"-mobile"),h),"".concat(i,"-editable"),v),"".concat(i,"-rtl"),y),l)},C),a.createElement(va,(0,ne.Z)({},pe,{renderTabBar:N})),a.createElement(ga,(0,ne.Z)({destroyInactiveTabPane:w},ue,{animated:T}))))}),$a=ya,Sa=$a,Ca=m(53124),xa=m(35792),Ta=m(98675),Pa=m(33603);const Ea={motionAppear:!1,motionEnter:!0,motionLeave:!0};function Ra(e){let t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{inkBar:!0,tabPane:!1},n;return t===!1?n={inkBar:!1,tabPane:!1}:t===!0?n={inkBar:!0,tabPane:!0}:n=Object.assign({inkBar:!0},typeof t=="object"?t:{}),n.tabPane&&(n.tabPaneMotion=Object.assign(Object.assign({},Ea),{motionName:(0,Pa.m)(e,"switch")})),n}var wa=m(50344),Ia=function(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var i=0,r=Object.getOwnPropertySymbols(e);i<r.length;i++)t.indexOf(r[i])<0&&Object.prototype.propertyIsEnumerable.call(e,r[i])&&(n[r[i]]=e[r[i]]);return n};function Za(e){return e.filter(t=>t)}function La(e,t){if(e)return e;const n=(0,wa.Z)(t).map(r=>{if(a.isValidElement(r)){const{key:i,props:l}=r,c=l||{},{tab:o}=c,s=Ia(c,["tab"]);return Object.assign(Object.assign({key:String(i)},s),{label:o})}return null});return Za(n)}var S=m(11568),Ce=m(14747),Na=m(83559),Ma=m(83262),ft=m(67771),Oa=e=>{const{componentCls:t,motionDurationSlow:n}=e;return[{[t]:{[`${t}-switch`]:{"&-appear, &-enter":{transition:"none","&-start":{opacity:0},"&-active":{opacity:1,transition:`opacity ${n}`}},"&-leave":{position:"absolute",transition:"none",inset:0,"&-start":{opacity:1},"&-active":{opacity:0,transition:`opacity ${n}`}}}}},[(0,ft.oN)(e,"slide-up"),(0,ft.oN)(e,"slide-down")]]};const za=e=>{const{componentCls:t,tabsCardPadding:n,cardBg:r,cardGutter:i,colorBorderSecondary:l,itemSelectedColor:c}=e;return{[`${t}-card`]:{[`> ${t}-nav, > div > ${t}-nav`]:{[`${t}-tab`]:{margin:0,padding:n,background:r,border:`${(0,S.bf)(e.lineWidth)} ${e.lineType} ${l}`,transition:`all ${e.motionDurationSlow} ${e.motionEaseInOut}`},[`${t}-tab-active`]:{color:c,background:e.colorBgContainer},[`${t}-ink-bar`]:{visibility:"hidden"}},[`&${t}-top, &${t}-bottom`]:{[`> ${t}-nav, > div > ${t}-nav`]:{[`${t}-tab + ${t}-tab`]:{marginLeft:{_skip_check_:!0,value:(0,S.bf)(i)}}}},[`&${t}-top`]:{[`> ${t}-nav, > div > ${t}-nav`]:{[`${t}-tab`]:{borderRadius:`${(0,S.bf)(e.borderRadiusLG)} ${(0,S.bf)(e.borderRadiusLG)} 0 0`},[`${t}-tab-active`]:{borderBottomColor:e.colorBgContainer}}},[`&${t}-bottom`]:{[`> ${t}-nav, > div > ${t}-nav`]:{[`${t}-tab`]:{borderRadius:`0 0 ${(0,S.bf)(e.borderRadiusLG)} ${(0,S.bf)(e.borderRadiusLG)}`},[`${t}-tab-active`]:{borderTopColor:e.colorBgContainer}}},[`&${t}-left, &${t}-right`]:{[`> ${t}-nav, > div > ${t}-nav`]:{[`${t}-tab + ${t}-tab`]:{marginTop:(0,S.bf)(i)}}},[`&${t}-left`]:{[`> ${t}-nav, > div > ${t}-nav`]:{[`${t}-tab`]:{borderRadius:{_skip_check_:!0,value:`${(0,S.bf)(e.borderRadiusLG)} 0 0 ${(0,S.bf)(e.borderRadiusLG)}`}},[`${t}-tab-active`]:{borderRightColor:{_skip_check_:!0,value:e.colorBgContainer}}}},[`&${t}-right`]:{[`> ${t}-nav, > div > ${t}-nav`]:{[`${t}-tab`]:{borderRadius:{_skip_check_:!0,value:`0 ${(0,S.bf)(e.borderRadiusLG)} ${(0,S.bf)(e.borderRadiusLG)} 0`}},[`${t}-tab-active`]:{borderLeftColor:{_skip_check_:!0,value:e.colorBgContainer}}}}}}},Aa=e=>{const{componentCls:t,itemHoverColor:n,dropdownEdgeChildVerticalPadding:r}=e;return{[`${t}-dropdown`]:Object.assign(Object.assign({},(0,Ce.Wf)(e)),{position:"absolute",top:-9999,left:{_skip_check_:!0,value:-9999},zIndex:e.zIndexPopup,display:"block","&-hidden":{display:"none"},[`${t}-dropdown-menu`]:{maxHeight:e.tabsDropdownHeight,margin:0,padding:`${(0,S.bf)(r)} 0`,overflowX:"hidden",overflowY:"auto",textAlign:{_skip_check_:!0,value:"left"},listStyleType:"none",backgroundColor:e.colorBgContainer,backgroundClip:"padding-box",borderRadius:e.borderRadiusLG,outline:"none",boxShadow:e.boxShadowSecondary,"&-item":Object.assign(Object.assign({},Ce.vS),{display:"flex",alignItems:"center",minWidth:e.tabsDropdownWidth,margin:0,padding:`${(0,S.bf)(e.paddingXXS)} ${(0,S.bf)(e.paddingSM)}`,color:e.colorText,fontWeight:"normal",fontSize:e.fontSize,lineHeight:e.lineHeight,cursor:"pointer",transition:`all ${e.motionDurationSlow}`,"> span":{flex:1,whiteSpace:"nowrap"},"&-remove":{flex:"none",marginLeft:{_skip_check_:!0,value:e.marginSM},color:e.colorTextDescription,fontSize:e.fontSizeSM,background:"transparent",border:0,cursor:"pointer","&:hover":{color:n}},"&:hover":{background:e.controlItemBgHover},"&-disabled":{"&, &:hover":{color:e.colorTextDisabled,background:"transparent",cursor:"not-allowed"}}})}})}},Ba=e=>{const{componentCls:t,margin:n,colorBorderSecondary:r,horizontalMargin:i,verticalItemPadding:l,verticalItemMargin:c,calc:o}=e;return{[`${t}-top, ${t}-bottom`]:{flexDirection:"column",[`> ${t}-nav, > div > ${t}-nav`]:{margin:i,"&::before":{position:"absolute",right:{_skip_check_:!0,value:0},left:{_skip_check_:!0,value:0},borderBottom:`${(0,S.bf)(e.lineWidth)} ${e.lineType} ${r}`,content:"''"},[`${t}-ink-bar`]:{height:e.lineWidthBold,"&-animated":{transition:`width ${e.motionDurationSlow}, left ${e.motionDurationSlow},
            right ${e.motionDurationSlow}`}},[`${t}-nav-wrap`]:{"&::before, &::after":{top:0,bottom:0,width:e.controlHeight},"&::before":{left:{_skip_check_:!0,value:0},boxShadow:e.boxShadowTabsOverflowLeft},"&::after":{right:{_skip_check_:!0,value:0},boxShadow:e.boxShadowTabsOverflowRight},[`&${t}-nav-wrap-ping-left::before`]:{opacity:1},[`&${t}-nav-wrap-ping-right::after`]:{opacity:1}}}},[`${t}-top`]:{[`> ${t}-nav,
        > div > ${t}-nav`]:{"&::before":{bottom:0},[`${t}-ink-bar`]:{bottom:0}}},[`${t}-bottom`]:{[`> ${t}-nav, > div > ${t}-nav`]:{order:1,marginTop:n,marginBottom:0,"&::before":{top:0},[`${t}-ink-bar`]:{top:0}},[`> ${t}-content-holder, > div > ${t}-content-holder`]:{order:0}},[`${t}-left, ${t}-right`]:{[`> ${t}-nav, > div > ${t}-nav`]:{flexDirection:"column",minWidth:o(e.controlHeight).mul(1.25).equal(),[`${t}-tab`]:{padding:l,textAlign:"center"},[`${t}-tab + ${t}-tab`]:{margin:c},[`${t}-nav-wrap`]:{flexDirection:"column","&::before, &::after":{right:{_skip_check_:!0,value:0},left:{_skip_check_:!0,value:0},height:e.controlHeight},"&::before":{top:0,boxShadow:e.boxShadowTabsOverflowTop},"&::after":{bottom:0,boxShadow:e.boxShadowTabsOverflowBottom},[`&${t}-nav-wrap-ping-top::before`]:{opacity:1},[`&${t}-nav-wrap-ping-bottom::after`]:{opacity:1}},[`${t}-ink-bar`]:{width:e.lineWidthBold,"&-animated":{transition:`height ${e.motionDurationSlow}, top ${e.motionDurationSlow}`}},[`${t}-nav-list, ${t}-nav-operations`]:{flex:"1 0 auto",flexDirection:"column"}}},[`${t}-left`]:{[`> ${t}-nav, > div > ${t}-nav`]:{[`${t}-ink-bar`]:{right:{_skip_check_:!0,value:0}}},[`> ${t}-content-holder, > div > ${t}-content-holder`]:{marginLeft:{_skip_check_:!0,value:(0,S.bf)(o(e.lineWidth).mul(-1).equal())},borderLeft:{_skip_check_:!0,value:`${(0,S.bf)(e.lineWidth)} ${e.lineType} ${e.colorBorder}`},[`> ${t}-content > ${t}-tabpane`]:{paddingLeft:{_skip_check_:!0,value:e.paddingLG}}}},[`${t}-right`]:{[`> ${t}-nav, > div > ${t}-nav`]:{order:1,[`${t}-ink-bar`]:{left:{_skip_check_:!0,value:0}}},[`> ${t}-content-holder, > div > ${t}-content-holder`]:{order:0,marginRight:{_skip_check_:!0,value:o(e.lineWidth).mul(-1).equal()},borderRight:{_skip_check_:!0,value:`${(0,S.bf)(e.lineWidth)} ${e.lineType} ${e.colorBorder}`},[`> ${t}-content > ${t}-tabpane`]:{paddingRight:{_skip_check_:!0,value:e.paddingLG}}}}}},_a=e=>{const{componentCls:t,cardPaddingSM:n,cardPaddingLG:r,horizontalItemPaddingSM:i,horizontalItemPaddingLG:l}=e;return{[t]:{"&-small":{[`> ${t}-nav`]:{[`${t}-tab`]:{padding:i,fontSize:e.titleFontSizeSM}}},"&-large":{[`> ${t}-nav`]:{[`${t}-tab`]:{padding:l,fontSize:e.titleFontSizeLG}}}},[`${t}-card`]:{[`&${t}-small`]:{[`> ${t}-nav`]:{[`${t}-tab`]:{padding:n}},[`&${t}-bottom`]:{[`> ${t}-nav ${t}-tab`]:{borderRadius:`0 0 ${(0,S.bf)(e.borderRadius)} ${(0,S.bf)(e.borderRadius)}`}},[`&${t}-top`]:{[`> ${t}-nav ${t}-tab`]:{borderRadius:`${(0,S.bf)(e.borderRadius)} ${(0,S.bf)(e.borderRadius)} 0 0`}},[`&${t}-right`]:{[`> ${t}-nav ${t}-tab`]:{borderRadius:{_skip_check_:!0,value:`0 ${(0,S.bf)(e.borderRadius)} ${(0,S.bf)(e.borderRadius)} 0`}}},[`&${t}-left`]:{[`> ${t}-nav ${t}-tab`]:{borderRadius:{_skip_check_:!0,value:`${(0,S.bf)(e.borderRadius)} 0 0 ${(0,S.bf)(e.borderRadius)}`}}}},[`&${t}-large`]:{[`> ${t}-nav`]:{[`${t}-tab`]:{padding:r}}}}}},Da=e=>{const{componentCls:t,itemActiveColor:n,itemHoverColor:r,iconCls:i,tabsHorizontalItemMargin:l,horizontalItemPadding:c,itemSelectedColor:o,itemColor:s}=e,d=`${t}-tab`;return{[d]:{position:"relative",WebkitTouchCallout:"none",WebkitTapHighlightColor:"transparent",display:"inline-flex",alignItems:"center",padding:c,fontSize:e.titleFontSize,background:"transparent",border:0,outline:"none",cursor:"pointer",color:s,"&-btn, &-remove":Object.assign({"&:focus:not(:focus-visible), &:active":{color:n}},(0,Ce.Qy)(e)),"&-btn":{outline:"none",transition:`all ${e.motionDurationSlow}`,[`${d}-icon:not(:last-child)`]:{marginInlineEnd:e.marginSM}},"&-remove":{flex:"none",marginRight:{_skip_check_:!0,value:e.calc(e.marginXXS).mul(-1).equal()},marginLeft:{_skip_check_:!0,value:e.marginXS},color:e.colorTextDescription,fontSize:e.fontSizeSM,background:"transparent",border:"none",outline:"none",cursor:"pointer",transition:`all ${e.motionDurationSlow}`,"&:hover":{color:e.colorTextHeading}},"&:hover":{color:r},[`&${d}-active ${d}-btn`]:{color:o,textShadow:e.tabsActiveTextShadow},[`&${d}-disabled`]:{color:e.colorTextDisabled,cursor:"not-allowed"},[`&${d}-disabled ${d}-btn, &${d}-disabled ${t}-remove`]:{"&:focus, &:active":{color:e.colorTextDisabled}},[`& ${d}-remove ${i}`]:{margin:0},[`${i}:not(:last-child)`]:{marginRight:{_skip_check_:!0,value:e.marginSM}}},[`${d} + ${d}`]:{margin:{_skip_check_:!0,value:l}}}},Wa=e=>{const{componentCls:t,tabsHorizontalItemMarginRTL:n,iconCls:r,cardGutter:i,calc:l}=e;return{[`${t}-rtl`]:{direction:"rtl",[`${t}-nav`]:{[`${t}-tab`]:{margin:{_skip_check_:!0,value:n},[`${t}-tab:last-of-type`]:{marginLeft:{_skip_check_:!0,value:0}},[r]:{marginRight:{_skip_check_:!0,value:0},marginLeft:{_skip_check_:!0,value:(0,S.bf)(e.marginSM)}},[`${t}-tab-remove`]:{marginRight:{_skip_check_:!0,value:(0,S.bf)(e.marginXS)},marginLeft:{_skip_check_:!0,value:(0,S.bf)(l(e.marginXXS).mul(-1).equal())},[r]:{margin:0}}}},[`&${t}-left`]:{[`> ${t}-nav`]:{order:1},[`> ${t}-content-holder`]:{order:0}},[`&${t}-right`]:{[`> ${t}-nav`]:{order:0},[`> ${t}-content-holder`]:{order:1}},[`&${t}-card${t}-top, &${t}-card${t}-bottom`]:{[`> ${t}-nav, > div > ${t}-nav`]:{[`${t}-tab + ${t}-tab`]:{marginRight:{_skip_check_:!0,value:i},marginLeft:{_skip_check_:!0,value:0}}}}},[`${t}-dropdown-rtl`]:{direction:"rtl"},[`${t}-menu-item`]:{[`${t}-dropdown-rtl`]:{textAlign:{_skip_check_:!0,value:"right"}}}}},Ha=e=>{const{componentCls:t,tabsCardPadding:n,cardHeight:r,cardGutter:i,itemHoverColor:l,itemActiveColor:c,colorBorderSecondary:o}=e;return{[t]:Object.assign(Object.assign(Object.assign(Object.assign({},(0,Ce.Wf)(e)),{display:"flex",[`> ${t}-nav, > div > ${t}-nav`]:{position:"relative",display:"flex",flex:"none",alignItems:"center",[`${t}-nav-wrap`]:{position:"relative",display:"flex",flex:"auto",alignSelf:"stretch",overflow:"hidden",whiteSpace:"nowrap",transform:"translate(0)","&::before, &::after":{position:"absolute",zIndex:1,opacity:0,transition:`opacity ${e.motionDurationSlow}`,content:"''",pointerEvents:"none"}},[`${t}-nav-list`]:{position:"relative",display:"flex",transition:`opacity ${e.motionDurationSlow}`},[`${t}-nav-operations`]:{display:"flex",alignSelf:"stretch"},[`${t}-nav-operations-hidden`]:{position:"absolute",visibility:"hidden",pointerEvents:"none"},[`${t}-nav-more`]:{position:"relative",padding:n,background:"transparent",border:0,color:e.colorText,"&::after":{position:"absolute",right:{_skip_check_:!0,value:0},bottom:0,left:{_skip_check_:!0,value:0},height:e.calc(e.controlHeightLG).div(8).equal(),transform:"translateY(100%)",content:"''"}},[`${t}-nav-add`]:Object.assign({minWidth:r,minHeight:r,marginLeft:{_skip_check_:!0,value:i},padding:`0 ${(0,S.bf)(e.paddingXS)}`,background:"transparent",border:`${(0,S.bf)(e.lineWidth)} ${e.lineType} ${o}`,borderRadius:`${(0,S.bf)(e.borderRadiusLG)} ${(0,S.bf)(e.borderRadiusLG)} 0 0`,outline:"none",cursor:"pointer",color:e.colorText,transition:`all ${e.motionDurationSlow} ${e.motionEaseInOut}`,"&:hover":{color:l},"&:active, &:focus:not(:focus-visible)":{color:c}},(0,Ce.Qy)(e))},[`${t}-extra-content`]:{flex:"none"},[`${t}-ink-bar`]:{position:"absolute",background:e.inkBarColor,pointerEvents:"none"}}),Da(e)),{[`${t}-content`]:{position:"relative",width:"100%"},[`${t}-content-holder`]:{flex:"auto",minWidth:0,minHeight:0},[`${t}-tabpane`]:{outline:"none","&-hidden":{display:"none"}}}),[`${t}-centered`]:{[`> ${t}-nav, > div > ${t}-nav`]:{[`${t}-nav-wrap`]:{[`&:not([class*='${t}-nav-wrap-ping'])`]:{justifyContent:"center"}}}}}},ja=e=>{const t=e.controlHeightLG;return{zIndexPopup:e.zIndexPopupBase+50,cardBg:e.colorFillAlter,cardHeight:t,cardPadding:`${(t-Math.round(e.fontSize*e.lineHeight))/2-e.lineWidth}px ${e.padding}px`,cardPaddingSM:`${e.paddingXXS*1.5}px ${e.padding}px`,cardPaddingLG:`${e.paddingXS}px ${e.padding}px ${e.paddingXXS*1.5}px`,titleFontSize:e.fontSize,titleFontSizeLG:e.fontSizeLG,titleFontSizeSM:e.fontSize,inkBarColor:e.colorPrimary,horizontalMargin:`0 0 ${e.margin}px 0`,horizontalItemGutter:32,horizontalItemMargin:"",horizontalItemMarginRTL:"",horizontalItemPadding:`${e.paddingSM}px 0`,horizontalItemPaddingSM:`${e.paddingXS}px 0`,horizontalItemPaddingLG:`${e.padding}px 0`,verticalItemPadding:`${e.paddingXS}px ${e.paddingLG}px`,verticalItemMargin:`${e.margin}px 0 0 0`,itemColor:e.colorText,itemSelectedColor:e.colorPrimary,itemHoverColor:e.colorPrimaryHover,itemActiveColor:e.colorPrimaryActive,cardGutter:e.marginXXS/2}};var Ga=(0,Na.I$)("Tabs",e=>{const t=(0,Ma.IX)(e,{tabsCardPadding:e.cardPadding,dropdownEdgeChildVerticalPadding:e.paddingXXS,tabsActiveTextShadow:"0 0 0.25px currentcolor",tabsDropdownHeight:200,tabsDropdownWidth:120,tabsHorizontalItemMargin:`0 0 0 ${(0,S.bf)(e.horizontalItemGutter)}`,tabsHorizontalItemMarginRTL:`0 0 0 ${(0,S.bf)(e.horizontalItemGutter)}`});return[_a(t),Wa(t),Ba(t),Aa(t),za(t),Ha(t),Oa(t)]},ja),ka=()=>null,Va=function(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var i=0,r=Object.getOwnPropertySymbols(e);i<r.length;i++)t.indexOf(r[i])<0&&Object.prototype.propertyIsEnumerable.call(e,r[i])&&(n[r[i]]=e[r[i]]);return n};const bt=e=>{var t,n,r,i,l,c,o,s,d,v,u;const{type:b,className:Z,rootClassName:z,size:R,onEdit:M,hideAdd:g,centered:f,addIcon:w,removeIcon:N,moreIcon:B,more:H,popupClassName:_,children:$,items:p,animated:L,style:C,indicatorSize:x,indicator:y}=e,T=Va(e,["type","className","rootClassName","size","onEdit","hideAdd","centered","addIcon","removeIcon","moreIcon","more","popupClassName","children","items","animated","style","indicatorSize","indicator"]),{prefixCls:Y}=T,{direction:re,tabs:h,getPrefixCls:F,getPopupContainer:ae}=a.useContext(Ca.E_),G=F("tabs",Y),Q=(0,xa.Z)(G),[ie,E,A]=Ga(G,Q);let k;b==="editable-card"&&(k={onEdit:(ue,pe)=>{let{key:O,event:le}=pe;M==null||M(ue==="add"?le:O,ue)},removeIcon:(t=N!=null?N:h==null?void 0:h.removeIcon)!==null&&t!==void 0?t:a.createElement(Ee.Z,null),addIcon:(w!=null?w:h==null?void 0:h.addIcon)||a.createElement(_e.Z,null),showAdd:g!==!0});const V=F(),j=(0,Ta.Z)(R),W=La(p,$),J=Ra(G,L),he=Object.assign(Object.assign({},h==null?void 0:h.style),C),ce={align:(n=y==null?void 0:y.align)!==null&&n!==void 0?n:(r=h==null?void 0:h.indicator)===null||r===void 0?void 0:r.align,size:(o=(l=(i=y==null?void 0:y.size)!==null&&i!==void 0?i:x)!==null&&l!==void 0?l:(c=h==null?void 0:h.indicator)===null||c===void 0?void 0:c.size)!==null&&o!==void 0?o:h==null?void 0:h.indicatorSize};return ie(a.createElement(Sa,Object.assign({direction:re,getPopupContainer:ae},T,{items:W,className:K()({[`${G}-${j}`]:j,[`${G}-card`]:["card","editable-card"].includes(b),[`${G}-editable-card`]:b==="editable-card",[`${G}-centered`]:f},h==null?void 0:h.className,Z,z,E,A,Q),popupClassName:K()(_,E,A,Q),style:he,editable:k,more:Object.assign({icon:(u=(v=(d=(s=h==null?void 0:h.more)===null||s===void 0?void 0:s.icon)!==null&&d!==void 0?d:h==null?void 0:h.moreIcon)!==null&&v!==void 0?v:B)!==null&&u!==void 0?u:a.createElement(Be.Z,null),transitionName:`${V}-slide-up`},H),prefixCls:G,animated:J,indicator:ce})))};bt.TabPane=ka;var Xa=bt}}]);