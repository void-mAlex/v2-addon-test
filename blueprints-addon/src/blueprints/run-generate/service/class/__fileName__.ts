import Service from '@ember/service';

export default class <%= options.entity.classifiedName %>Service extends Service {}

declare module '@ember/service' {
  interface Registry {
    '<%= options.entity.name %>': <%= options.entity.classifiedName %>Service;
  }
}
