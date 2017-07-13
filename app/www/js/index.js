
var app = {
    // Application Constructor

    streamingSrc: "http://167.114.210.20:8027/stream", 
    logoSrc: "res/logo-gen.png",
    
    initialize: function() {
        this.tolog('fn Initializate');
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        // listo el dispositivo
        this.tolog('fn OnDeviceReady');
        app.initapp();
    },

    initapp: function(){
        // cargar la imagen y el audio
        this.tolog("Iniciando APP versión: " + cordova_app_version );
        $("#logocentral").attr("src", this.logoSrc);
        $("#appversion").html("Versión: " + cordova_app_version);
        this.loadPlayer();
        // si cargo todo OK, lo cierro
        $("#mylogs").hide();
    },

    loadPlayer: function() {
        this.tolog('fn loadPlayer');
        $("#audiodiv").append('<audio controls id="audioctrl"></audio>');
        $("#audioctrl").append('<source id="streamaudio" src="' + this.streamingSrc +'" type="audio/ogg">Tu navegador no soporta el audio');
        $("#audioctrl")[0].play();
        this.getNetworkState();
    },

    getNetworkState: function() {
        this.tolog('fn getNetworkState');
        netState = this.retNetworkState($("#audioctrl")[0].networkState);
        this.tolog(netState);
    },

    reloadPlayer() {
        this.tolog('Reloading player');
        $("#audiodiv").hide();
        $("#audioctrl").remove();
        this.loadPlayer();
        $("#audiodiv").show();
        this.tolog('Player reloaded');
    },

    retNetworkState: function(ns) {
        if (ns == 0) return "0 = NETWORK_EMPTY - audio/video has not yet been initialized";
        if (ns == 1) return "1 = NETWORK_IDLE - audio/video is active and has selected a resource, but is not using the network"
        if (ns == 2) return "2 = NETWORK_LOADING - browser is downloading data"
        if (ns == 3) return "3 = NETWORK_NO_SOURCE - no audio/video source found"
    },
    tolog: function(txt){
        $("#mylogs").append("<p>" + txt + "</p>");
    },

};

app.tolog('Zero');

function dcl() {
    app.tolog('Dom Content Loaded');    
}

document.addEventListener("DOMContentLoaded", dcl);


$( document ).ready(function() {
    app.tolog('DOM Ready');
    var inCordova = document.URL.indexOf( 'http://' ) === -1 && document.URL.indexOf( 'https://' ) === -1;
    if (inCordova) {
        app.initialize();    
    }
    else {
        // empezar directo sin esperar el evento de Cordova
        app.initapp();
    }

    app.tolog('DOM Ready 2');
    $("#btnReloadPlayer").on("click", function(){
        app.reloadPlayer();
    });

    app.tolog('DOM Ready 3');
    
    $("#appversion").on("click", function(){
        $("#mylogs").toggle();
    });
    app.tolog('DOM Ready 6');
});