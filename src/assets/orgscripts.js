require([
  "dojo/dom",
  "dojo/dom-construct",
  "esri/dijit/HomeButton",
  "esri/dijit/InfoWindow",
  "esri/map",
  "esri/layers/FeatureLayer",
  "esri/layers/ArcGISDynamicMapServiceLayer",
  "esri/dijit/Search",
  "esri/tasks/FindTask",
  "esri/tasks/FindParameters",
  "esri/tasks/IdentifyTask",
  "esri/tasks/IdentifyParameters",
  "esri/InfoTemplate",
  "esri/dijit/Popup",
  "dojo/_base/array",
  "dojo/on",
  "esri/Color",
  "esri/symbols/SimpleFillSymbol",
  "esri/symbols/SimpleLineSymbol",
  "esri/tasks/query",
  "esri/tasks/QueryTask",
  "dojo/domReady!"
],
  function (dom, domConstruct, HomeButton, InfoWindow, Map,FeatureLayer,
    ArcGISDynamicMapServiceLayer, Search, FindTask, FindParameters, IdentifyTask,
    IdentifyParameters, InfoTemplate, Popup, arrayUtils, on, Color, SimpleFillSymbol, SimpleLineSymbol, Query, QueryTask) {

    //dojo.require("esri.tasks.find");
    var identifyTask, identifyParameters;

    var popup = new Popup({
      fillSymbol: new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID,
        new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID))
    }, domConstruct.create("div"));

    // var map = new Map({
    //   basemap: "topo-vector",
    //   ground: "world-elevation"
    // });

    // var view = new SceneView({
    //   container: "viewDiv", // Reference to the DOM node that will contain the view
    //   map: map, // References the map object created in step 3
    //   scale: 50000000, // Sets the initial scale to 1:50,000,000
    //   center: [-101.17, 21.78] // Sets the center point of view with lon/lat
    // });

    var map = new Map("map", {
      basemap: "hybrid",
      center: [-83.275, 42.573],
      infoWindow: popup,
      zoom: 7,
      fadeOnZoom: true
    });

    map.on("load", mapReady);

    // var featureLayer = new FeatureLayer("https://services9.arcgis.com/S990USlhfgpUmWKm/arcgis/rest/services/Marquam_Hill_WSL2/FeatureServer/0");
    // map.addLayer(featureLayer);

    var mapServiceLayer = new ArcGISDynamicMapServiceLayer("https://sampleserver1.arcgisonline.com/ArcGIS/rest/services/Specialty/ESRI_StatesCitiesRivers_USA/MapServer/");
    map.addLayer(mapServiceLayer);

    var featureLayer = new FeatureLayer("https://services9.arcgis.com/S990USlhfgpUmWKm/arcgis/rest/services/Counties_USA/FeatureServer/0");
    map.addLayer(featureLayer);

    var parcelsURL = "https://sampleserver3.arcgisonline.com/ArcGIS/rest/services/BloomfieldHillsMichigan/Parcels/MapServer";
    map.addLayer(new ArcGISDynamicMapServiceLayer(parcelsURL));

    function mapReady() {
      if (map.getZoom()>19){
        map.on("click", executeIdentifyTask);
      }
      
      identifyTask = new IdentifyTask(parcelsURL);

      identifyParameters = new IdentifyParameters();
      identifyParameters.tolerance = 10;
      identifyParameters.returnGeometry = true;
      identifyParameters.layerIds = [0, 2];
      identifyParameters.layerOption = IdentifyParameters.LAYER_OPTION_ALL;
      // identifyParameters.width = map.width;
      // identifyParameters.height = map.height;
    }

    function executeIdentifyTask(event) {
      identifyParameters.geometry = event.mapPoint;
      identifyParameters.mapExtent = map.extent;

      var deferred = identifyTask.execute(identifyParameters).addCallback(function (response) {
        return arrayUtils.map(response, function (result) {
          var feature = result.feature;
          console.log(result);
          var layerName = result.layerName;

          feature.attributes.layerName = layerName;
          if (layerName === 'Tax Parcels') {
            var taxParcelTemplate = new InfoTemplate("",
              "${Postal Address} <br/> Owner of record: ${First Owner Name}");
            feature.setInfoTemplate(taxParcelTemplate);
          }
          else if (layerName === 'Building Footprints') {
            var buildingFootprintTemplate = new InfoTemplate("", "Parcel ID: ${PARCELID}");
            feature.setInfoTemplate(buildingFootprintTemplate);
          }
          console.log(feature);
          return feature;
          
        });
      });
      map.infoWindow.setFeatures([deferred]);
      map.infoWindow.show(event.mapPoint);
    
      console.log(event.mapPoint);
    }

    var infoWindow = new InfoWindow({}, domConstruct.create("map"));
    infoWindow.startup();

    var home = new HomeButton({
      map: map
    }, "HomeButton");
    home.startup();

    var search = new Search({
      map: map
    }, "search");
    search.startup();

    var find, params;
    find = new FindTask("https://sampleserver1.arcgisonline.com/ArcGIS/rest/services/Specialty/ESRI_StatesCitiesRivers_USA/MapServer/");
    params = new FindParameters();
    params.layerIds = [2];
    params.searchFields = ["STATE_NAME", "STATE_FIPS"];

    on(dom.byId("doFind"), "click", doFind);

    function doFind() {
      params.searchText = dojo.byId("searchText").value;
      find.execute(params, showResults);
    }

    function showResults(results) {
      var result, attribs;
      var s = ["<table border=\"1\"><thead><tr style=\"background-color:#ccc;\"><td>State Name</td><td>FIPS</td><td>Population (1990)</td><td>Population (1999)</td></tr></thead><tbody id=\"states\">"];
      dojo.forEach(results, function (result) {
        attribs = result.feature.attributes;
        s.push("<tr><td>" + attribs.STATE_NAME + "</td><td>" + attribs.STATE_FIPS + "</td><td>" + attribs.POP1990 + "</td><td>" + attribs.POP1999 + "</td></tr>");
      });
      s.push("</tbody></table>");
      dojo.byId("tbl").innerHTML = s.join("");
    }

    var queryTask = new QueryTask("https://sampleserver1.arcgisonline.com/ArcGIS/rest/services/Demographics/ESRI_Census_USA/MapServer/5");
    var query = new Query();
    query.returnGeometry = false;
    query.outFields = ["SQMI", "STATE_NAME", "STATE_FIPS", "SUB_REGION", "STATE_ABBR"];

    on(dom.byId("execute"), "click", execute);

    function execute() {
      query.text = dom.byId("stateName").value;
      queryTask.execute(query, showQueryResults);
    }

    function showQueryResults(results) {
      var resultItems = [];
      var resultCount = results.features.length;
      for (var i = 0; i < resultCount; i++) {
        var featureAttributes = results.features[i].attributes;
        for (var attr in featureAttributes) {
          resultItems.push("<b>" + attr + ":</b>  " + featureAttributes[attr] + "<br>");
        }
        resultItems.push("<br>");
      }
      dom.byId("info").innerHTML = resultItems.join("");
    }
  });