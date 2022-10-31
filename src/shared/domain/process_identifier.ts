
import { v4 } from 'uuid';
import { Identifier } from './Identifier'

export class ProcessIdentifier extends Identifier<string>{
    constructor (id?: string | number) {
        super(id ? id : v4())
    }
}