import { isFunction } from '@sniperjs/utils';


function filterEventProps(e) {
  return Object.keys(e).reduce((accu, curKey) => {
    const accuCopy = { ...accu };
    if (curKey === 'type' || curKey === 'currentTarget' || curKey === 'target') {
      accuCopy[curKey] = e[curKey];
    }
    return accuCopy;
  }, {});
}

const pluginEventBreadcrumbs = {
  init(core) {
    // eslint-disable-next-line
    const originPage = Page;
    // eslint-disable-next-line
    Page = (config) => {
      const configCopy = { ...config };
      Object.keys(configCopy).forEach((i) => {
        const originMethod = configCopy[i];
        if (isFunction(originMethod) && i === 'dispatchEvent') {
          configCopy[i] = function sniperMiniEventHandler(...args) {
            const ops = filterEventProps(args[0]);
            // eslint-disable-next-line
            const app = getApp();
            core.addBreadCrumb(ops);
            originMethod.apply(app.$$page, args);
          };
        }
      });
      return originPage(configCopy);
    };
    // eslint-disable-next-line
    return Page;
  },
};

export default pluginEventBreadcrumbs;
