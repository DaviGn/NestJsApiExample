import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

export const ChiperServiceName = 'ICipherService';

export interface ICipherService {
  encrypt(text: string): Promise<string>;
  validate(text: string, hash: string): Promise<boolean>;
}

@Injectable()
export class CipherService implements ICipherService {
  async encrypt(text: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    const hashedText = await bcrypt.hash(text, salt);
    return hashedText;
  }

  async validate(text: string, hash: string): Promise<boolean> {
    const result = await bcrypt.compare(text, hash);
    return result;
  }
}
