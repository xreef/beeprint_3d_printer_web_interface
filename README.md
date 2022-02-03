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

### Changelog
- 03/02/2022 1.5 Fix ru language, add control on filesize upload
- 08/01/2022 1.4 Static IP configuration and mDNS (minor fix)
- 02/01/2022 1.3 Polish language
- 30/12/2021 1.2 GCode sender
- 14/12/2021 1.1 Add Camera rotation features

### Limitations
<a rel="license" href="http://creativecommons.org/licenses/by-nc-nd/3.0/it/"><img alt="Creative Commons License" style="border-width:0" src="https://i.creativecommons.org/l/by-nc-nd/3.0/it/88x31.png" /></a><br />This work is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by-nc-nd/3.0/it/">Creative Commons Attribution-NonCommercial-NoDerivs 3.0 Italy License</a>.

### Thanks to
![JetBrains Black Box Logo logo](https://resources.jetbrains.com/storage/products/company/brand/logos/jb_square.svg)
