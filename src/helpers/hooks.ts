import { createContext } from 'react'

interface Theme {
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}


export const ThemeContext = createContext({} as Theme)
