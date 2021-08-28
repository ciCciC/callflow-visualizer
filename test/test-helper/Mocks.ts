import {CallFlowConfig} from "../../src/model/CallFlowConfig";

export const callFlowConfigs = Array.of(1, 2, 3).map(index => ({name: 'test'+index, activeVersion: '1-1-'+index, revisions: [{version: '1-1-'+index, revType: 'CREATED'}]} as CallFlowConfig))
