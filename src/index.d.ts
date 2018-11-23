declare module '*.less' {
  const styles: { [key: string]: string };
  export default styles;
}

interface Window {
  __REDUX_DEVTOOLS_EXTENSION_COMPOSE__(): <T>(a: T, ...args: any[]) => T;
}