import {TemplateResult} from "lit-element";

export interface BaseRender {
  render(extraInfo?: Map<string, string>): TemplateResult
}
