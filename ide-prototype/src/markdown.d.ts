declare module 'markdown' {

  export interface MarkdownOptions {
      text: string;
  }

  export function show(text: string): string;
}