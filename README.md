## Chytrá domácnost

Výuková lekce se zabývá vytvořením jednoduché chytré domácnosti komunikující s uživatelem v reálném čase. Tato domácnost je založena na vlastním serveru postaveném na jednodeskovém počítači Raspberry Pi a bezdrátovými moduly ESP32 pro senzorickou a ovládací činnost. Jako komunikační rozhranní je využit internetový protokol MQTT. 

Pro lepší představu funkčnosti domácnosti se můžeme podívat na její infrastrukturu:

OBRÁZEK

Seznam potřebných zařízení:
- Raspberr Pi + paměťová karta + napájecí zdroj
- ESP32 + teplotní a vlhkostní senzor BME 280 + nepájivé pole 

Sezunam potřebného software:
- Termius (pro SSH přístup) - https://termius.com/
- Raspberry Pi OS Imager - https://www.raspberrypi.com/software/
- MQTT client (Android, iOS ...)

Postup práce:

    1. Instalace a konfigurace serveru

      a. Instalace operačního systému Raspberry Pi OS skrze Raspberry Pi OS Imager
      b. Instalace MQTT Brokeru Mosquitto
        ```
        apt get instll mosquitto
        ```
    c. Konfigurace MQTT Brokeru Moswuitto
        ```
        nano /etc/mosquitto/mosquitto.conf

        přidat: 

        listener 1883
        allow_anonymous true #neověřené přihlášení

        ```
    d. Instalace Node.js

        https://nodejs.org/en/

    e. Instalace knihovny MQTT

        https://www.npmjs.com/package/mqtt

    f. Vytvoření serverového skriptu pro práci s MQTT daty

        nano index.js

    g. Konfigurace MQTT serveru a nastavení notifikačních zpráv


    2. Instalace a konfigurace senzorických ESP32 modůlů pro Místnost 1 a Místnost 2

    a. Zapojení ESP32 modulu a požadovaných senzorů dle schématu zapojení
    b. Instalace potřebných knihoven
    c. Úprava a konfigurace kódu
    d. Flash kódu do Mikrokontroléru ESP32
    e. Ověření funkčnosti

        3. Instalace a konfigurace ovládacích ESP32 modůlů pro Místnost 1

    b. Úprava a konfigurace kódu
    c. Flash kódu do Mikrokontroléru ESP32
    d. Ověření funkčnosti

    4. Ověření funkčnosti a stažení MQTT klienta na mobilním telefonu s platformou Android/iOS
    a. Stažení jakéhokoli klenta
