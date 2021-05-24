export default function useSessionLanguage() {
  const getSessionLanguage = (defaultLanguage: string):string => {
    const storedLanguage = localStorage.getItem('sessionLanguage');
    let language: string = storedLanguage??defaultLanguage;
    setSessionLanguage(language);
    return language;
  };

  const setSessionLanguage = (language:string) => {
    localStorage.setItem('sessionLanguage', language);
  };

  const unsetSessionLanguage = () => {
    localStorage.removeItem('sessionLanguage');
  };

  return {
    getSessionLanguage,
    setSessionLanguage,
    unsetSessionLanguage
  }
}