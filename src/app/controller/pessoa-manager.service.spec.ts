import { TestBed } from '@angular/core/testing';

import { PessoaManagerService } from './pessoa-manager.service';

describe('PessoaManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PessoaManagerService = TestBed.get(PessoaManagerService);
    expect(service).toBeTruthy();
  });
});
