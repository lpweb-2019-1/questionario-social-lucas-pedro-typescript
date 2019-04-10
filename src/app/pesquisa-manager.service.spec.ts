import { TestBed } from '@angular/core/testing';

import { PesquisaManagerService } from './pesquisa-manager.service';

describe('PesquisaManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PesquisaManagerService = TestBed.get(PesquisaManagerService);
    expect(service).toBeTruthy();
  });
});
