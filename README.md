# BeePrint
## MKS WiFi [MISCHIANTI](www.mischianti.org) Web Interface

![](src/resources/images/favicon/launcher-icon-3x.png?raw=true)


Hi all, this is BeePrint the Web Interface for MKS WiFi MISCHIANTI firmware.
You can find It [here](https://github.com/xreef/MKS_WIFI_MISCHIANTI)

### First installation
- Install NodeJS with npm
- In the root folder launch `npm i`

### Launch to local server
- Set the correct IP (of MKS WiFi MISCHIANTI module) to the file `public/settings.js`
- Launch `npm run dev`

### Build the package
- Launch `npm run build`
- Copy all the content of folder `build` to data folder of MKS WiFi MISCHIANTI
- Upload to SPIFFS
