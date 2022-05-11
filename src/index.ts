import {withRouter} from "./withRouter";

if (module && module.hot && module.hot.decline) {
  module.hot.decline();
}

// make it work with --isolatedModules
export {withRouter};
