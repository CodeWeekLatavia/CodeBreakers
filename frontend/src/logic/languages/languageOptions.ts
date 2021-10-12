import { supportedLanguages } from "../../data/languages";
import { getTextFromLanguage } from "../../slices/languages/languageSlice";

export const getTranslatedText = (dispatch: any, language: string | null) => {
    if(language){
        if(supportedLanguages.some(l => l.lng === language)){
            window.localStorage.setItem("Language", language);
            dispatch(getTextFromLanguage(language));
        }
    }else{
        const activeLang: string | null = window.localStorage.getItem("Language");

        if(activeLang){
            if(supportedLanguages.some(l => l.lng === activeLang)){
                dispatch(getTextFromLanguage(activeLang));
            }else{
                window.localStorage.setItem("Language", "English");
                dispatch(getTextFromLanguage("English"));
            }
        }else{
            window.localStorage.setItem("Language", "English");
            dispatch(getTextFromLanguage("English"));
        }
    }
}   