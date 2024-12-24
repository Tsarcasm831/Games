import{a as m,D as V}from"./constant.DRpHUDpf.js";import{w as j,g as x}from"./entry.6BK1hbzo.js";import{i as d}from"./scheduler.vVLarB1H.js";var U=Object.freeze({Linear:Object.freeze({None:function(t){return t},In:function(t){return t},Out:function(t){return t},InOut:function(t){return t}}),Quadratic:Object.freeze({In:function(t){return t*t},Out:function(t){return t*(2-t)},InOut:function(t){return(t*=2)<1?.5*t*t:-.5*(--t*(t-2)-1)}}),Cubic:Object.freeze({In:function(t){return t*t*t},Out:function(t){return--t*t*t+1},InOut:function(t){return(t*=2)<1?.5*t*t*t:.5*((t-=2)*t*t+2)}}),Quartic:Object.freeze({In:function(t){return t*t*t*t},Out:function(t){return 1- --t*t*t*t},InOut:function(t){return(t*=2)<1?.5*t*t*t*t:-.5*((t-=2)*t*t*t-2)}}),Quintic:Object.freeze({In:function(t){return t*t*t*t*t},Out:function(t){return--t*t*t*t*t+1},InOut:function(t){return(t*=2)<1?.5*t*t*t*t*t:.5*((t-=2)*t*t*t*t+2)}}),Sinusoidal:Object.freeze({In:function(t){return 1-Math.sin((1-t)*Math.PI/2)},Out:function(t){return Math.sin(t*Math.PI/2)},InOut:function(t){return .5*(1-Math.sin(Math.PI*(.5-t)))}}),Exponential:Object.freeze({In:function(t){return t===0?0:Math.pow(1024,t-1)},Out:function(t){return t===1?1:1-Math.pow(2,-10*t)},InOut:function(t){return t===0?0:t===1?1:(t*=2)<1?.5*Math.pow(1024,t-1):.5*(-Math.pow(2,-10*(t-1))+2)}}),Circular:Object.freeze({In:function(t){return 1-Math.sqrt(1-t*t)},Out:function(t){return Math.sqrt(1- --t*t)},InOut:function(t){return(t*=2)<1?-.5*(Math.sqrt(1-t*t)-1):.5*(Math.sqrt(1-(t-=2)*t)+1)}}),Elastic:Object.freeze({In:function(t){return t===0?0:t===1?1:-Math.pow(2,10*(t-1))*Math.sin((t-1.1)*5*Math.PI)},Out:function(t){return t===0?0:t===1?1:Math.pow(2,-10*t)*Math.sin((t-.1)*5*Math.PI)+1},InOut:function(t){return t===0?0:t===1?1:(t*=2,t<1?-.5*Math.pow(2,10*(t-1))*Math.sin((t-1.1)*5*Math.PI):.5*Math.pow(2,-10*(t-1))*Math.sin((t-1.1)*5*Math.PI)+1)}}),Back:Object.freeze({In:function(t){var r=1.70158;return t===1?1:t*t*((r+1)*t-r)},Out:function(t){var r=1.70158;return t===0?0:--t*t*((r+1)*t+r)+1},InOut:function(t){var r=2.5949095;return(t*=2)<1?.5*(t*t*((r+1)*t-r)):.5*((t-=2)*t*((r+1)*t+r)+2)}}),Bounce:Object.freeze({In:function(t){return 1-U.Bounce.Out(1-t)},Out:function(t){return t<1/2.75?7.5625*t*t:t<2/2.75?7.5625*(t-=1.5/2.75)*t+.75:t<2.5/2.75?7.5625*(t-=2.25/2.75)*t+.9375:7.5625*(t-=2.625/2.75)*t+.984375},InOut:function(t){return t<.5?U.Bounce.In(t*2)*.5:U.Bounce.Out(t*2-1)*.5+.5}}),generatePow:function(t){return t===void 0&&(t=4),t=t<Number.EPSILON?Number.EPSILON:t,t=t>1e4?1e4:t,{In:function(r){return Math.pow(r,t)},Out:function(r){return 1-Math.pow(1-r,t)},InOut:function(r){return r<.5?Math.pow(r*2,t)/2:(1-Math.pow(2-r*2,t))/2+.5}}}}),T=function(){return performance.now()},tt=function(){function t(){this._tweens={},this._tweensAddedDuringUpdate={}}return t.prototype.getAll=function(){var r=this;return Object.keys(this._tweens).map(function(n){return r._tweens[n]})},t.prototype.removeAll=function(){this._tweens={}},t.prototype.add=function(r){this._tweens[r.getId()]=r,this._tweensAddedDuringUpdate[r.getId()]=r},t.prototype.remove=function(r){delete this._tweens[r.getId()],delete this._tweensAddedDuringUpdate[r.getId()]},t.prototype.update=function(r,n){r===void 0&&(r=T()),n===void 0&&(n=!1);var i=Object.keys(this._tweens);if(i.length===0)return!1;for(;i.length>0;){this._tweensAddedDuringUpdate={};for(var e=0;e<i.length;e++){var a=this._tweens[i[e]],h=!n;a&&a.update(r,h)===!1&&!n&&delete this._tweens[i[e]]}i=Object.keys(this._tweensAddedDuringUpdate)}return!0},t}(),M={Linear:function(t,r){var n=t.length-1,i=n*r,e=Math.floor(i),a=M.Utils.Linear;return r<0?a(t[0],t[1],i):r>1?a(t[n],t[n-1],n-i):a(t[e],t[e+1>n?n:e+1],i-e)},Bezier:function(t,r){for(var n=0,i=t.length-1,e=Math.pow,a=M.Utils.Bernstein,h=0;h<=i;h++)n+=e(1-r,i-h)*e(r,h)*t[h]*a(i,h);return n},CatmullRom:function(t,r){var n=t.length-1,i=n*r,e=Math.floor(i),a=M.Utils.CatmullRom;return t[0]===t[n]?(r<0&&(e=Math.floor(i=n*(1+r))),a(t[(e-1+n)%n],t[e],t[(e+1)%n],t[(e+2)%n],i-e)):r<0?t[0]-(a(t[0],t[0],t[1],t[1],-i)-t[0]):r>1?t[n]-(a(t[n],t[n],t[n-1],t[n-1],i-n)-t[n]):a(t[e?e-1:0],t[e],t[n<e+1?n:e+1],t[n<e+2?n:e+2],i-e)},Utils:{Linear:function(t,r,n){return(r-t)*n+t},Bernstein:function(t,r){var n=M.Utils.Factorial;return n(t)/n(r)/n(t-r)},Factorial:function(){var t=[1];return function(r){var n=1;if(t[r])return t[r];for(var i=r;i>1;i--)n*=i;return t[r]=n,n}}(),CatmullRom:function(t,r,n,i,e){var a=(n-t)*.5,h=(i-r)*.5,f=e*e,p=e*f;return(2*r-2*n+a+h)*p+(-3*r+3*n-2*a-h)*f+a*e+r}}},et=function(){function t(){}return t.nextId=function(){return t._nextId++},t._nextId=0,t}(),G=new tt,it=function(){function t(r,n){n===void 0&&(n=G),this._object=r,this._group=n,this._isPaused=!1,this._pauseStart=0,this._valuesStart={},this._valuesEnd={},this._valuesStartRepeat={},this._duration=1e3,this._isDynamic=!1,this._initialRepeat=0,this._repeat=0,this._yoyo=!1,this._isPlaying=!1,this._reversed=!1,this._delayTime=0,this._startTime=0,this._easingFunction=U.Linear.None,this._interpolationFunction=M.Linear,this._chainedTweens=[],this._onStartCallbackFired=!1,this._onEveryStartCallbackFired=!1,this._id=et.nextId(),this._isChainStopped=!1,this._propertiesAreSetUp=!1,this._goToEnd=!1}return t.prototype.getId=function(){return this._id},t.prototype.isPlaying=function(){return this._isPlaying},t.prototype.isPaused=function(){return this._isPaused},t.prototype.getDuration=function(){return this._duration},t.prototype.to=function(r,n){if(n===void 0&&(n=1e3),this._isPlaying)throw new Error("Can not call Tween.to() while Tween is already started or paused. Stop the Tween first.");return this._valuesEnd=r,this._propertiesAreSetUp=!1,this._duration=n<0?0:n,this},t.prototype.duration=function(r){return r===void 0&&(r=1e3),this._duration=r<0?0:r,this},t.prototype.dynamic=function(r){return r===void 0&&(r=!1),this._isDynamic=r,this},t.prototype.start=function(r,n){if(r===void 0&&(r=T()),n===void 0&&(n=!1),this._isPlaying)return this;if(this._group&&this._group.add(this),this._repeat=this._initialRepeat,this._reversed){this._reversed=!1;for(var i in this._valuesStartRepeat)this._swapEndStartRepeatValues(i),this._valuesStart[i]=this._valuesStartRepeat[i]}if(this._isPlaying=!0,this._isPaused=!1,this._onStartCallbackFired=!1,this._onEveryStartCallbackFired=!1,this._isChainStopped=!1,this._startTime=r,this._startTime+=this._delayTime,!this._propertiesAreSetUp||n){if(this._propertiesAreSetUp=!0,!this._isDynamic){var e={};for(var a in this._valuesEnd)e[a]=this._valuesEnd[a];this._valuesEnd=e}this._setupProperties(this._object,this._valuesStart,this._valuesEnd,this._valuesStartRepeat,n)}return this},t.prototype.startFromCurrentValues=function(r){return this.start(r,!0)},t.prototype._setupProperties=function(r,n,i,e,a){for(var h in i){var f=r[h],p=Array.isArray(f),_=p?"array":typeof f,l=!p&&Array.isArray(i[h]);if(!(_==="undefined"||_==="function")){if(l){var b=i[h];if(b.length===0)continue;for(var o=[f],k=0,N=b.length;k<N;k+=1){var A=this._handleRelativeValue(f,b[k]);if(isNaN(A)){l=!1,console.warn("Found invalid interpolation list. Skipping.");break}o.push(A)}l&&(i[h]=o)}if((_==="object"||p)&&f&&!l){n[h]=p?[]:{};var E=f;for(var C in E)n[h][C]=E[C];e[h]=p?[]:{};var b=i[h];if(!this._isDynamic){var R={};for(var C in b)R[C]=b[C];i[h]=b=R}this._setupProperties(E,n[h],b,e[h],a)}else(typeof n[h]>"u"||a)&&(n[h]=f),p||(n[h]*=1),l?e[h]=i[h].slice().reverse():e[h]=n[h]||0}}},t.prototype.stop=function(){return this._isChainStopped||(this._isChainStopped=!0,this.stopChainedTweens()),this._isPlaying?(this._group&&this._group.remove(this),this._isPlaying=!1,this._isPaused=!1,this._onStopCallback&&this._onStopCallback(this._object),this):this},t.prototype.end=function(){return this._goToEnd=!0,this.update(1/0),this},t.prototype.pause=function(r){return r===void 0&&(r=T()),this._isPaused||!this._isPlaying?this:(this._isPaused=!0,this._pauseStart=r,this._group&&this._group.remove(this),this)},t.prototype.resume=function(r){return r===void 0&&(r=T()),!this._isPaused||!this._isPlaying?this:(this._isPaused=!1,this._startTime+=r-this._pauseStart,this._pauseStart=0,this._group&&this._group.add(this),this)},t.prototype.stopChainedTweens=function(){for(var r=0,n=this._chainedTweens.length;r<n;r++)this._chainedTweens[r].stop();return this},t.prototype.group=function(r){return r===void 0&&(r=G),this._group=r,this},t.prototype.delay=function(r){return r===void 0&&(r=0),this._delayTime=r,this},t.prototype.repeat=function(r){return r===void 0&&(r=0),this._initialRepeat=r,this._repeat=r,this},t.prototype.repeatDelay=function(r){return this._repeatDelayTime=r,this},t.prototype.yoyo=function(r){return r===void 0&&(r=!1),this._yoyo=r,this},t.prototype.easing=function(r){return r===void 0&&(r=U.Linear.None),this._easingFunction=r,this},t.prototype.interpolation=function(r){return r===void 0&&(r=M.Linear),this._interpolationFunction=r,this},t.prototype.chain=function(){for(var r=[],n=0;n<arguments.length;n++)r[n]=arguments[n];return this._chainedTweens=r,this},t.prototype.onStart=function(r){return this._onStartCallback=r,this},t.prototype.onEveryStart=function(r){return this._onEveryStartCallback=r,this},t.prototype.onUpdate=function(r){return this._onUpdateCallback=r,this},t.prototype.onRepeat=function(r){return this._onRepeatCallback=r,this},t.prototype.onComplete=function(r){return this._onCompleteCallback=r,this},t.prototype.onStop=function(r){return this._onStopCallback=r,this},t.prototype.update=function(r,n){var i;if(r===void 0&&(r=T()),n===void 0&&(n=!0),this._isPaused)return!0;var e=this._startTime+this._duration;if(!this._goToEnd&&!this._isPlaying){if(r>e)return!1;n&&this.start(r,!0)}if(this._goToEnd=!1,r<this._startTime)return!0;this._onStartCallbackFired===!1&&(this._onStartCallback&&this._onStartCallback(this._object),this._onStartCallbackFired=!0),this._onEveryStartCallbackFired===!1&&(this._onEveryStartCallback&&this._onEveryStartCallback(this._object),this._onEveryStartCallbackFired=!0);var a=r-this._startTime,h=this._duration+((i=this._repeatDelayTime)!==null&&i!==void 0?i:this._delayTime),f=this._duration+this._repeat*h,p=this._calculateElapsedPortion(a,h,f),_=this._easingFunction(p),l=this._calculateCompletionStatus(a,h);if(l==="repeat"&&this._processRepetition(a,h),this._updateProperties(this._object,this._valuesStart,this._valuesEnd,_),l==="about-to-repeat"&&this._processRepetition(a,h),this._onUpdateCallback&&this._onUpdateCallback(this._object,p),l==="repeat"||l==="about-to-repeat")this._onRepeatCallback&&this._onRepeatCallback(this._object),this._onEveryStartCallbackFired=!1;else if(l==="completed"){this._isPlaying=!1,this._onCompleteCallback&&this._onCompleteCallback(this._object);for(var b=0,o=this._chainedTweens.length;b<o;b++)this._chainedTweens[b].start(this._startTime+this._duration,!1)}return l!=="completed"},t.prototype._calculateElapsedPortion=function(r,n,i){if(this._duration===0||r>i)return 1;var e=r%n,a=Math.min(e/this._duration,1);return a===0&&r!==0&&r%this._duration===0?1:a},t.prototype._calculateCompletionStatus=function(r,n){return this._duration!==0&&r<this._duration?"playing":this._repeat<=0?"completed":r===this._duration?"about-to-repeat":"repeat"},t.prototype._processRepetition=function(r,n){var i=Math.min(Math.trunc((r-this._duration)/n)+1,this._repeat);isFinite(this._repeat)&&(this._repeat-=i);for(var e in this._valuesStartRepeat){var a=this._valuesEnd[e];!this._yoyo&&typeof a=="string"&&(this._valuesStartRepeat[e]=this._valuesStartRepeat[e]+parseFloat(a)),this._yoyo&&this._swapEndStartRepeatValues(e),this._valuesStart[e]=this._valuesStartRepeat[e]}this._yoyo&&(this._reversed=!this._reversed),this._startTime+=n*i},t.prototype._updateProperties=function(r,n,i,e){for(var a in i)if(n[a]!==void 0){var h=n[a]||0,f=i[a],p=Array.isArray(r[a]),_=Array.isArray(f),l=!p&&_;l?r[a]=this._interpolationFunction(f,e):typeof f=="object"&&f?this._updateProperties(r[a],h,f,e):(f=this._handleRelativeValue(h,f),typeof f=="number"&&(r[a]=h+(f-h)*e))}},t.prototype._handleRelativeValue=function(r,n){return typeof n!="string"?n:n.charAt(0)==="+"||n.charAt(0)==="-"?r+parseFloat(n):parseFloat(n)},t.prototype._swapEndStartRepeatValues=function(r){var n=this._valuesStartRepeat[r],i=this._valuesEnd[r];typeof i=="string"?this._valuesStartRepeat[r]=this._valuesStartRepeat[r]+parseFloat(i):this._valuesStartRepeat[r]=this._valuesEnd[r],this._valuesEnd[r]=n},t}(),P=G;P.getAll.bind(P);P.removeAll.bind(P);P.add.bind(P);P.remove.bind(P);var ft=P.update.bind(P);const rt=()=>{const{subscribe:t,set:r,update:n}=j({});return{subscribe:t,set:r,update:n,addAlert:function(i){n(e=>{const a={id:crypto.randomUUID(),type:i.type,text:i.text,offset:0,opacity:1};return e[a.id]=a,new it(e[a.id]).to({offset:a.offset-40,opacity:0},3e3).onUpdate(h=>{n(f=>(f[a.id]=h,f))}).onComplete(()=>{this.removeAlert(a.id)}).start(),a.offset+=60,e})},removeAlert:function(i){n(e=>(delete e[i],e))}}},Y=rt(),nt=()=>{const{subscribe:t,set:r,update:n}=j({homeMessage:{message:"",type:""},canvas2DRef:null});return{subscribe:t,set:r,update:n,setHomeMessage:function(i,e){n(a=>(a.homeMessage={message:i,type:e},a))},getHomeMessage:function(){return d(this).homeMessage},resetHomeMessage:function(){n(i=>(i.homeMessage={message:"",type:""},i))}}},J=nt(),st=()=>{const{subscribe:t,set:r,update:n}=j({pageUUID:crypto.randomUUID(),cleanDisconnect:!1,use_auth:!1,ws:null,pendingConnection:null,reconnectTentative:0});return{subscribe:t,set:r,update:n,getPageUUID:function(){return d(this).pageUUID},getState:function(){return d(this)},connectWebSocket:function(i){var e;if(d(this).ws&&((e=d(this).ws)==null?void 0:e.readyState)===WebSocket.OPEN){d(this).ws.close();return}return new Promise((a,h)=>{const f=new WebSocket(m,d(this).use_auth?["auth"]:[]);f.onopen=()=>{var p;if(this.pendingConnection=null,(p=d(u).scene)!=null&&p.created)D.join(d(u).login);else{let _=function(){var l;(l=d(u).scene)!=null&&l.created?D.join(d(u).login):setTimeout(()=>{_()},100)};_()}a(f)},f.onmessage=p=>{var k,N,A,E,C;const{type:_,data:l}=JSON.parse(p.data),b=d(u),o=b.scene;switch(_){case"alert":{const{text:s}=l;Y.addAlert({type:s,text:s})}break;case"build":{const{itemId:s,x:c,y,uuid:S,userId:w}=l;o.build(s,c,y,S,w,l)}break;case"receiveChat":{const{userId:s,username:c,chat:y}=l;u.addChat({username:c??((k=u.getPlayer(s))==null?void 0:k.username),userId:s,chat:y})}break;case"join":{if(!b.isInit)return;const{player:s}=l;u.addPlayer(s),o.createNewPlayer(s);break}case"disconnected_by_connexion":{const{reason:s}=l;this.clearGame(s),J.setHomeMessage("You have been disconnected by another connexion","error");break}case"chunk":break;case"playerData":{const{player:s}=l;u.updateMyPlayer(s);break}case"updatePlayer":{const{player:s}=l;if(b.player.uuid===void 0||b.player.uuid===s.uuid){u.updateMyPlayer(s),o.updatePlayer(s);return}const c=u.getPlayer(s.uuid);if(!c){console.log("Player not found",s);return}Object.assign(c,s),o.updatePlayer(s);break}case"move":{if(!b.isInit)return;const{player:s}=l;if(((A=(N=u.getState())==null?void 0:N.player)==null?void 0:A.uuid)===s.uuid){const c=(E=u.getState())==null?void 0:E.player,y=Math.sqrt(Math.pow(c.x-s.x,2)+Math.pow(c.y-s.y,2));u.updateMyPlayer(s),o==null||o.moveMyPlayer(s.x,s.y,s.anim,s.flipX),y>200&&(o==null||o.updatePlayerPosition(s.x,s.y))}else u.updatePlayer(s.uuid,s);break}case"removeAllPlayers":Object.keys(u.getPlayers()).forEach(s=>u.removePlayer(s));break;case"leave":{const{uuid:s}=l;u.removePlayer(s);break}case"spawnFlyingObject":break;case"despawnFlyingObject":break;case"spawnCollectable":{const{collectable:s}=l;o.createNewCollectable(s);break}case"despawnCollectable":{const{collectableId:s}=l;o.removeCollectable(s);break}case"spawnEntity":{const{type:s,entity:c}=l;switch(s){case"FIGHT_ENTRANCE":u.addFightEntrance(c),o.createFightEntranceEntity(c);break;case"CREATURE":o.createNewEntity(c);break}}break;case"despawnEntity":{const{type:s,uuid:c}=l;switch(s){case"FIGHT_ENTRANCE":u.removeFightEntrance(c),o.removeFightEntranceEntity(c);break;case"CREATURE":{o.removeEntity(c);break}}}break;case"mapUpdate":{const{chunks:s,collectables:c,chunksToRemove:y,removeAllBuilds:S,removeAllEntities:w,removeAllPlayers:F,fights:I,entities:O,caves:g}=l;w&&o.removeAllEntity(),S&&o.removeAllBuilds(),F&&(u.setPlayers([]),o.removeAllPlayers()),S&&(o.cleanAllCaves(),o.cleanFightEnterEntities()),Array.isArray(y)&&y.length>0&&o.removeChunks(y),Array.isArray(s)&&s.length>0&&o.addChunks(s),Array.isArray(c)&&c.length>0&&(u.update(v=>(v.collectables=v.collectables.concat(c),v)),c.forEach(v=>o.createNewCollectable(v))),Array.isArray(O)&&O.length>0&&(u.update(v=>(v.entities=v.entities.concat(O),v)),O.forEach(v=>o.createNewEntity(v))),Array.isArray(I)&&I.length>0&&(u.update(v=>(v.fights=v.fights.concat(I),v)),I.forEach(v=>o.createFightEntranceEntity(v))),Array.isArray(g)&&g.length>0&&g.forEach(v=>o.createCave(v))}break;case"playFightAnimation":break;case"playBar":{const{duration:s}=l;o.playBar(s)}case"playAnimation":const{userId:R,anim:q,flipX:X}=l;o.playAnimation(R,q,{flipX:X});break;case"update":l.profile&&u.setProfile(l.profile),l.chunks&&u.insertorUpdateChunks(l.chunks),l.players&&u.setPlayers(l.players);break;case"addCollectables":break;case"unloadChunks":break;case"initPlayer":{const{player:s,gameIsInit:c}=l;u.updateMyPlayer(s),o.createMyCharacter(s),c&&u.setIsInit(!0)}break;case"init":const{player:B,players:Q,entities:z,collectables:W,builds:K,chunks:Z,fights:H,caves:$}=l;u.setFight(null),u.updateMyPlayer(B),o.createMyCharacter(B),o.addChunks(Z);const L=Q.filter(s=>s.uuid!=B.uuid);u.setPlayers(L),u.setEntities(z),u.setCollectables(W),u.setFights(H),L.forEach(s=>o.createNewPlayer(s)),z.forEach(s=>o.createNewEntity(s)),W.forEach(s=>o.createNewCollectable(s)),K.forEach(s=>o.build(s.itemId,s.x,s.y,s.uuid,s.userId,s)),H.forEach(s=>o.createFightEntranceEntity(s)),$.forEach(s=>o.createCave(s)),u.setIsInit(!0);break;case"resync":{o.player.setVisible(!0),o==null||o.updatePlayerPosition(u.getState().player.x,u.getState().player.y),o.setCameraToFollowPlayer(),o.clearFight();const{players:s,entities:c,collectables:y,builds:S,chunks:w,fight:F,fights:I,caves:O}=l;o.addChunks(w),u.setPlayers(s),u.setEntities(c),u.setCollectables(y),u.setFights(I),s.forEach(g=>o.createNewPlayer(g)),c.forEach(g=>o.createNewEntity(g)),y.forEach(g=>o.createNewCollectable(g)),S.forEach(g=>o.build(g.itemId,g.x,g.y,g.uuid,g.userId,g)),I.forEach(g=>o.createFightEntranceEntity(g)),O.forEach(g=>o.createCave(g)),F!==void 0&&u.setFight(F)}break;case"base_info":break;case"claim":u.updateBase(l);break;case"update_base":u.updateBase(l);break;case"ladder_info":break;case"chat":break;case"error":break;case"startFight":{const{fight:s}=l,c=u.getState().player.uuid;at(),u.setFight(s),(C=s.timeline)==null||C.forEach(y=>o.createFightEntity(y)),o.player.setVisible(!1),o==null||o.updatePlayerPosition(0,0),o.setStaticCameraToCenterOfFight(),s.currentStep==="WAITING_START"&&o.drawCasesAvailablesToMove(s),s.turnOf===c&&o.drawCasesAvailablesToMovePM(s.timeline.find(y=>y.uuid===c))}break;case"turnFight":{const{fight:s}=l,c=u.getState().player.uuid;ot(),u.setFight(s),s.turnOf===c&&o.drawCasesAvailablesToMovePM(s.timeline.find(y=>y.uuid===c))}break;case"joinFight":{const{playerFight:s,fight:c}=l;u.setFight(c),s&&(o==null||o.createFightEntity(s)),console.log("🟢 Player try to join your fight",s)}break;case"fightRemovePlayer":{const{playerUUID:s,fight:c}=l;u.setFight(c),o.removeFightEntity(s),console.log("🔴 Player remove from your fight",s)}break;case"fightLeave":{const{playerUUID:s,fight:c}=l;u.setFight(c),o.fightPlayDead(s),console.log("🔴 Player leave your fight",s)}break;case"updatePlayerPositionFight":{const{playerUUID:s,position:c,fight:y}=l;if(!u.getFight())return;y&&u.setFight(y),u.update(S=>{const w=S.fight.timeline.find(F=>F.uuid===s);return w?(w.x=c.x,w.y=c.y,w.tx=c.tx,w.ty=c.ty,o.updateMoveOfFightEntity(w,S.fight.currentStep==="FIGHTING_TURN"),S.fight.currentStep==="FIGHTING_TURN"&&s===S.player.uuid&&(o==null||o.drawCasesAvailablesToMovePM(w)),S):(console.log("not found player in fight",s),S)})}break;case"fightUpdate":{const{fight:s,action:c}=l;u.setFight(s),o.playFightAction(c)}break;case"openBuild":{const{build:s}=l;u.setBuildToOpenData(s)}break;case"removeBuild":{const{uuid:s}=l;o.removeBuild(s);const c=u.getState();(c.buildToOpenUUID===s||c.buildToOpenUUID===s)&&u.update(y=>(y.buildToOpenUUID=null,y.buildToOpenData=null,y))}break;case"entitiesUpdateCoords":{if(!b.isInit)return;const{entities:s}=l;u.update(c=>(!c.entities||!Array.isArray(c.entities)||(c.entities=c.entities.map(y=>{const S=s.find(w=>w.uuid===y.uuid);return S&&Object.assign(y,S),y})),c))}break;default:console.error("Unknown message type:",_)}},f.onerror=p=>{console.error("WebSocket Error: ",p),h(p)},f.onclose=function(){console.log("Disconnected from WebSocket !"),J.getHomeMessage().message.includes("by another connexion")||J.setHomeMessage("You have been disconnected by the server.","error"),u.isInit()?D.clearGame("Connection closed by server"):(console.log("Game never loaded, no need to clear the game !"),x("/")),n(p=>(p.ws=null,p))},n(p=>(p.ws=f,p))})},clearGame:function(i){const a=d(u).scene;a!=null&&a.player||console.log("⛔⛔⛔ PLAYER IS UNDEFINED, PROBABLY HMR REFRESH ⛔⛔⛔"),Y.addAlert({type:i,text:i}),this.closeWebSocket(),u.setPlayer({}),u.setChunks([]),a==null||a.resetChunks(),u.setCollectables([]),u.setPlayers([]),u.setEntities({}),u.setFight(null),a==null||a.clearEverything(),console.log("Game clear !"),x("/")},build:function(i,e,a){var h;(h=this.getState().ws)==null||h.send(JSON.stringify({type:"build",data:{itemId:i,x:e,y:a}}))},craftItem:function(i){var e;(e=this.getState().ws)==null||e.send(JSON.stringify({type:"craftItem",data:{itemId:i}}))},sendChat:function(i){var e;(e=this.getState().ws)==null||e.send(JSON.stringify({type:"sendChat",data:{chat:i}}))},test:function(){var i;(i=this.getState().ws)==null||i.send(JSON.stringify({type:"test",data:{test:"test"}}))},join:function(i){var e;if(!d(this).use_auth&&(!i||!i.username)){console.log("Redirected to home because no username"),x("/");return}(e=this.getState().ws)==null||e.send(JSON.stringify({type:"join",data:i}))},updatePlayer:function(i){var e;(e=this.getState().ws)==null||e.send(JSON.stringify({type:"updatePlayer",data:{player:i}}))},move:function(i,e,a,h,f){var p;u.update(_=>(_.player&&(_.player.x=i,_.player.y=e),_)),(p=this.getState().ws)==null||p.send(JSON.stringify({type:"move",data:{x:i,y:e,anim:a,frame:h,flipX:f}}))},collectCollectable:function(i){var e;(e=this.getState().ws)==null||e.send(JSON.stringify({type:"collectCollectable",data:{collectableId:i}}))},playAnimation:function(i){var e;(e=this.getState().ws)==null||e.send(JSON.stringify({type:"playAnimation",data:{anim:i}}))},closeWebSocket:function(){var i;(i=this.getState().ws)==null||i.close()},startFight:function(i){var e;(e=this.getState().ws)==null||e.send(JSON.stringify({type:"startFight",data:{uuid:i}}))},leaveFight:function(){var i;(i=this.getState().ws)==null||i.send(JSON.stringify({type:"leaveFight"}))},readyFight:function(){var i;(i=this.getState().ws)==null||i.send(JSON.stringify({type:"readyFight"}))},notReadyFight:function(){var i;(i=this.getState().ws)==null||i.send(JSON.stringify({type:"notReadyFight"}))},endTurnFight:function(){var i;(i=this.getState().ws)==null||i.send(JSON.stringify({type:"endTurnFight"}))},changeStartPositionFight:function(i){var e;(e=this.getState().ws)==null||e.send(JSON.stringify({type:"changeStartPositionFight",data:{position:i}}))},moveFight:function(i){var e;(e=this.getState().ws)==null||e.send(JSON.stringify({type:"moveFight",data:{position:i}}))},attachFight:function(i){var e,a;(e=d(u).scene)==null||e.cleanCasesToAttack(),(a=this.getState().ws)==null||a.send(JSON.stringify({type:"attachFight",data:{position:i}}))},joinFight:function(i){var e;(e=this.getState().ws)==null||e.send(JSON.stringify({type:"joinFight",data:{fightUUID:i}}))},openBuild:function(i){var e;(e=this.getState().ws)==null||e.send(JSON.stringify({type:"openBuild",data:{uuid:i}}))},removeBuild:function(i){var e;(e=this.getState().ws)==null||e.send(JSON.stringify({type:"removeBuild",data:{uuid:i}}))},switchWorld:function(i,e){var a;(a=this.getState().ws)==null||a.send(JSON.stringify({type:"switchWorld",data:{worldId:i,type:e}}))},switchItem:function(i,e){var a;(a=this.getState().ws)==null||a.send(JSON.stringify({type:"switchItem",data:{from:i,to:e}}))},ban:function(i){var e;(e=this.getState().ws)==null||e.send(JSON.stringify({type:"shadowban",data:{uuid:i}}))}}},at=()=>{d(u).scene.clearFight()},ot=()=>{const t=d(u).scene;t.cleanCasesToMove(),t.cleanCasesStartPosition(),t.cleanCasesToAttack()},D=st(),ut=()=>{const{subscribe:t,set:r,update:n}=j({profile:{username:"Visitor"},isZQSD:!1,collectables:[],player:{},chunks:[],players:{},entities:{},scene:null,focusBase:null,pendingAction:null,isInit:!1,chat:[],mode:"",buildItem:null,login:{username:V},fight:null,fights:[],buildToOpenUUID:null,buildToOpenData:null,showMenu:"",dragItem:null});return{subscribe:t,set:r,update:n,openBuild(i){if(d(u).buildToOpenUUID===i){n(e=>(e.showMenu="",e.buildToOpenUUID=null,e.buildToOpenData=null,e));return}D.openBuild(i)},setBuildToOpenData(i){n(e=>(e.showMenu="build",e.buildToOpenUUID=i.uuid,e.buildToOpenData=i,e))},getMode(){return d(this).mode},setFights(i){n(e=>(e.fights=i,e))},getFights(){return d(this).fights},addFightEntrance(i){n(e=>(e.fights.push(i),e))},removeFightEntrance(i){n(e=>(e.fights=e.fights.filter(a=>a.uuid!==i),e))},setBuildItem:function(i){n(e=>(e.buildItem=i,e))},getBuildItem:function(){return d(this).buildItem},setMode(i){n(e=>(e.mode=i,e))},getState:function(){return d(this)},addChat:function(i){n(e=>(e.chat.push(i),e))},setChat:function(i){n(e=>(e.chat=i,e))},addPlayer:function(i){d(this).players[i.uuid]?this.updatePlayer(i.uuid,i):n(e=>(e.players[i.uuid]=i,e))},setPlayer:function(i){n(e=>(e.player=i,e))},getPlayer:function(){return d(this).player},updateMyPlayer:function(i){(d(this).player.uuid===void 0||d(this).player.uuid===i.uuid)&&n(e=>(e.player={...e.player,...i},e))},isInit:function(){return d(this).isInit},setIsInit:function(i){n(e=>(e.isInit=i,e))},setProfile:function(i){n(e=>(e.profile=i,e))},setGameClass:function(i){n(e=>(e.scene=i,e))},insertorUpdateChunks:function(i){n(e=>(i.forEach(a=>{const h=e.chunks.findIndex(f=>f.pointX===a.pointX&&f.pointY===a.pointY);h>-1?Object.assign(e.chunks[h],a):(console.log("💭 Nouveau chunk inséré par l'update, à voir"),e.chunks.push(a))}),e))},setCollectables:function(i){n(e=>(e.collectables=i,e))},getCollectables:function(){return d(this).collectables},setEntities:function(i){n(e=>(e.entities=i,e))},getEntities:function(){return d(this).entities},setPlayers:function(i){n(e=>(i.forEach(a=>{e.players[a.uuid]=a}),e))},removePlayer:function(i){n(e=>(delete e.players[i],e)),d(this).scene.removePlayer(i)},updatePlayer:function(i,e){n(a=>(a.players[i]={...a.players[i],...e},a))},getPlayers:function(){return d(this).players},getPlayer:function(i){return d(this).player.uuid===i?d(this).player:d(this).players[i]},setChunks:function(i){console.log("Loaded",i.length,"bases"),n(e=>(e.chunks=i.map(a=>a),e))},updateBase:function(i){n(e=>(e.chunks=e.chunks.map(a=>(a.pointX===i.pointX&&a.pointY===i.pointY&&Object.assign(a,i),a)),e))},setFight:function(i){n(e=>(e.fight=i,e))},getFight:function(){return d(this).fight}}},u=ut();export{Y as A,D as N,J as U,u as g,ft as u};
