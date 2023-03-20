interface Obj {
  [key: string]: any;
}

export function mergeObjects(obj1: Obj, obj2: Obj): Obj {
  return Object.assign({}, obj1, obj2);
}
