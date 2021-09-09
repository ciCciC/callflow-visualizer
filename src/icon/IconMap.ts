import {NodeEnum} from "../model/NodeEnum";
// @ts-ignore
import {
  messageNodeIcon,
  menuNodeIcon,
  dataNodeIcon,
  announcementIcon,
  apiIcon,
  hangupIcon,
  createTaskIcon,
  rootIcon,
  gatherSpeechIcon,
  redirectIcon,
  unknownNodeIcon
} from "../icon/node-icons"

export class IconMap {

  static getIcon(nodeType?: NodeEnum | string): any {
    switch (nodeType) {
      case NodeEnum.ROOT: return rootIcon;
      case NodeEnum.STORE: return dataNodeIcon;
      case NodeEnum.DATA: return dataNodeIcon;
      case NodeEnum.MSG_PLAY: return messageNodeIcon;
      case NodeEnum.GATHER: return menuNodeIcon;
      case NodeEnum.SPEECH_MODEL: return gatherSpeechIcon;
      case NodeEnum.PROCLAMATION: return announcementIcon;
      case NodeEnum.API_CALL: return apiIcon;
      case NodeEnum.API_FLOW_CALL: return apiIcon;
      case NodeEnum.HANGUP: return hangupIcon;
      case NodeEnum.TASK: return createTaskIcon;
      case NodeEnum.TASK_ADV: return createTaskIcon;
      case NodeEnum.TASK_UPDATE: return createTaskIcon;
      case NodeEnum.REDIRECT_CALL: return createTaskIcon;
      case NodeEnum.REDIRECT_FLOW: return redirectIcon;
      case NodeEnum.OTP: return dataNodeIcon;
      case NodeEnum.ACCESS_T: return dataNodeIcon;
      default: return unknownNodeIcon;
    }
  }

  // @ts-ignore
  static getIconAsString(nodeType?: NodeEnum | string, fillColor: string): string {
    switch (nodeType) {
      case NodeEnum.ROOT: return this.root(fillColor);
      case NodeEnum.STORE: return this.data(fillColor);
      case NodeEnum.DATA: return this.data(fillColor);
      case NodeEnum.MSG_PLAY: return this.message(fillColor);
      case NodeEnum.GATHER: return this.menu(fillColor);
      case NodeEnum.SPEECH_MODEL: return this.gatherSpeech(fillColor);
      case NodeEnum.PROCLAMATION: return this.announcement(fillColor);
      case NodeEnum.API_CALL: return this.api(fillColor);
      case NodeEnum.API_FLOW_CALL: return this.api(fillColor);
      case NodeEnum.HANGUP: return this.hangup(fillColor);
      case NodeEnum.TASK: return this.createTask(fillColor);
      case NodeEnum.TASK_ADV: return this.createTask(fillColor);
      case NodeEnum.TASK_UPDATE: return this.createTask(fillColor);
      case NodeEnum.REDIRECT_CALL: return this.createTask(fillColor);
      case NodeEnum.REDIRECT_FLOW: return this.redirect(fillColor);
      case NodeEnum.OTP: return this.data(fillColor);
      case NodeEnum.ACCESS_T: return this.data(fillColor);
      default: return this.unknown();
    }
  }

  private static data(fillColor: string): string {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" focusable="false">
<path d="M0 0h24v24H0V0z" fill="white"/><path fill="${fillColor}" d="M18 4v16H6V8.83L10.83 4H18m0-2h-8L4 8v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM9 7h2v4H9zm3 0h2v4h-2zm3 0h2v4h-2z"/>
</svg>`
  }

  private static message(fillColor: string): string {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" focusable="false">
<path d="M0 0h24v24H0V0z" fill="white"/><path fill="${fillColor}" d="M4 4h16v12H5.17L4 17.17V4m0-2c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2H4zm2 10h12v2H6v-2zm0-3h12v2H6V9zm0-3h12v2H6V6z"/>
</svg>`
  }

  private static menu(fillColor: string): string {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" focusable="false">
<path d="M0 0h24v24H0V0z" fill="white"/><path fill="${fillColor}" d="M12 19c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zM6 1c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12-8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm-6 8c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
</svg>`
  }

  private static announcement(fillColor: string): string {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
<path d="M0 0h24v24H0z" fill="white"/><path fill="${fillColor}" d="M18 11v2h4v-2h-4zm-2 6.61c.96.71 2.21 1.65 3.2 2.39.4-.53.8-1.07 1.2-1.6-.99-.74-2.24-1.68-3.2-2.4-.4.54-.8 1.08-1.2 1.61zM20.4 5.6c-.4-.53-.8-1.07-1.2-1.6-.99.74-2.24 1.68-3.2 2.4.4.53.8 1.07 1.2 1.6.96-.72 2.21-1.65 3.2-2.4zM4 9c-1.1 0-2 .9-2 2v2c0 1.1.9 2 2 2h1v4h2v-4h1l5 3V6L8 9H4zm11.5 3c0-1.33-.58-2.53-1.5-3.35v6.69c.92-.81 1.5-2.01 1.5-3.34z"/></svg>`
  }

