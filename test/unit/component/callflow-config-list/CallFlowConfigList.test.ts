import { html } from 'ing-web';
import { fixture, FixtureElement } from 'ing-orange-test-utils';
import {CallFlowConfigList} from "../../../../src/component/callflow-config-list/CallFlowConfigList";
// import {ContactingCallFlowService} from "../../../../src/service/ContactingCallFlowService";
import {mockAjaxValid} from "../../../test-helper/ContactingCallFlowMock";

type Fixture = FixtureElement<CallFlowConfigList>;

async function getComponent(): Promise<Fixture> {
  return fixture<CallFlowConfigList>(html`<callflow-config-list></callflow-config-list>`);
}

describe(CallFlowConfigList.name, () => {

  // @ts-ignore
  let spy: any;

  it('should create ' + CallFlowConfigList.name, async () => {
    const component = await getComponent();
    expect(component).toBeTruthy();
  });

  it('should retrieve callFlow configs', async () => {
    mockAjaxValid()

    const component = await getComponent();

    const callFlowConfigs = component.getElement().callFlowConfigs;

    expect(callFlowConfigs?.length).toBeGreaterThan(1);
  });

  it('should render callFlow configs', async () => {
    mockAjaxValid()

    const component = await getComponent();

    const callFlowConfigs = component.getElement().callFlowConfigs;

    const size = component.deepSelectorAll(".dropdown-content li").length;

    expect(callFlowConfigs?.length).toEqual(size);
  });
});
