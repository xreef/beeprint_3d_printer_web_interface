/**
 * Created by renzo on 18/04/2017.
 */
import caES from './date/ca-ES.json'
import csCZ from './date/cs-CZ.json'
import deCH from './date/de-CH.json'
import deDE from './date/de-DE.json'
import enCA from './date/en-CA.json'
import enGB from './date/en-GB.json'
import enUS from './date/en-US.json'
import esES from './date/es-ES.json'
import esMX from './date/es-MX.json'
import fiFI from './date/fi-FI.json'
import frCA from './date/fr-CA.json'
import frFR from './date/fr-FR.json'
import heIL from './date/he-IL.json'
import huHU from './date/hu-HU.json'
import itIT from './date/it-IT.json'
import jaJP from './date/ja-JP.json'
import koKR from './date/ko-KR.json'
import mkMK from './date/mk-MK.json'
import nlNL from './date/nl-NL.json'
import plPL from './date/pl-PL.json'
import ptBR from './date/pt-BR.json'
import ruRU from './date/ru-RU.json'
import svSE from './date/sv-SE.json'
import ukUA from './date/uk-UA.json'
import zhCN from './date/zh-CN.json'

class D3DateTimeLocales {
    constructor() {
        this.locales = {"ca-ES":caES,
                        "cs-CZ":csCZ,
                        "de-CH":deCH,
                        "de-DE":deDE,
                        "en-CA":enCA,
                        "en-GB":enGB,
                        "en-EN":enGB,
                        "en-US":enUS,
                        "es-ES":esES,
                        "es-MX":esMX,
                        "fi-FI":fiFI,
                        "fr-CA":frCA,
                        "fr-FR":frFR,
                        "he-IL":heIL,
                        "hu-HU":huHU,
                        "it-IT":itIT,
                        "ja-JP":jaJP,
                        "ko-KR":koKR,
                        "mk-MK":mkMK,
                        "nl-NL":nlNL,
                        "pl-PL":plPL,
                        "pt-BR":ptBR,
                        "ru-RU":ruRU,
                        "sv-SE":svSE,
                        "zh-CN":zhCN,
                        "uk-UA":ukUA,
            // To simplify
                        "ca":caES,
                        "de":deDE,
                        "en":enUS,
                        "es":esES,
                        "fi":fiFI,
                        "fr":frFR,
                        "he":heIL,
                        "hu":huHU,
                        "it":itIT,
                        "ja":jaJP,
                        "ko":koKR,
                        "mk":mkMK,
                        "nl":nlNL,
                        "pl":plPL,
                        "pt":ptBR,
                        "ru":ruRU,
                        "sv":svSE,
                        "zh":zhCN,
                        "uk":ukUA};
    }
    getDateTimeLocale = (locale) => {
        if (locale.indexOf("_")>0){
            locale=locale.replace("_", "-");
        }
        return this.locales[locale];
    }

}

export default D3DateTimeLocales;