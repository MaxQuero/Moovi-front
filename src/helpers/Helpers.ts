 
export const formatDate: any = (date: any, format: string) => {


  return Intl.DateTimeFormat('fr-FR',  {
    day: 'numeric', 
    month: 'short',
    year: 'numeric'
    }).format(date);
};

export const deepCopy = (value: any) => {
  return JSON.parse(JSON.stringify(value));
};

export const getSessionData = (): string | null => {
  const session: string | null = localStorage.getItem('user');
  return session;
};