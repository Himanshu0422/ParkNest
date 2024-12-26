import { Injectable } from '@nestjs/common';
import { add } from '@parknest/sample-package';

@Injectable()
export class AppService {
  getHello(): number {
    return add(1, 30);
  }
}
