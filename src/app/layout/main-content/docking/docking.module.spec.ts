import { DockingModule } from './docking.module';

describe('DockingModule', () => {
  let dockingModule: DockingModule;

  beforeEach(() => {
    dockingModule = new DockingModule();
  });

  it('should create an instance', () => {
    expect(dockingModule).toBeTruthy();
  });
});
