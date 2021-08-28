export class JsonUtil {
  static jsonToMap(sourceJSON: any) {
    const targetMap = new Map<string, any>();

    if (sourceJSON === undefined || sourceJSON === null) {
      return targetMap;
    }

    Object.keys(sourceJSON).forEach(key => targetMap.set(key, sourceJSON[key]))

    return targetMap;
  }

  static initArrayWhenUndefined(json: any): [] {
    return json === undefined || json === null ? [] : json;
  }
}
