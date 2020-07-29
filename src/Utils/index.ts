import { useLocation } from 'react-router-dom';
import * as DefaultValue from './defaultvalue';
export { DefaultValue };

export enum StatusTask {
  pending = 'pending',
  assigned = 'assigned',
  in_progress = 'in_progress',
  done = 'done',
  canceled = 'canceled',
}

class Utils {
  public getQueryparams(keys: string[]) {
    const query = this.queryParams();
    let params = {} as any;
    keys.forEach((key) => {
      return (params[key] = query.get(key));
    });
    return params;
  }
  private queryParams() {
    return new URLSearchParams(useLocation().search);
  }
}

export default new Utils();
