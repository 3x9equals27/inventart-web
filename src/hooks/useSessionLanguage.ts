export default function useSessionLanguage() {
  const getSessionLanguage = (defaultLanguage: string):string => {
    const language = localStorage.getItem('language');
    return language??defaultLanguage;
  };

  const setSessionLanguage = (language:string) => {
    localStorage.setItem('language', language);
  };

  const unsetSessionLanguage = () => {
    localStorage.removeItem('language');
  };

  return {
    getSessionLanguage,
    setSessionLanguage,
    unsetSessionLanguage
  }
}