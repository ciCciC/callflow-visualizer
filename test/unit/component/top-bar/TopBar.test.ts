import '../../../../src/component/callflow-visualizer/IngOrangeTwilioCallFlowVisualizer'
import { html } from 'ing-web';
import { fixture, FixtureElement } from 'ing-orange-test-utils';
import { TopBar } from '../../../../src/component/top-bar/TopBar';

type Fixture = FixtureElement<TopBar>;

async function getComponent(): Promise<Fixture> {
  return fixture<TopBar>(html`<top-bar></top-bar>`);
}

describe(TopBar.name, () => {

  let component: Fixture;
  beforeEach(async () => {
    component = await getComponent();
  });

  it('should create ' + TopBar.name, async () => {
    expect(component).toBeTruthy();
  });

  it('should save node type option after selection', async () => {
    const compLen = component.deepSelector("#dropOut ul").deepSelectorAll("li")[0];
    await compLen.click();

    expect(component.getElement().chosenNodes.includes(compLen.getElement().innerText)).toBeTrue();
  });

  it('should remove selected node type option after deselection', async () => {
    const compLen = component.deepSelector("#dropOut ul").deepSelectorAll("li")[0];
    await compLen.click();
    await compLen.click();

    expect(component.getElement().chosenNodes.includes(compLen.getElement().innerText)).toBeFalse();
  });

});
