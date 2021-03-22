define(['dojo/_base/declare', 'jimu/BaseWidget', 'dojo/_base/lang', 'dojo/dom', "esri/tasks/QueryTask", "esri/tasks/query", "esri/symbols/SimpleLineSymbol", 'esri/graphic', 'esri/geometry/Point'],
function(declare, BaseWidget, lang, dom, QueryTask, Query, SimpleLineSymbol, Graphic, Point) {

  return declare([BaseWidget], {
    baseClass: 'jimu-widget-parroquias',

    postCreate: function() {

      cargaConcellos()
      let codigoProvincia = this.selectorProvincia.value;
      if(codigoProvincia == -1) return;

      this.selectConcellos.innerHTML = "";     
      const queryTask = new QueryTask(this.config.concellosService);

      const query = new Query();
      query.returnGeometry = false;
      query.outFields = ["CODCONC", "CONCELLO"];
      query.orderByFields = ["CONCELLO"];
      query.where = "CODPROV" + codigoProvincia;

      queryTask.execute(query, lang.hitch(this, function (results) {
        let opt = document.createElement("option");
        opt.value = -1;
        opt.text = "Seleccione concello";
        this.selectConcellos.add(opt);

        for (let i = 0; i < results.features.length; i++) {
          opt = document.createElement("option");
          opt.value = results.features[i].attributes.CODCONC;
          opt.text = results.features[i].attributes.CONCELLO;
          this.selectConcellos.add(opt);
        }
      }));
    },

        

    cargaParroquias() {

          var codigoCONCELLO = this.selectConcellos.value;
          if (codigoCONCELLO == -1) return;
          this.selectParroquias.innerHTML = "";
    
          var queryTask = new QueryTask(this.config.Parroquia);
          const query = new Query();
          query.returnGeometry = false;
          query.outFields = ["CODCONC", "PARROQUIA"];
          query.orderByFields = ["CODCONC"];
          query.where = "CODCONC" + codigoParroquia;

          queryTask.execute(query, lang.hitch(this, function (results) {
            let opt = document.createElement("option");
            opt.value = -1;
            opt.text = "Seleccione parroquia";
            this.selectParroquias.add(opt);

            for (let i = 0; i < results.features.length; i++) {
              opt = document.createElement("option");
              opt.value = results.features[i].attributes.CODPAR;
              opt.text = results.features[i].attributes.PARROQUIA;
              this.selectParroquias.add(opt);
            }
      }));
    },

    
    //function zoomConcello() {
    //var codigoConcello = this.selectorConcellos.value



      queryTask.execute(query, lang.hitch(this, function (results) {
        if (results.features.length > 0) {
          var geom = results.features[0].geometry;
          this.map.graphics.clear();
          this.map.graphics.add(new Graphic(geom, new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([0, 0, 0]), 2)));
          this.map.setExtent(geom.getExtent(), true);
            }
      }));

      // onClose: function(){
        //   console.log('Parroquias::onClose');
        // },

        // onMinimize: function(){
        //   console.log('Parroquias::onMinimize');
        // },

        // onMaximize: function(){
        //   console.log('Parroquias::onMaximize');
        // },

        // onMaximize: function(){
        //   console.log('Parroquias::onMaximize');
        // },

        // onSignIn: function(credential){
        //   console.log('Parroquias::onSignIn', credential);
        // },

        // onSignOut: function(){
        //   console.log('Parroquias::onSignOut');
        // }

        // onPositionChange: function(){
        //   console.log('Parroquias::onPositionChange');
        // },

        // resize: function(){
        //   console.log('Parroquias::resize');
        // }
        //methods to communication between widgets:


    });
});
//# sourceMappingURL=Widget.js.map
