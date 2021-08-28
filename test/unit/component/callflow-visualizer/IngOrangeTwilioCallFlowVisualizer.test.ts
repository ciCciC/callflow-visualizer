import '../../../../src/component/callflow-visualizer/IngOrangeTwilioCallFlowVisualizer'
import { html } from 'ing-web';
import { fixture, FixtureElement } from 'ing-orange-test-utils';
import { IngOrangeTwilioCallFlowVisualizer } from '../../../../src/component/callflow-visualizer/IngOrangeTwilioCallFlowVisualizer';
import {SideBarService} from "../../../../src/service/SideBarService";
import { of } from 'rxjs';

type Fixture = FixtureElement<IngOrangeTwilioCallFlowVisualizer>;

async function getComponent(): Promise<Fixture> {
  return fixture<IngOrangeTwilioCallFlowVisualizer>(html`<ing-orange-twilio-callflow-visualizer></ing-orange-twilio-callflow-visualizer>`);
}

describe(IngOrangeTwilioCallFlowVisualizer.name, () => {

  let component: Fixture;
  // @ts-ignore
  let spy: any;

  beforeEach(async () => {
    component = await getComponent();
  });

  afterEach(async () => {
    SideBarService.getLeftBarStatus().subscribe(state => {
      if(state) {SideBarService.toggleLeftBar();}
    });
  });

  it('should create ' + IngOrangeTwilioCallFlowVisualizer.name, async () => {
    expect(component).toBeTruthy();
  });

  it('left side bar should be closed', async () => {
    const promise = of(false);
    spy = spyOn(SideBarService, 'getLeftBarStatus').and.returnValue(promise);

    component.getElement()
      .getLeftBarStatus()
      .subscribe(state => expect(state).toBeFalse());

    expect(component.deepSelector("#leftBar").getElement().style.width).toContain('0');
  });
});
