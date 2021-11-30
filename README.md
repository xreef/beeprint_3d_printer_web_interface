# BeePrint
## MKS WiFi [MISCHIANTI](www.mischianti.org) Web Interface
I decided to make the WiFi module of my FlyingBear Ghost 5 more functional. I rewrote the firmware of the Makerbase MKS WiFi module and created a Web interface capable of managing all aspects of the printer and also a camera to control the process.

###[Tutorial and documentation](https://www.mischianti.org/category/project/web-interface-beeprint-for-mks-wifi/)

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
