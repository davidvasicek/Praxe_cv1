$(function(){  
    
    var zprava = "";   // inicializace prom�nn� zpr�va, do kter� se bude ukl�dat aktu�ln� p��choz� zpr�va
    var zpravy = "";   // inicializace prom�nn� zpr�vy, do kter� se budou pr�b�n� ukl�dat ji� p�ijat� zpr�vy

    var pracoviste = "__________"; // ��slo pracovi�t�; nahra�te x ��slem va�eho pracovi�t�

    var pocitadlo = 0;   // inicializace pocitadla pro odeslane zpravy
    var pocitadloPrichozichZprav = 1;    // inicializace po��tadla pro p��choz� zpr�vy

    var teplota = document.getElementById('Teplota');                      // naleznu element s id="Teplota" a ulo��m jej do prom�nn� teplpota
    var vlhkost = document.getElementById('Vlhkost');                      // naleznu element s id="Vlhkost" a ulo��m jej do prom�nn� vlhkost
    var barometrickyTlak = document.getElementById('BarometrickyTlak');    // naleznu element s id="BarometrickyTlak" a ulo��m jej do prom�nn� barometrickyTlak
    var nadmorskaVyska = document.getElementById('NadmorskaVyska');        // naleznu element s id="NadmorskaVyska" a ulo��m jej do prom�nn� nadmorskaVyska

    var vystup = document.getElementById('Vystup');               // naleznu element s id="Vystup" a ulo��m jej do prom�nn� vystup

    var vystupHlavicka = document.getElementById('VystupHlavicka');               // naleznu element s id="VystupHlavicka" a ulo��m jej do prom�nn� vystupHlavicka
    vystupHlavicka.style.visibility = "hidden";                                     // skryt� elementu vystupHlavicka, dokud nep��jdou nov� data

    var container = document.getElementById("container");      // naleznu element s id="container" a ulo��m jej do prom�nn� container
    container.style.visibility = "hidden";                     // skryju tento element dokud nep��jdou prvn� data o teplot�

    // Generate a random client ID
    clientID = "clientID-" + parseInt(Math.random() * 1000);
    
    // Fetch the hostname/IP address and port number from the form
    host = "192.168.1.100";
    port = 8080;
    
    // Initialize new Paho client connection
    client = new Paho.MQTT.Client(host, Number(port), clientID);
    
    // Set callback handlers
    client.onConnectionLost = onConnectionLost;
    client.onMessageArrived = onMessageArrived;
    
    // Connect the client, if successful, call onConnect function
    client.connect({ 
        onSuccess: onConnect,
    });
    

    // Called when the client connects
    function onConnect() {
        // Fetch the MQTT topic from the form
        topic = "" + pracoviste;
    
        // Subscribe to the requested topic
        client.subscribe(topic);
    }

    // Called when the client loses its connection
    function onConnectionLost(responseObject) {
        console.log("onConnectionLost: Connection Lost");
        if (responseObject.errorCode !== 0) {
            console.log("onConnectionLost: " + responseObject.errorMessage);
        }
    }

    // Called when a message arrives
    function onMessageArrived(message) {
        console.log("onMessageArrived: " + message.payloadString);

        var datum = new Date();  // vytvo��m objekt aktu�ln�ho data a �asu p��choz� zpr�vy
        var cas = datum.getHours() + ":" +  datum.getMinutes()  + ":" + datum.getSeconds();  // z objektu datum z�sk�m hodinu, minutu a sekundu
              
        zprava = "ID: " + pocitadloPrichozichZprav + ", Time: " + cas + ", Message: " + message + "<br>" + zpravy;  // do prom�nn� zpr�vy ulo��m nov� p��choz� zpr�vu a p�ilo���m k n� v�echny p�edchoz�; �ad�m tak jednotliv� zpr�vy od nejnov�j��
        pocitadloPrichozichZprav++;     // inkrementuji po��tadlo pro p��choz� zpr�vy
        zpravy = zprava;       // do prom�nn= zpr�vy p�i�ad� novou zpr�vu i s t�mi p�edchoz�mi
       
        vystup.innerHTML = zpravy; //"Time: " + cas + ", Message: " + message + "<br>";  // do v�stupu p�ipoj�m nov� p��choz� zpr�vu i s �asem p�ijet�
        vystupHlavicka.style.visibility = "visible";         // zobraz�m element vystup

        // zachycen� vyj�mky; jeliko� se sna��m parsovat JSON objekt a ��st z n�j jednotliv� p�edem definovan� elementy, m��e se st�t, �e p�i p��chodu jin� zpr�vy
        // nastane probl�m z parsov�n�m. Aplikace n�sledn� spadne, proto je nutn� tuto sdkute�nost o�et�it
        // pokud se aplikace na jak�mkoli ��dku v bloku try zhrout�, automaticky sko�� do bloku catch, kde m��eme n�sledn� definovat, jak s nezn�m�mi zpr�vami nakl�dat
        // v na�em p��pad� je bude ignorovat, jeliko� v sekci catch ��dn� jin� zpracov�n� nem�me a vyp�e pouze zpr�vu do konzole
        try {
                     
            var objetZpravy = JSON.parse(message); // vytvo��m nov� objekt objektZpravy, do kter�ho naparsuju p��choz� JSON
                                  
            teplota.innerHTML = objetZpravy.Teplota;           // do elementu teplota vlo��m hodnotu teploty
            vlhkost.innerHTML = objetZpravy.Vlhkost;           // do elementu vlhkost vlo��m hodnotu vlhkosti
            barometrickyTlak.innerHTML = objetZpravy.BarometrickyTlak;     // do elementu barometrickyTlak vlo��m hodnotu barometrick�ho tlaku                                           
            nadmorskaVyska.innerHTML = objetZpravy.NadmorskaVyska;      // do elementu nadmorskaVyska vlo��m hodnotu nadmo�sk� v��ky

            teplota.innerHTML += "<span class='superscript'> &deg;C</span></div>" ;         // do elementu teplota p�ilo��m jednotku
            vlhkost.innerHTML += "<span class='superscript'> %</span></div>"    ;           // do elementu vlhkost p�ilo��m jednotku
            barometrickyTlak.innerHTML += "<span class='superscript'> hPa</span></div>";    // do elementu barometrickyTlak p�ilo��m jednotku                       
            nadmorskaVyska.innerHTML += "<span class='superscript'> m.n.m</span></div>" ;   // do elementu nadmorskaVyska p�ilo��m jednotku
            
            container.style.visibility = "visible";       // zobraz�m element container
  
        } catch (e) {
         
            console.log('chyba pri parsovani objektu'); // jakmile se nezda�� parsov�n�, vyp�u zpr�vu do konzole
        }

    }

    // Called when the disconnection button is pressed
    function startDisconnect() {
        client.disconnect();
    
    }

    $('#publikujZpravu').click(function(){

        var message = new Paho.MQTT.Message("test_" + pocitadlo);
		if (topic==pracoviste)
			message.destinationName = "test-topic"
		else
			message.destinationName = topic;
        client.send(message);

        pocitadlo++;  // inkrementuji po��tadlo
    })


})

