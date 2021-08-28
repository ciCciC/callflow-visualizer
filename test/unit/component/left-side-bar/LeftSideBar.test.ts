import {LeftSideBar} from "../../../../src/component/left-side-bar/LeftSideBar";
import { fixture, FixtureElement } from 'ing-orange-test-utils';
import { html } from 'ing-web';
import {SideBarService} from "../../../../src/service/SideBarService";
import { of } from 'rxjs';
import {NodeHolderService} from "../../../../src/service/NodeHolderService";
import {fakeMessageNode} from "../../fixture/fixtureNodes";

type Fixture = FixtureElement<LeftSideBar>;

async function getComponent(): Promise<Fixture> {
  return fixture<LeftSideBar>(html`<left-side-bar></left-side-bar>`);
}

describe(LeftSideBar.name, () => {

  let component: Fixture;
  // @ts-ignore
  let spy: any;
  const promiseTrue = of(true);
  const fakeNodeHolder = of(fakeMessageNode);

  afterEach(async () => {
    NodeHolderService.resetNodeHolderSelection();

    SideBarService.getLeftBarStatus().subscribe(state => {
      if(state) {SideBarService.toggleLeftBar();}
    });
  });

  it('should create ' + LeftSideBar.name, async () => {
    component = await getComponent();
    expect(component).toBeTruthy();
  });

  it('left side bar should be closed', async () => {
    const promiseFalse = of(false);
    spy = spyOn(SideBarService, 'getLeftBarStatus').and.returnValue(promiseFalse);

    component = await getComponent();

    expect(component.getElement().toggle).toBeFalse();
  });

  it('left side bar should be open', async () => {
    spyOn(SideBarService, 'getLeftBarStatus').and.returnValue(promiseTrue);
    spyOn(SideBarService, 'toggleLeftBar').and.callThrough();

    SideBarService.toggleLeftBar();

    component = await getComponent();

    expect(SideBarService.toggleLeftBar).toHaveBeenCalled();

    expect(component.getElement().toggle).toBeTrue();

    expect(component.deepSelector("#leftBar").getElement().style.width).toContain('50%');
  });

  it('should render node-info-view', async () => {
    spyOn(SideBarService, 'getLeftBarStatus').and.returnValue(promiseTrue);
    // @ts-ignore
    spyOn(NodeHolderService, 'getNodeHolder').and.returnValue(fakeNodeHolder);
    spyOn(SideBarService, 'toggleLeftBar').and.callThrough();

    // @ts-ignore
    NodeHolderService.setNodeHolderSelection(fakeNodeHolder);

    SideBarService.toggleLeftBar();

    component = await getComponent();

    expect(component.shadowDom).toContain('node-info-view');

  });

  it('should render subtree-graph', async () => {
    spyOn(SideBarService, 'getLeftBarStatus').and.returnValue(promiseTrue);
    // @ts-ignore
    spyOn(NodeHolderService, 'getNodeHolder').and.returnValue(fakeNodeHolder);
    spyOn(SideBarService, 'toggleLeftBar').and.callThrough();

    // @ts-ignore
    NodeHolderService.setNodeHolderSelection(fakeNodeHolder);

    SideBarService.toggleLeftBar();

    component = await getComponent();

    expect(component.shadowDom).toContain('subtree-graph');
  });
});
