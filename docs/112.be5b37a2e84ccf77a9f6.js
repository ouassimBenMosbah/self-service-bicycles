(self.webpackChunkself_service_bicycles=self.webpackChunkself_service_bicycles||[]).push([[112],{4112:(t,n,e)=>{"use strict";e.r(n),e.d(n,{StationDetailModule:()=>v});var s=e(1116),o=e(8619);let i=(()=>{class t{}return t.\u0275fac=function(n){return new(n||t)},t.\u0275mod=o.oAB({type:t}),t.\u0275inj=o.cJS({imports:[[s.ez]]}),t})();var a=e(177),c=e(1767),r=e(4689),p=e(8115);let u=(()=>{class t{constructor(t){this.stationsDatastore=t}getOneStation(t){return this.stationsDatastore.getOneStation(t)}}return t.\u0275fac=function(n){return new(n||t)(o.LFG(p.g))},t.\u0275prov=o.Yz7({token:t,factory:t.\u0275fac,providedIn:"root"}),t})();var l=e(7366);let f=(()=>{class t{constructor(){}ngOnInit(){}}return t.\u0275fac=function(n){return new(n||t)},t.\u0275cmp=o.Xpm({type:t,selectors:[["app-station-information-sheet"]],inputs:{station:"station"},decls:14,vars:8,template:function(t,n){1&t&&(o.TgZ(0,"div"),o.TgZ(1,"p"),o._uU(2),o.qZA(),o.TgZ(3,"p"),o._uU(4),o.qZA(),o.TgZ(5,"p"),o._uU(6),o.ALo(7,"formatBoolean"),o.qZA(),o.TgZ(8,"p"),o._uU(9),o.qZA(),o.TgZ(10,"p"),o._uU(11),o.qZA(),o.TgZ(12,"p"),o._uU(13),o.qZA(),o.qZA()),2&t&&(o.xp6(2),o.Oqu(n.station.station_id),o.xp6(2),o.Oqu(n.station.name),o.xp6(2),o.Oqu(o.lcZ(7,6,n.station.is_installed)),o.xp6(3),o.hij("",n.station.num_docks_available," docks"),o.xp6(2),o.hij(" ",n.station.capacity-n.station.num_docks_available," docks out of service "),o.xp6(2),o.Oqu(n.station.updatedAt))},pipes:[l.W],styles:[""],changeDetection:0}),t})(),d=(()=>{class t{constructor(){}ngOnInit(){}}return t.\u0275fac=function(n){return new(n||t)},t.\u0275cmp=o.Xpm({type:t,selectors:[["app-loader"]],decls:2,vars:0,template:function(t,n){1&t&&(o.TgZ(0,"p"),o._uU(1,"loader works!"),o.qZA())},styles:[""],changeDetection:0}),t})();function g(t,n){1&t&&o._UZ(0,"app-station-information-sheet",3),2&t&&o.Q6J("station",n.ngIf)}function m(t,n){1&t&&o._UZ(0,"app-loader")}const Z=[{path:"",component:(()=>{class t{constructor(t,n){this.route=t,this.stationDetailService=n}ngOnInit(){this.station$=this.route.params.pipe((0,r.w)(t=>this.stationDetailService.getOneStation(t.id)))}}return t.\u0275fac=function(n){return new(n||t)(o.Y36(c.gz),o.Y36(u))},t.\u0275cmp=o.Xpm({type:t,selectors:[["app-view-station-detail"]],decls:5,vars:4,consts:[[1,"wrapper"],[3,"station",4,"ngIf","ngIfElse"],["loadingBlock",""],[3,"station"]],template:function(t,n){if(1&t&&(o.TgZ(0,"div",0),o.YNc(1,g,1,1,"app-station-information-sheet",1),o.ALo(2,"async"),o.qZA(),o.YNc(3,m,1,0,"ng-template",null,2,o.W1O)),2&t){const t=o.MAs(4);o.xp6(1),o.Q6J("ngIf",o.lcZ(2,2,n.station$))("ngIfElse",t)}},directives:[s.O5,f,d],pipes:[s.Ov],styles:[""],changeDetection:0}),t})()}];let h=(()=>{class t{}return t.\u0275fac=function(n){return new(n||t)},t.\u0275mod=o.oAB({type:t}),t.\u0275inj=o.cJS({imports:[[c.Bz.forChild(Z)],c.Bz]}),t})(),v=(()=>{class t{}return t.\u0275fac=function(n){return new(n||t)},t.\u0275mod=o.oAB({type:t}),t.\u0275inj=o.cJS({imports:[[s.ez,a.d,i,h]]}),t})()}}]);