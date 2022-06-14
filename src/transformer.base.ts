/* eslint-disable @typescript-eslint/no-empty-function */
export class BaseTransformer {
  static transform(data: object[]) {
    const array = [];

    data.forEach((el) => {
      array.push(this.singleTransform(el));
    });

    return data;
  }

  static singleTransform(element) {}
}
