import { Injectable } from '@nestjs/common';
import * as uuid from 'uuid';

@Injectable()
export class TestService {
  private id: string;

  constructor() {
    this.id = uuid.v4();
  }

  getIdentifier(): string {
    return this.id;
  }
}
