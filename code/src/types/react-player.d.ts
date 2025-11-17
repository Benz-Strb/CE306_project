declare module 'react-player' {
  import { Component } from 'react';
  
  export interface ReactPlayerProps {
    url?: string;
    playing?: boolean;
    loop?: boolean;
    controls?: boolean;
    muted?: boolean;
    width?: string | number;
    height?: string | number;
    style?: React.CSSProperties;
    [key: string]: any;
  }
  
  export default class ReactPlayer extends Component<ReactPlayerProps> {}
}