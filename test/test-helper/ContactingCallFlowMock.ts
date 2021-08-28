import axios from 'axios';
import { AxiosResponse } from "axios";
import {callFlowConfigs} from "./Mocks";

export interface IMockAjax {
  get: jasmine.Spy;
}

function ajaxGet(): jasmine.Spy {
  const spy = spyOn(axios, 'get');

  spy.and.callFake((url: string): Promise<any> => {
    const response: AxiosResponse = {
      data: {},
      status: 200,
      statusText: '',
      headers: [],
      config: {},
    };
    if (url.includes('/api/contacting-callflows/callflow-config')) {
      response.data = callFlowConfigs;
    }

    return Promise.resolve(response);
  });

  return spy;
}

export function mockAjaxValid(): IMockAjax {
  return {
    get: ajaxGet()
  };
}
