export enum RouteName {
  List = 'list',
  Doc = 'doc',
  Setting = 'setting',
}

export const RoutePath = {
  list: `/${RouteName.List}`,
  doc: (id: string | number) => `/${RouteName.Doc}/${id}`,
  setting: `/${RouteName.Setting}`,
};
