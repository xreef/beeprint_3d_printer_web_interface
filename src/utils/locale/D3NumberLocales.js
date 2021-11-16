/**
 * Created by renzo on 18/04/2017.
 */

import ar001 from './number/ar-001.json';
import arAE from './number/ar-AE.json';
import arBH from './number/ar-BH.json';
import arDJ from './number/ar-DJ.json';
import arDZ from './number/ar-DZ.json';
import arEG from './number/ar-EG.json';
import arEH from './number/ar-EH.json';
import arER from './number/ar-ER.json';
import arIL from './number/ar-IL.json';
import arIQ from './number/ar-IQ.json';
import arJO from './number/ar-JO.json';
import arKM from './number/ar-KM.json';
import arKW from './number/ar-KW.json';
import arLB from './number/ar-LB.json';
import arLY from './number/ar-LY.json';
import arMA from './number/ar-MA.json';
import arMR from './number/ar-MR.json';
import arOM from './number/ar-OM.json';
import arPS from './number/ar-PS.json';
import arQA from './number/ar-QA.json';
import arSA from './number/ar-SA.json';
import arSD from './number/ar-SD.json';
import arSO from './number/ar-SO.json';
import arSS from './number/ar-SS.json';
import arSY from './number/ar-SY.json';
import arTD from './number/ar-TD.json';
import arTN from './number/ar-TN.json';
import arYE from './number/ar-YE.json';
import caES from './number/ca-ES.json';
import csCZ from './number/cs-CZ.json';
import deCH from './number/de-CH.json';
import deDE from './number/de-DE.json';
import enCA from './number/en-CA.json';
import enGB from './number/en-GB.json';
import enIN from './number/en-IN.json';
import enUS from './number/en-US.json';
import esES from './number/es-ES.json';
import esMX from './number/es-MX.json';
import fiFI from './number/fi-FI.json';
import frCA from './number/fr-CA.json';
import frFR from './number/fr-FR.json';
import heIL from './number/he-IL.json';
import huHU from './number/hu-HU.json';
import itIT from './number/it-IT.json';
import jaJP from './number/ja-JP.json';
import koKR from './number/ko-KR.json';
import mkMK from './number/mk-MK.json';
import nlNL from './number/nl-NL.json';
import plPL from './number/pl-PL.json';
import ptBR from './number/pt-BR.json';
import ruRU from './number/ru-RU.json';
import svSE from './number/sv-SE.json';
import ukUA from './number/uk-UA.json';
import zhCN from './number/zh-CN.json';

class D3NumberLocales {
    constructor() {
        this.locales = {"ar-001":ar001,
                        "ar-AE":arAE,
                        "ar-BH":arBH,
                        "ar-DJ":arDJ,
                        "ar-DZ":arDZ,
                        "ar-EG":arEG,
                        "ar-EH":arEH,
                        "ar-ER":arER,
                        "ar-IL":arIL,
                        "ar-IQ":arIQ,
                        "ar-JO":arJO,
                        "ar-KM":arKM,
                        "ar-KW":arKW,
                        "ar-LB":arLB,
                        "ar-LY":arLY,
                        "ar-MA":arMA,
                        "ar-MR":arMR,
                        "ar-OM":arOM,
                        "ar-PS":arPS,
                        "ar-QA":arQA,
                        "ar-SA":arSA,
                        "ar-SD":arSD,
                        "ar-SO":arSO,
                        "ar-SS":arSS,
                        "ar-SY":arSY,
                        "ar-TD":arTD,
                        "ar-TN":arTN,
                        "ar-YE":arYE,
                        "ca-ES":caES,
                        "cs-CZ":csCZ,
                        "de-CH":deCH,
                        "de-DE":deDE,
                        "en-CA":enCA,
                        "en-GB":enGB,
                        "en-EN":enGB,
                        "en-IN":enIN,
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
                        "uk-UA":ukUA,
                        "zh-CN":zhCN,

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

export default D3NumberLocales;