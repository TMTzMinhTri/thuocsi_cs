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

  public stringToHslColor(name: string) {
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    let h = hash % 360;
    return 'hsl(' + h + ', ' + 80 + '%, ' + 80 + '%)';
  }

  private queryParams() {
    return new URLSearchParams(useLocation().search);
  }
}

export default new Utils();