  private static api(fillColor: string): string {
    return `<svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="48px" width="48px" viewBox="0 0 24 24" fill="${fillColor}"><g><rect fill="white" height="24" width="24"/><path d="M14,12l-2,2l-2-2l2-2L14,12z M12,6l2.12,2.12l2.5-2.5L12,1L7.38,5.62l2.5,2.5L12,6z M6,12l2.12-2.12l-2.5-2.5L1,12 l4.62,4.62l2.5-2.5L6,12z M18,12l-2.12,2.12l2.5,2.5L23,12l-4.62-4.62l-2.5,2.5L18,12z M12,18l-2.12-2.12l-2.5,2.5L12,23l4.62-4.62 l-2.5-2.5L12,18z"/></g></svg>`
  }

  private static hangup(fillColor: string): string {
    return `<svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 0 24 24" width="48px" fill="${fillColor}">
<path d="M0 0h24v24H0V0z" fill="white"/>
<path d="M18.59 10.52c1.05.51 2.04 1.15 2.96 1.91l-1.07 1.07c-.58-.47-1.21-.89-1.88-1.27v-1.71m-13.2 0v1.7c-.65.37-1.28.79-1.87 1.27l-1.07-1.07c.91-.75 1.9-1.38 2.94-1.9M12 7C7.46 7 3.34 8.78.29 11.67c-.18.18-.29.43-.29.71s.11.53.29.7l2.48 2.48c.18.18.43.29.71.29.27 0 .52-.1.7-.28.79-.73 1.68-1.36 2.66-1.85.33-.16.56-.51.56-.9v-3.1C8.85 9.25 10.4 9 12 9s3.15.25 4.59.73v3.1c0 .4.23.74.56.9.98.49 1.88 1.11 2.67 1.85.18.17.43.28.7.28.28 0 .53-.11.71-.29l2.48-2.48c.18-.18.29-.43.29-.71s-.11-.53-.29-.71C20.66 8.78 16.54 7 12 7z"/></svg>`
  }

  private static createTask(fillColor: string): string {
    return `<svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 20 20" height="48px" viewBox="0 0 20 20" width="48px" fill="${fillColor}"><g>
<rect fill="white" height="20" width="20" x="0"/></g><g><g>
<path d="M10,6C9.32,6,6.12,6.51,6.01,9.88c1.72-0.4,3.06-1.77,3.4-3.51c0.53,1.15,1.96,2.8,4.43,2.6C13.39,7.26,11.85,6,10,6z"/><circle cx="7.5" cy="10.75" r=".75"/><circle cx="12.5" cy="10.75" r=".75"/><path d="M16,10c0-3.31-2.69-6-6-6s-6,2.69-6,6c-0.55,0-1,0.45-1,1v2c0,0.55,0.45,1,1,1h1v-4c0-2.76,2.24-5,5-5s5,2.24,5,5v5H9v1h6 c0.55,0,1-0.45,1-1v-1c0.55,0,1-0.45,1-1v-2C17,10.45,16.55,10,16,10z"/></g></g></svg>`
  }

  private static root(fillColor: string): string {
    return `<svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 0 24 24" width="48px" fill="${fillColor}">
<path d="M0 0h24v24H0V0z" fill="white"/>
<path d="M15 12h2c0-2.76-2.24-5-5-5v2c1.66 0 3 1.34 3 3zm4 0h2c0-4.97-4.03-9-9-9v2c3.87 0 7 3.13 7 7zm1 3.5c-1.25 0-2.45-.2-3.57-.57-.1-.03-.21-.05-.31-.05-.26 0-.51.1-.71.29l-2.2 2.2c-2.83-1.44-5.15-3.75-6.59-6.59l2.2-2.21c.28-.26.36-.65.25-1C8.7 6.45 8.5 5.25 8.5 4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1 0 9.39 7.61 17 17 17 .55 0 1-.45 1-1v-3.5c0-.55-.45-1-1-1zM5.03 5h1.5c.07.88.22 1.75.45 2.58l-1.2 1.21c-.4-1.21-.66-2.47-.75-3.79zM19 18.97c-1.32-.09-2.6-.35-3.8-.76l1.2-1.2c.85.24 1.72.39 2.6.45v1.51z"/></svg>`
  }

  private static gatherSpeech(fillColor: string): string {
    return `<svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 0 24 24" width="48px" fill="${fillColor}"><path d="M0 0h24v24H0V0z" fill="white"/>
<path d="M9 13c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0-6c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm0 8c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4zm-6 4c.22-.72 3.31-2 6-2 2.7 0 5.8 1.29 6 2H3zM15.08 7.05c.84 1.18.84 2.71 0 3.89l1.68 1.69c2.02-2.02 2.02-5.07 0-7.27l-1.68 1.69zM20.07 2l-1.63 1.63c2.77 3.02 2.77 7.56 0 10.74L20.07 16c3.9-3.89 3.91-9.95 0-14z"/></svg>`
  }

  private static redirect(fillColor: string): string {
    return `<svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 0 24 24" width="48px" fill="${fillColor}">
<path d="M0 0h24v24H0V0z" fill="white"/>
<path d="M18 4l-4 4h3v7c0 1.1-.9 2-2 2s-2-.9-2-2V8c0-2.21-1.79-4-4-4S5 5.79 5 8v7H2l4 4 4-4H7V8c0-1.1.9-2 2-2s2 .9 2 2v7c0 2.21 1.79 4 4 4s4-1.79 4-4V8h3l-4-4z"/></svg>`
  }

  private static unknown(): string {
    return `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#808080">
<path d="M0 0h24v24H0V0z" fill="white"/>
<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z"/></svg>`
  }
}
